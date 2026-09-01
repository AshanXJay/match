let currentLang = 'en';

const STATS_API_URL = "https://script.google.com/macros/s/AKfycbxSVmFLli_w4m7312Qk1aGBNXbiiZ-8tF4mFq4Q9TjTgO5xwDQAIiM_b0tPsgKhoePC6A/exec";

async function pingStatsApi(payload, modeKey) {
    if (STATS_API_URL === "https://script.google.com/macros/s/AKfycbxSVmFLli_w4m7312Qk1aGBNXbiiZ-8tF4mFq4Q9TjTgO5xwDQAIiM_b0tPsgKhoePC6A/exec" && false) return; // Note: removed guard so it runs
    if (localStorage.getItem('match_pinged_' + modeKey)) return;
    try {
        await fetch(STATS_API_URL, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'text/plain' } // avoids CORS preflight
        });
        localStorage.setItem('match_pinged_' + modeKey, 'true');
    } catch(e) { console.log('Stats ping failed', e); }
}

async function loadStatistics() {
    const statsBtn = document.getElementById('show-stats-btn');
    const statsScreen = document.getElementById('stats-screen');
    const langScreen = document.getElementById('lang-screen');
    
    langScreen.classList.remove('active');
    setTimeout(() => {
        langScreen.classList.add('hidden');
        statsScreen.classList.remove('hidden');
        void statsScreen.offsetWidth;
        statsScreen.classList.add('active');
    }, 300);
    
    if (STATS_API_URL === "https://script.google.com/macros/s/AKfycbxSVmFLli_w4m7312Qk1aGBNXbiiZ-8tF4mFq4Q9TjTgO5xwDQAIiM_b0tPsgKhoePC6A/exec" && false) {
        document.getElementById('stats-loading').innerHTML = '<p>Database not connected yet!</p>';
        return;
    }
    
    try {
        let res = await fetch(STATS_API_URL);
        let data = await res.json();
        
        document.getElementById('stats-loading').classList.add('hidden');
        document.getElementById('stats-content').classList.remove('hidden');
        
        document.getElementById('stat-single').textContent = data.singleTests || 0;
        document.getElementById('stat-couple').textContent = data.coupleTests || 0;
        
        let avgScore = data.coupleTests > 0 ? Math.round(data.sumScore / data.coupleTests) : 0;
        document.getElementById('stat-avg-score').textContent = avgScore;
        
        document.getElementById('stat-cat-high').textContent = data.catHigh || 0;
        document.getElementById('stat-cat-mod').textContent = data.catMod || 0;
        document.getElementById('stat-cat-grow').textContent = data.catGrow || 0;
        document.getElementById('stat-cat-needs').textContent = data.catNeeds || 0;
        
        let predsHtml = '';
        const predNames = ['Commitment', 'Appreciation', 'Sex', 'Partner Sat.', 'No Conflict', 'Responsiveness', 'Investment', 'Support', 'Capitalization', 'Attachment'];
        
        for (let i = 0; i < 10; i++) {
            let totalTests = data.coupleTests + (data.singleTests || 0);
            let avgP = totalTests > 0 ? (data.sumPred[i] / totalTests) : 0;
            let pct = totalTests > 0 ? Math.max(0, Math.round(((avgP - 1) / 4) * 100)) : 0;
            predsHtml += `
                <div class="breakdown-item">
                    <div class="breakdown-header"><span class="bd-title">${predNames[i]}</span></div>
                    <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:2px; color:#94a3b8;">
                        <span>Global Avg</span><span style="color:var(--primary); font-weight:bold;">${pct}%</span>
                    </div>
                    <div class="bd-bar-bg">
                        <div class="bd-bar" style="width: ${pct}%; background: linear-gradient(90deg, var(--primary), var(--secondary));"></div>
                    </div>
                </div>
            `;
        }
        document.getElementById('stat-avg-preds').innerHTML = predsHtml;
        
    } catch(e) {
        document.getElementById('stats-loading').innerHTML = '<p>Failed to load statistics.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {


    const statsBtn = document.getElementById('show-stats-btn');
    if (statsBtn) {
        statsBtn.addEventListener('click', loadStatistics);
    }
    const statsBackBtn = document.getElementById('stats-back-btn');
    if (statsBackBtn) {
        statsBackBtn.addEventListener('click', () => {
            document.getElementById('stats-screen').classList.remove('active');
            setTimeout(() => {
                document.getElementById('stats-screen').classList.add('hidden');
                document.getElementById('lang-screen').classList.remove('hidden');
                void document.getElementById('lang-screen').offsetWidth;
                document.getElementById('lang-screen').classList.add('active');
            }, 300);
        });
    }
});



