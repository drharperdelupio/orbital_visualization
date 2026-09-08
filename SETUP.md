# Setup

1. In your Google Sheet, open **Extensions → Apps Script**.
2. Replace the default script with the contents of `Code.gs`.
3. If your results tab is not named `Results`, change:
   `const SHEET_NAME = "Results";`
4. Deploy as **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the deployed URL ending in `/exec`.
6. Open `tutorial.html` and replace:
   `PASTE_YOUR_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE`
   with the `/exec` URL.
7. Upload `index.html` and the edited `tutorial.html` to the same GitHub Pages folder.

### Validation built into the endpoint

- fixed tutorial identifier: `ORBITAL_SHAPES_V1`
- exactly 16 questions
- integer score from 0 through 16
- percent computed by Apps Script
- pass/fail computed by Apps Script using 13/16
- student name required
- duplicate browser attempt IDs ignored
- script lock prevents simultaneous duplicate writes
- no sheet-reading API is exposed to students
