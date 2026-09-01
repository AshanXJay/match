# Relationship Matcher ✨

Relationship Matcher is a highly interactive, scientifically-backed web application that allows couples to discover the true strength of their relationship. Built entirely as a static single-page application (SPA), it features a unique "Couples Mode" that operates securely without a backend database.

## 🧬 The Science
Unlike generic online quizzes, this app is powered by a massive machine learning study of over 11,000 couples:
*Joel, S., Eastwick, P. W., et al. (2020). Machine learning uncovers the most robust self-report predictors of relationship quality across 43 longitudinal couples studies. Proceedings of the National Academy of Sciences, 117(32), 19061-19071.*

The app distills this complex research into the **Top 10 Scientific Predictors** of relationship success, weighting each question according to its exact predictive success rate found in the study (e.g., Commitment = 85%, Attachment = 58%).

## 🚀 Features

- **Couples Mode (Zero-Backend):** Partner A takes the quiz and shares a unique link with Partner B via WhatsApp. Partner B takes the quiz, and the app calculates their combined relationship quality.
- **Dyadic Gap Analysis:** The app mathematically compares both partners' answers and generates personalized, asymmetric advice based on their largest discrepancies (e.g., advising Partner B to show more appreciation if Partner A scored low on that metric).
- **End-to-End Encryption (E2EE):** Because relationship data is sensitive, the app uses the browser's native Web Crypto API (AES-GCM). Answers are encrypted before being placed in the URL, and the decryption key is passed securely via the URL Hash (`#key=...`), guaranteeing that the host server (GitHub Pages) can never read the data.
- **Deep Personalization:** The app dynamically inserts both partners' names into the questions, the UI, and the WhatsApp share messages.
- **Multi-Language:** Fully localized in English, Sinhala, and Tamil.

## 🛠️ Technology Stack
- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+). No frameworks required.
- **Security:** `window.crypto.subtle` (AES-GCM encryption).
- **Hosting:** Designed to be hosted on any static file server (e.g., GitHub Pages) with zero backend architecture.

## 📦 Deployment
Since the app relies entirely on URL-encoded state and client-side execution, deployment is as simple as hosting the files:
1. Push this repository to GitHub.
2. Navigate to **Settings > Pages**.
3. Select your main branch as the source.
4. Your app is live and fully functional!

## 🔒 Privacy Guarantee
This app does not use cookies, local storage, or external databases to save user data. All data is encrypted client-side, embedded in the shareable URL, and decrypted locally on the receiving partner's device. 