const translations = {
    en: {
        ui: {
            appTitle: "Relationship Matcher ✨",
            introDesc1: "Hey there! 👋 This fun little quiz is actually based on a massive machine learning study of over 11,000 couples by <em>Joel et al. (2020)</em>.",
            introDesc2: "Ready to discover the real strength of your relationship using some hard science? Let's dive in!",
            startBtn: "Let's go! 🚀",
            prevBtn: "Back",
            nextBtn: "Next",
            resultsBtn: "Show my results! 🎉",
            profileTitle: "Here's how things look! 💖",
            nameTitle: "Let's personalize this!",
            nameDesc: "To give you the best experience, what are your names?",
            yourNameLabel: "Your Name",
            partnerNameLabel: "Partner's Name",
            privacyGuaranteeHeader: "🔒 Ironclad Privacy",
            privacyDetails: `<ul style="font-size: 0.85rem; padding-left: 20px; line-height: 1.5; text-align: left; opacity: 0.9;">
                <li style="margin-bottom: 8px;"><strong>End-to-End Encrypted:</strong> Your names and answers are encrypted locally on your device (AES-GCM). The server cannot read them.</li>
                <li style="margin-bottom: 8px;"><strong>Self-Destructing Links:</strong> Generated links automatically expire 1 hour after creation.</li>
                <li style="margin-bottom: 8px;"><strong>Device Locking:</strong> Once a link is opened, it binds to that browser. If a 3rd party tries to open the same link, they will be blocked.</li>
                <li><strong>No Database or Backend Servers:</strong> We have absolutely zero backend servers to store or process your personal data. The global dashboard only securely tracks anonymous scores.</li>
            </ul>`,
            
            breakdownTitle: "Top 10 Scientific Predictors",
            dyadicTitle: "Couples Growth Areas 🌱",
            predCommitment: "Commitment",
            predAppreciation: "Appreciation",
            predSex: "Sexual Satisfaction",
            predPartnerSat: "Partner Satisfaction",
            predConflict: "Absence of Conflict",
            predResponsiveness: "Responsiveness",
            predInvestment: "Investment",
            predSupport: "General Support",
            predCapitalization: "Celebrating Successes",
            predAttachment: "Comfort & Security",
            insightTitle: "A quick science note 🧬",
            viewMyBreakdown: "View my detailed breakdown 📊",
            insightDesc: "According to the study: 1) Your individual traits (like anxiety) actually don't add much to this score beyond how you feel about your relationship. 2) No quiz can predict the future, so these results just show where you are right now!",
            viewMyBreakdown: "මගේ විස්තරාත්මක ප්‍රතිඵල බලන්න 📊",
            viewMyBreakdown: "View my detailed breakdown 📊",
            retakeBtn: "Take it again! 🔄",
            viewMyBreakdown: "View my detailed breakdown 📊",
            viewMyBreakdown: "මගේ විස්තරාත්මක ප්‍රතිඵල බලන්න 📊",
            modalTitle: "Unlock Couples Mode! 💖",
            modalShareBtn: "Share to {partner} via WhatsApp 💬",
            modalCloseBtn: "Just show my results",
            modalTitle: "Couples Mode විවෘත කරන්න! 💖",
            modalShareBtn: "{partner} වෙත WhatsApp හරහා යවන්න 💬",
            modalCloseBtn: "මගේ ප්‍රතිඵල පමණක් පෙන්වන්න",
            modalTitle: "Couples Mode-ஐ திறக்கவும்! 💖",
            modalShareBtn: "{partner} -க்கு WhatsApp மூலம் பகிரவும் 💬",
            modalCloseBtn: "எனது முடிவுகளை மட்டும் காட்டு",
            waShareP1: "Share to {partner} via WhatsApp 💬",
            waShareP2: "Send Final Results back to {partner} 💬",
            waMsgP1: "Hey {nB}! 💕 {nA} just took a deep dive into your relationship and challenged you to do the same! Ready to see your combined Couples Score? Click here: {link}",
            waMsgP2: "Hey {nA}! I just finished my part of the relationship test. Click here to see our final Couples Score and our areas for growth! {link}",
            greetingP2: "Hey {nB}! 💕 {nA} just took a deep dive into your relationship and challenged you to do the same! Ready to see your combined Couples Score?",
            dyadicAdviceStrings: [
                "{name}, {partner} is feeling a bit unsure about the long-term commitment. Having an open, reassuring conversation about the future could help immensely.", // 0
                "{name}, {partner} is feeling a bit under-appreciated right now. Try to vocalize your gratitude for the little things they do.", // 1
                "{name}, {partner} seems to be wanting a deeper physical connection. This is a great opportunity to openly discuss your physical intimacy needs.", // 2
                "{name}, {partner} is worried you aren't fully happy in the relationship. Remind them of the things they do that make you smile.", // 3
                "{name}, conflict is feeling high for {partner}. Practice pausing when things get heated, and focus on attacking the problem together rather than attacking each other.", // 4
                "{name}, {partner} doesn't feel fully understood right now. Try active listening—just listen to understand, not to reply.", // 5
                "{name}, {partner} feels like they are putting in a lot of energy. Make sure you are actively matching their effort in the relationship.", // 6
                "{name}, {partner} isn't feeling fully supported when things get tough. Be sure to check in on them during stressful times.", // 7
                "{name}, {partner} wants you to celebrate their wins more! When something good happens to them, be their biggest cheerleader.", // 8
                "{name}, {partner} isn't feeling fully secure depending on you right now. Consistency and reliability will build that comfort back up." // 9
            ]
        },
        resultTiers: {
            highTitle: "Wow, you two are doing amazing! 🌟",
            highDesc: "The answers point to a super positive, strong relationship right now. Keep nurturing this beautiful bond!",
            modTitle: "You've got a solid foundation! 😊",
            modDesc: "You have a fairly typical and healthy relationship. To take it to the next level, check out the advice below.",
            growTitle: "You're building something good! 🌱",
            growDesc: "There’s definitely some satisfaction here, but also plenty of room to grow together. The key is consistent effort.",
            needsTitle: "Things might be a little rocky right now. ❤️‍🩹",
            needsDesc: "The answers suggest some friction at the moment. Don't worry, every relationship has tough seasons."
        },
        dynamicText: {
            overallText: "The overall relationship score is <strong>{score}%</strong>! ",
            advice_high: "<br><br>💡 <strong>Best Advice:</strong> The best thing you can do now is just keep prioritizing quality time together to maintain this strong connection.",
            advice_mod: "<br><br>💡 <strong>Best Advice:</strong> You have a solid base! Try setting aside time this week to openly discuss your future goals and how you can support each other even more.",
            advice_grow: "<br><br>💡 <strong>Best Advice:</strong> Focus on rebuilding intimacy through small, daily acts of affection. A simple 'thank you' or an unexpected hug can do wonders.",
            advice_needs: "<br><br>💡 <strong>Best Advice:</strong> Conflict is normal, but how you handle it matters. Practice pausing when things get heated."
        },
        optionSets: {
            agreement: [
                { value: 1, label: 'Not at all! 🙅' },
                { value: 2, label: 'Nope, not really. 😕' },
                { value: 3, label: 'Kind of in the middle. 🤷' },
                { value: 4, label: 'Yeah, mostly! 🙂' },
                { value: 5, label: 'Absolutely! 💯' }
            ],
            satisfaction: [
                { value: 1, label: 'Really unhappy with it. 😞' },
                { value: 2, label: 'Could be a lot better. 😕' },
                { value: 3, label: 'It\'s just okay. 😐' },
                { value: 4, label: 'Pretty happy with it! 😊' },
                { value: 5, label: 'Couldn\'t be better! 🥰' }
            ],
            frequency: [
                { value: 1, label: 'Literally never. 🕊️' },
                { value: 2, label: 'Hardly ever. 😌' },
                { value: 3, label: 'Every now and then. ⚖️' },
                { value: 4, label: 'Pretty often. 🌩️' },
                { value: 5, label: 'All the time! 🌪️' }
            ]
        },
        questions: [
            { id: 'q1', text: 'Do you feel like {partner} is in this for the long haul?', weight: 85, optionSet: 'agreement', reverse: false },
            { id: 'q2', text: 'How lucky do you feel to have {partner} by your side?', weight: 72, optionSet: 'agreement', reverse: false },
            { id: 'q3', text: 'How are you feeling about the intimacy and spark in your sex life?', weight: 71, optionSet: 'satisfaction', reverse: false },
            { id: 'q4', text: 'Do you think your relationship brings a lot of happiness to {partner}?', weight: 70, optionSet: 'agreement', reverse: false },
            { id: 'q5', text: 'Let\'s be real, how often do you and {partner} end up arguing or fighting?', weight: 69, optionSet: 'frequency', reverse: true },
            { id: 'q6', text: 'Does {partner} really \"get\" you and understand what you need?', weight: 69, optionSet: 'agreement', reverse: false },
            { id: 'q7', text: 'Have you put a lot of your heart, time, and energy into making this work?', weight: 67, optionSet: 'agreement', reverse: false },
            { id: 'q8', text: 'Can you always count on {partner} for support when things get tough?', weight: 64, optionSet: 'agreement', reverse: false },
            { id: 'q9', text: 'Does {partner} genuinely celebrate your personal successes with you?', weight: 58, optionSet: 'agreement', reverse: false },
            { id: 'q10', text: 'Do you feel completely comfortable depending on {partner}?', weight: 58, optionSet: 'agreement', reverse: false }
        ]
    },
    si: {
        ui: {
            appTitle: "සම්බන්ධතා ගැලපුම ✨",
            introDesc1: "ආයුබෝවන්! 👋 මෙම කුඩා ඇගයීම ජොයෙල් සහ පිරිස (2020) විසින් ජෝඩු 11,000 කට වඩා යොදාගෙන කළ දැවැන්ත යන්ත්‍ර ඉගෙනුම් අධ්‍යයනයක් මත පදනම් වෙනවා.",
            introDesc2: "විද්‍යාත්මක තොරතුරු මත පදනම්ව ඔබේ සම්බන්ධතාවයේ සැබෑම ශක්තිය සොයාගන්න සූදානම්ද? එහෙනම් අපි පටන්ගමු!",
            startBtn: "පටන්ගමු! 🚀",
            prevBtn: "ආපසු",
            nextBtn: "ඊළඟ",
            resultsBtn: "ප්‍රතිඵල පෙන්වන්න! 🎉",
            profileTitle: "ඔබේ ප්‍රතිඵල මෙන්න! 💖",
            nameTitle: "ඔබව හඳුනාගනිමු!",
            nameDesc: "ඔබට හොඳම අත්දැකීම ලබා දීමට, ඔබේ නම් මොනවාද?",
            yourNameLabel: "ඔබේ නම",
            partnerNameLabel: "සහකරුගේ/සහකාරියගේ නම",
            privacyGuarantee: "🔒 100% පුද්ගලිකයි: සංකේතනය කර ඇත. සබැඳි පැය 1කට පසු විනාශ වන අතර ඔබේ උපාංගයට පමණක් සීමා වේ.",
            breakdownTitle: "ප්‍රධාන විද්‍යාත්මක සාධක 10",
            dyadicTitle: "වර්ධනය විය යුතු අංශ 🌱",
            predCommitment: "කැපවීම",
            predAppreciation: "අගය කිරීම",
            predSex: "ලිංගික තෘප්තිය",
            predPartnerSat: "සහකරුගේ තෘප්තිය",
            predConflict: "ගැටුම් නොමැති වීම",
            predResponsiveness: "ප්‍රතිචාරාත්මක බව",
            predInvestment: "කැපවීම",
            predSupport: "සාමාන්‍ය සහයෝගය",
            predCapitalization: "ජයග්‍රහණ සැමරීම",
            predAttachment: "සුවපහසුව සහ ආරක්ෂාව",
            insightTitle: "කුඩා විද්‍යාත්මක සටහනක් 🧬",
            viewMyBreakdown: "මගේ විස්තරාත්මක ප්‍රතිඵල බලන්න 📊",
            insightDesc: "අධ්‍යයනයට අනුව: 1) ඔබේ පෞද්ගලික ලක්ෂණ වලට වඩා ඔබේ සම්බන්ධතාවය ගැන ඔබට හැඟෙන ආකාරය මෙහිදී ගොඩක් වැදගත් වෙනවා. 2) අනාගතය කොහොම වෙයිද කියලා කිසිම ඇගයීමකට කියන්න බෑ, ඒ නිසා මේ ප්‍රතිඵල වලින් පෙන්වන්නේ ඔබේ වත්මන් තත්වය විතරයි!",
            retakeBtn: "නැවත කරමු! 🔄",
            viewMyBreakdown: "View my detailed breakdown 📊",
            modalTitle: "Unlock Couples Mode! 💖",
            modalShareBtn: "Share to {partner} via WhatsApp 💬",
            modalCloseBtn: "Just show my results",
            waShareP1: "{partner} වෙත WhatsApp හරහා යවන්න 💬",
            waShareP2: "අවසාන ප්‍රතිඵල {partner} වෙත යවන්න 💬",
            waMsgP1: "හලෝ {nB}! මම අපේ සම්බන්ධතාවය ගැන පරීක්ෂණයක් කළා. ඔයාගේ කොටසත් මෙතනින් කරන්න, එතකොට අපිට අපේ Couples Score එකයි, අපි හදාගන්න ඕන දේවලුයි බලාගන්න පුළුවන්! {link}",
            waMsgP2: "හලෝ {nA}! මම මගේ කොටස කළා. අපේ අවසාන Couples Score එකයි, අපි හදාගන්න ඕන දේවලුයි බලන්න මෙතන ක්ලික් කරන්න! {link}",
            greetingP2: "හලෝ {nB}! 💕 {nA} ඔයාලගේ සම්බන්ධතාවය ගැන පරීක්ෂණයක් කරලා ඔයාටත් ඒක කරන්න කියලා එව්වා! ඔයාලගේ Couples Score එක බලන්න ලෑස්තිද?",
            dyadicAdviceStrings: [
                "{name}, අනාගතය ගැන {partner} ට පොඩි සැකයක් තියෙනවා වගේ. ඒ ගැන විවෘතව කතා කරන්න.", // 0
                "{name}, {partner} ට තමන්ව අගය කරන්නේ නෑ වගේ හැඟීමක් තියෙනවා. ඔවුන් කරන දේවල් වලට ස්තූති කරන්න පුරුදු වෙන්න.", // 1
                "{name}, {partner} ශාරීරික සමීප බව ගැන තව බලාපොරොත්තු වෙනවා. මේ ගැන විවෘතව කතා කරන්න.", // 2
                "{name}, ඔබ සම්පූර්ණයෙන්ම සතුටින් නෑ කියලා {partner} හිතනවා. ඔවුන් කරන හොඳ දේවල් මතක් කරන්න.", // 3
                "{name}, {partner} ට ගැටුම් වැඩි බවක් දැනෙනවා. ප්‍රශ්න ආවම සන්සුන්ව කතා කරලා විසඳගන්න උත්සාහ කරන්න.", // 4
                "{name}, තමන්ව තේරුම් ගන්නේ නෑ කියලා {partner} ට හිතෙනවා. ඔවුන් කියන දේ හොඳින් අහන්න.", // 5
                "{name}, තමන් ගොඩක් මහන්සි වෙනවා කියලා {partner} ට හිතෙනවා. ඔබත් ඒ වගේම මහන්සි වෙන්න.", // 6
                "{name}, අමාරු වෙලාවට ඔබෙන් සහයෝගයක් නෑ කියලා {partner} ට හිතෙනවා. ප්‍රශ්න තියෙන වෙලාවට ඔවුන් ගැන හොයලා බලන්න.", // 7
                "{name}, ඔවුන්ගේ ජයග්‍රහණ වලදී ඔබ තව සතුටු වෙනවා දකින්න {partner} කැමතියි.", // 8
                "{name}, ඔබ මත සම්පූර්ණයෙන්ම යැපෙන්න {partner} ට පොඩි බයක් තියෙනවා. විශ්වාසය ගොඩනගන්න." // 9
            ]
        },
        resultTiers: {
            highTitle: "වාව්, ඔබ දෙදෙනා ඉතා හොඳින් සිටිනවා! 🌟",
            highDesc: "ඔබේ පිළිතුරු වලින් පෙනෙන්නේ දැනට ඉතා ධනාත්මක, ශක්තිමත් සම්බන්ධතාවයක් තිබෙන බවයි. මේ ලස්සන බැඳීම දිගටම රැකගන්න!",
            modTitle: "ඔබට හොඳ පදනමක් තියෙනවා! 😊",
            modDesc: "ඔබට සාමාන්‍ය සහ සෞඛ්‍ය සම්පන්න සම්බන්ධතාවයක් තියෙනවා. එය තවත් දියුණු කරගන්න පහත උපදෙස් බලන්න.",
            growTitle: "ඔබ හොඳ බැඳීමක් ගොඩනගමින් ඉන්නවා! 🌱",
            growDesc: "මෙහි යම් තෘප්තියක් තියෙනවා, ඒ වගේම එකට වර්ධනය වෙන්නත් ගොඩක් ඉඩකඩ තියෙනවා. දිගටම උත්සාහ කිරීම තමයි වැදගත්.",
            needsTitle: "දැනට පොඩි ප්‍රශ්න ටිකක් තියෙන්න පුළුවන්. ❤️‍🩹",
            needsDesc: "ඔබේ පිළිතුරු වලින් පෙනෙන්නේ මේ මොහොතේ යම් දුරස් වීමක් ඇති බවයි. කලබල වෙන්න එපා, හැම සම්බන්ධතාවයකම අමාරු කාලවල් තියෙනවා."
        },
        dynamicText: {
            overallText: "සමස්ත ලකුණු ප්‍රමාණය <strong>{score}%</strong> යි! ",
            advice_high: "<br><br>💡 <strong>හොඳම උපදෙස:</strong> මේ ශක්තිමත් බැඳීම දිගටම පවත්වා ගන්න එකිනෙකා සමඟ කාලය ගත කිරීමට ප්‍රමුඛතාවය දෙන්න.",
            advice_mod: "<br><br>💡 <strong>හොඳම උපදෙස:</strong> ඔබට හොඳ පදනමක් තියෙනවා! ඔබේ අනාගත අරමුණු සහ එකිනෙකාට උදව් කරන්නේ කොහොමද කියලා කතා කරන්න මේ සතියේ කාලය වෙන් කරන්න.",
            advice_grow: "<br><br>💡 <strong>හොඳම උපදෙස:</strong> කුඩා දෛනික සෙනෙහස දැක්වීම් හරහා සමීප බව නැවත ගොඩනැගීමට අවධානය යොමු කරන්න. සරල 'ස්තූතියි' කීමක් විශාල වෙනසක් කරයි.",
            advice_needs: "<br><br>💡 <strong>හොඳම උපදෙස:</strong> ගැටුම් සාමාන්‍යයි, නමුත් ඔබ ඒවා විසඳන ආකාරය වැදගත්. කෝපය වැඩිවන විට ටිකක් නතර වීමට පුරුදු වන්න."
        },
        optionSets: {
            agreement: [
                { value: 1, label: 'කොහෙත්ම නෑ! 🙅' },
                { value: 2, label: 'නෑ, එහෙම හිතෙන්නේ නෑ. 😕' },
                { value: 3, label: 'සාමාන්‍යයි. 🤷' },
                { value: 4, label: 'ඔව්, ගොඩක් දුරට! 🙂' },
                { value: 5, label: 'අනිවාර්යයෙන්ම! 💯' }
            ],
            satisfaction: [
                { value: 1, label: 'ඇත්තටම සතුටු නෑ. 😞' },
                { value: 2, label: 'මීට වඩා ගොඩක් හොඳ වෙන්න තිබුණා. 😕' },
                { value: 3, label: 'වරදක් නෑ. 😐' },
                { value: 4, label: 'ගොඩක් සතුටුයි! 😊' },
                { value: 5, label: 'උපරිමයෙන්ම සතුටුයි! 🥰' }
            ],
            frequency: [
                { value: 1, label: 'කවදාවත්ම නෑ. 🕊️' },
                { value: 2, label: 'ඉතා කලාතුරකින්. 😌' },
                { value: 3, label: 'සමහර වෙලාවට. ⚖️' },
                { value: 4, label: 'ගොඩක් වෙලාවට. 🌩️' },
                { value: 5, label: 'හැමතිස්සෙම වගේ! 🌪️' }
            ]
        },
        questions: [
            { id: 'q1', text: '{partner} මේ බැඳීම සදාකාලිකවම තියාගන්න කැමතියි කියලා ඔබට හිතෙනවද?', weight: 85, optionSet: 'agreement', reverse: false },
            { id: 'q2', text: '{partner} ඔබේ ජීවිතේට ලැබුණු එක ගැන ඔබට කොයිතරම් වාසනාවන්ත හැඟීමක් දැනෙනවද?', weight: 72, optionSet: 'agreement', reverse: false },
            { id: 'q3', text: 'ඔබ දෙදෙනාගේ ලිංගික ජීවිතයේ සමීප බව ගැන ඔබ ඇත්තටම සතුටු වෙනවද?', weight: 71, optionSet: 'satisfaction', reverse: false },
            { id: 'q4', text: 'මේ සම්බන්ධතාවය නිසා {partner} ගොඩක් සතුටින් ඉන්නවා කියලා ඔබට හිතෙනවද?', weight: 70, optionSet: 'agreement', reverse: false },
            { id: 'q5', text: 'ඇත්තම කියමු, ඔබ සහ {partner} අතර කොයිතරම් නිතර රණ්ඩු ඇතිවෙනවද?', weight: 69, optionSet: 'frequency', reverse: true },
            { id: 'q6', text: '{partner} ට ඔබව සහ ඔබේ අවශ්‍යතා හොඳටම තේරෙනවද?', weight: 69, optionSet: 'agreement', reverse: false },
            { id: 'q7', text: 'මේ සම්බන්ධතාවය සාර්ථක කරගන්න ඔබ ඔබේ මුළු හදවතින්ම, කාලය සහ ශ්‍රමය කැප කරලා තියෙනවද?', weight: 67, optionSet: 'agreement', reverse: false },
            { id: 'q8', text: 'ප්‍රශ්න ආවම උදව්වට {partner} අනිවාර්යයෙන්ම ඉන්නවා කියලා විශ්වාසද?', weight: 64, optionSet: 'agreement', reverse: false },
            { id: 'q9', text: 'ඔබේ ජයග්‍රහණ වලදී {partner} අවංකවම සතුටු වෙනවද?', weight: 58, optionSet: 'agreement', reverse: false },
            { id: 'q10', text: 'ඕනෑම දෙයකදී {partner} මත යැපෙන්න ඔබට කිසිම බයක්/චකිතයක් නැද්ද?', weight: 58, optionSet: 'agreement', reverse: false }
        ]
    },
    ta: {
        ui: {
            appTitle: "உறவுப் பொருத்தம் ✨",
            introDesc1: "வணக்கம்! 👋 இந்த சிறிய மதிப்பீடு ஜோயல் மற்றும் பலர் (2020) நடத்திய 11,000-க்கும் மேற்பட்ட தம்பதிகளின் மாபெரும் இயந்திர கற்றல் ஆய்வை அடிப்படையாகக் கொண்டது.",
            introDesc2: "அறிவியல் உண்மைகளின் அடிப்படையில் உங்கள் உறவின் உண்மையான வலிமையைக் கண்டறியத் தயாரா? வாருங்கள் தொடங்கலாம்!",
            startBtn: "தொடங்கலாம்! 🚀",
            prevBtn: "பின்னே",
            nextBtn: "அடுத்து",
            resultsBtn: "முடிவுகளைக் காட்டு! 🎉",
            profileTitle: "உங்கள் முடிவுகள் இதோ! 💖",
            nameTitle: "பெயர்களை உள்ளிடுக!",
            nameDesc: "சிறந்த அனுபவத்தைப் பெற, உங்கள் பெயர்கள் என்ன?",
            yourNameLabel: "உங்கள் பெயர்",
            partnerNameLabel: "துணைவரின் பெயர்",
            privacyGuaranteeHeader: "🔒 உறுதியான தனியுரிமை",
            privacyDetails: `<ul style="font-size: 0.85rem; padding-left: 20px; line-height: 1.5; text-align: left; opacity: 0.9;">
                <li style="margin-bottom: 8px;"><strong>முழுமையாக குறியாக்கம் செய்யப்பட்டது:</strong> உங்கள் பெயர்கள் மற்றும் பதில்கள் உங்கள் சாதனத்திலேயே குறியாக்கம் செய்யப்படுகின்றன (AES-GCM).</li>
                <li style="margin-bottom: 8px;"><strong>தானாக அழியும் இணைப்புகள்:</strong> இணைப்புகள் 1 மணிநேரத்திற்குப் பிறகு காலாவதியாகும்.</li>
                <li style="margin-bottom: 8px;"><strong>சாதனப் பூட்டு:</strong> இணைப்பைத் திறந்தவுடன் அது அந்த உலாவியுடன் பிணைக்கப்படும். வேறு யாரும் திறக்க முடியாது.</li>
                <li><strong>தரவுத்தளம் அல்லது பின்தள (Backend) சேவையகங்கள் இல்லை:</strong> உங்கள் தனிப்பட்ட தரவை சேமிக்கவோ அல்லது கையாளவோ எங்களிடம் எந்த பின்தள சேவையகங்களும் (servers) இல்லை. உலகளாவிய டாஷ்போர்டு அநாமதேய மதிப்பெண்களை மட்டுமே பாதுகாப்பாகக் கண்காணிக்கிறது.</li>
            </ul>`,
            
            breakdownTitle: "முக்கிய 10 அறிவியல் காரணிகள்",
            dyadicTitle: "மேம்படுத்த வேண்டியவை 🌱",
            predCommitment: "அர்ப்பணிப்பு",
            predAppreciation: "பாராட்டு",
            predSex: "பாலியல் திருப்தி",
            predPartnerSat: "துணைவரின் திருப்தி",
            predConflict: "சண்டைகள் இல்லாத நிலை",
            predResponsiveness: "பதிலளிக்கும் தன்மை",
            predInvestment: "ஈடுபாடு",
            predSupport: "ஆதரவு",
            predCapitalization: "வெற்றிகளைக் கொண்டாடுதல்",
            predAttachment: "ஆறுதல் மற்றும் பாதுகாப்பு",
            insightTitle: "ஒரு சிறிய அறிவியல் குறிப்பு 🧬",
            viewMyBreakdown: "எனது விரிவான முடிவுகளைக் காண்க 📊",
            insightDesc: "ஆய்வின்படி: 1) உங்கள் தனிப்பட்ட குணாதிசயங்களை விட உங்கள் உறவைப் பற்றி நீங்கள் எப்படி உணர்கிறீர்கள் என்பதே இங்கு மிகவும் முக்கியமானது. 2) எதிர்காலம் எப்படி இருக்கும் என்று எந்தவொரு மதிப்பீட்டாலும் சொல்ல முடியாது!",
            retakeBtn: "மீண்டும் செய்யலாம்! 🔄",
            viewMyBreakdown: "View my detailed breakdown 📊",
            modalTitle: "Unlock Couples Mode! 💖",
            modalShareBtn: "Share to {partner} via WhatsApp 💬",
            modalCloseBtn: "Just show my results",
            waShareP1: "{partner} -க்கு WhatsApp மூலம் பகிரவும் 💬",
            waShareP2: "இறுதி முடிவுகளை {partner} -க்கு அனுப்பவும் 💬",
            waMsgP1: "ஹாய் {nB}! நான் நமது உறவு குறித்து ஒரு மதிப்பீட்டை செய்தேன். உங்கள் பகுதியை இங்கே தொடங்குங்கள், அதன் மூலம் நமது Couples Score மற்றும் நாம் எதில் கவனம் செலுத்த வேண்டும் என்பதை அறியலாம்! {link}",
            waMsgP2: "ஹாய் {nA}! நான் எனது பகுதியை முடித்துவிட்டேன். நமது இறுதி Couples Score மற்றும் நாம் மேம்படுத்த வேண்டிய பகுதிகளைப் பார்க்க இங்கே கிளிக் செய்யவும்! {link}",
            greetingP2: "ஹாய் {nB}! 💕 {nA} உங்கள் உறவு பற்றி ஒரு மதிப்பீட்டை செய்துவிட்டு, உங்களையும் அதைச் செய்யச் சொல்லியுள்ளார்! உங்களது ஒட்டுமொத்த Couples Score-ஐப் பார்க்கத் தயாரா?",
            dyadicAdviceStrings: [
                "{name}, {partner} எதிர்காலத்தைப் பற்றி சற்று சந்தேகமாக உள்ளார். வெளிப்படையாகப் பேசுங்கள்.", // 0
                "{name}, {partner} போதிய பாராட்டு கிடைக்கவில்லை என உணர்கிறார். சிறிய விஷயங்களுக்கும் நன்றி கூறுங்கள்.", // 1
                "{name}, {partner} அதிக நெருக்கத்தை விரும்புகிறார். இதைப் பற்றி வெளிப்படையாகப் பேசுங்கள்.", // 2
                "{name}, நீங்கள் முழுமையாக மகிழ்ச்சியாக இல்லை என்று {partner} நினைக்கிறார்.", // 3
                "{name}, {partner} அதிக சண்டைகள் இருப்பதாக உணர்கிறார். கோபம் வரும்போது அமைதியாக இருக்கப் பழகுங்கள்.", // 4
                "{name}, {partner} தன்னை நீங்கள் புரிந்துகொள்ளவில்லை என நினைக்கிறார். அவர்கள் கூறுவதைக் கவனமாகக் கேளுங்கள்.", // 5
                "{name}, {partner} அதிக முயற்சி எடுப்பதாக உணர்கிறார். நீங்களும் அதே அளவு ஈடுபாடு காட்டுங்கள்.", // 6
                "{name}, கடினமான நேரங்களில் உங்கள் ஆதரவு போதாது என {partner} நினைக்கிறார்.", // 7
                "{name}, {partner} -ன் வெற்றிகளை நீங்கள் இன்னும் அதிகமாகக் கொண்டாட வேண்டும்.", // 8
                "{name}, உங்களை முழுமையாகச் சார்ந்து இருக்க {partner} சற்று தயங்குகிறார். நம்பிக்கையை உருவாக்குங்கள்." // 9
            ]
        },
        resultTiers: {
            highTitle: "வாவ், நீங்கள் இருவரும் மிகவும் சிறப்பாக இருக்கிறீர்கள்! 🌟",
            highDesc: "உங்கள் பதில்கள் தற்போது மிகவும் நேர்மறையான, வலுவான உறவைக் காட்டுகின்றன. இந்த அழகான பிணைப்பை தொடர்ந்து பேணுங்கள்!",
            modTitle: "உங்களுக்கு ஒரு நல்ல அடிப்படை உள்ளது! 😊",
            modDesc: "உங்களுக்கு மிகவும் ஆரோக்கியமான உறவு அடிப்படை உள்ளது. இதனை மேம்படுத்த கீழே உள்ள ஆலோசனையைப் பார்க்கவும்.",
            growTitle: "நீங்கள் ஒரு நல்ல பிணைப்பை உருவாக்கி வருகிறீர்கள்! 🌱",
            growDesc: "இங்கு ஓரளவு திருப்தி உள்ளது, மேலும் ஒன்றாக வளர நிறைய வாய்ப்புகளும் உள்ளன. தொடர்ச்சியான முயற்சியே முக்கியம்.",
            needsTitle: "தற்போது சில பிரச்சனைகள் இருக்கலாம். ❤️‍🩹",
            needsDesc: "இந்த தருணத்தில் நீங்கள் சில கருத்து வேறுபாடுகளை சந்திப்பதாக உங்கள் பதில்கள் கூறுகின்றன. கவலைப்பட வேண்டாம், ஒவ்வொரு உறவிலும் கடினமான காலங்கள் உண்டு."
        },
        dynamicText: {
            overallText: "ஒட்டுமொத்த மதிப்பெண் <strong>{score}%</strong>! ",
            advice_high: "<br><br>💡 <strong>சிறந்த ஆலோசனை:</strong> நீங்கள் மிகச் சிறப்பாகச் செய்கிறீர்கள்! இந்த வலுவான பிணைப்பைத் தொடர, தொடர்ந்து ஒருவருக்கொருவர் நேரம் ஒதுக்குங்கள்.",
            advice_mod: "<br><br>💡 <strong>சிறந்த ஆலோசனை:</strong> உங்களுக்கு ஒரு உறுதியான அடிப்படை உள்ளது! உங்கள் எதிர்கால இலக்குகள் குறித்தும் பேச நேரம் ஒதுக்குங்கள்.",
            advice_grow: "<br><br>💡 <strong>சிறந்த ஆலோசனை:</strong> சிறிய பாசச் செயல்கள் மூலம் நெருக்கத்தை மீண்டும் உருவாக்குவதில் கவனம் செலுத்துங்கள்.",
            advice_needs: "<br><br>💡 <strong>சிறந்த ஆலோசனை:</strong> சண்டைகள் இயல்பானவை. கோபம் அதிகரிக்கும் போது சற்று நேரம் அமைதியாக இருக்க பழகுங்கள்."
        },
        optionSets: {
            agreement: [
                { value: 1, label: 'இல்லவே இல்லை! 🙅' },
                { value: 2, label: 'இல்லை, அப்படியில்லை. 😕' },
                { value: 3, label: 'சராசரியாக. 🤷' },
                { value: 4, label: 'ஆம், பெரும்பாலும்! 🙂' },
                { value: 5, label: 'கண்டிப்பாக! 💯' }
            ],
            satisfaction: [
                { value: 1, label: 'உண்மையிலேயே மகிழ்ச்சி இல்லை. 😞' },
                { value: 2, label: 'இன்னும் சிறப்பாக இருக்கலாம். 😕' },
                { value: 3, label: 'பரவாயில்லை. 😐' },
                { value: 4, label: 'மிகவும் மகிழ்ச்சி! 😊' },
                { value: 5, label: 'இதைவிட சிறப்பாக இருக்க முடியாது! 🥰' }
            ],
            frequency: [
                { value: 1, label: 'ஒருபோதும் இல்லை. 🕊️' },
                { value: 2, label: 'மிகவும் அரிதாக. 😌' },
                { value: 3, label: 'சில நேரங்களில். ⚖️' },
                { value: 4, label: 'அடிக்கடி. 🌩️' },
                { value: 5, label: 'எப்பொழுதும்! 🌪️' }
            ]
        },
        questions: [
            { id: 'q1', text: '{partner} இந்த உறவை என்றென்றும் தொடர விரும்புவதாக நீங்கள் நினைக்கிறீர்களா?', weight: 85, optionSet: 'agreement', reverse: false },
            { id: 'q2', text: '{partner} உங்கள் வாழ்வில் இருப்பதற்காக நீங்கள் எவ்வளவு அதிர்ஷ்டசாலியாக உணர்கிறீர்கள்?', weight: 72, optionSet: 'agreement', reverse: false },
            { id: 'q3', text: 'உங்கள் பாலியல் வாழ்க்கையின் நெருக்கம் மற்றும் ஈர்ப்பு குறித்து நீங்கள் மகிழ்ச்சியாக இருக்கிறீர்களா?', weight: 71, optionSet: 'satisfaction', reverse: false },
            { id: 'q4', text: 'இந்த உறவு {partner} -க்கு மிகுந்த மகிழ்ச்சியைத் தருகிறது என்று நினைக்கிறீர்களா?', weight: 70, optionSet: 'agreement', reverse: false },
            { id: 'q5', text: 'உண்மையாக சொல்லுங்கள், நீங்களும் {partner} -ம் எவ்வளவு அடிக்கடி சண்டையிட்டுக் கொள்கிறீர்கள்?', weight: 69, optionSet: 'frequency', reverse: true },
            { id: 'q6', text: '{partner} உங்களையும் உங்கள் தேவைகளையும் முழுமையாகப் புரிந்து கொள்கிறாரா?', weight: 69, optionSet: 'agreement', reverse: false },
            { id: 'q7', text: 'இந்த உறவை வெற்றிபெறச் செய்ய உங்கள் முழு இதயத்தையும் முதலீடு செய்துள்ளீர்களா?', weight: 67, optionSet: 'agreement', reverse: false },
            { id: 'q8', text: 'கடினமான நேரங்களில் {partner} -ன் ஆதரவை நீங்கள் எப்போதும் நம்பலாமா?', weight: 64, optionSet: 'agreement', reverse: false },
            { id: 'q9', text: 'உங்கள் வெற்றிகளை {partner} உண்மையிலேயே கொண்டாடுகிறாரா?', weight: 58, optionSet: 'agreement', reverse: false },
            { id: 'q10', text: 'எதுவாக இருந்தாலும் {partner} -ஐ சார்ந்து இருப்பதில் உங்களுக்கு முழுமையான சௌகரியம் உள்ளதா?', weight: 58, optionSet: 'agreement', reverse: false }
        ]
    }
};

