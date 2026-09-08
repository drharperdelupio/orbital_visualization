const SHEET_NAME = "Results";
const EXPECTED_TUTORIAL = "ORBITAL_SHAPES_V1";
const EXPECTED_TOTAL = 16;
const PASS_SCORE = 13;
const SUBMISSION_TOKEN = "_aKZJwDX3k2GfFrAJd7EqxL3PZZ0lje_WNK-aTBZiEk";
const SUBMISSION_ID_COLUMN = 8; // Column H
const DURATION_SECONDS_COLUMN = 9; // Column I
const DURATION_DISPLAY_COLUMN = 10; // Column J

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Missing request body.");
    }

    const data = JSON.parse(e.postData.contents);

    if (String(data.token || "") !== SUBMISSION_TOKEN) {
      throw new Error("Unauthorized submission.");
    }

    if (String(data.tutorial || "") !== EXPECTED_TUTORIAL) {
      throw new Error("Unexpected tutorial identifier.");
    }

    const studentName = String(data.studentName || "").trim();
    if (!studentName || studentName.length > 120) {
      throw new Error("Invalid student name.");
    }

    const score = Number(data.score);
    const total = Number(data.total);

    if (!Number.isInteger(score) || !Number.isInteger(total)) {
      throw new Error("Score and total must be integers.");
    }

    if (total !== EXPECTED_TOTAL) {
      throw new Error("Unexpected question total.");
    }

    if (score < 0 || score > EXPECTED_TOTAL) {
      throw new Error("Score is outside the allowed range.");
    }

    const durationSeconds = Number(data.durationSeconds);
    if (!Number.isInteger(durationSeconds) || durationSeconds < 0 || durationSeconds > 21600) {
      throw new Error("Attempt duration is invalid.");
    }

    const attemptId = String(data.attemptId || "").trim();
    if (!/^[A-Za-z0-9._:-]{8,160}$/.test(attemptId)) {
      throw new Error("Invalid attempt identifier.");
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error('Sheet tab "' + SHEET_NAME + '" was not found.');
    }

    // Ensure internal/result-detail columns exist.
    if (sheet.getRange(1, SUBMISSION_ID_COLUMN).getValue() !== "Submission ID") {
      sheet.getRange(1, SUBMISSION_ID_COLUMN).setValue("Submission ID");
    }
    if (sheet.getRange(1, DURATION_SECONDS_COLUMN).getValue() !== "Duration (seconds)") {
      sheet.getRange(1, DURATION_SECONDS_COLUMN).setValue("Duration (seconds)");
    }
    if (sheet.getRange(1, DURATION_DISPLAY_COLUMN).getValue() !== "Duration") {
      sheet.getRange(1, DURATION_DISPLAY_COLUMN).setValue("Duration");
    }

    // Reject repeat submission of the same browser attempt.
    const lastRow = sheet.getLastRow();
    if (lastRow >= 2) {
      const ids = sheet.getRange(2, SUBMISSION_ID_COLUMN, lastRow - 1, 1)
        .getDisplayValues()
        .flat();
      if (ids.includes(attemptId)) {
        return jsonResponse({success: true, duplicate: true});
      }
    }

    // Do not trust a browser-supplied percentage/pass value.
    const percent = Math.round((score / EXPECTED_TOTAL) * 10000) / 100;
    const passed = score >= PASS_SCORE ? "Yes" : "No";

    sheet.appendRow([
      new Date(),
      EXPECTED_TUTORIAL,
      studentName,
      score,
      EXPECTED_TOTAL,
      percent,
      passed,
      attemptId,
      durationSeconds,
      formatDuration_(durationSeconds)
    ]);

    return jsonResponse({success: true, duplicate: false});

  } catch (error) {
    return jsonResponse({success: false, error: String(error.message || error)});
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

function doGet() {
  return jsonResponse({
    success: true,
    service: "Orbital Shapes Tutorial Results",
    accepts: "POST only for result submissions"
  });
}

function formatDuration_(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (hours > 0 ? String(hours).padStart(2, "0") + ":" : "") +
    String(minutes).padStart(2, "0") + ":" +
    String(secs).padStart(2, "0");
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
