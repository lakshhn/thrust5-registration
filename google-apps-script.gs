/**
 * Thrust 5.0 Registration — Robust Google Apps Script Backend
 * 
 * Instructions:
 * 1. Replace all code in Google Sheets -> Extensions -> Apps Script with this file.
 * 2. Click "Save" and then "Deploy" -> "Manage deployments" -> Edit (pencil icon) -> "New version" -> "Deploy".
 * 3. Ensure "Who has access" is set to "Anyone".
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Ensure header row exists
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
        'Payment Receipt File / Image Link'
      ]);
      
      var headerRange = sheet.getRange(1, 1, 1, 14);
      headerRange.setBackground('#0D1117');
      headerRange.setFontColor('#29ABE2');
      headerRange.setFontWeight('bold');
    }

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

    // Process image file if present
    var receiptUrl = 'No File Uploaded';
    var paymentReceipt = data.paymentReceipt || data.paymentBase64 || '';
    
    if (paymentReceipt && paymentReceipt.indexOf('base64,') !== -1) {
      try {
        var folderName = "Thrust 5.0 Payment Receipts";
        var folders = DriveApp.getFoldersByName(folderName);
        var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);
        
        var base64Data = paymentReceipt.split('base64,')[1];
        var contentType = paymentReceipt.split(';')[0].replace('data:', '');
        var decoded = Utilities.base64Decode(base64Data);
        var blob = Utilities.newBlob(decoded, contentType, (data.teamName || 'Team') + "_Receipt_" + new Date().getTime());
        
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        receiptUrl = file.getUrl();
      } catch (err) {
        receiptUrl = "Drive Error: " + err.toString();
      }
    } else if (paymentReceipt) {
      receiptUrl = paymentReceipt;
    }

    var rowData = [
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.teamName || '',
      data.teamLeader || '',
      data.leaderRoll || '',
      "'" + (data.leaderPhone || ''),
      data.m1Name || '',
      data.m1Roll || '',
      data.m2Name || '',
      data.m2Roll || '',
      data.m3Name || '',
      data.m3Roll || '',
      data.experience || '',
      data.motivation || '',
      receiptUrl
    ];

    sheet.appendRow(rowData);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: sheet.getLastRow(), receiptUrl: receiptUrl }))
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
    .createTextOutput(JSON.stringify({ status: 'active', service: 'Thrust 5.0 Registration API' }))
    .setMimeType(ContentService.MimeType.JSON);
}