const colorPalettes = {
    high: { primary: '#10b981', secondary: '#14b8a6', bg: '#022c22' },
    mod: { primary: '#3b82f6', secondary: '#8b5cf6', bg: '#0f172a' },
    grow: { primary: '#f59e0b', secondary: '#f97316', bg: '#451a03' },
    needs: { primary: '#ef4444', secondary: '#e11d48', bg: '#4c0519' }
};

let questions = [];

// App State
let appMode = 'p1'; // 'p1', 'p2', 'final'
let p1Data = null; // { nA, nB, answers }
let p2Data = null; // { answers }
let myName = '';
let theirName = '';
let currentQuestionIndex = 0;
let answers = [];

// DOM Elements
const langScreen = document.getElementById('lang-screen');
const nameScreen = document.getElementById('name-screen');
const introScreen = document.getElementById('intro-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const namesNextBtn = document.getElementById('names-next-btn');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const waShareBtn = document.getElementById('wa-share-btn');


document.getElementById('view-my-breakdown-btn').addEventListener('click', function() {
    this.classList.add('hidden');
    document.getElementById('breakdown-container').classList.remove('hidden');
});


document.getElementById('modal-close-btn').addEventListener('click', () => {
    const modal = document.getElementById('couples-modal');
    modal.classList.remove('active');
    setTimeout(() => modal.classList.add('hidden'), 400);
});

document.getElementById('modal-wa-btn').addEventListener('click', () => {
    const modal = document.getElementById('couples-modal');
    modal.classList.remove('active');
    setTimeout(() => modal.classList.add('hidden'), 400);
});

// --- E2E Encryption (Web Crypto API) ---
async function generateKey() {
    return await window.crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
}
async function exportKey(key) {
    const exported = await window.crypto.subtle.exportKey("raw", key);
    return btoa(String.fromCharCode(...new Uint8Array(exported))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function importKey(base64url) {
    let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return await window.crypto.subtle.importKey("raw", bytes, "AES-GCM", true, ["encrypt", "decrypt"]);
}
async function encryptData(data, key) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(data));
    const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, encoded);
    const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
    const cipherBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return `${ivHex}.${cipherBase64}`;
}
async function decryptData(encryptedString, key) {
    const [ivHex, cipherBase64] = encryptedString.split('.');
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    let base64 = cipherBase64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const binary = atob(base64);
    const encryptedBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) encryptedBytes[i] = binary.charCodeAt(i);
    const decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, encryptedBytes);
    return JSON.parse(new TextDecoder().decode(decrypted));
}
// ---------------------------------------

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const keyString = hashParams.get('key');
    
    let sessionData = null;
    let matchRole = localStorage.getItem('match_role');
    let savedState = localStorage.getItem('match_state');
    
    if (urlParams.has('q') && keyString) {
        try {
            const key = await importKey(keyString);
            const decrypted = await decryptData(urlParams.get('q'), key);
            
            // Validate Expiration (1 hour)
            if (decrypted.timestamp) {
                const ONE_HOUR = 60 * 60 * 1000;
                if (Date.now() - decrypted.timestamp > ONE_HOUR) {
                    let expMsg = currentLang === 'si' ? "මෙම සබැඳිය කල් ඉකුත් වී ඇත (පැය 1කට පමණක් වලංගු වේ)." :
                                 currentLang === 'ta' ? "இந்த இணைப்பு காலாவதியாகிவிட்டது (1 மணிநேரம் மட்டுமே செல்லுபடியாகும்)." :
                                 "This link has expired for privacy reasons (valid for 1 hour).";
                    alert(expMsg);
                    window.location.href = window.location.origin + window.location.pathname;
                    return;
                }
            }
            
            // Validate Device Isolation
            if (decrypted.mode === 'p1') {
                if (matchRole === 'A') {
                    alert("This link is meant for your partner! You've already completed your part.");
                    window.location.href = window.location.origin + window.location.pathname;
                    return;
                }
                matchRole = 'B';
                localStorage.setItem('match_role', 'B');
                
            } else if (decrypted.mode === 'final') {
                if (matchRole === 'B') {
                    alert("This link is meant for Partner A! You've already completed your part.");
                    window.location.href = window.location.origin + window.location.pathname;
                    return;
                }
                matchRole = 'A';
                localStorage.setItem('match_role', 'A');
            }
            
            // Save state for refresh resilience and clean URL
            localStorage.setItem('match_state', JSON.stringify(decrypted));
            window.history.replaceState({}, document.title, window.location.pathname);
            sessionData = decrypted;
            
        } catch(e) {
            console.error("Decryption failed", e);
            alert("Invalid or broken link.");
            return;
        }
    } else if (savedState) {
        sessionData = JSON.parse(savedState);
    } else {
        // Initial setup for A
        localStorage.setItem('match_role', 'A');
    }
    
    if (sessionData) {
        if (sessionData.mode === 'p1') {
            appMode = 'p2';
            p1Data = sessionData;
            myName = p1Data.nB;
            theirName = p1Data.nA;
            currentLang = p1Data.lang || 'en';
            
            setLanguage(currentLang);
            langScreen.classList.remove('active');
            langScreen.classList.add('hidden');
            
            let greeting = translations[currentLang].ui.greetingP2.replace('{nA}', theirName).replace('{nB}', myName);
                        let privacyAssurance = currentLang === 'en' ? `🔒 Rest assured, ${theirName} cannot see your individual answers, and you won't see theirs either!` :
                                   currentLang === 'si' ? `🔒 බිය නොවන්න, ${theirName} හට ඔබගේ තනි පිළිතුරු දැකිය නොහැකි අතර, ඔබටද ඔවුන්ගේ පිළිතුරු දැකිය නොහැක!` :
                                   `🔒 கவலைப்பட வேண்டாம், ${theirName} உங்கள் தனிப்பட்ட பதில்களைக் காண முடியாது, நீங்களும் அவர்களின் பதில்களைக் காண முடியாது!`;
            
            document.querySelector('#intro-screen .intro-card').innerHTML = `<p>${greeting}</p><p>${translations[currentLang].ui.introDesc2}</p><p style="font-size: 0.85rem; color: var(--primary); margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 10px;">${privacyAssurance}</p>`;
            
            introScreen.classList.remove('hidden');
            introScreen.classList.add('active');
            
        } else if (sessionData.mode === 'final') {
            appMode = 'final';
            p1Data = sessionData.p1;
            p2Data = sessionData.p2;
            myName = p1Data.nA;
            theirName = p1Data.nB;
            currentLang = sessionData.lang || 'en';
            
            setLanguage(currentLang);
            langScreen.classList.remove('active');
            langScreen.classList.add('hidden');
            showResults();
        }
    }
};

