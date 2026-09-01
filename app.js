let currentLang = 'en';

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
            breakdownTitle: "Top 10 Scientific Predictors",
            predCommitment: "Perceived Partner Commitment",
            predAppreciation: "Appreciation",
            predSex: "Sexual Satisfaction",
            predPartnerSat: "Perceived Partner Satisfaction",
            predConflict: "Absence of Conflict",
            predResponsiveness: "Perceived Partner Responsiveness",
            predInvestment: "Investment in Relationship",
            predSupport: "General Support",
            predCapitalization: "Celebrating Successes",
            predAttachment: "Comfort & Security",
            insightTitle: "A quick science note 🧬",
            insightDesc: "According to the study: 1) Your individual traits (like anxiety) actually don't add much to this score beyond how you feel about your relationship. 2) No quiz can predict the future, so these results just show where you are right now!",
            retakeBtn: "Take it again! 🔄"
        },
        resultTiers: {
            highTitle: "Wow, you two are doing amazing! 🌟",
            highDesc: "Your answers point to a super positive, strong relationship right now. Keep nurturing this beautiful bond!",
            modTitle: "You've got a solid foundation! 😊",
            modDesc: "You have a fairly typical and healthy relationship. To take it to the next level, check out the advice below.",
            growTitle: "You're building something good! 🌱",
            growDesc: "There’s definitely some satisfaction here, but also plenty of room to grow together. The key is consistent effort.",
            needsTitle: "Things might be a little rocky right now. ❤️‍🩹",
            needsDesc: "Your answers suggest some friction at the moment. Don't worry, every relationship has tough seasons."
        },
        dynamicText: {
            overallText: "You scored <strong>{score}%</strong> overall! ",
            advice_high: "<br><br>💡 <strong>Best Advice for You:</strong> The best thing you can do now is just keep prioritizing quality time together to maintain this strong connection.",
            advice_mod: "<br><br>💡 <strong>Best Advice for You:</strong> You have a solid base! Try setting aside time this week to openly discuss your future goals and how you can support each other even more.",
            advice_grow: "<br><br>💡 <strong>Best Advice for You:</strong> Focus on rebuilding intimacy through small, daily acts of affection. A simple 'thank you' or an unexpected hug can do wonders.",
            advice_needs: "<br><br>💡 <strong>Best Advice for You:</strong> Conflict is normal, but how you handle it matters. Practice pausing when things get heated, and focus on attacking the problem together rather than attacking each other."
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
            { id: 'q1', text: 'Do you feel like your partner is in this for the long haul?', weight: 85, optionSet: 'agreement', reverse: false },
            { id: 'q2', text: 'How lucky do you feel to have your partner by your side?', weight: 72, optionSet: 'agreement', reverse: false },
            { id: 'q3', text: 'How are you feeling about the intimacy and spark in your sex life?', weight: 71, optionSet: 'satisfaction', reverse: false },
            { id: 'q4', text: 'Do you think your relationship brings a lot of happiness to your partner?', weight: 70, optionSet: 'agreement', reverse: false },
            { id: 'q5', text: 'Let\'s be real, how often do you two end up arguing or fighting?', weight: 69, optionSet: 'frequency', reverse: true },
            { id: 'q6', text: 'Does your partner really \"get\" you and understand what you need?', weight: 69, optionSet: 'agreement', reverse: false },
            { id: 'q7', text: 'Have you put a lot of your heart, time, and energy into making this work?', weight: 67, optionSet: 'agreement', reverse: false },
            { id: 'q8', text: 'Can you always count on your partner for support when things get tough?', weight: 64, optionSet: 'agreement', reverse: false },
            { id: 'q9', text: 'Does your partner genuinely celebrate your personal successes with you?', weight: 58, optionSet: 'agreement', reverse: false },
            { id: 'q10', text: 'Do you feel completely comfortable depending on your partner?', weight: 58, optionSet: 'agreement', reverse: false }
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
            resultsBtn: "මගේ ප්‍රතිඵල පෙන්වන්න! 🎉",
            profileTitle: "ඔබේ ප්‍රතිඵල මෙන්න! 💖",
            breakdownTitle: "ප්‍රධාන විද්‍යාත්මක සාධක 10",
            predCommitment: "සහකරුගේ කැපවීම පිළිබඳ හැඟීම",
            predAppreciation: "අගය කිරීම",
            predSex: "ලිංගික තෘප්තිය",
            predPartnerSat: "සහකරුගේ තෘප්තිය පිළිබඳ හැඟීම",
            predConflict: "ගැටුම් නොමැති වීම",
            predResponsiveness: "සහකරුගේ ප්‍රතිචාරාත්මක බව",
            predInvestment: "සම්බන්ධතාවය සඳහා කැපවීම",
            predSupport: "සාමාන්‍ය සහයෝගය",
            predCapitalization: "ජයග්‍රහණ සැමරීම",
            predAttachment: "සුවපහසුව සහ ආරක්ෂාව",
            insightTitle: "කුඩා විද්‍යාත්මක සටහනක් 🧬",
            insightDesc: "අධ්‍යයනයට අනුව: 1) ඔබේ පෞද්ගලික ලක්ෂණ වලට වඩා ඔබේ සම්බන්ධතාවය ගැන ඔබට හැඟෙන ආකාරය මෙහිදී ගොඩක් වැදගත් වෙනවා. 2) අනාගතය කොහොම වෙයිද කියලා කිසිම ඇගයීමකට කියන්න බෑ, ඒ නිසා මේ ප්‍රතිඵල වලින් පෙන්වන්නේ ඔබේ වත්මන් තත්වය විතරයි!",
            retakeBtn: "නැවත කරමු! 🔄"
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
            overallText: "ඔබ සමස්තයක් ලෙස <strong>{score}%</strong> ක ලකුණු ප්‍රමාණයක් ලබාගෙන තියෙනවා! ",
            advice_high: "<br><br>💡 <strong>ඔබට හොඳම උපදෙස:</strong> මේ ශක්තිමත් බැඳීම දිගටම පවත්වා ගන්න එකිනෙකා සමඟ කාලය ගත කිරීමට ප්‍රමුඛතාවය දෙන්න.",
            advice_mod: "<br><br>💡 <strong>ඔබට හොඳම උපදෙස:</strong> ඔබට හොඳ පදනමක් තියෙනවා! ඔබේ අනාගත අරමුණු සහ එකිනෙකාට උදව් කරන්නේ කොහොමද කියලා කතා කරන්න මේ සතියේ කාලය වෙන් කරන්න.",
            advice_grow: "<br><br>💡 <strong>ඔබට හොඳම උපදෙස:</strong> කුඩා දෛනික සෙනෙහස දැක්වීම් හරහා සමීප බව නැවත ගොඩනැගීමට අවධානය යොමු කරන්න. සරල 'ස්තූතියි' කීමක් විශාල වෙනසක් කරයි.",
            advice_needs: "<br><br>💡 <strong>ඔබට හොඳම උපදෙස:</strong> ගැටුම් සාමාන්‍යයි, නමුත් ඔබ ඒවා විසඳන ආකාරය වැදගත්. කෝපය වැඩිවන විට ටිකක් නතර වීමට පුරුදු වන්න. ගැටලුවට එකට මුහුණ දෙන්න."
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
            { id: 'q1', text: 'ඔබේ සහකරු/සහකාරිය මේ බැඳීම සදාකාලිකවම තියාගන්න කැමතියි කියලා ඔබට හිතෙනවද?', weight: 85, optionSet: 'agreement', reverse: false },
            { id: 'q2', text: 'ඔබේ සහකරු/සහකාරිය ඔබේ ජීවිතේට ලැබුණු එක ගැන ඔබට කොයිතරම් වාසනාවන්ත හැඟීමක් දැනෙනවද?', weight: 72, optionSet: 'agreement', reverse: false },
            { id: 'q3', text: 'ඔබ දෙදෙනාගේ ලිංගික ජීවිතයේ සමීප බව ගැන ඔබ ඇත්තටම සතුටු වෙනවද?', weight: 71, optionSet: 'satisfaction', reverse: false },
            { id: 'q4', text: 'මේ සම්බන්ධතාවය නිසා ඔබේ සහකරු/සහකාරිය ගොඩක් සතුටින් ඉන්නවා කියලා ඔබට හිතෙනවද?', weight: 70, optionSet: 'agreement', reverse: false },
            { id: 'q5', text: 'ඇත්තම කියමු, ඔබ දෙදෙනා අතර කොයිතරම් නිතර රණ්ඩු ඇතිවෙනවද?', weight: 69, optionSet: 'frequency', reverse: true },
            { id: 'q6', text: 'ඔබේ සහකරු/සහකාරියට ඔබව සහ ඔබේ අවශ්‍යතා හොඳටම තේරෙනවද?', weight: 69, optionSet: 'agreement', reverse: false },
            { id: 'q7', text: 'මේ සම්බන්ධතාවය සාර්ථක කරගන්න ඔබ ඔබේ මුළු හදවතින්ම, කාලය සහ ශ්‍රමය කැප කරලා තියෙනවද?', weight: 67, optionSet: 'agreement', reverse: false },
            { id: 'q8', text: 'ප්‍රශ්න ආවම උදව්වට ඔබේ සහකරු/සහකාරිය අනිවාර්යයෙන්ම ඉන්නවා කියලා විශ්වාසද?', weight: 64, optionSet: 'agreement', reverse: false },
            { id: 'q9', text: 'ඔබේ ජයග්‍රහණ වලදී ඔබේ සහකරු/සහකාරිය අවංකවම සතුටු වෙනවද?', weight: 58, optionSet: 'agreement', reverse: false },
            { id: 'q10', text: 'ඕනෑම දෙයකදී ඔබේ සහකරු/සහකාරිය මත යැපෙන්න ඔබට කිසිම බයක්/චකිතයක් නැද්ද?', weight: 58, optionSet: 'agreement', reverse: false }
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
            resultsBtn: "என் முடிவுகளைக் காட்டு! 🎉",
            profileTitle: "உங்கள் முடிவுகள் இதோ! 💖",
            breakdownTitle: "முக்கிய 10 அறிவியல் காரணிகள்",
            predCommitment: "துணைவரின் அர்ப்பணிப்பு பற்றிய உணர்வு",
            predAppreciation: "பாராட்டு",
            predSex: "பாலியல் திருப்தி",
            predPartnerSat: "துணைவரின் திருப்தி பற்றிய உணர்வு",
            predConflict: "சண்டைகள் இல்லாத நிலை",
            predResponsiveness: "துணைவரின் பதிலளிக்கும் தன்மை",
            predInvestment: "உறவில் ஈடுபாடு",
            predSupport: "பொதுவான ஆதரவு",
            predCapitalization: "வெற்றிகளைக் கொண்டாடுதல்",
            predAttachment: "ஆறுதல் மற்றும் பாதுகாப்பு",
            insightTitle: "ஒரு சிறிய அறிவியல் குறிப்பு 🧬",
            insightDesc: "ஆய்வின்படி: 1) உங்கள் தனிப்பட்ட குணாதிசயங்களை விட உங்கள் உறவைப் பற்றி நீங்கள் எப்படி உணர்கிறீர்கள் என்பதே இங்கு மிகவும் முக்கியமானது. 2) எதிர்காலம் எப்படி இருக்கும் என்று எந்தவொரு மதிப்பீட்டாலும் சொல்ல முடியாது, எனவே இந்த முடிவுகள் உங்கள் தற்போதைய நிலையை மட்டுமே காட்டுகின்றன!",
            retakeBtn: "மீண்டும் செய்யலாம்! 🔄"
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
            overallText: "நீங்கள் ஒட்டுமொத்தமாக <strong>{score}%</strong> மதிப்பெண்களைப் பெற்றுள்ளீர்கள்! ",
            advice_high: "<br><br>💡 <strong>உங்களுக்கான சிறந்த ஆலோசனை:</strong> நீங்கள் மிகச் சிறப்பாகச் செய்கிறீர்கள்! இந்த வலுவான பிணைப்பைத் தொடர, தொடர்ந்து ஒருவருக்கொருவர் நேரம் ஒதுக்குங்கள்.",
            advice_mod: "<br><br>💡 <strong>உங்களுக்கான சிறந்த ஆலோசனை:</strong> உங்களுக்கு ஒரு உறுதியான அடிப்படை உள்ளது! உங்கள் எதிர்கால இலக்குகள் குறித்தும், ஒருவருக்கொருவர் எப்படி ஆதரவளிக்கலாம் என்பது குறித்தும் பேச இந்த வாரம் நேரம் ஒதுக்குங்கள்.",
            advice_grow: "<br><br>💡 <strong>உங்களுக்கான சிறந்த ஆலோசனை:</strong> சிறிய, அன்றாட பாசச் செயல்கள் மூலம் நெருக்கத்தை மீண்டும் உருவாக்குவதில் கவனம் செலுத்துங்கள். ஒரு எளிய 'நன்றி' பெரிய மாற்றத்தை ஏற்படுத்தும்.",
            advice_needs: "<br><br>💡 <strong>உங்களுக்கான சிறந்த ஆலோசனை:</strong> சண்டைகள் இயல்பானவை, ஆனால் அவற்றை நீங்கள் எப்படி கையாளுகிறீர்கள் என்பதே முக்கியம். கோபம் அதிகரிக்கும் போது சற்று நேரம் அமைதியாக இருக்க பழகுங்கள். இணைந்து பிரச்சனையை எதிர்கொள்ளுங்கள்."
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
            { id: 'q1', text: 'உங்கள் துணைவர் இந்த உறவை என்றென்றும் தொடர விரும்புவதாக நீங்கள் நினைக்கிறீர்களா?', weight: 85, optionSet: 'agreement', reverse: false },
            { id: 'q2', text: 'உங்கள் துணைவர் உங்கள் வாழ்வில் இருப்பதற்காக நீங்கள் எவ்வளவு அதிர்ஷ்டசாலியாக உணர்கிறீர்கள்?', weight: 72, optionSet: 'agreement', reverse: false },
            { id: 'q3', text: 'உங்கள் பாலியல் வாழ்க்கையின் நெருக்கம் மற்றும் ஈர்ப்பு குறித்து நீங்கள் மகிழ்ச்சியாக இருக்கிறீர்களா?', weight: 71, optionSet: 'satisfaction', reverse: false },
            { id: 'q4', text: 'இந்த உறவு உங்கள் துணைவருக்கு மிகுந்த மகிழ்ச்சியைத் தருகிறது என்று நினைக்கிறீர்களா?', weight: 70, optionSet: 'agreement', reverse: false },
            { id: 'q5', text: 'உண்மையாக சொல்லுங்கள், நீங்கள் இருவரும் எவ்வளவு அடிக்கடி சண்டையிட்டுக் கொள்கிறீர்கள்?', weight: 69, optionSet: 'frequency', reverse: true },
            { id: 'q6', text: 'உங்கள் துணைவர் உங்களையும் உங்கள் தேவைகளையும் முழுமையாகப் புரிந்து கொள்கிறாரா?', weight: 69, optionSet: 'agreement', reverse: false },
            { id: 'q7', text: 'இந்த உறவை வெற்றிபெறச் செய்ய உங்கள் முழு இதயத்தையும், நேரத்தையும், ஆற்றலையும் முதலீடு செய்துள்ளீர்களா?', weight: 67, optionSet: 'agreement', reverse: false },
            { id: 'q8', text: 'கடினமான நேரங்களில் உங்கள் துணைவரின் ஆதரவை நீங்கள் எப்போதும் நம்பலாமா?', weight: 64, optionSet: 'agreement', reverse: false },
            { id: 'q9', text: 'உங்கள் வெற்றிகளை உங்கள் துணைவர் உண்மையிலேயே கொண்டாடுகிறாரா?', weight: 58, optionSet: 'agreement', reverse: false },
            { id: 'q10', text: 'எதுவாக இருந்தாலும் உங்கள் துணைவரை சார்ந்து இருப்பதில் உங்களுக்கு முழுமையான சௌகரியம் உள்ளதா?', weight: 58, optionSet: 'agreement', reverse: false }
        ]
    }
};

