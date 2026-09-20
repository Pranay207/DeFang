import type { Language } from './types';

export interface TranslationDictionary {
  navbar: {
    brandSubtitle: string;
    engineBadge: string;
    newScan: string;
  };
  hero: {
    enginePill: string;
    titleLine1: string;
    titleLine2: string;
    subtext: string;
  };
  presets: {
    header: string;
    loadPreset: string;
    rentalTitle: string;
    rentalDesc: string;
    internshipTitle: string;
    internshipDesc: string;
    freelanceTitle: string;
    freelanceDesc: string;
  };
  input: {
    title: string;
    subtitle: string;
    placeholder: string;
    chars: string;
    uploadBtn: string;
    cameraBtn: string;
    readyPdf: string;
    scanBtn: string;
    scanningBtn: string;
    engineInfo: string;
    offlineBadge: string;
  };
  results: {
    backBtn: string;
    shareBtn: string;
    printBtn: string;
    downloadBtn: string;
    downloadedToast: string;
    sharedToast: string;
    cedarExecuted: string;
    clauseAuditTitle: string;
    clauseAuditSubtitle: string;
    filterAll: string;
    filterDeny: string;
    filterAllow: string;
    noClauses: string;
  };
  riskHero: {
    scoreLabel: string;
    redFlags: string;
    compliant: string;
    totalClauses: string;
    cedarDeny: string;
    cedarAllow: string;
    statusCritical: string;
    statusSevere: string;
    statusModerate: string;
    statusLow: string;
  };
  rupeeTrap: {
    title: string;
    subtitle: string;
    trapCount: string;
    alertBanner: string;
    breakdownToggle: string;
    atRisk: string;
  };
  powerImbalance: {
    title: string;
    subtitle: string;
    biasStatus: (landlord: number, tenant: number) => string;
    counterparty: (pct: number) => string;
    user: (pct: number) => string;
    scaleOneSided: string;
    scaleEquitable: string;
    scaleProtected: string;
    hypocrisyTitle: string;
  };
  clauseCard: {
    plainLabel: string;
    ruleLabel: string;
    audioListen: string;
    audioStop: string;
    diffOpen: string;
    diffClose: string;
    diffOriginal: string;
    diffFair: string;
    diplomatOpen: string;
    diplomatClose: string;
    diplomatTitle: string;
    diplomatSubtitle: string;
    tonePolite: string;
    toneFirm: string;
    toneLegal: string;
    copyBtn: string;
    copiedBtn: string;
    sendWhatsAppBtn: string;
    favorsLabel: string;
    favorsLandlord: string;
    favorsTenant: string;
    favorsNeutral: string;
    statuteLabel: string;
    severityLabel: string;
  };
  dualEngine: {
    title: string;
    subtitle: string;
    stage1Badge: string;
    stage2Badge: string;
    stage1Title: string;
    stage1Extracting: string;
    stage1Done: string;
    stage2Title: string;
    stage2Verifying: string;
    stage2Done: string;
    modelLabel: string;
    durationLabel: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    navbar: {
      brandSubtitle: "AI Indian Contract Red-Flag Scanner & Policy Verifier",
      engineBadge: "Strands + Cedar Policy Engine",
      newScan: "New Scan",
    },
    hero: {
      enginePill: "AI Agent Extraction + Formal Cedar Policy Engine",
      titleLine1: "Stop Signing Toxic Indian Agreements.",
      titleLine2: "Scan, DeFang, and Negotiate.",
      subtext: "Automatic statutory policy verification against the Model Tenancy Act 2021, Indian Contract Act 1872 (Sec 27 & 74), and Usurious Loans Act.",
    },
    presets: {
      header: "Standard Indian Agreements (Pre-Audited Presets)",
      loadPreset: "Load Agreement",
      rentalTitle: "Bangalore Rental Trap",
      rentalDesc: "10-month deposit, 1-month mandatory painting deduction, 90-day asymmetric notice, 3% daily late fees.",
      internshipTitle: "Toxic Startup Offer Letter",
      internshipDesc: "2-year non-compete, ₹2.5L training bond, 90-day employee notice vs 0-day employer termination.",
      freelanceTitle: "Predatory Tech MSA",
      freelanceDesc: "Unlimited indemnity, 0% client late fee penalty, 180-day non-solicit, IP forfeiture before payment.",
    },
    input: {
      title: "Or Paste Custom Contract Text",
      subtitle: "Full audit for Indian rental agreements, offer letters, employment bonds, and freelance MSAs",
      placeholder: "Paste your rental agreement, employment contract, or freelance MSA here... (e.g. 11-month Bangalore rental contract with 10-month deposit, or offer letter with lock-in bond)",
      chars: "characters",
      uploadBtn: "Upload PDF or Document",
      cameraBtn: "Camera / Stamp Paper Photo",
      readyPdf: "Document loaded and ready for clause extraction",
      scanBtn: "Scan with DeFang Cedar Engine",
      scanningBtn: "Verifying with Strands + Cedar...",
      engineInfo: "Engine: Strands Agent Parser + AWS Cedar Policy Engine",
      offlineBadge: "*Presets above run 100% offline on-device",
    },
    results: {
      backBtn: "Scan Another Agreement",
      shareBtn: "Share Audit",
      printBtn: "Print / PDF",
      downloadBtn: "Download Report",
      downloadedToast: "📋 Full Legal Audit Report downloaded successfully!",
      sharedToast: "📋 Full Legal Audit Summary copied to clipboard!",
      cedarExecuted: "Cedar Engine: 8/8 Policies Executed",
      clauseAuditTitle: "Clause-by-Clause Policy Audit",
      clauseAuditSubtitle: "Inspect statutory violations, view GitHub PR diffs, or copy calibrated WhatsApp replies",
      filterAll: "All",
      filterDeny: "Red Flags",
      filterAllow: "Compliant",
      noClauses: "No clauses found for the selected filter.",
    },
    riskHero: {
      scoreLabel: "DeFang Risk Score",
      redFlags: "Red Flags",
      compliant: "Compliant",
      totalClauses: "Analyzed",
      cedarDeny: "Cedar DENY",
      cedarAllow: "Cedar ALLOW",
      statusCritical: "CRITICAL RISK",
      statusSevere: "SEVERE RISK",
      statusModerate: "MODERATE RISK",
      statusLow: "LOW RISK",
    },
    rupeeTrap: {
      title: "Hidden Rupee Trap Simulator",
      subtitle: "Total quantified illegal financial exposure & deposit forfeiture risk",
      trapCount: "Financial Traps",
      alertBanner: "Unenforceable monetary deductions flagged under Model Tenancy Act & Contract Act Sec 74",
      breakdownToggle: "Detailed Violation Breakdown",
      atRisk: "At Risk",
    },
    powerImbalance: {
      title: "Power Imbalance Meter",
      subtitle: "Contractual leverage distribution & reciprocal fairness evaluation",
      biasStatus: (landlord, tenant) => `${landlord}% Biased | ${tenant}% Protected`,
      counterparty: (pct) => `Counterparty / Landlord (${pct}%)`,
      user: (pct) => `You / Tenant (${pct}%)`,
      scaleOneSided: "0% (Extreme One-Sided)",
      scaleEquitable: "50% (Equitable Balance)",
      scaleProtected: "100% (Fully Protected)",
      hypocrisyTitle: "Contract Hypocrisy Detected",
    },
    clauseCard: {
      plainLabel: "Plain English Breakdown:",
      ruleLabel: "Formal Cedar Statutory Rule:",
      audioListen: "Listen Aloud",
      audioStop: "Stop Audio",
      diffOpen: "View Balanced Redline Diff",
      diffClose: "Hide Redline Diff",
      diffOriginal: "Original Unfair Clause (DENY)",
      diffFair: "Fair Statutory Replacement (Model Tenancy / Contract Act)",
      diplomatOpen: "3-Tone WhatsApp Diplomat",
      diplomatClose: "Close Diplomat",
      diplomatTitle: "WhatsApp Negotiation Diplomat",
      diplomatSubtitle: "Ready-to-send calibrated responses",
      tonePolite: "1. Polite / Respectful (Elders)",
      toneFirm: "2. Professional / Firm (HR & Clients)",
      toneLegal: "3. Legal Shield (Statutory Cite)",
      copyBtn: "Copy Text",
      copiedBtn: "Copied!",
      sendWhatsAppBtn: "Send on WhatsApp",
      favorsLabel: "Favors:",
      favorsLandlord: "Landlord / Employer",
      favorsTenant: "Tenant / Candidate",
      favorsNeutral: "Neutral",
      statuteLabel: "Statute:",
      severityLabel: "Severity:",
    },
    dualEngine: {
      title: "Dual-Engine Statutory Architecture",
      subtitle: "Strands AI Agent structured extraction + AWS Cedar deterministic policy verification",
      stage1Badge: "Stage 1: AI Agent Extraction",
      stage2Badge: "Stage 2: Cedar Verification",
      stage1Title: "Strands Agent",
      stage1Extracting: "Extracting structured clauses & entity parameters...",
      stage1Done: "Clause structuring & intent extraction complete",
      stage2Title: "AWS Cedar Policy Engine",
      stage2Verifying: "Verifying each clause against Indian statutory rules...",
      stage2Done: "All 8 .cedar statutory policies executed",
      modelLabel: "Model: Strands Statutory Parser",
      durationLabel: "Duration: ~1.4s",
    },
  },
  hi: {
    navbar: {
      brandSubtitle: "भारतीय अनुबंध रेड-फ्लैग स्कैनर एवं वैधानिक नीति सत्यापनकर्ता",
      engineBadge: "Strands AI + AWS Cedar इंजन",
      newScan: "नया स्कैन",
    },
    hero: {
      enginePill: "AI एजेंट निष्कर्षण + AWS Cedar औपचारिक नीति इंजन",
      titleLine1: "अनुचित भारतीय अनुबंधों पर हस्ताक्षर करना बंद करें।",
      titleLine2: "स्कैन करें, DeFang करें, और बराबरी से बात करें।",
      subtext: "मॉडल टेनेंसी एक्ट 2021, भारतीय अनुबंध अधिनियम 1872 (धारा 27 एवं 74), और सूदखोरी कानून के तहत स्वचालित कानूनी सत्यापन।",
    },
    presets: {
      header: "मानक भारतीय अनुबंध (पूर्व-परीक्षित प्रिजेंट)",
      loadPreset: "अनुबंध लोड करें",
      rentalTitle: "बेंगलुरु रेंटल ट्रैप",
      rentalDesc: "10 महीने का डिपॉजिट, 1 महीने का अनिवार्य पेंटिंग चार्ज, 90 दिन का एकतरफा नोटिस, 3% दैनिक ब्याज।",
      internshipTitle: "स्टार्टअप ऑफर लेटर (बॉन्ड ट्रैप)",
      internshipDesc: "2 साल का नॉन-कंपीट प्रतिबंध, ₹2.5 लाख का ट्रेनिंग बॉन्ड, कर्मचारी के लिए 90 दिन का नोटिस।",
      freelanceTitle: "फ्रीलांस टेक एग्रीमेंट (MSA)",
      freelanceDesc: "असीमित क्षतिपूर्ति (Indemnity), क्लाइंट के लिए शून्य ब्याज, 180 दिन का गैर-प्रतिस्पर्धा प्रतिबंध।",
    },
    input: {
      title: "या अपना अनुबंध पेस्ट / अपलोड करें",
      subtitle: "भारतीय रेंटल एग्रीमेंट, ऑफर लेटर, एम्प्लॉयमेंट बॉन्ड और फ्रीलांस अनुबंधों की संपूर्ण जांच",
      placeholder: "अपना रेंटल एग्रीमेंट या नौकरी का अनुबंध यहां पेस्ट करें... (उदा. 11 महीने का रेंट एग्रीमेंट, 10 महीने का डिपॉजिट, या अत्यधिक पेनल्टी वाले क्लॉज)",
      chars: "अक्षर",
      uploadBtn: "PDF या टेक्स्ट दस्तावेज़ अपलोड करें",
      cameraBtn: "कैमरा / स्टांप पेपर फोटो",
      readyPdf: "दस्तावेज़ लोड हो गया, क्लॉज विश्लेषण के लिए तैयार",
      scanBtn: "DeFang Cedar इंजन से स्कैन करें",
      scanningBtn: "Strands + Cedar द्वारा जांच जारी...",
      engineInfo: "इंजन: स्थानीय वैधानिक पार्सर + AWS Cedar नीति इंजन",
      offlineBadge: "*ऊपर दिए गए सभी उदाहरण 100% ऑफलाइन चलते हैं",
    },
    results: {
      backBtn: "दूसरा अनुबंध जांचें",
      shareBtn: "ऑडिट रिपोर्ट शेयर करें",
      printBtn: "प्रिंट / PDF",
      downloadBtn: "रिपोर्ट डाउनलोड करें",
      downloadedToast: "📋 कानूनी ऑडिट रिपोर्ट सफलतापूर्वक डाउनलोड हुई!",
      sharedToast: "📋 कानूनी ऑडिट सारांश क्लिपबोर्ड पर कॉपी हो गया!",
      cedarExecuted: "Cedar इंजन: सभी 8/8 वैधानिक नीतियां जांची गईं",
      clauseAuditTitle: "क्लॉज-दर-क्लॉज कानूनी ऑडिट",
      clauseAuditSubtitle: "वैधानिक उल्लंघनों की जांच करें, संतुलित बदलाव देखें, या बातचीत के लिए व्हाट्सएप संदेश कॉपी करें",
      filterAll: "सभी",
      filterDeny: "गैर-कानूनी (Red Flags)",
      filterAllow: "कानून सम्मत",
      noClauses: "चुने गए फ़िल्टर के लिए कोई क्लॉज नहीं मिला।",
    },
    riskHero: {
      scoreLabel: "DeFang जोखिम स्कोर",
      redFlags: "गंभीर उल्लंघन",
      compliant: "कानून सम्मत",
      totalClauses: "कुल क्लॉज",
      cedarDeny: "Cedar DENY",
      cedarAllow: "Cedar ALLOW",
      statusCritical: "अत्यधिक जोखिम (CRITICAL)",
      statusSevere: "गंभीर जोखिम (SEVERE)",
      statusModerate: "मध्यम जोखिम (MODERATE)",
      statusLow: "सुरक्षित (LOW RISK)",
    },
    rupeeTrap: {
      title: "छिपे हुए वित्तीय जोखिम (रुपया ट्रैप सिम्युलेटर)",
      subtitle: "अनुचित कटौती और जब्त होने वाली कुल अनुमानित राशि का विवरण",
      trapCount: "वित्तीय जाल",
      alertBanner: "मॉडल टेनेंसी एक्ट और भारतीय अनुबंध अधिनियम धारा 74 के तहत गैर-कानूनी कटौती चिन्हित",
      breakdownToggle: "विस्तृत वित्तीय कटौती विवरण",
      atRisk: "जोखिम में",
    },
    powerImbalance: {
      title: "अधिकार असंतुलन मीटर (Power Imbalance)",
      subtitle: "अनुबंध में दोनों पक्षों के अधिकारों और निष्पक्षता का सटीक मूल्यांकन",
      biasStatus: (landlord, tenant) => `${landlord}% एकतरफा झुकाव | ${tenant}% आपके अधिकार सुरक्षित`,
      counterparty: (pct) => `मकान मालिक / कंपनी के पक्ष में (${pct}%)`,
      user: (pct) => `आपके / किराएदार के पक्ष में (${pct}%)`,
      scaleOneSided: "0% (पूरी तरह एकतरफा)",
      scaleEquitable: "50% (समान व संतुलित)",
      scaleProtected: "100% (पूरी तरह सुरक्षित)",
      hypocrisyTitle: "अनुबंध में दोहरा मापदंड पाया गया",
    },
    clauseCard: {
      plainLabel: "सरल भाषा में व्याख्या:",
      ruleLabel: "औपचारिक वैधानिक Cedar नियम:",
      audioListen: "बोलकर सुनें",
      audioStop: "आवाज़ रोकें",
      diffOpen: "कानून सम्मत संशोधित रूप देखें",
      diffClose: "संशोधित रूप छिपाएं",
      diffOriginal: "मूल अनुचित क्लॉज (DENY)",
      diffFair: "कानूनी व संतुलित विकल्प (Model Tenancy / Contract Act)",
      diplomatOpen: "3-टोन व्हाट्सएप वार्ता सहायक",
      diplomatClose: "वार्ता सहायक बंद करें",
      diplomatTitle: "व्हाट्सएप डिप्लोमैट (वार्ता सहायक)",
      diplomatSubtitle: "मकान मालिक या कंपनी को भेजने हेतु तैयार संदेश",
      tonePolite: "1. आदरणीय / विनम्र (बुजुर्गों के लिए)",
      toneFirm: "2. पेशेवर / स्पष्ट (HR व क्लाइंट्स के लिए)",
      toneLegal: "3. कानूनी ढाल (अधिनियम व धारा संदर्भ)",
      copyBtn: "संदेश कॉपी करें",
      copiedBtn: "कॉपी हो गया!",
      sendWhatsAppBtn: "WhatsApp पर भेजें",
      favorsLabel: "झुकाव:",
      favorsLandlord: "मकान मालिक / कंपनी के पक्ष में",
      favorsTenant: "किराएदार / उम्मीदवार के पक्ष में",
      favorsNeutral: "तटस्थ",
      statuteLabel: "कानूनी संदर्भ:",
      severityLabel: "गंभीरता:",
    },
    dualEngine: {
      title: "दोहरी-इंजन वैधानिक प्रणाली",
      subtitle: "Strands AI एजेंट द्वारा क्लॉज विश्लेषण + AWS Cedar द्वारा शत-प्रतिशत कानूनी सत्यापन",
      stage1Badge: "चरण 1: AI एजेंट निष्कर्षण",
      stage2Badge: "चरण 2: Cedar नीति सत्यापन",
      stage1Title: "Strands AI एजेंट",
      stage1Extracting: "क्लॉज और कानूनी शर्तों का विश्लेषण जारी...",
      stage1Done: "क्लॉज संरचना और कानूनी आशय का विश्लेषण पूर्ण",
      stage2Title: "AWS Cedar नीति इंजन",
      stage2Verifying: "भारतीय कानूनों (MTA, ICA) के विरुद्ध जांच जारी...",
      stage2Done: "सभी 8 .cedar वैधानिक नीतियां सफलतापूर्वक निष्पादित",
      modelLabel: "मॉडल: Strands Statutory Parser",
      durationLabel: "समय: ~1.4s",
    },
  },
  te: {
    navbar: {
      brandSubtitle: "భారతీయ చట్టబద్ధమైన కాంట్రాక్ట్ రెడ్-ఫ్లాగ్ స్కానర్ & పాలసీ వెరిఫైయర్",
      engineBadge: "Strands AI + AWS Cedar ఇంజిన్",
      newScan: "కొత్త స్కానింగ్",
    },
    hero: {
      enginePill: "AI ఏజెంట్ గుర్తింపు + AWS Cedar చట్టబద్ధమైన ధృవీకరణ",
      titleLine1: "అన్యాయమైన భారతీయ ఒప్పందాలపై సంతకాలు చేయకండి.",
      titleLine2: "స్కాన్ చేయండి, DeFang చేయండి, సమానంగా చర్చించండి.",
      subtext: "మోడల్ టెనెన్సీ యాక్ట్ 2021, భారతీయ కాంట్రాక్ట్ చట్టం 1872 (సెక్షన్ 27 & 74), మరియు వడ్డీ నియంత్రణ చట్టాల ప్రకారం స్వయంచాలక చట్టపరమైన ధృవీకరణ.",
    },
    presets: {
      header: "ప్రామాణిక భారతీయ ఒప్పందాలు (తక్షణ విశ్లేషణ)",
      loadPreset: "ఒప్పందం ఎంచుకోండి",
      rentalTitle: "బెంగళూరు అద్దె ఒప్పందం ట్రాప్",
      rentalDesc: "10 నెలల డిపాజిట్, 1 నెల తప్పనిసరి పెయింటింగ్ చార్జ్, 90 రోజుల ఏకపక్ష నోటీసు, రోజుకు 3% ఆలస్య రుసుము.",
      internshipTitle: "స్టార్టప్ ఆఫర్ లెటర్ (జాబ్ బాండ్)",
      internshipDesc: "2 సంవత్సరాల నాన్-కాంపీట్ ఆంక్షలు, ₹2.5 లక్షల ట్రైనింగ్ బాండ్, ఉద్యోగికి 90 రోజుల నోటీసు పీరియడ్.",
      freelanceTitle: "ఫ్రీలాన్స్ టెక్ కాంట్రాక్ట్ (MSA)",
      freelanceDesc: "అపరిమిత నష్టపరిహారం (Indemnity), క్లయింట్‌కు సున్నా జరిమానా, చెల్లింపుల కంటే ముందే IP హక్కుల జప్తు.",
    },
    input: {
      title: "కాంట్రాక్ట్ టెక్స్ట్ పేస్ట్ చేయండి లేదా PDF అప్‌లోడ్ చేయండి",
      subtitle: "ఇంటి అద్దె ఒప్పందాలు, ఆఫర్ లెటర్లు, ఎంప్లాయ్‌మెంట్ బాండ్లు మరియు ఫ్రీలాన్స్ ఒప్పందాల పూర్తి తనిఖీ",
      placeholder: "మీ అద్దె ఒప్పందం లేదా ఉద్యోగ కాంట్రాక్ట్‌ను ఇక్కడ పేస్ట్ చేయండి... (ఉదా: 11 నెలల అద్దె అగ్రిమెంట్, 2 ఏళ్ల జాబ్ బాండ్, లేదా అధిక జరిమానా నిబంధనలు)",
      chars: "అక్షరాలు",
      uploadBtn: "PDF లేదా టెక్స్ట్ ఫైల్ అప్‌లోడ్ చేయండి",
      cameraBtn: "కెమెరా / స్టాంప్ పేపర్ ఫోటో",
      readyPdf: "పత్రం లోడ్ చేయబడింది, విశ్లేషణకు సిద్ధంగా ఉంది",
      scanBtn: "DeFang Cedar ఇంజిన్‌తో స్కాన్ చేయండి",
      scanningBtn: "Strands + Cedar ద్వారా తనిఖీ జరుగుతోంది...",
      engineInfo: "ఇంజిన్: స్థానిక రూల్ పార్సర్ + AWS Cedar పాలసీ ఇంజిన్",
      offlineBadge: "*పై డెమోలన్నీ మీ పరికరంలో 100% ఆఫ్‌లైన్‌లో రన్ అవుతాయి",
    },
    results: {
      backBtn: "మరొక ఒప్పందాన్ని తనిఖీ చేయండి",
      shareBtn: "ఆడిట్ నివేదికను షేర్ చేయండి",
      printBtn: "ప్రింట్ / PDF",
      downloadBtn: "రిపోర్ట్ డౌన్‌లోడ్",
      downloadedToast: "📋 చట్టపరమైన ఆడిట్ నివేదిక విజయవంతంగా డౌన్‌లోడ్ చేయబడింది!",
      sharedToast: "📋 చట్టపరమైన ఆడిట్ సారాంశం క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!",
      cedarExecuted: "Cedar ఇంజిన్: మొత్తం 8/8 చట్టబద్ధమైన పాలసీలు అమలు చేయబడ్డాయి",
      clauseAuditTitle: "నిబంధనల వారీగా చట్టపరమైన ఆడిట్",
      clauseAuditSubtitle: "చట్ట ఉల్లంఘనలను పరిశీలించండి, సరైన నిబంధనలను సరిపోల్చండి, లేదా వాట్సాప్ సందేశాలను కాపీ చేయండి",
      filterAll: "అన్నీ",
      filterDeny: "చట్టవిరుద్ధమైనవి (Red Flags)",
      filterAllow: "చట్టబద్ధమైనవి",
      noClauses: "ఎంచుకున్న ఫిల్టర్ కోసం ఎటువంటి నిబంధనలు కనుగొనబడలేదు.",
    },
    riskHero: {
      scoreLabel: "DeFang రిస్క్ స్కోర్",
      redFlags: "తీవ్ర ఉల్లంఘనలు",
      compliant: "చట్టబద్ధమైనవి",
      totalClauses: "మొత్తం క్లాజులు",
      cedarDeny: "Cedar DENY",
      cedarAllow: "Cedar ALLOW",
      statusCritical: "తీవ్ర ప్రమాదం (CRITICAL)",
      statusSevere: "గణనీయమైన ప్రమాదం (SEVERE)",
      statusModerate: "మధ్యస్థ ప్రమాదం (MODERATE)",
      statusLow: "సురక్షితం (LOW RISK)",
    },
    rupeeTrap: {
      title: "దాగి ఉన్న ఆర్థిక నష్టాలు (రూపాయి ట్రాప్ సిమ్యులేటర్)",
      subtitle: "అన్యాయమైన కోతలు మరియు జప్తు రూపంలో మీరు కోల్పోయే అవకాశం ఉన్న మొత్తం",
      trapCount: "ఆర్థిక ఉచ్చులు",
      alertBanner: "మోడల్ టెనెన్సీ చట్టం మరియు కాంట్రాక్ట్ చట్టం సెక్షన్ 74 ప్రకారం చెల్లని ఆర్థిక కోతలు",
      breakdownToggle: "వివరణాత్మక ఆర్థిక నష్టాల జాబితా",
      atRisk: "నష్టపోయే అవకాశం",
    },
    powerImbalance: {
      title: "అధికార అసమతుల్యత మీటర్ (Power Imbalance)",
      subtitle: "కాంట్రాక్ట్‌లో ఇరుపక్షాల హక్కులు మరియు న్యాయబద్ధత సమతుల్యత లెక్కింపు",
      biasStatus: (landlord, tenant) => `${landlord}% ఏకపక్ష మొగ్గు | ${tenant}% మీ హక్కుల రక్షణ`,
      counterparty: (pct) => `ఎదుటి పక్షం / యజమాని అనుకూలం (${pct}%)`,
      user: (pct) => `మీకు / అద్దెదారుకు అనుకూలం (${pct}%)`,
      scaleOneSided: "0% (తీవ్ర ఏకపక్షం)",
      scaleEquitable: "50% (సమాన న్యాయం)",
      scaleProtected: "100% (పూర్తిగా సురక్షితం)",
      hypocrisyTitle: "కాంట్రాక్ట్‌లో ద్వంద్వ ప్రమాణాలు గుర్తించబడ్డాయి",
    },
    clauseCard: {
      plainLabel: "సరళ వివరణ:",
      ruleLabel: "అధికారిక చట్టబద్ధమైన Cedar నియమం:",
      audioListen: "వినండి (ఆడియో)",
      audioStop: "ఆపండి",
      diffOpen: "న్యాయబద్ధమైన సవరణ చూడండి",
      diffClose: "సవరణను దాచండి",
      diffOriginal: "అసలు అన్యాయమైన నిబంధన (DENY)",
      diffFair: "చట్టబద్ధమైన సరైన ప్రత్యామ్నాయం (Model Tenancy / Contract Act)",
      diplomatOpen: "3-టోన్ వాట్సాప్ చర్చల సహాయకుడు",
      diplomatClose: "సహాయకుడిని మూసివేయండి",
      diplomatTitle: "వాట్సాప్ డిప్లొమాట్ (చర్చల సహాయకుడు)",
      diplomatSubtitle: "ఎదుటి వ్యక్తికి పంపడానికి సిద్ధంగా ఉన్న సందేశాలు",
      tonePolite: "1. వినమ్రంగా / గౌరవప్రదంగా (పెద్దలకు)",
      toneFirm: "2. స్పష్టంగా / ప్రొఫెషనల్ (HR & క్లయింట్లకు)",
      toneLegal: "3. చట్టపరమైన హెచ్చరిక (చట్టం & సెక్షన్)",
      copyBtn: "సందేశాన్ని కాపీ చేయండి",
      copiedBtn: "కాపీ చేయబడింది!",
      sendWhatsAppBtn: "WhatsApp లో పంపండి",
      favorsLabel: "మొగ్గు:",
      favorsLandlord: "యజమాని / కంపెనీ అనుకూలం",
      favorsTenant: "అద్దెదారు / అభ్యర్థి అనుకూలం",
      favorsNeutral: "సమతుల్యం",
      statuteLabel: "చట్టం:",
      severityLabel: "తీవ్రత:",
    },
    dualEngine: {
      title: "ద్వంద్వ ఇంజిన్ చట్టబద్ధమైన వ్యవస్థ",
      subtitle: "Strands AI ఏజెంట్ విశ్లేషణ + AWS Cedar చట్టబద్ధమైన పాలసీ ధృవీకరణ",
      stage1Badge: "దశ 1: AI ఏజెంట్ గుర్తింపు",
      stage2Badge: "దశ 2: Cedar పాలసీ ధృవీకరణ",
      stage1Title: "Strands AI ఏజెంట్",
      stage1Extracting: "నిబంధనలు మరియు పారామీటర్ల విశ్లేషణ జరుగుతోంది...",
      stage1Done: "నిబంధనల నిర్మాణం మరియు ఉద్దేశాల గుర్తింపు పూర్తయింది",
      stage2Title: "AWS Cedar పాలసీ ఇంజిన్",
      stage2Verifying: "భారతీయ చట్టాల ప్రకారం ప్రతి నిబంధన ధృవీకరణ...",
      stage2Done: "అన్ని 8 .cedar చట్టబద్ధమైన పాలసీలు అమలు చేయబడ్డాయి",
      modelLabel: "మోడల్: Strands Statutory Parser",
      durationLabel: "సమయం: ~1.4s",
    },
  },
  kn: {
    navbar: {
      brandSubtitle: "AI ಭಾರತೀಯ ಒಪ್ಪಂದಗಳ ಅಪಾಯ ಶೋಧಕ ಮತ್ತು ಪಾಲಿಸಿ ಪರೀಕ್ಷಕ",
      engineBadge: "Strands + Cedar ಪಾಲಿಸಿ ಎಂಜಿನ್",
      newScan: "ಹೊಸ ಸ್ಕ್ಯಾನ್",
    },
    hero: {
      enginePill: "AI ಏಜೆಂಟ್ ಹೊರತೆಗೆಯುವಿಕೆ + ಔಪಚಾರಿಕ Cedar ಪಾಲಿಸಿ ಎಂಜಿನ್",
      titleLine1: "ಅನ್ಯಾಯದ ಭಾರತೀಯ ಒಪ್ಪಂದಗಳಿಗೆ ಸಹಿ ಮಾಡಬೇಡಿ.",
      titleLine2: "ಸ್ಕ್ಯಾನ್ ಮಾಡಿ, DeFang ಮಾಡಿ, ಮಾತುಕತೆ ನಡೆಸಿ.",
      subtext: "ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ 2021 (Model Tenancy Act 2021), ಭಾರತೀಯ ಒಪ್ಪಂದ ಕಾಯ್ದೆ 1872 (ಕಲಂ 27 ಮತ್ತು 74) ಮತ್ತು ಲೇವಾದೇವಿ ಕಾಯ್ದೆಯ ಅಡಿಯಲ್ಲಿ ಸ್ವಯಂಚಾಲಿತ ಶಾಸನಬದ್ಧ ಪರೀಕ್ಷೆ.",
    },
    presets: {
      header: "ಪ್ರಮುಖ ಭಾರತೀಯ ಒಪ್ಪಂದಗಳು (ತಕ್ಷಣದ ವಿಶ್ಲೇಷಣೆ)",
      loadPreset: "ಒಪ್ಪಂದ ಆಯ್ಕೆಮಾಡಿ",
      rentalTitle: "ಬೆಂಗಳೂರು ಬಾಡಿಗೆ ಒಪ್ಪಂದದ ಬಲೆ",
      rentalDesc: "10 ತಿಂಗಳ ಠೇವಣಿ, 1 ತಿಂಗಳ ಕಡ್ಡಾಯ ಬಣ್ಣದ ಶುಲ್ಕ, 90 ದಿನಗಳ ಏಕಮುಖ ನೋಟಿಸ್, ದಿನಕ್ಕೆ 3% ದಂಡ.",
      internshipTitle: "ವಿಷಕಾರಿ ಸ್ಟಾರ್ಟ್‌ಅಪ್ ಆಫರ್ ಲೆಟರ್",
      internshipDesc: "2 ವರ್ಷಗಳ ಸ್ಪರ್ಧಾತ್ಮಕ ನಿರ್ಬಂಧ, ₹2.5L ತರಬೇತಿ ಬಾಂಡ್, ಉದ್ಯೋಗಿಗೆ 90 ದಿನಗಳ ನೋಟಿಸ್.",
      freelanceTitle: "ಅನ್ಯಾಯದ ಟೆಕ್ MSA ಒಪ್ಪಂದ",
      freelanceDesc: "ಅನಿಯಮಿತ ನಷ್ಟ ಪರಿಹಾರ, ಪಾವತಿ ವಿಳಂಬಕ್ಕೆ ಶೂನ್ಯ ದಂಡ, ಕೆಲಸಗಾರನಿಗೆ 180 ದಿನಗಳ ನಿರ್ಬಂಧ.",
    },
    input: {
      title: "ಅಥವಾ ನಿಮ್ಮ ಸ್ವಂತ ಒಪ್ಪಂದವನ್ನು ಪರೀಕ್ಷಿಸಿ",
      subtitle: "ಕಾನೂನು ಪಠ್ಯವನ್ನು ಅಂಟಿಸಿ ಅಥವಾ PDF ಒಪ್ಪಂದವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      placeholder: "ಬಾಡಿಗೆ ಒಪ್ಪಂದ, ಉದ್ಯೋಗ ಆಫರ್ ಅಥವಾ ಫ್ರೀಲ್ಯಾನ್ಸ್ ಒಪ್ಪಂದದ ಪಠ್ಯವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ... (ಉದಾ: 11 ತಿಂಗಳ ಬೆಂಗಳೂರು ಬಾಡಿಗೆ ಒಪ್ಪಂದ, 10 ತಿಂಗಳ ಠೇವಣಿ, ಅಥವಾ ಕಠಿಣ ಉದ್ಯೋಗ ನಿಯಮಗಳು)",
      chars: "ಅಕ್ಷರಗಳು",
      uploadBtn: "PDF ಅಥವಾ ಪಠ್ಯ ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
      cameraBtn: "ಕ್ಯಾಮೆರಾ / ಸ್ಟ್ಯಾಂಪ್ ಪೇಪರ್ ಫೋಟೋ",
      readyPdf: "ದಾಖಲೆ ಲೋಡ್ ಆಗಿದೆ, ಪರಿಶೀಲನೆಗೆ ಸಿದ್ಧವಾಗಿದೆ",
      scanBtn: "DeFang Cedar ಎಂಜಿನ್‌ನೊಂದಿಗೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      scanningBtn: "Strands + Cedar ಮೂಲಕ ಪರಿಶೀಲನೆ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ...",
      engineInfo: "ಎಂಜಿನ್: ಸ್ಥಳೀಯ ನಿಯಮ ಪರೀಕ್ಷಕ + AWS Cedar ಪಾಲಿಸಿ ಎಂಜಿನ್",
      offlineBadge: "*ಮೇಲಿನ ಎಲ್ಲಾ ಡೆಮೊಗಳು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ 100% ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ರನ್ ಆಗುತ್ತವೆ",
    },
    results: {
      backBtn: "ಇನ್ನೊಂದು ಒಪ್ಪಂದ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
      shareBtn: "ಆಡಿಟ್ ವರದಿ ಹಂಚಿಕೊಳ್ಳಿ",
      printBtn: "ಪ್ರಿಂಟ್ / PDF",
      downloadBtn: "ವರದಿ ಡೌನ್‌ಲೋಡ್",
      downloadedToast: "📋 ಕಾನೂನು ಆಡಿಟ್ ವರದಿ ಯಶಸ್ವಿಯಾಗಿ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ!",
      sharedToast: "📋 ಆಡಿಟ್ ಸಾರಾಂಶವನ್ನು ಕ್ಲಿಪ್‌ಬೋರ್ಡ್‌ಗೆ ಕಾಪಿ ಮಾಡಲಾಗಿದೆ!",
      cedarExecuted: "Cedar ಎಂಜಿನ್: ಎಲ್ಲಾ 8/8 ಶಾಸನಬದ್ಧ ಪಾಲಿಸಿಗಳು ಜಾರಿಯಾಗಿವೆ",
      clauseAuditTitle: "ಕಲಂ-ವಾರು ಶಾಸನಬದ್ಧ ತಪಾಸಣೆ",
      clauseAuditSubtitle: "ಶಾಸನ ಉಲ್ಲಂಘನೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ನ್ಯಾಯಯುತ ತಿದ್ದುಪಡಿ ನೋಡಿ, ಅಥವಾ WhatsApp ಮಾತುಕತೆ ಸಂದೇಶಗಳನ್ನು ಬಳಸಿ",
      filterAll: "ಎಲ್ಲಾ",
      filterDeny: "ಅಪಾಯಕಾರಿ (Red Flags)",
      filterAllow: "ಕಾನೂನುಬದ್ಧ",
      noClauses: "ಆಯ್ದ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಕಲಂಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    },
    riskHero: {
      scoreLabel: "DeFang ಅಪಾಯ ಸ್ಕೋರ್",
      redFlags: "ಗಂಭೀರ ಉಲ್ಲಂಘನೆಗಳು",
      compliant: "ಕಾನೂನುಬದ್ಧ",
      totalClauses: "ಒಟ್ಟು ಕಲಂಗಳು",
      cedarDeny: "Cedar DENY",
      cedarAllow: "Cedar ALLOW",
      statusCritical: "ಅತ್ಯಂತ ಗಂಭೀರ ಅಪಾಯ (CRITICAL)",
      statusSevere: "ಹೆಚ್ಚಿನ ಅಪಾಯ (SEVERE)",
      statusModerate: "ಮಧ್ಯಮ ಅಪಾಯ (MODERATE)",
      statusLow: "ಸುರಕ್ಷಿತ (LOW RISK)",
    },
    rupeeTrap: {
      title: "ಗುಪ್ತ ಆರ್ಥಿಕ ಬಲೆ ಸಿಮ್ಯುಲೇಟರ್ (Rupee Trap)",
      subtitle: "ಅನ್ಯಾಯದ ಠೇವಣಿ ಕಡಿತ ಮತ್ತು ದಂಡಗಳಿಂದ ನಿಮಗೆ ಸಂಭವಿಸಬಹುದಾದ ನಷ್ಟ",
      trapCount: "ಆರ್ಥಿಕ ಬಲೆಗಳು",
      alertBanner: "ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ ಮತ್ತು ಒಪ್ಪಂದ ಕಾಯ್ದೆ ಸೆಕ್ಷನ್ 74 ರ ಅಡಿಯಲ್ಲಿ ಅಸಿಂಧು ಹಣಕಾಸು ಕಡಿತಗಳು",
      breakdownToggle: "ವಿವರವಾದ ನಷ್ಟ ವಿಶ್ಲೇಷಣೆ",
      atRisk: "ಅಪಾಯದಲ್ಲಿರುವ ಮೊತ್ತ",
    },
    powerImbalance: {
      title: "ಅಧಿಕಾರದ ಅಸಮತೋಲನ ಮೀಟರ್ (Power Imbalance)",
      subtitle: "ಒಪ್ಪಂದದಲ್ಲಿ ಇನ್ನೊಂದು ಪಕ್ಷದ ಪರವಾಗಿರುವ ಏಕಮುಖ ಷರತ್ತುಗಳ ವಿಶ್ಲೇಷಣೆ",
      biasStatus: (landlord, tenant) => `${landlord}% ಮಾಲೀಕರ ಪರ | ${tenant}% ರಕ್ಷಿತ`,
      counterparty: (pct) => `ಮಾಲೀಕರು / ಸಂಸ್ಥೆಯ ಪರ (${pct}%)`,
      user: (pct) => `ನೀವು / ಬಾಡಿಗೆದಾರರ ಪರ (${pct}%)`,
      scaleOneSided: "0% (ತೀವ್ರ ಏಕಮುಖ)",
      scaleEquitable: "50% (ಸಮತೋಲಿತ)",
      scaleProtected: "100% (ಸಂಪೂರ್ಣ ರಕ್ಷಿತ)",
      hypocrisyTitle: "ಒಪ್ಪಂದದಲ್ಲಿ ಏಕಮುಖ ಕಪಟತನ ಕಂಡುಬಂದಿದೆ",
    },
    clauseCard: {
      plainLabel: "ಸರಳ ವಿವರಣೆ:",
      ruleLabel: "ಔಪಚಾರಿಕ Cedar ಶಾಸನಬದ್ಧ ನಿಯಮ:",
      audioListen: "ಕೇಳಿ (ಆಡಿಯೋ)",
      audioStop: "ನಿಲ್ಲಿಸಿ",
      diffOpen: "ನ್ಯಾಯಯುತ ತಿದ್ದುಪಡಿ ಹೋಲಿಕೆ",
      diffClose: "ಹೋಲಿಕೆ ಮುಚ್ಚಿ",
      diffOriginal: "ಮೂಲ ಅನ್ಯಾಯದ ಕಲಂ (DENY)",
      diffFair: "ಶಾಸನಬದ್ಧ ನ್ಯಾಯಯುತ ಕಲಂ (Model Tenancy / Contract Act)",
      diplomatOpen: "3-ಹಂತದ WhatsApp ಸಂಧಾನ",
      diplomatClose: "WhatsApp ಮುಚ್ಚಿ",
      diplomatTitle: "WhatsApp ಸಂಧಾನ ಸಹಾಯಕ",
      diplomatSubtitle: "ಮಾಲೀಕರು ಅಥವಾ ಎಚ್‌ಆರ್ ಜೊತೆ ಮಾತನಾಡಲು ಸಿದ್ಧ ಸಂದೇಶಗಳು",
      tonePolite: "1. ವಿನಮ್ರ / ಗೌರವಯುತ (ಹಿರಿಯರಿಗೆ)",
      toneFirm: "2. ವೃತ್ತಿಪರ / ಸ್ಪಷ್ಟ (HR & ಕ್ಲೈಂಟ್ಸ್‌ಗೆ)",
      toneLegal: "3. ಕಾನೂನು ರಕ್ಷಣೆ (ಕಾಯ್ದೆ ಮತ್ತು ಸೆಕ್ಷನ್)",
      copyBtn: "ಕಾಪಿ ಮಾಡಿ",
      copiedBtn: "ಕಾಪಿ ಆಯಿತು!",
      sendWhatsAppBtn: "WhatsApp ನಲ್ಲಿ ಕಳುಹಿಸಿ",
      favorsLabel: "ಪರವಾಗಿರುವುದು:",
      favorsLandlord: "ಮಾಲೀಕರು / ಕಂಪನಿ ಪರ",
      favorsTenant: "ಬಾಡಿಗೆದಾರ / ಉದ್ಯೋಗಿ ಪರ",
      favorsNeutral: "ತಟಸ್ಥ",
      statuteLabel: "ಕಾನೂನು:",
      severityLabel: "ತೀವ್ರತೆ:",
    },
    dualEngine: {
      title: "ಉಭಯ-ಎಂಜಿನ್ ಶಾಸನಬದ್ಧ ವಾಸ್ತುಶಿಲ್ಪ",
      subtitle: "Strands AI ಏಜೆಂಟ್ ಹೊರತೆಗೆಯುವಿಕೆ + AWS Cedar ಔಪಚಾರಿಕ ಪಾಲಿಸಿ ದೃಢೀಕರಣ",
      stage1Badge: "ಹಂತ 1: AI ಏಜೆಂಟ್ ಹೊರತೆಗೆಯುವಿಕೆ",
      stage2Badge: "ಹಂತ 2: Cedar ಪಾಲಿಸಿ ಪರಿಶೀಲನೆ",
      stage1Title: "Strands AI ಏಜೆಂಟ್",
      stage1Extracting: "ಕಲಂಗಳು ಮತ್ತು ಕಾನೂನು ನಿಯತಾಂಕಗಳ ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ...",
      stage1Done: "ಕಲಂಗಳ ರಚನೆ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ",
      stage2Title: "AWS Cedar ಪಾಲಿಸಿ ಎಂಜಿನ್",
      stage2Verifying: "ಭಾರತೀಯ ಕಾನೂನುಗಳ ಪ್ರಕಾರ ಪ್ರತಿ ಕಲಂ ಪರೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ...",
      stage2Done: "ಎಲ್ಲಾ 8 .cedar ಶಾಸನಬದ್ಧ ಪಾಲಿಸಿಗಳು ಜಾರಿಯಾಗಿವೆ",
      modelLabel: "ಮಾದರಿ: Strands Statutory Parser",
      durationLabel: "ತೆಗೆದುಕೊಂಡ ಸಮಯ: ~1.4s",
    },
  },
};

export const getTranslation = (lang: Language): TranslationDictionary => {
  return translations[lang] || translations.en;
};

/**
 * Localized WhatsApp messages for common Indian contract violations
 */
export const getLocalizedWhatsApp = (
  policyId: string,
  lang: Language,
  fallbackVariants: { polite: string; firm: string; legal: string }
): { polite: string; firm: string; legal: string } => {
  if (lang === 'hi') {
    if (policyId === 'deposit_cap') {
      return {
        polite: "नमस्ते जी, अनुबंध में सुरक्षा जमा (सिक्योरिटी डिपॉजिट) के संबंध में: मॉडल टेनेंसी एक्ट 2021 के अनुसार आवासीय किराए के लिए अधिकतम 2 महीने का किराया ही जमा लिया जा सकता है। क्या हम आपसी सहमति से इसे ₹70,000 कर सकते हैं? धन्यवाद।",
        firm: "नमस्कार, अनुबंध के ड्राफ्ट में क्लॉज 2 के तहत 10 महीने का किराया (₹3,50,000) बतौर सिक्योरिटी डिपॉजिट मांगा गया है, जो मॉडल टेनेंसी एक्ट 2021 की धारा 9 का खुला उल्लंघन है। कृपया हस्ताक्षर से पूर्व इसे 2 महीने के किराए तक सीमित कर संशोधित ड्राफ्ट साझा करें।",
        legal: "ध्यातव्य है कि क्लॉज 2 में 10 महीने का सुरक्षा जमा मांगना मॉडल टेनेंसी एक्ट 2021 की धारा 9 के प्रावधानों के विरुद्ध है। वैधानिक अनुपालन हेतु इसे तुरंत 2 महीने के किराए (₹70,000/-) पर संशोधित करें।"
      };
    }
    if (policyId === 'painting_deduction') {
      return {
        polite: "नमस्ते जी, पेंटिंग शुल्क के संबंध में: मॉडल टेनेंसी एक्ट की धारा 15 के अनुसार सामान्य घिसावट (wear & tear) पर कटौती नहीं की जा सकती। क्या हम सहमति बना सकते हैं कि वास्तविक नुकसान होने पर ही बिल के आधार पर कटौती होगी?",
        firm: "नमस्कार, क्लॉज में बिना जांच सीधे 1 महीने का किराया पेंटिंग के नाम पर काटने का प्रावधान है। मॉडल टेनेंसी एक्ट की धारा 15 के तहत सामान्य उपयोग की घिसावट किराएदार से नहीं वसूली जा सकती। कृपया इसे बिल आधारित वास्तविक क्षतिपूर्ति तक सीमित करें।",
        legal: "धारा 15, मॉडल टेनेंसी एक्ट 2021 के तहत अनिवार्य अनपेक्षित कटौती एकतरफा अनुचित व्यापार व्यवहार है। कटौती केवल संयुक्त निकास निरीक्षण और वैध जीएसटी बिलों पर ही आधारित हो सकती है।"
      };
    }
    if (policyId === 'notice_asymmetry') {
      return {
        polite: "नमस्ते जी, नोटिस अवधि के संबंध में: ड्राफ्ट में मेरे लिए 90 दिन और आपके लिए केवल 15 दिन रखे गए हैं। क्या दोनों पक्षों की सुरक्षा के लिए परस्पर 30 दिन का समान नोटिस तय कर सकते हैं?",
        firm: "नमस्कार, नोटिस अवधि में भारी असंतुलन (90 दिन बनाम 15 दिन) निष्पक्ष नहीं है। कानून दोनों पक्षों के लिए समान नोटिस की अपेक्षा करता है। कृपया दोनों पक्षों के लिए 30 दिन का नोटिस अपडेट करें।",
        legal: "अनुबंध में नोटिस अवधि की यह असमानता भारतीय अनुबंध अधिनियम की धारा 23 के तहत गैर-वाजिब और एकतरफा है। निष्पक्षता हेतु दोनों पक्षों के लिए 30 दिन का पारस्परिक नोटिस अनिवार्य है।"
      };
    }
    if (policyId === 'non_compete_duration') {
      return {
        polite: "नमस्ते, ऑफर लेटर के नॉन-कंपीट क्लॉज के संबंध में: भारतीय अनुबंध अधिनियम 1872 की धारा 27 के तहत रोजगार समाप्ति के बाद व्यापार या नौकरी पर रोक लगाना कानूनन शून्य (Void) है। क्या हम इसे मानक गोपनीयता (Confidentiality) तक सीमित कर सकते हैं?",
        firm: "नमस्कार, ऑफर लेटर में 2 साल का नॉन-कंपीट प्रतिबंध भारतीय अनुबंध अधिनियम की धारा 27 का उल्लंघन करता है। कृपया इसे हटाकर उद्योग मानक नॉन-सॉलिसाइटेशन और गोपनीयता खंड में बदलें।",
        legal: "सर्वोच्च न्यायालय (Niranjan Golikari एवं Percept D'Mark निर्णय) के अनुसार धारा 27 भारतीय अनुबंध अधिनियम के तहत रोजगार बाद का प्रतिबंध पूर्णतः शून्य (Void ab initio) है। इसे तत्काल संशोधित करें।"
      };
    }
  }

  if (lang === 'te') {
    if (policyId === 'deposit_cap') {
      return {
        polite: "నమస్కారం అండి, ఒప్పందంలోని సెక్యూరిటీ డిపాజిట్ నిబంధన గురించి: మోడల్ టెనెన్సీ యాక్ట్ 2021 ప్రకారం నివాసానికి గరిష్టంగా 2 నెలల అద్దె మాత్రమే డిపాజిట్‌గా తీసుకోవాలి. దయచేసి డిపాజిట్‌ను ₹70,000 కు సవరించగలరా? ధన్యవాదాలు.",
        firm: "నమస్కారం, డ్రాఫ్ట్ అగ్రిమెంట్‌ను పరిశీలించాము: క్లాజ్ 2 లో 10 నెలల డిపాజిట్ అడగడం మోడల్ టెనెన్సీ యాక్ట్ 2021 సెక్షన్ 9 ప్రకారం చట్టవిరుద్ధం. దయచేసి సంతకం చేయడానికి ముందే 2 నెలల మొత్తానికి సవరించిన డ్రాఫ్ట్ పంపండి.",
        legal: "గమనిక: క్లాజ్ 2 లో ₹3,50,000/- డిపాజిట్ డిమాండ్ చేయడం మోడల్ టెనెన్సీ యాక్ట్ 2021 సెక్షన్ 9 నిబంధనలకు ప్రత్యక్ష ఉల్లంఘన. చట్టపరమైన చెల్లుబాటు కొరకు దీనిని వెంటనే ₹70,000/- కు సవరించండి."
      };
    }
    if (policyId === 'painting_deduction') {
      return {
        polite: "నమస్కారం అండి, పెయింటింగ్ ఖర్చుల నిబంధన గురించి: మోడల్ టెనెన్సీ చట్టం ప్రకారం సాధారణ వాడకం వల్ల వచ్చే మార్పులకు కోత విధించకూడదు. నిజమైన నష్టం జరిగినప్పుడు మాత్రమే బిల్లుల ఆధారంగా లెక్కించేలా సవరించగలరా?",
        firm: "నమస్కారం, ఇల్లు ఖాళీ చేసేటప్పుడు నేరుగా ఒక నెల అద్దె పెయింటింగ్ కోసం మినహాయించడం చట్టవిరుద్ధం. మోడల్ టెనెన్సీ చట్టం సెక్షన్ 15 ప్రకారం అద్దెదారుడు సాధారణ మార్పులకు బాధ్యుడు కాదు. కేవలం నిజమైన మరమ్మతు బిల్లులకే పరిమితం చేయండి.",
        legal: "మోడల్ టెనెన్సీ యాక్ట్ 2021 సెక్షన్ 15 ప్రకారం తప్పనిసరి పెయింటింగ్ కోత విధించడం చెల్లదు. ఖాళీ చేసే సమయ పరిశీలన మరియు జీఎస్టీ బిల్లుల ఆధారంగా మాత్రమే సర్దుబాటు జరగాలి."
      };
    }
    if (policyId === 'notice_asymmetry') {
      return {
        polite: "నమస్కారం అండి, నోటీసు పీరియడ్ నిబంధన గురించి: నా కోసం 90 రోజులు, మీ కోసం 15 రోజులు ఉంది. ఇద్దరికీ న్యాయంగా ఉండేలా పరస్పరం 30 రోజుల నోటీసుగా మార్చగలరా?",
        firm: "నమస్కారం, నోటీసు వ్యవధిలో ఈ అసమతుల్యత న్యాయబద్ధం కాదు. చట్ట ప్రకారం ఇరుపక్షాలకు సమానమైన నోటీసు ఉండాలి. దయచేసి ఇరువైపులా 30 రోజులుగా మార్చండి.",
        legal: "భారతీయ కాంట్రాక్ట్ చట్టం సెక్షన్ 23 ప్రకారం ఈ ఏకపక్ష నోటీసు నిబంధన చెల్లదు. ఇరుపక్షాలకు సమానమైన 30 రోజుల పరస్పర నోటీసును నమోదు చేయాలి."
      };
    }
    if (policyId === 'non_compete_duration') {
      return {
        polite: "నమస్కారం, జాబ్ ఆఫర్‌లోని నాన్-కాంపీట్ క్లాజ్ గురించి: ఇండియన్ కాంట్రాక్ట్ యాక్ట్ 1872 సెక్షన్ 27 ప్రకారం ఉద్యోగం మారిన తర్వాత పోటీ సంస్థల్లో పనిచేయకుండా నిరోధించడం చట్టరీత్యా చెల్లదు. దీనిని సాధారణ గోప్యతా నిబంధనగా సవరించగలరా?",
        firm: "నమస్కారం, 2 ఏళ్ల నాన్-కాంపీట్ షరతు భారతీయ కాంట్రాక్ట్ చట్టం సెక్షన్ 27 కి విరుద్ధం. దయచేసి దీనిని పరిశ్రమ ప్రమాణాల ప్రకారం నాన్-సాలిసిటేషన్ క్లాజ్‌గా మార్చండి.",
        legal: "సుప్రీం కోర్టు తీర్పుల ప్రకారం (Niranjan Golikari కేసు) సెక్షన్ 27 కాంట్రాక్ట్ చట్టం కింద ఉద్యోగానంతర ఆంక్షలు పూర్తిగా చెల్లవు (Void ab initio). దీనిని వెంటనే సవరించండి."
      };
    }
  }

  if (lang === 'kn') {
    if (policyId === 'deposit_cap') {
      return {
        polite: "ನಮಸ್ಕಾರ, ಒಪ್ಪಂದದಲ್ಲಿನ ಸೆಕ್ಯುರಿಟಿ ಠೇವಣಿ ಷರತ್ತಿನ ಬಗ್ಗೆ: ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ 2021 (Model Tenancy Act) ರ ಪ್ರಕಾರ ವಸತಿಗಾಗಿ ಗರಿಷ್ಠ 2 ತಿಂಗಳ ಬಾಡಿಗೆಯನ್ನು ಮಾತ್ರ ಠೇವಣಿಯಾಗಿ ಪಡೆಯಲು ಅವಕಾಶವಿದೆ. ದಯವಿಟ್ಟು ಠೇವಣಿಯನ್ನು ₹70,000 ಕ್ಕೆ ಸರಿಹೊಂದಿಸಬಹುದೇ? ಧನ್ಯವಾದಗಳು.",
        firm: "ನಮಸ್ಕಾರ, ಒಪ್ಪಂದದ ಕರಡನ್ನು ಪರಿಶೀಲಿಸಿದ್ದೇವೆ: ಕಲಂ 2 ರಲ್ಲಿ 10 ತಿಂಗಳ ಠೇವಣಿ ಕೇಳಿರುವುದು ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ 2021 ರ ಕಲಂ 9 ರ ಪ್ರಕಾರ ಕಾನೂನುಬಾಹಿರವಾಗಿದೆ. ದಯವಿಟ್ಟು ಸಹಿ ಮಾಡುವ ಮುನ್ನ 2 ತಿಂಗಳ ಮೊತ್ತಕ್ಕೆ ಸರಿಪಡಿಸಿದ ಕರಡನ್ನು ನೀಡಿ.",
        legal: "ಸೂಚನೆ: ಕಲಂ 2 ರ ಅಡಿಯಲ್ಲಿ ₹3,50,000/- ಠೇವಣಿ ಕೇಳಿರುವುದು ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ 2021 ರ ಸೆಕ್ಷನ್ 9 ರ ಸ್ಪಷ್ಟ ಉಲ್ಲಂಘನೆಯಾಗಿದೆ. ಕಾನೂನುಬದ್ಧ ಸಿಂಧುತ್ವಕ್ಕಾಗಿ ಇದನ್ನು ತಕ್ಷಣವೇ ₹70,000/- ಕ್ಕೆ ಸರಿಪಡಿಸಬೇಕಾಗಿದೆ."
      };
    }
    if (policyId === 'painting_deduction') {
      return {
        polite: "ನಮಸ್ಕಾರ, ಪೇಂಟಿಂಗ್ ಶುಲ್ಕದ ಬಗ್ಗೆ: ಬಾಡಿಗೆ ಕಾಯ್ದೆಯ ಪ್ರಕಾರ ಸಾಮಾನ್ಯ ಬಳಕೆಯ ಸವೆತಕ್ಕೆ (Normal wear and tear) ಪೂರ್ಣ ಕಡಿತ ಅನ್ವಯಿಸುವುದಿಲ್ಲ. ನೈಜ ದುರಸ್ತಿ ಬಿಲ್‌ಗಳ ಆಧಾರದ ಮೇಲೆ ಮಾತ್ರ ಲೆಕ್ಕ ಹಾಕುವಂತೆ ಪರಿಷ್ಕರಿಸಲು ವಿನಂತಿ.",
        firm: "ನಮಸ್ಕಾರ, ಮನೆ ಖಾಲಿ ಮಾಡುವಾಗ ನೇರವಾಗಿ ಒಂದು ತಿಂಗಳ ಬಾಡಿಗೆಯನ್ನು ಬಣ್ಣದ ಶುಲ್ಕವಾಗಿ ಕಡಿತಗೊಳಿಸುವುದು ಕಾನೂನಿಗೆ ವಿರುದ್ಧವಾಗಿದೆ. ಸೆಕ್ಷನ್ 15 ರ ಪ್ರಕಾರ ಸಾಮಾನ್ಯ ಸವೆತಕ್ಕೆ ಬಾಡಿಗೆದಾರರು ಹೊಣೆಯಲ್ಲ. ಕೇವಲ ನೈಜ ಬಿಲ್‌ಗಳಿಗೆ ಸೀಮಿತಗೊಳಿಸಿ.",
        legal: "ಮಾದರಿ ಬಾಡಿಗೆ ಕಾಯ್ದೆ ಸೆಕ್ಷನ್ 15 ರ ಅಡಿಯಲ್ಲಿ ಕಡ್ಡಾಯ ಪೇಂಟಿಂಗ್ ಕಡಿತ ಅಸಿಂಧುವಾಗಿದೆ. ಮನೆ ಖಾಲಿ ಮಾಡುವಾಗ ಜಂಟಿ ತಪಾಸಣೆ ಮತ್ತು ಜಿಎಸ್‌ಟಿ ಬಿಲ್‌ಗಳ ಆಧಾರದ ಮೇಲೆ ಮಾತ್ರ ಹೊಂದಾಣಿಕೆ ಮಾಡಬೇಕು."
      };
    }
    if (policyId === 'notice_asymmetry') {
      return {
        polite: "ನಮಸ್ಕಾರ, ನೋಟಿಸ್ ಅವಧಿಯ ಷರತ್ತಿನ ಬಗ್ಗೆ: ಕರಡಿನಲ್ಲಿ ನನಗೆ 90 ದಿನಗಳು ಮತ್ತು ನಿಮಗೆ 15 ದಿನಗಳು ಇದೆ. ಇಬ್ಬರಿಗೂ ಸಮಾನವಾಗಿ 30 ದಿನಗಳ ನೋಟಿಸ್ ಎಂದು ನಿಗದಿಪಡಿಸಬಹುದೇ?",
        firm: "ನಮಸ್ಕಾರ, ನೋಟಿಸ್ ಅವಧಿಯ ಈ ಅಸಮತೋಲನ ನ್ಯಾಯಸಮ್ಮತವಲ್ಲ. ಕಾನೂನಿನ ಪ್ರಕಾರ ಎರಡೂ ಕಡೆಯವರಿಗೆ ಸಮಾನ ನೋಟಿಸ್ ಇರಬೇಕು. ದಯವಿಟ್ಟು ಎರಡೂ ಕಡೆಯವರಿಗೆ 30 ದಿನಗಳ ನೋಟಿಸ್ ಎಂದು ಬದಲಾಯಿಸಿ.",
        legal: "ಭಾರತೀಯ ಒಪ್ಪಂದ ಕಾಯ್ದೆಯ ಕಲಂ 23 ರ ಅಡಿಯಲ್ಲಿ ಈ ಏಕಮುಖ ನೋಟಿಸ್ ಷರತ್ತು ಅಸಿಂಧುವಾಗಿದೆ. ಎರಡೂ ಕಡೆಯವರಿಗೆ 30 ದಿನಗಳ ಸಮಾನ ಪರಸ್ಪರ ನೋಟಿಸ್ ಕಡ್ಡಾಯವಾಗಿದೆ."
      };
    }
    if (policyId === 'non_compete_duration') {
      return {
        polite: "ನಮಸ್ಕಾರ, ಜಾಬ್ ಆಫರ್‌ನಲ್ಲಿನ ನಾನ್-ಕಾಂಪೀಟ್ ಷರತ್ತಿನ ಬಗ್ಗೆ: ಭಾರತೀಯ ಒಪ್ಪಂದ ಕಾಯ್ದೆ 1872 ರ ಕಲಂ 27 ರ ಪ್ರಕಾರ ಉದ್ಯೋಗ ಬಿಟ್ಟ ನಂತರ ಬೇರೆಡೆ ಕೆಲಸ ಮಾಡುವುದನ್ನು ನಿರ್ಬಂಧಿಸುವುದು ಕಾನೂನುಬಾಹಿರ (Void). ಇದನ್ನು ಸಾಮಾನ್ಯ ಗೌಪ್ಯತಾ ಷರತ್ತಿಗೆ ಸೀಮಿತಗೊಳಿಸಬಹುದೇ?",
        firm: "ನಮಸ್ಕಾರ, 2 ವರ್ಷಗಳ ನಾನ್-ಕಾಂಪೀಟ್ ನಿರ್ಬಂಧವು ಭಾರತೀಯ ಒಪ್ಪಂದ ಕಾಯ್ದೆ ಕಲಂ 27 ರ ಉಲ್ಲಂಘನೆಯಾಗಿದೆ. ದಯವಿಟ್ಟು ಇದನ್ನು ಉದ್ಯಮದ ಮಾನದಂಡದ ಪ್ರಕಾರ ಗೌಪ್ಯತಾ ಷರತ್ತಾಗಿ ಬದಲಾಯಿಸಿ.",
        legal: "ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ತೀರ್ಪುಗಳ (Niranjan Golikari ಪ್ರಕರಣ) ಪ್ರಕಾರ ಕಲಂ 27 ರ ಅಡಿಯಲ್ಲಿ ಉದ್ಯೋಗ ನಂತರದ ನಿರ್ಬಂಧಗಳು ಸಂಪೂರ್ಣ ಅಸಿಂಧು (Void ab initio). ಇದನ್ನು ತಕ್ಷಣ ತಿದ್ದುಪಡಿ ಮಾಡಿ."
      };
    }
  }

  return fallbackVariants;
};