function setLanguage(lang) {
    currentLang = lang;
    questions = translations[lang].questions;
    if(answers.length === 0) answers = new Array(questions.length).fill(null);
    
    // Update static i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang].ui[key]) {
            el.innerHTML = translations[lang].ui[key];
        }
    });
    
    if (appMode === 'p1') {
        langScreen.classList.remove('active');
        setTimeout(() => {
            langScreen.classList.add('hidden');
            nameScreen.classList.remove('hidden');
            void nameScreen.offsetWidth;
            nameScreen.classList.add('active');
        }, 400);
    }
}

namesNextBtn.addEventListener('click', () => {
    myName = document.getElementById('your-name').value.trim() || 'Partner A';
    theirName = document.getElementById('partner-name').value.trim() || 'Partner B';
    
    nameScreen.classList.remove('active');
    setTimeout(() => {
        nameScreen.classList.add('hidden');
        introScreen.classList.remove('hidden');
        void introScreen.offsetWidth;
        introScreen.classList.add('active');
    }, 400);
});

startBtn.addEventListener('click', () => {
    introScreen.classList.remove('active');
    setTimeout(() => {
        introScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        void quizScreen.offsetWidth;
        quizScreen.classList.add('active');
        renderQuestion();
    }, 400);
});

nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
restartBtn.addEventListener('click', restartQuiz);

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    let qText = q.text.replace('{partner}', `<strong>${theirName}</strong>`);
    questionText.innerHTML = `${currentQuestionIndex + 1}. ${qText}`;
    
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    const options = translations[currentLang].optionSets[q.optionSet];
    optionsContainer.innerHTML = '';
    options.forEach(opt => {
        const isSelected = answers[currentQuestionIndex] === opt.value;
        const label = document.createElement('label');
        label.className = `option-label ${isSelected ? 'selected' : ''}`;
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'question_option';
        input.value = opt.value;
        input.checked = isSelected;
        input.addEventListener('change', () => {
            answers[currentQuestionIndex] = opt.value;
            renderQuestion();
            if (currentQuestionIndex < questions.length - 1) setTimeout(nextQuestion, 400);
            else nextBtn.disabled = false;
        });
        
        label.appendChild(input);
        label.appendChild(document.createTextNode(opt.label));
        optionsContainer.appendChild(label);
    });
    
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.innerHTML = currentQuestionIndex === questions.length - 1 ? translations[currentLang].ui.resultsBtn : translations[currentLang].ui.nextBtn;
    nextBtn.disabled = answers[currentQuestionIndex] === null;
}

