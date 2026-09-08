# Exploring Atomic Orbitals — Google Sheets Results Edition

## Files

- `index.html` — name entry page
- `tutorial.html` — tutorial, 16 scored questions, drag-and-drop, certificate, and score submission
- `Code.gs` — Google Apps Script endpoint
- `SETUP.md` — deployment steps

## Sheet columns

Existing columns A:G:
`Timestamp | Tutorial | Student Name | Score | Total | Percent | Passed`

The script automatically uses column H as `Submission ID` for duplicate-attempt protection.

## Important

The assignment token is embedded in the public tutorial and therefore is not a true secret. It is useful for rejecting unrelated/accidental submissions, while server-side validation prevents altered totals, impossible scores, and client-supplied percentage/pass values from being trusted.
