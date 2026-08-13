/**
 * Thrust 5.0 Registration — Google Apps Script Backend
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet.
 * 2. Click on "Extensions" -> "Apps Script".
 * 3. Paste this entire script replacing all code.
 * 4. Click "Deploy" -> "New deployment".
 * 5. Select type: "Web app".
 * 6. Set Description: "Thrust 5.0 Registration API".
 * 7. Set Execute as: "Me".
 * 8. Set Who has access: "Anyone" (CRITICAL!).
 * 9. Click "Deploy", authorize permissions, and copy the Web App URL.
 * 10. Paste the Web App URL into your website's RegistrationForm configuration.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

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
        'Payment Receipt File / Image'
      ]);
      
      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 14);
      headerRange.setBackground('#0D1117');
      headerRange.setFontColor('#29ABE2');
      headerRange.setFontWeight('bold');
    }

    var data = JSON.parse(e.postData.contents);
    
    // Process image file if present
    var receiptUrl = 'No File';
    if (data.paymentReceipt && data.paymentReceipt.indexOf('base64,') !== -1) {
      try {
        var folderName = "Thrust 5.0 Payment Receipts";
        var folders = DriveApp.getFoldersByName(folderName);
        var folder;
        if (folders.hasNext()) {
          folder = folders.next();
        } else {
          folder = DriveApp.createFolder(folderName);
        }
        
        var base64Data = data.paymentReceipt.split('base64,')[1];
        var contentType = data.paymentReceipt.split(';')[0].replace('data:', '');
        var decoded = Utilities.base64Decode(base64Data);
        var blob = Utilities.newBlob(decoded, contentType, data.teamName + "_Receipt_" + new Date().getTime());
        
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        receiptUrl = file.getUrl();
      } catch (err) {
        receiptUrl = "Error uploading file: " + err.toString();
      }
    } else if (data.paymentReceipt) {
      receiptUrl = data.paymentReceipt;
    }

    var rowData = [
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.teamName || '',
      data.teamLeader || '',
      data.leaderRoll || '',
      "'" + (data.leaderPhone || ''), // Leading quote preserves phone format
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

    // If it's an image URL, insert image formula into the cell for direct view
    var lastRow = sheet.getLastRow();
    if (receiptUrl.indexOf('http') === 0 && (receiptUrl.indexOf('.png') !== -1 || receiptUrl.indexOf('.jpg') !== -1 || receiptUrl.indexOf('.jpeg') !== -1)) {
      sheet.getRange(lastRow, 14).setFormula('=IMAGE("' + receiptUrl + '")');
    }

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
    .createTextOutput(JSON.stringify({ status: 'online', service: 'Thrust 5.0 Registration Script' }))
    .setMimeType(ContentService.MimeType.JSON);
}