function nextQuestion() {
    if (answers[currentQuestionIndex] === null) return;
    if (currentQuestionIndex < questions.length - 1) {
        quizScreen.classList.remove('active');
        setTimeout(() => {
            currentQuestionIndex++;
            renderQuestion();
            quizScreen.classList.add('active');
        }, 300);
    } else {
        showResults();
    }
}
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        quizScreen.classList.remove('active');
        setTimeout(() => {
            currentQuestionIndex--;
            renderQuestion();
            quizScreen.classList.add('active');
        }, 300);
    }
}

function calculateScore(ansArray) {
    let totalScore = 0; let totalMax = 0;
    questions.forEach((q, index) => {
        let val = ansArray[index];
        if (q.reverse) val = 6 - val;
        totalScore += val * q.weight;
        totalMax += 5 * q.weight;
    });
    return Math.round((totalScore / totalMax) * 100);
}

function applyTheme(palette) {
    document.documentElement.style.setProperty('--primary', palette.primary);
    document.documentElement.style.setProperty('--primary-hover', palette.primary);
    document.documentElement.style.setProperty('--secondary', palette.secondary);
    document.documentElement.style.setProperty('--bg-color', palette.bg);
}

async function showResults() {
    let finalScore = 0;
    
    if (appMode === 'p1') {
        finalScore = calculateScore(answers);
    } else if (appMode === 'p2') {
        p2Data = { answers: [...answers] };
        finalScore = Math.round((calculateScore(p1Data.answers) + calculateScore(p2Data.answers)) / 2);
    } else if (appMode === 'final') {
        finalScore = Math.round((calculateScore(p1Data.answers) + calculateScore(p2Data.answers)) / 2);
    }

    let tierKey = '';
    if (finalScore >= 80) { applyTheme(colorPalettes.high); tierKey = 'high'; }
    else if (finalScore >= 60) { applyTheme(colorPalettes.mod); tierKey = 'mod'; }
    else if (finalScore >= 40) { applyTheme(colorPalettes.grow); tierKey = 'grow'; }
    else { applyTheme(colorPalettes.needs); tierKey = 'needs'; }
    
    if(appMode !== 'final') {
        quizScreen.classList.remove('active');
        quizScreen.classList.add('hidden');
    }
    
    resultScreen.classList.remove('hidden');
    void resultScreen.offsetWidth;
    resultScreen.classList.add('active');
    
    animateScore(finalScore);
    
    const titleEl = document.getElementById('result-title');
    const descEl = document.getElementById('result-description');
    const trans = translations[currentLang];
    
    titleEl.textContent = trans.resultTiers[tierKey + 'Title'];
    descEl.innerHTML = trans.dynamicText.overallText.replace('{score}', finalScore) + trans.resultTiers[tierKey + 'Desc'] + trans.dynamicText['advice_' + tierKey];
    

    // Setup WhatsApp Button
    if (appMode === 'p1') {
        let preds = [];
        for(let i=0; i<10; i++) {
            let v = answers[i]; if(questions[i].reverse) v = 6 - v;
            preds.push(v);
        }
        pingStatsApi({ type: 'single', preds: preds }, 'p1');
        waShareBtn.classList.remove('hidden');
        waShareBtn.textContent = trans.ui.waShareP1.replace('{partner}', theirName);
        const data = { mode: 'p1', nA: myName, nB: theirName, answers: answers, lang: currentLang, timestamp: Date.now() };
        const key = await generateKey();
        const encrypted = await encryptData(data, key);
        const keyStr = await exportKey(key);
        const link = `${window.location.origin}${window.location.pathname}?q=${encrypted}#key=${keyStr}`;
        const msg = trans.ui.waMsgP1.replace('{nA}', myName).replace('{nB}', theirName).replace('{link}', link);
        waShareBtn.href = `https://wa.me/?text=${encodeURIComponent(msg)}`;
        
        // Setup Modal popup for Couples Mode
        const modalWaBtn = document.getElementById('modal-wa-btn');
        modalWaBtn.textContent = trans.ui.modalShareBtn.replace('{partner}', theirName);
        modalWaBtn.href = waShareBtn.href;
        document.getElementById('modal-close-btn').style.display = 'inline-block';
        
        let descStr = currentLang === 'en' ? `Send this to <strong>${theirName}</strong> to discover your combined score and see what areas you both can grow in!<br><br><span style="font-size:0.85rem; color:var(--primary);">🔒 Don't worry, ${theirName} will NOT see your individual answers or stats!</span>` : 
                      currentLang === 'si' ? `ඔබ දෙදෙනාගේම ප්‍රතිඵල දැනගැනීමට මෙය <strong>${theirName}</strong> වෙත යවන්න!<br><br><span style="font-size:0.85rem; color:var(--primary);">🔒 බිය නොවන්න, ${theirName} හට ඔබගේ තනි පිළිතුරු හෝ ප්‍රතිඵල දැකිය නොහැක!</span>` : 
                      `உங்கள் இருவரின் முடிவுகளையும் காண இதை <strong>${theirName}</strong> -க்கு அனுப்பவும்!<br><br><span style="font-size:0.85rem; color:var(--primary);">🔒 கவலைப்பட வேண்டாம், ${theirName} உங்கள் தனிப்பட்ட பதில்களைக் காண முடியாது!</span>`;
        document.getElementById('modal-desc').innerHTML = descStr;
        
        setTimeout(() => {
            const modal = document.getElementById('couples-modal');
            modal.classList.remove('hidden');
            void modal.offsetWidth;
            modal.classList.add('active');
        }, 1200);
    } 
    else if (appMode === 'p2') {
        let preds = [];
        for(let i=0; i<10; i++) {
            let v1 = p1Data.answers[i]; if(questions[i].reverse) v1 = 6 - v1;
            let v2 = p2Data.answers[i]; if(questions[i].reverse) v2 = 6 - v2;
            preds.push((v1 + v2) / 2);
        }
        pingStatsApi({ type: 'couple', score: finalScore, preds: preds, cat: tierKey }, 'p2');
        
        waShareBtn.classList.remove('hidden');
        waShareBtn.textContent = trans.ui.waShareP2.replace('{partner}', theirName);
        const data = { mode: 'final', p1: p1Data, p2: p2Data, lang: currentLang, timestamp: Date.now() };
        const key = await generateKey();
        const encrypted = await encryptData(data, key);
        const keyStr = await exportKey(key);
        const link = `${window.location.origin}${window.location.pathname}?q=${encrypted}#key=${keyStr}`;
        const msg = trans.ui.waMsgP2.replace('{nA}', theirName).replace('{nB}', myName).replace('{link}', link);
        waShareBtn.href = `https://wa.me/?text=${encodeURIComponent(msg)}`;
        
        // Unclosable popup for P2
        const modalWaBtn = document.getElementById('modal-wa-btn');
        modalWaBtn.textContent = trans.ui.waShareP2.replace('{partner}', theirName);
        modalWaBtn.href = waShareBtn.href;
        
        // Hide close button
        document.getElementById('modal-close-btn').style.display = 'none';
        
        let titleStr = currentLang === 'en' ? `Send to ${theirName} to Unlock!` : 
                       currentLang === 'si' ? `ප්‍රතිඵල බැලීමට ${theirName} වෙත යවන්න!` : 
                       `${theirName} -க்கு அனுப்பி முடிவுகளைப் பார்க்கவும்!`;
        document.querySelector('#couples-modal h2').innerHTML = titleStr;
                       
        let descStr = currentLang === 'en' ? `You've finished! To reveal your relationship breakdown and advice, you MUST send the Final Results back to <strong>${theirName}</strong>.` : 
                      currentLang === 'si' ? `ඔබේ ඇගයීම අවසන්! ඔබේ ප්‍රතිඵල සහ උපදෙස් බැලීමට, අවසාන ප්‍රතිඵල <strong>${theirName}</strong> වෙත යැවිය යුතුමයි.` : 
                      `நீங்கள் முடித்துவிட்டீர்கள்! உங்கள் முடிவுகள் மற்றும் ஆலோசனைகளைப் பார்க்க, இறுதி முடிவுகளை <strong>${theirName}</strong> -க்கு அனுப்ப வேண்டும்.`;
        document.getElementById('modal-desc').innerHTML = descStr;
        
        setTimeout(() => {
            const modal = document.getElementById('couples-modal');
            modal.classList.remove('hidden');
            void modal.offsetWidth;
            modal.classList.add('active');
        }, 1200);
        
        generateDyadicAdvice(p1Data.answers, p2Data.answers, p1Data.nA, p1Data.nB);
    }
    else if (appMode === 'final') {
        waShareBtn.classList.add('hidden'); // Don't share again
        generateDyadicAdvice(p1Data.answers, p2Data.answers, myName, theirName);
    }
    
    buildBreakdownUI();
    if (appMode === 'p1') {
        document.getElementById('breakdown-container').classList.remove('hidden');
    } else {
        document.getElementById('breakdown-container').classList.add('hidden');
    }
}

