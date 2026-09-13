/**
 * Thrust 5.0 Registration - Google Apps Script Backend
 * 12 Columns | Case-Insensitive Duplicate Protection | Self-Healing Headers
 * Spreadsheet: 1U_W0ghyQQN_LT6BUu9mInyWEHy6og-VqcP85lzwXlgY
 */

var SPREADSHEET_ID = "1U_W0ghyQQN_LT6BUu9mInyWEHy6og-VqcP85lzwXlgY";

var HEADERS = [
  'Timestamp',
  'Team Name',
  'Leader Name',
  'Leader Roll No',
  'Leader Mobile No',
  'Member 1 Name',
  'Member 1 Roll No',
  'Member 2 Name',
  'Member 2 Roll No',
  'Member 3 Name',
  'Member 3 Roll No',
  'Payment Receipt Link'
];

var COL_COUNT = HEADERS.length; // 12

function getTargetSheet() {
  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  } catch (e) {
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }
}

function styleHeader(sheet) {
  try {
    var range = sheet.getRange(1, 1, 1, COL_COUNT);
    range.setBackground('#0D1117');
    range.setFontColor('#29ABE2');
    range.setFontWeight('bold');
    range.setFontSize(10);
  } catch (e) {}
}

function ensureHeaders(sheet) {
  var lastCol = sheet.getLastColumn();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    styleHeader(sheet);
    return;
  }

  var existingCols = Math.max(lastCol, 1);
  var headerRow = sheet.getRange(1, 1, 1, existingCols).getValues()[0];

  var hasReceiptCol = false;
  for (var i = 0; i < headerRow.length; i++) {
    var cell = (headerRow[i] || '').toString().toLowerCase();
    if (cell.indexOf('receipt') !== -1 || cell.indexOf('payment') !== -1) {
      hasReceiptCol = true;
      break;
    }
  }

  if (!hasReceiptCol) {
    for (var c = existingCols + 1; c <= COL_COUNT; c++) {
      sheet.getRange(1, c).setValue(HEADERS[c - 1]);
    }
    if (existingCols >= COL_COUNT) {
      sheet.getRange(1, COL_COUNT).setValue(HEADERS[COL_COUNT - 1]);
    }
    styleHeader(sheet);
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var sheet = getTargetSheet();

    ensureHeaders(sheet);

    var data = {};
    // 1. Raw JSON in postData.contents (sent via text/plain fetch or sendBeacon)
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        // In case postData was urlencoded (payload=...)
        try {
          var contents = e.postData.contents;
          if (contents.indexOf('payload=') === 0) {
            var decoded = decodeURIComponent(contents.substring(8).replace(/\+/g, ' '));
            data = JSON.parse(decoded);
          }
        } catch (err2) {}
      }
    }
    // 2. URL-encoded form parameter (sent via hidden iframe form POST)
    if ((!data || !data.teamName) && e && e.parameter && e.parameter.payload) {
      try {
        data = JSON.parse(e.parameter.payload);
      } catch (err) {
        data = e.parameter;
      }
    }
    // 3. Fallback direct parameter
    if ((!data || !data.teamName) && e && e.parameter) {
      data = e.parameter;
    }

    var teamName = (data.teamName || '').trim();
    if (!teamName) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'error', error: 'Team name is required' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Disallow special characters: only letters, numbers, spaces, and underscores allowed
    if (!/^[a-zA-Z0-9_ ]+$/.test(teamName)) {
      return ContentService
        .createTextOutput(JSON.stringify({
          result: 'error',
          error: 'Special characters are not allowed in team name! Use only letters, numbers, spaces, and underscores (_).'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Duplicate check: reject duplicate registrations to prevent double-entry
    var lastRow = sheet.getLastRow();
    var isDuplicate = false;
    if (lastRow > 1) {
      var existingTeams = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      var normalizedNew = teamName.toLowerCase().replace(/[^a-z0-9]/g, '');
      for (var i = 0; i < existingTeams.length; i++) {
        var existing = (existingTeams[i][0] || '').toString().trim();
        var normalizedExisting = existing.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (normalizedExisting && normalizedExisting === normalizedNew) {
          isDuplicate = true;
          break;
        }
      }
    }

    if (isDuplicate) {
      return ContentService
        .createTextOutput(JSON.stringify({
          result: 'duplicate',
          error: 'Team name "' + teamName + '" is already registered! Please choose a different team name.'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var timestamp   = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    var teamLeader  = data.teamLeader || 'N/A';
    var leaderRoll  = data.leaderRoll  || 'N/A';
    var leaderPhone = "'" + (data.leaderPhone || '');
    var m1Name      = data.m1Name || 'N/A';
    var m1Roll      = data.m1Roll || 'N/A';
    var m2Name      = data.m2Name || 'N/A';
    var m2Roll      = data.m2Roll || 'N/A';
    var m3Name      = data.m3Name || '-';
    var m3Roll      = data.m3Roll || '-';

    // Append exactly 12 columns
    sheet.appendRow([
      timestamp,       // col 1
      teamName,        // col 2
      teamLeader,      // col 3
      leaderRoll,      // col 4
      leaderPhone,     // col 5
      m1Name,          // col 6
      m1Roll,          // col 7
      m2Name,          // col 8
      m2Roll,          // col 9
      m3Name,          // col 10
      m3Roll,          // col 11
      'Processing...'  // col 12 - receipt placeholder
    ]);

    var newRow = sheet.getLastRow();
    var receiptUrl = 'No Receipt Attached';

    // Upload receipt to Google Drive
    // Accept full data URI (data:image/jpeg;base64,...) OR raw base64 string
    var paymentReceipt = data.paymentReceipt || data.paymentBase64 || data.fileData || '';

    // If the receipt field is missing from parsed data but is in postData, try to extract it
    if (!paymentReceipt && e && e.postData && e.postData.contents) {
      var rawBody = e.postData.contents;
      var prMatch = rawBody.match(/"paymentReceipt":"(data:[^"]+)"/);
      if (prMatch) paymentReceipt = prMatch[1];
    }

    if (paymentReceipt) {
      var hasBase64 = paymentReceipt.indexOf('base64,') !== -1;
      var isRawBase64 = !hasBase64 && paymentReceipt.length > 100;

      // Normalize: if raw base64 without prefix, add JPEG prefix
      if (isRawBase64) {
        paymentReceipt = 'data:image/jpeg;base64,' + paymentReceipt;
        hasBase64 = true;
      }

      if (hasBase64) {
        try {
          var folderName = 'Thrust 5.0 Payment Receipts';
          var folders = DriveApp.getFoldersByName(folderName);
          var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

          var parts = paymentReceipt.split('base64,');
          var contentType = parts[0].replace('data:', '').replace(';', '').trim();
          if (!contentType) contentType = 'image/jpeg';
          var decoded = Utilities.base64Decode(parts[1]);

          var ext = 'jpg';
          if (contentType.indexOf('png') !== -1) ext = 'png';
          else if (contentType.indexOf('pdf') !== -1) ext = 'pdf';
          else if (contentType.indexOf('webp') !== -1) ext = 'webp';

          var fileName = teamName.replace(/[^a-zA-Z0-9]/g, '_') + '_Receipt_' + new Date().getTime() + '.' + ext;
          var blob = Utilities.newBlob(decoded, contentType, fileName);

          var file = folder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          receiptUrl = file.getUrl();
        } catch (driveErr) {
          receiptUrl = 'Upload error: ' + driveErr.toString();
        }
      }
    }

    // Write receipt URL to column 12
    sheet.getRange(newRow, COL_COUNT).setValue(receiptUrl);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: newRow, receiptUrl: receiptUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Run this ONCE manually to repair the sheet headers.
 * Apps Script editor: Run > repairSheetHeaders
 */
function repairSheetHeaders() {
  var sheet = getTargetSheet();
  var lastCol = sheet.getLastColumn();
  var lastRow = sheet.getLastRow();

  Logger.log('Before repair: ' + lastCol + ' cols, ' + lastRow + ' rows');

  for (var c = 1; c <= COL_COUNT; c++) {
    sheet.getRange(1, c).setValue(HEADERS[c - 1]);
  }
  styleHeader(sheet);

  Logger.log('Repaired: ' + COL_COUNT + ' column headers set.');
  return 'Headers repaired successfully';
}

function doGet(e) {
  try {
    var sheet = getTargetSheet();
    var teams = [];
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var rawTeams = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < rawTeams.length; i++) {
        var t = (rawTeams[i][0] || '').toString().trim();
        if (t) {
          // Clean out resubmission tags
          t = t.replace(/\s*\[RESUBMISSION\]\s*/gi, '').trim();
          if (t && teams.indexOf(t) === -1) {
            teams.push(t);
          }
        }
      }
    }

    var responseData = {
      status: 'active',
      spreadsheetId: SPREADSHEET_ID,
      columns: COL_COUNT,
      teams: teams,
      message: 'Thrust 5.0 Registration API Live'
    };

    var jsonString = JSON.stringify(responseData);

    if (e && e.parameter && e.parameter.callback) {
      return ContentService
        .createTextOutput(e.parameter.callback + '(' + jsonString + ')')
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    return ContentService
      .createTextOutput(jsonString)
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', error: err.toString(), teams: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