const colorPalettes = {
    high: { primary: '#10b981', secondary: '#14b8a6', bg: '#022c22' },
    mod: { primary: '#3b82f6', secondary: '#8b5cf6', bg: '#0f172a' },
    grow: { primary: '#f59e0b', secondary: '#f97316', bg: '#451a03' },
    needs: { primary: '#ef4444', secondary: '#e11d48', bg: '#4c0519' }
};

let questions = translations[currentLang].questions;

// State
let currentQuestionIndex = 0;
let answers = new Array(questions.length).fill(null);

// DOM Elements
const langScreen = document.getElementById('lang-screen');
const introScreen = document.getElementById('intro-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');

function setLanguage(lang) {
    currentLang = lang;
    questions = translations[lang].questions;
    
    // Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang].ui[key]) {
            el.innerHTML = translations[lang].ui[key];
        }
    });
    
    // Move to intro screen
    langScreen.classList.remove('active');
    setTimeout(() => {
        langScreen.classList.add('hidden');
        introScreen.classList.remove('hidden');
        void introScreen.offsetWidth; // Reflow
        introScreen.classList.add('active');
    }, 400);
}

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    introScreen.classList.remove('active');
    setTimeout(() => {
        introScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        void quizScreen.offsetWidth; // Reflow
        quizScreen.classList.add('active');
        renderQuestion();
    }, 400);
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${q.text}`;
    
    // Progress Bar
    const progress = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Options Contextual Personalization
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
        
        input.addEventListener('change', () => selectOption(opt.value));
        
        label.appendChild(input);
        label.appendChild(document.createTextNode(opt.label));
        optionsContainer.appendChild(label);
    });
    
    // Buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.innerHTML = translations[currentLang].ui.resultsBtn;
    } else {
        nextBtn.innerHTML = translations[currentLang].ui.nextBtn;
    }
    
    nextBtn.disabled = answers[currentQuestionIndex] === null;
}

function selectOption(val) {
    answers[currentQuestionIndex] = val;
    renderQuestion();
    // Auto-advance if not last question
    if (currentQuestionIndex < questions.length - 1) {
        setTimeout(nextQuestion, 400);
    } else {
        nextBtn.disabled = false;
    }
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

function calculateScore() {
    let totalScore = 0;
    let totalMax = 0;
    
    questions.forEach((q, index) => {
        let val = answers[index];
        // Handle reverse scored items
        if (q.reverse) {
            val = 6 - val; // 5 becomes 1, 1 becomes 5
        }
        
        let weightedScore = val * q.weight;
        let weightedMax = 5 * q.weight;
        
        totalScore += weightedScore;
        totalMax += weightedMax;
    });
    
    return Math.round((totalScore / totalMax) * 100);
}

function applyTheme(palette) {
    document.documentElement.style.setProperty('--primary', palette.primary);
    document.documentElement.style.setProperty('--primary-hover', palette.primary);
    document.documentElement.style.setProperty('--secondary', palette.secondary);
    document.documentElement.style.setProperty('--bg-color', palette.bg);
}

function showResults() {
    const score = calculateScore();
    
    // Apply Dynamic Theme Based on Score
    let tierKey = '';
    if (score >= 80) { applyTheme(colorPalettes.high); tierKey = 'high'; }
    else if (score >= 60) { applyTheme(colorPalettes.mod); tierKey = 'mod'; }
    else if (score >= 40) { applyTheme(colorPalettes.grow); tierKey = 'grow'; }
    else { applyTheme(colorPalettes.needs); tierKey = 'needs'; }
    
    quizScreen.classList.remove('active');
    setTimeout(() => {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        void resultScreen.offsetWidth; // Reflow
        resultScreen.classList.add('active');
        
        // Animate score counter
        animateScore(score);
        
        // Set dynamic text
        const titleEl = document.getElementById('result-title');
        const descEl = document.getElementById('result-description');
        const trans = translations[currentLang];
        const tiers = trans.resultTiers;
        const dynText = trans.dynamicText;
        
        if (tierKey === 'high') {
            titleEl.textContent = tiers.highTitle;
        } else if (tierKey === 'mod') {
            titleEl.textContent = tiers.modTitle;
        } else if (tierKey === 'grow') {
            titleEl.textContent = tiers.growTitle;
        } else {
            titleEl.textContent = tiers.needsTitle;
        }
        
        const tierDesc = tiers[tierKey + 'Desc'];
        
        // Construct highly personalized content
        const introPhrase = dynText.overallText.replace('{score}', score);
        
        // Inject Custom Advice Based on Tier
        const customAdvice = dynText['advice_' + tierKey];
        
        descEl.innerHTML = introPhrase + tierDesc + customAdvice;
        
        // Animate ALL 10 predictor bars
        setTimeout(() => {
            const top10 = [];
            for (let i = 0; i < 10; i++) {
                let val = answers[i];
                if (questions[i].reverse) {
                    val = 6 - val;
                }
                const pct = Math.round(((val - 1) / 4) * 100);
                top10.push(pct);
            }
            
            for (let i = 0; i < 10; i++) {
                const bar = document.getElementById('bar-pred' + (i+1));
                const valEl = document.getElementById('val-pred' + (i+1));
                
                bar.style.width = top10[i] + '%';
                valEl.textContent = top10[i] + '%';
                
                // Color individual bars based on their score
                let p = '';
                let s = '';
                if (top10[i] >= 80) { p = colorPalettes.high.primary; s = colorPalettes.high.secondary; }
                else if (top10[i] >= 60) { p = colorPalettes.mod.primary; s = colorPalettes.mod.secondary; }
                else if (top10[i] >= 40) { p = colorPalettes.grow.primary; s = colorPalettes.grow.secondary; }
                else { p = colorPalettes.needs.primary; s = colorPalettes.needs.secondary; }
                
                bar.style.background = `linear-gradient(90deg, ${p}, ${s})`;
                valEl.style.color = p;
            }
        }, 500);
        
    }, 400);
}

function animateScore(targetScore) {
    const finalScoreEl = document.getElementById('final-score');
    const scoreCircle = document.querySelector('.score-circle');
    
    let current = 0;
    const duration = 1500;
    const interval = 20;
    const step = targetScore / (duration / interval);
    
    const timer = setInterval(() => {
        current += step;
        if (current >= targetScore) {
            current = targetScore;
            clearInterval(timer);
        }
        
        finalScoreEl.textContent = Math.round(current);
        scoreCircle.style.setProperty('--score', current);
    }, interval);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    answers.fill(null);
    
    // Reset Theme to Default
    applyTheme({ primary: '#ec4899', secondary: '#8b5cf6', bg: '#0f172a' });
    
    resultScreen.classList.remove('active');
    setTimeout(() => {
        resultScreen.classList.add('hidden');
        langScreen.classList.remove('hidden');
        void langScreen.offsetWidth;
        langScreen.classList.add('active');
        
        const scoreCircle = document.querySelector('.score-circle');
        scoreCircle.style.setProperty('--score', 0);
        document.getElementById('final-score').textContent = '0';
        
        // Reset all 10 predictor bars
        for (let i = 1; i <= 10; i++) {
            document.getElementById('bar-pred' + i).style.width = '0%';
            document.getElementById('val-pred' + i).textContent = '0%';
        }
        
    }, 400);
}
