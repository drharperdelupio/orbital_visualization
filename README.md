# Three-Page Tutorial Flow

The tutorial now uses:

1. `index.html` — student name entry
2. `tutorial.html` — instructional content and all 16 questions
3. `results.html` — score, attempt time, certificate eligibility, and certificate PDF/print

Clicking **Finish and Check Certificate Eligibility** now:
- verifies all questions are answered
- freezes the timer
- submits the score to Google Sheets
- opens the dedicated results page

Upload all three HTML files to the same GitHub Pages folder/root.

No Apps Script change is required beyond the already-deployed duration-aware `Code.gs`.
