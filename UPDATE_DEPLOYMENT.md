# Update the Existing Apps Script Deployment

1. Open the Apps Script project attached to the results Sheet.
2. Replace its current `Code.gs` with the new `Code.gs` in this package.
3. Save.
4. Open **Deploy → Manage deployments**.
5. Edit the existing web-app deployment.
6. Under **Version**, choose **New version**.
7. Click **Deploy**.

This keeps the existing `/exec` URL, so `tutorial.html` does not need another endpoint change.

The script automatically adds:
- H: `Submission ID`
- I: `Duration (seconds)`
- J: `Duration`

No manual Sheet header edits are required.