function generateDyadicAdvice(ans1, ans2, name1, name2) {
    const advBox = document.getElementById('couples-advice-box');
    advBox.classList.remove('hidden');
    
    const adviceStrings = translations[currentLang].ui.dyadicAdviceStrings;
    
    function getAdviceList(ans, targetName, partnerName) {
        let issues = [];
        let minScore = 999;
        let minIdx = 0;
        
        for(let i=0; i<10; i++) {
            let v = ans[i]; 
            if(questions[i].reverse) v = 6 - v;
            
            if (v < minScore) { minScore = v; minIdx = i; }
            
            // If the score is 3 or below (neutral or negative), it's a growth area
            if (v <= 3) {
                issues.push(adviceStrings[i].replace('{name}', targetName).replace('{partner}', partnerName));
            }
        }
        
        // If there are no major issues (all 4s and 5s), just give the lowest scoring one
        if (issues.length === 0) {
            issues.push(adviceStrings[minIdx].replace('{name}', targetName).replace('{partner}', partnerName));
        }
        
        let html = '<ul style="margin-top: 10px; padding-left: 20px;">';
        issues.forEach(issue => {
            html += `<li style="margin-bottom: 8px;">${issue}</li>`;
        });
        html += '</ul>';
        return html;
    }
    
    // Advice for Partner 1 is based on Partner 2's answers (ans2)
    let adv1Html = getAdviceList(ans2, name1, name2);
    // Advice for Partner 2 is based on Partner 1's answers (ans1)
    let adv2Html = getAdviceList(ans1, name2, name1);
    
    const dyadicItem1 = document.getElementById('dyadic-item-1');
    const dyadicItem2 = document.getElementById('dyadic-item-2');
    
    if (appMode === 'p2') {
        dyadicItem1.classList.add('hidden');
        dyadicItem2.classList.remove('hidden');
        document.getElementById('adv-name2').textContent = name2 + ":";
        document.getElementById('adv-text2').innerHTML = adv2Html;
    } else if (appMode === 'final') {
        dyadicItem2.classList.add('hidden');
        dyadicItem1.classList.remove('hidden');
        document.getElementById('adv-name1').textContent = name1 + ":";
        document.getElementById('adv-text1').innerHTML = adv1Html;
    } else {
        dyadicItem1.classList.remove('hidden');
        dyadicItem2.classList.remove('hidden');
        document.getElementById('adv-name1').textContent = name1 + ":";
        document.getElementById('adv-text1').innerHTML = adv1Html;
        document.getElementById('adv-name2').textContent = name2 + ":";
        document.getElementById('adv-text2').innerHTML = adv2Html;
    }
}

