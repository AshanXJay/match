# Relationship Matcher ✨

Relationship Matcher is a highly interactive, scientifically-backed web application that allows couples to discover the true strength of their relationship. Built entirely as a static single-page application (SPA), it features a unique "Couples Mode" that operates securely without a backend database for personal data.

## 🧬 The Science
Unlike generic online quizzes, this app is powered by a massive machine learning study of over 11,000 couples:
*Joel, S., Eastwick, P. W., et al. (2020). Machine learning uncovers the most robust self-report predictors of relationship quality across 43 longitudinal couples studies. Proceedings of the National Academy of Sciences, 117(32), 19061-19071.*

The app distills this complex research into the **Top 10 Scientific Predictors** of relationship success, weighting each question according to its exact predictive success rate found in the study (e.g., Commitment = 85%, Attachment = 58%).

## 🚀 Features

- **Couples Mode (Zero-Backend):** Partner A takes the quiz and shares a unique link with Partner B via WhatsApp. Partner B takes the quiz, and the app calculates their combined relationship quality.
- **Dyadic Gap Analysis:** The app mathematically compares both partners' answers and generates personalized, asymmetric advice based on their largest discrepancies.
- **Live Global Stats:** A secure, anonymous dashboard tracks the total number of tests and average scores using a hidden Google Apps Script backend. No API keys are exposed in the frontend.
- **Multi-Language:** Fully localized in English, Sinhala, and Tamil.

## 🔒 Ironclad Privacy & Security
Because relationship data is deeply personal, this app is engineered with military-grade privacy features:

1. **End-to-End Encryption (E2EE):** The app uses the browser's native Web Crypto API (AES-GCM). Names and answers are encrypted locally before being placed into the URL. The decryption key is passed via the URL Hash (`#key=...`), meaning the host server can never read the data.
2. **Self-Destructing Links:** Every generated link is timestamped within the encrypted payload. Links strictly expire **1 hour** after creation, preventing anyone from discovering old links.
3. **Device Locking:** Once Partner B clicks the link, the app uses `history.replaceState` to clean the URL from the browser history and uses `localStorage` to "lock" the device to that role. If Partner B (or a snooping 3rd party) tries to open the link again, it is blocked.
4. **No Personal Data Database:** There is no traditional backend. Personal data is never transmitted to any server.

## 📊 Setting up the Live Stats Dashboard (Google Sheets)
To keep the application 100% free and avoid exposing any API keys in the frontend, the Live Global Stats dashboard uses a **Google Sheet** as a secure database.

To set this up on your own fork:
1. Create a blank Google Sheet.
2. Go to **Extensions > Apps Script** and paste this code:
```javascript
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getRange("A1").getValue();
  if (!data) {
    data = JSON.stringify({
      singleTests: 0, coupleTests: 0, sumScore: 0,
      sumPred: [0,0,0,0,0,0,0,0,0,0],
      catHigh: 0, catMod: 0, catGrow: 0, catNeeds: 0
    });
    sheet.getRange("A1").setValue(data);
  }
  return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var raw = sheet.getRange("A1").getValue();
    var stats = raw ? JSON.parse(raw) : { singleTests: 0, coupleTests: 0, sumScore: 0, sumPred: [0,0,0,0,0,0,0,0,0,0], catHigh: 0, catMod: 0, catGrow: 0, catNeeds: 0 };
    var payload = JSON.parse(e.postData.contents);
    if (payload.type === 'single') stats.singleTests += 1;
    else if (payload.type === 'couple') {
      stats.coupleTests += 1;
      stats.sumScore += payload.score;
      for(var i=0; i<10; i++) stats.sumPred[i] += payload.preds[i];
      if (payload.cat === 'high') stats.catHigh += 1;
      else if (payload.cat === 'mod') stats.catMod += 1;
      else if (payload.cat === 'grow') stats.catGrow += 1;
      else if (payload.cat === 'needs') stats.catNeeds += 1;
    }
    sheet.getRange("A1").setValue(JSON.stringify(stats));
    return ContentService.createTextOutput(JSON.stringify({status: "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```
3. Click **Deploy > New Deployment > Web app**. Set access to **Anyone**.
4. Copy the Web App URL and replace `STATS_API_URL` in `app.js`.

## 🛠️ Technology Stack
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+). No frameworks required.
- **Security:** `window.crypto.subtle` (AES-GCM encryption).
- **Backend (Stats Only):** Google Apps Script (Google Sheets).

## 📦 Deployment
Since the app relies entirely on URL-encoded state and client-side execution, deployment is as simple as hosting the files on GitHub Pages, Vercel, or Netlify.
