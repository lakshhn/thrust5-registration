/**
 * Thrust 5.0 Registration — Fail-Safe Google Apps Script Backend
 * Linked directly to Spreadsheet ID: 1U_W0ghyQQN_LT6BUu9mInyWEHy6og-VqcP85lzwXlgY
 * 
 * UPDATE INSTRUCTIONS IN APPS SCRIPT:
 * 1. Open your Google Sheet -> Extensions -> Apps Script.
 * 2. Paste ALL code below replacing existing contents.
 * 3. Click Save (disk icon).
 * 4. Click "Deploy" -> "Manage deployments".
 * 5. Click the Pencil (Edit) icon.
 * 6. Under "Version", select "New version".
 * 7. Click "Deploy".
 */

var SPREADSHEET_ID = "1U_W0ghyQQN_LT6BUu9mInyWEHy6og-VqcP85lzwXlgY";

function getTargetSheet() {
  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
  } catch (e) {
    return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var sheet = getTargetSheet();
    
    // Auto-create Header Row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
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
        'Rocketry Experience',
        'Primary Motivation',
        'Payment Receipt File / Image'
      ]);
      
      var headerRange = sheet.getRange(1, 1, 1, 14);
      headerRange.setBackground('#0D1117');
      headerRange.setFontColor('#29ABE2');
      headerRange.setFontWeight('bold');
    }

    // Parse payload
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    var teamName = data.teamName || 'N/A';
    var teamLeader = data.teamLeader || 'N/A';
    var leaderRoll = data.leaderRoll || 'N/A';
    var leaderPhone = "'" + (data.leaderPhone || '');
    var m1Name = data.m1Name || 'N/A';
    var m1Roll = data.m1Roll || 'N/A';
    var m2Name = data.m2Name || 'N/A';
    var m2Roll = data.m2Roll || 'N/A';
    var m3Name = data.m3Name || '';
    var m3Roll = data.m3Roll || '';
    var experience = data.experience || 'N/A';
    var motivation = data.motivation || 'N/A';

    // 1. APPEND TEAM DATA ROW IMMEDIATELY TO SHEET
    sheet.appendRow([
      timestamp,
      teamName,
      teamLeader,
      leaderRoll,
      leaderPhone,
      m1Name,
      m1Roll,
      m2Name,
      m2Roll,
      m3Name,
      m3Roll,
      experience,
      motivation,
      "Processing receipt..."
    ]);

    var lastRow = sheet.getLastRow();
    var receiptUrl = "No Receipt File";

    // 2. PROCESS PAYMENT RECEIPT FILE INTO GOOGLE DRIVE
    var paymentReceipt = data.paymentReceipt || data.paymentBase64 || '';
    if (paymentReceipt && paymentReceipt.indexOf('base64,') !== -1) {
      try {
        var folderName = "Thrust 5.0 Payment Receipts";
        var folders = DriveApp.getFoldersByName(folderName);
        var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
        
        var parts = paymentReceipt.split('base64,');
        var contentType = parts[0].replace('data:', '').replace(';base64', '');
        var decoded = Utilities.base64Decode(parts[1]);
        
        var ext = "png";
        if (contentType.indexOf("jpeg") !== -1 || contentType.indexOf("jpg") !== -1) ext = "jpg";
        else if (contentType.indexOf("pdf") !== -1) ext = "pdf";
        
        var fileName = teamName.replace(/[^a-zA-Z0-9]/g, '_') + "_Receipt_" + new Date().getTime() + "." + ext;
        var blob = Utilities.newBlob(decoded, contentType, fileName);
        
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        receiptUrl = file.getUrl();
      } catch (driveErr) {
        receiptUrl = "Receipt attached (Base64 attached). Drive save note: " + driveErr.toString();
      }
    } else if (paymentReceipt) {
      receiptUrl = paymentReceipt;
    }

    // Update receipt URL column
    sheet.getRange(lastRow, 14).setValue(receiptUrl);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: lastRow, receiptUrl: receiptUrl }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'active', spreadsheetId: SPREADSHEET_ID, message: 'Thrust 5.0 Registration Web App Ready' }))
    .setMimeType(ContentService.MimeType.JSON);
}