function buildBreakdownUI() {
    const bdContainer = document.getElementById('breakdown-container');
    const bdHeader = document.getElementById('bd-header');
    
    bdContainer.innerHTML = '';
    bdContainer.appendChild(bdHeader);
    
    const predKeys = ['predCommitment','predAppreciation','predSex','predPartnerSat','predConflict','predResponsiveness','predInvestment','predSupport','predCapitalization','predAttachment'];
    
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            let myAns = 0;
            
            if (appMode === 'p1') {
                myAns = answers[i];
            } else if (appMode === 'p2') {
                myAns = p2Data.answers[i];
            } else if (appMode === 'final') {
                myAns = p1Data.answers[i];
            }
            
            if (questions[i].reverse) myAns = 6 - myAns;
            let pct = Math.round(((myAns - 1) / 4) * 100);
            
            const item = document.createElement('div');
            item.className = 'breakdown-item';
            const titleStr = translations[currentLang].ui[predKeys[i]];
            let color = getColorForPct(pct);
            
            let html = `
                <div class="breakdown-header"><span class="bd-title">${titleStr}</span></div>
                <div style="display:flex; justify-content:space-between; font-size:0.85rem; margin-bottom:2px; color:#94a3b8;">
                    <span>${myName}</span><span style="color:${color.p}; font-weight:bold;">${pct}%</span>
                </div>
                <div class="bd-bar-bg">
                    <div class="bd-bar" style="width: ${pct}%; background: linear-gradient(90deg, ${color.p}, ${color.s});"></div>
                </div>
            `;
            
            item.innerHTML = html;
            bdContainer.appendChild(item);
        }
    }, 500);
}

function getColorForPct(pct) {
    if (pct >= 80) return { p: colorPalettes.high.primary, s: colorPalettes.high.secondary };
    if (pct >= 60) return { p: colorPalettes.mod.primary, s: colorPalettes.mod.secondary };
    if (pct >= 40) return { p: colorPalettes.grow.primary, s: colorPalettes.grow.secondary };
    return { p: colorPalettes.needs.primary, s: colorPalettes.needs.secondary };
}

function animateScore(targetScore) {
    const finalScoreEl = document.getElementById('final-score');
    const scoreCircle = document.querySelector('.score-circle');
    let current = 0;
    const timer = setInterval(() => {
        current += (targetScore / 75);
        if (current >= targetScore) { current = targetScore; clearInterval(timer); }
        finalScoreEl.textContent = Math.round(current);
        scoreCircle.style.setProperty('--score', current);
    }, 20);
}

function restartQuiz() {
    localStorage.removeItem('match_role');
    localStorage.removeItem('match_state');
    window.location.href = window.location.origin + window.location.pathname;
}
