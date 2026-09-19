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
      header: "One-Click Demo Presets (Instant Offline Cache)",
      loadPreset: "Load Preset",
      rentalTitle: "Bangalore Rental Trap",
      rentalDesc: "10-month deposit, 1-month mandatory painting deduction, 90-day asymmetric notice, 3% daily late fees.",
      internshipTitle: "Toxic Startup Offer Letter",
      internshipDesc: "2-year non-compete, ₹2.5L training bond, 90-day employee notice vs 0-day employer termination.",
      freelanceTitle: "Predatory Tech MSA",
      freelanceDesc: "Perpetual non-compete, 4% daily delay penalty, unilateral IP assignment with zero kill-fee.",
    },
    input: {
      title: "Paste Contract Text or Upload PDF",
      subtitle: "Supports Indian Rental Agreements, Offer Letters, Employment Bonds, and Freelance MSAs",
      placeholder: "Paste any Indian tenancy, employment, or service contract here... (e.g. Indiranagar 11-month rent agreement, 2-year startup bond, or 4% daily late fee clause)",
      chars: "chars",
      uploadBtn: "Upload PDF or Text File",
      readyPdf: "Ready for PDF clause extraction with pdfplumber",
      scanBtn: "Run DeFang Dual-Engine Scan",
      scanningBtn: "Scanning with Strands + Cedar...",
      engineInfo: "Engine: Local Rule Parser (or Gemini if API key set) + AWS Cedar Engine",
      offlineBadge: "*Presets above run 100% offline on-device",
    },
    results: {
      backBtn: "Scan Another Agreement",
      shareBtn: "Share Audit",
      printBtn: "Download / Print Report",
      sharedToast: "📋 Full Legal Audit Summary copied to clipboard!",
      cedarExecuted: "Cedar Engine: 6/6 Policies Executed",
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
    },
  },
  hi: {
    navbar: {
      brandSubtitle: "भारतीय अनुबंध रेड-फ्लैग स्कैनर एवं वैधानिक नीति सत्यापनकर्ता",
      engineBadge: "Strands AI + AWS Cedar इंजन",
      newScan: "नया स्कैन",
    },
    hero: {
      enginePill: "AI एजेंट विश्लेषण + AWS Cedar वैधानिक सत्यापन",
      titleLine1: "अनुचित व एकतरफा भारतीय अनुबंधों पर हस्ताक्षर बंद करें।",
      titleLine2: "स्कैन करें, सुरक्षित करें, और सही बातचीत करें।",
      subtext: "मॉडल टेनेंसी एक्ट 2021, भारतीय अनुबंध अधिनियम 1872 (धारा 27 एवं 74), तथा सूदखोरी ऋण अधिनियम के तहत कानूनी नियमों की तत्काल निष्पक्ष जांच।",
    },
    presets: {
      header: "एक-क्लिक डेमो उदाहरण (100% ऑफलाइन कैश)",
      loadPreset: "अनुबंध लोड करें",
      rentalTitle: "बैंगलोर रेंटल ट्रैप (किराया अनुबंध)",
      rentalDesc: "10 महीने की अत्यधिक अग्रिम राशि, 1 महीने की अनिवार्य पेंटिंग कटौती, 90 दिन का एकतरफा नोटिस, और 3% दैनिक जुर्माना।",
      internshipTitle: "स्टार्टअप जॉब बॉन्ड (रोजगार अनुबंध)",
      internshipDesc: "2 साल का गैर-प्रतिस्पर्धा प्रतिबंध (Non-Compete), ₹2.5 लाख का प्रशिक्षण बॉन्ड, कर्मचारी के लिए 90 दिन नोटिस बनाम कंपनी का 0 दिन।",
      freelanceTitle: "टेक फ्रीलांस शोषण अनुबंध",
      freelanceDesc: "अनंत काल तक काम पर रोक, डिलीवरी में देरी पर 4% दैनिक जुर्माना, और बिना भुगतान के अनुबंध रद्दीकरण।",
    },
    input: {
      title: "अनुबंध का पाठ (Text) पेस्ट करें या PDF अपलोड करें",
      subtitle: "किराया समझौता, ऑफर लेटर, एम्प्लॉयमेंट बॉन्ड, और फ्रीलांस अनुबंधों की संपूर्ण जांच",
      placeholder: "अपना किराया समझौता, जॉब बॉन्ड या सेवा अनुबंध यहाँ पेस्ट करें... (उदा. 11 महीने का रेंटल एग्रीमेंट, 2 साल का जॉब बॉन्ड, या अत्यधिक ब्याज का नियम)",
      chars: "अक्षर",
      uploadBtn: "PDF या टेक्स्ट दस्तावेज़ अपलोड करें",
      readyPdf: "pdfplumber द्वारा PDF से क्लॉज निकालने के लिए तैयार",
      scanBtn: "DeFang Cedar इंजन से स्कैन करें",
      scanningBtn: "Strands + Cedar द्वारा जांच जारी...",
      engineInfo: "इंजन: स्थानीय वैधानिक पार्सर + AWS Cedar नीति इंजन",
      offlineBadge: "*ऊपर दिए गए सभी उदाहरण 100% ऑफलाइन चलते हैं",
    },
    results: {
      backBtn: "दूसरा अनुबंध जांचें",
      shareBtn: "ऑडिट रिपोर्ट शेयर करें",
      printBtn: "प्रमाणित रिपोर्ट डाउनलोड / प्रिंट करें",
      sharedToast: "📋 कानूनी ऑडिट सारांश क्लिपबोर्ड पर कॉपी हो गया!",
      cedarExecuted: "Cedar इंजन: सभी 6/6 वैधानिक नीतियां जांची गईं",
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
      titleLine1: "అన్యాయమైన భారతీయ ఒప్పందాలపై సంతకం చేయడం ఆపండి.",
      titleLine2: "స్కాన్ చేయండి, రక్షణ పొందండి, ధైర్యంగా చర్చించండి.",
      subtext: "మోడల్ టెనెన్సీ చట్టం 2021, భారతీయ కాంట్రాక్ట్ చట్టం 1872 (సెక్షన్ 27 & 74), మరియు వడ్డీ నియంత్రణ చట్టాల ప్రకారం ఖచ్చితమైన విశ్లేషణ.",
    },
    presets: {
      header: "ఒక్క క్లిక్ డెమో ఉదాహరణలు (100% ఆఫ్‌లైన్ క్యాష్)",
      loadPreset: "ఒప్పందం తెరవండి",
      rentalTitle: "బెంగళూరు అద్దె ఒప్పందం (రెంటల్ ట్రాప్)",
      rentalDesc: "10 నెలల అడ్వాన్స్ డిపాజిట్, 1 నెల తప్పనిసరి పెయింటింగ్ కోత, 90 రోజుల ఏకపక్ష నోటీసు, మరియు రోజుకు 3% ఆలస్య రుసుము.",
      internshipTitle: "స్టార్టప్ జాబ్ బాండ్ (ఉద్యోగ ఒప్పందం)",
      internshipDesc: "2 సంవత్సరాల నాన్-కాంపీట్ ఆంక్షలు, ₹2.5 లక్షల శిక్షణ బాండ్, ఉద్యోగికి 90 రోజుల నోటీసు వర్సెస్ కంపెనీకి 0 రోజుల తొలగింపు.",
      freelanceTitle: "టెక్ ఫ్రీలాన్స్ దోపిడీ ఒప్పందం",
      freelanceDesc: "శాశ్వత పని ఆంక్షలు, డెలివరీ ఆలస్యానికి రోజుకు 4% జరిమానా, మరియు ఎలాంటి పరిహారం లేకుండా ప్రాజెక్ట్ రద్దు.",
    },
    input: {
      title: "కాంట్రాక్ట్ టెక్స్ట్ పేస్ట్ చేయండి లేదా PDF అప్‌లోడ్ చేయండి",
      subtitle: "ఇంటి అద్దె ఒప్పందాలు, ఆఫర్ లెటర్లు, ఎంప్లాయ్‌మెంట్ బాండ్లు మరియు ఫ్రీలాన్స్ ఒప్పందాల పూర్తి తనిఖీ",
      placeholder: "మీ అద్దె ఒప్పందం లేదా ఉద్యోగ కాంట్రాక్ట్‌ను ఇక్కడ పేస్ట్ చేయండి... (ఉదా: 11 నెలల అద్దె అగ్రిమెంట్, 2 ఏళ్ల జాబ్ బాండ్, లేదా అధిక జరిమానా నిబంధనలు)",
      chars: "అక్షరాలు",
      uploadBtn: "PDF లేదా టెక్స్ట్ ఫైల్ అప్‌లోడ్ చేయండి",
      readyPdf: "pdfplumber ద్వారా PDF క్లాజ్ వెలికితీతకు సిద్ధంగా ఉంది",
      scanBtn: "DeFang Cedar ఇంజిన్‌తో స్కాన్ చేయండి",
      scanningBtn: "Strands + Cedar ద్వారా తనిఖీ జరుగుతోంది...",
      engineInfo: "ఇంజిన్: స్థానిక రూల్ పార్సర్ + AWS Cedar పాలసీ ఇంజిన్",
      offlineBadge: "*పై డెమోలన్నీ మీ పరికరంలో 100% ఆఫ్‌లైన్‌లో రన్ అవుతాయి",
    },
    results: {
      backBtn: "మరొక ఒప్పందాన్ని తనిఖీ చేయండి",
      shareBtn: "ఆడిట్ నివేదికను షేర్ చేయండి",
      printBtn: "నివేదికను డౌన్‌లోడ్ / ప్రింట్ చేయండి",
      sharedToast: "📋 చట్టపరమైన ఆడిట్ సారాంశం క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!",
      cedarExecuted: "Cedar ఇంజిన్: మొత్తం 6/6 చట్టబద్ధమైన పాలసీలు అమలు చేయబడ్డాయి",
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
        polite: "नमस्ते जी, अनुबंध के क्लॉज 2 (सिक्योरिटी डिपॉजिट) के संबंध में: मॉडल टेनेंसी एक्ट 2021 के अनुसार रिहायशी परिसर के लिए अधिकतम 2 महीने की सुरक्षा जमा ही मान्य है। क्या हम इसे 2 महीने (₹70,000) कर सकते हैं ताकि दोनों पक्ष नए नियमों के अनुरूप रहें? धन्यवाद।",
        firm: "नमस्कार, अनुबंध ड्राफ्ट की समीक्षा करने पर पाया गया कि क्लॉज 2 में 10 महीने का डिपॉजिट मांगा गया है। मॉडल टेनेंसी एक्ट 2021 की धारा 9 के तहत 2 महीने से अधिक का डिपॉजिट गैर-कानूनी है। कृपया हस्ताक्षर से पहले इसे संशोधित करें।",
        legal: "सादर सूचित किया जाता है कि क्लॉज 2 में ₹3,50,000/- डिपॉजिट की मांग मॉडल टेनेंसी एक्ट 2021 (धारा 9) का सीधा उल्लंघन है, जो अधिकतम 2 महीने तक सीमित करती है। कृपया कानूनी विवाद से बचने के लिए इसे ₹70,000/- करें।"
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

  return fallbackVariants;
};
