"""
Authentic Indian Contract Presets for DeFang.
Includes full realistic contract text, pre-extracted clauses, Cedar policy triggers,
GitHub diff rewrites, 3-tone WhatsApp Diplomat responses, and pre-cached multilingual outputs (EN, HI, TE).
"""

PRESETS = {
    "preset_rental_bangalore": {
        "id": "preset_rental_bangalore",
        "title": "Bengaluru 11-Month Rental Agreement",
        "category": "Residential Tenancy",
        "jurisdiction": "Karnataka / Model Tenancy Act 2021",
        "badge": "High Risk — 5 Red Flags",
        "description": "Standard Indiranagar 2BHK rental agreement containing notorious Bengaluru landlord clauses: 10-month deposit, mandatory painting deduction, and early exit forfeiture.",
        "raw_text": """RESIDENTIAL RENTAL AGREEMENT

This Rental Agreement is made and executed at Bengaluru on this 1st day of April 2026, by and between:
Mr. R. K. Sharma, residing at Indiranagar, Bengaluru (hereinafter referred to as the 'LESSOR / LANDLORD') of the ONE PART;
AND
Mr. Shiva Kumar, residing at Bengaluru (hereinafter referred to as the 'LESSEE / TENANT') of the OTHER PART.

WHEREAS the Lessor is the absolute owner of the residential flat situated at Flat No. 302, 2nd Cross, 100ft Road, Indiranagar, Bengaluru - 560038.

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

1. MONTHLY RENT AND TENURE:
The Lessee agrees to pay a monthly rent of Rs. 35,000/- (Rupees Thirty-Five Thousand only) payable on or before the 5th of each English calendar month in advance. The tenure of this tenancy shall be for 11 months commencing from 1st April 2026.

2. SECURITY DEPOSIT (CLAUSE 2):
The Lessee has paid a sum of Rs. 3,50,000/- (Rupees Three Lakhs Fifty Thousand only) as interest-free refundable Security Deposit to the Lessor. The Lessor shall refund the said deposit only after the physical handover of the premises and after deducting all damages and mandatory painting charges.

3. MANDATORY PAINTING CHARGES (CLAUSE 3):
At the time of vacating the schedule premises, a non-negotiable mandatory sum equivalent to one month's rent, i.e., Rs. 35,000/- (Rupees Thirty-Five Thousand only), shall be compulsorily deducted from the Security Deposit towards repainting and deep cleaning charges, irrespective of the actual condition of walls or wear and tear.

4. NOTICE PERIOD AND TERMINATION (CLAUSE 4):
The Lessee (Tenant) shall strictly serve three (3) full calendar months prior written notice before vacating the premises. The Lessor (Landlord) reserves the right to terminate this tenancy at any time by giving fifteen (15) calendar days notice without citing any reason whatsoever.

5. LATE PAYMENT PENALTY (CLAUSE 5):
In case of any delay in payment of the monthly rent beyond the 5th of the month, the Lessee shall be liable to pay a penal interest of 3% per day on the outstanding rent until complete clearance.

6. LOCK-IN PERIOD AND PREMATURE EXIT (CLAUSE 6):
The first 11 months shall be deemed a strict lock-in period. If the Lessee terminates the tenancy or vacates the premises prior to the completion of the 11-month tenure, the entire Security Deposit of Rs. 3,50,000/- shall be unconditionally forfeited to the Lessor as liquidated damages.

IN WITNESS WHEREOF the parties have set their hands on the day and year first above written.""",
        "monthly_rent_inr": 35000,
        "clauses": [
            {
                "clause_id": 1,
                "clause_text": "The Lessee has paid a sum of Rs. 3,50,000/- as interest-free refundable Security Deposit to the Lessor.",
                "category": "deposit",
                "extracted_value": {
                    "amount_inr": 350000,
                    "monthly_rent_inr": 35000,
                    "duration_months": 11,
                    "tenant_notice_days": 0,
                    "landlord_notice_days": 0,
                    "daily_interest_pct": 0,
                    "painting_deduction_mandatory": False,
                    "full_deposit_forfeited_on_early_exit": False
                },
                "favors": "landlord",
                "eli5": "The landlord is asking for 10 months rent as deposit (Rs. 3.5 Lakhs). Under the Model Tenancy Act 2021, landlords cannot take more than 2-3 months rent as deposit for residential premises.",
                "eli5_hi": "मकान मालिक 10 महीने का किराया (₹3.5 लाख) सिक्योरिटी डिपॉजिट मांग रहा है। मॉडल टेनेंसी एक्ट 2021 के तहत आवासीय फ्लैट के लिए 2-3 महीने से अधिक का डिपॉजिट गैर-कानूनी है।",
                "eli5_te": "ఇంటి యజమాని 10 నెలల అద్దెను (రూ. 3.5 లక్షలు) డిపాజిట్‌గా అడుగుతున్నారు. మోడల్ టెనెన్సీ యాక్ట్ 2021 ప్రకారం 2-3 నెలల అద్దెకు మించి డిపాజిట్ తీసుకోవడం చట్టవిరుద్ధం.",
                "rewritten_fair_text": "The Lessee shall pay a sum of Rs. 70,000/- (Rupees Seventy Thousand only), equivalent to two (2) months' rent, as interest-free refundable Security Deposit, to be refunded within 14 days of handover per Model Tenancy Act 2021 guidelines.",
                "whatsapp_polite": "Namaste Uncle, regarding Clause 2 of the agreement: As per the Model Tenancy Act 2021, the maximum residential security deposit is capped at 2 months' rent (₹70,000). Could we kindly update the deposit to ₹70,000 so both of us remain compliant with the latest tenancy framework?",
                "whatsapp_firm": "Hello Sharma ji, reviewing the draft agreement: Clause 2 specifies a 10-month deposit of ₹3.5L. Under Section 9 of the Model Tenancy Act 2021, residential security deposits cannot exceed 2 months' rent (₹70,000). Please issue an amended draft reflecting ₹70,000 deposit before signing.",
                "whatsapp_legal": "Dear Lessor, Notice is hereby given that Clause 2 demanding Rs. 3,50,000/- security deposit directly violates Section 9 of the Model Tenancy Act, 2021, which statutorily caps residential tenancy deposits at a maximum of 2 months rent. Kindly amend Clause 2 to Rs. 70,000/- to prevent invalidation under tenancy tribunal jurisprudence."
            },
            {
                "clause_id": 2,
                "clause_text": "At the time of vacating, a non-negotiable mandatory sum equivalent to one month's rent (Rs. 35,000/-) shall be compulsorily deducted from the Security Deposit towards repainting and deep cleaning charges, irrespective of actual condition.",
                "category": "deposit",
                "extracted_value": {
                    "amount_inr": 35000,
                    "monthly_rent_inr": 35000,
                    "duration_months": 0,
                    "tenant_notice_days": 0,
                    "landlord_notice_days": 0,
                    "daily_interest_pct": 0,
                    "painting_deduction_mandatory": True,
                    "full_deposit_forfeited_on_early_exit": False
                },
                "favors": "landlord",
                "eli5": "Automatic deduction of 1 month rent (Rs. 35,000) for painting without proving damages is unfair. Tenancy law requires landlords to absorb normal wear and tear.",
                "eli5_hi": "दीवारों की स्थिति देखे बिना पेंटिंग के नाम पर सीधे 1 महीने का किराया (₹35,000) काटना गलत है। सामान्य घिसावट (wear & tear) मकान मालिक को वहन करनी होती है।",
                "eli5_te": "గోడల పరిస్థితిని చూడకుండా పెయింటింగ్ పేరిట నేరుగా ఒక నెల అద్దె (రూ. 35,000) కట్ చేయడం చట్టవిరుద్ధం. సాధారణ ఉపయోగం వల్ల వచ్చే మార్పులకు యజమానే బాధ్యత వహించాలి.",
                "rewritten_fair_text": "Normal wear and tear shall be accepted without deduction. Repainting deductions shall only occur if structural damage or defacement is documented jointly at move-out, backed by actual contractor tax invoices.",
                "whatsapp_polite": "Hello Uncle, about the mandatory painting deduction: Since normal wear and tear is legally expected over 11 months, could we agree that deductions only apply if there is actual physical damage beyond standard usage, supported by repair bills?",
                "whatsapp_firm": "Hi Sharma ji, Clause 3 mandates a blanket ₹35,000 deduction for painting. Per Section 15 of the Model Tenancy Act, tenants are not liable for normal wear and tear. Deductions must be limited to actual damage documented in a joint exit inspection with verified receipts.",
                "whatsapp_legal": "RE: Clause 3 (Mandatory Painting Deduction). Take notice that statutory tenancy jurisprudence (Sec 15, Model Tenancy Act 2021) protects lessees from liabilities arising out of reasonable wear and tear. Mandatory arbitrary deductions constitute an unfair trade practice. Deductions must be strictly condition-contingent and backed by GST-compliant invoices."
            },
            {
                "clause_id": 3,
                "clause_text": "The Lessee (Tenant) shall strictly serve three (3) full calendar months prior written notice before vacating the premises. The Lessor (Landlord) reserves the right to terminate this tenancy at any time by giving fifteen (15) calendar days notice without citing any reason.",
                "category": "notice_period",
                "extracted_value": {
                    "amount_inr": 0,
                    "monthly_rent_inr": 35000,
                    "duration_months": 0,
                    "tenant_notice_days": 90,
                    "landlord_notice_days": 15,
                    "daily_interest_pct": 0,
                    "painting_deduction_mandatory": False,
                    "full_deposit_forfeited_on_early_exit": False
                },
                "favors": "landlord",
                "eli5": "Tenant must give 90 days notice, but landlord can evict you in just 15 days! This 6x imbalance violates principles of natural justice.",
                "eli5_hi": "किराएदार को 3 महीने (90 दिन) का नोटिस देना होगा, जबकि मकान मालिक सिर्फ 15 दिन में निकाल सकता है! यह भारी असंतुलन पूरी तरह अनुचित है।",
                "eli5_te": "అద్దెదారు ఖాళీ చేయడానికి 90 రోజుల నోటీసు ఇవ్వాలి, కానీ యజమాని కేవలం 15 రోజుల్లో ఖాళీ చేయించవచ్చు! ఇది తీవ్రమైన ఏకపక్ష వివక్ష.",
                "rewritten_fair_text": "Either party may terminate this agreement by providing one (1) month (30 days) prior written notice, or payment of one month's rent in lieu of notice, ensuring reciprocal and mutual fairness.",
                "whatsapp_polite": "Uncle, in Clause 4, the notice period is 90 days for me but only 15 days for you. Could we make this mutual and balanced at 30 days for both parties? That gives fair time to both of us.",
                "whatsapp_firm": "Sharma ji, the notice period clause is completely asymmetric (90 days for tenant vs 15 days for landlord). For equal legal reciprocity, this must be standardized to 30 days for both sides.",
                "whatsapp_legal": "Notice Regarding Clause 4: The 90-day tenant vs 15-day landlord notice disparity violates the fundamental doctrine of mutuality and natural justice. Mutual bilateral notice covenants must be symmetric at 30 days for enforceability under Indian law."
            },
            {
                "clause_id": 4,
                "clause_text": "In case of any delay in payment of the monthly rent beyond the 5th of the month, the Lessee shall be liable to pay a penal interest of 3% per day on the outstanding rent until complete clearance.",
                "category": "penalty",
                "extracted_value": {
                    "amount_inr": 1050,
                    "monthly_rent_inr": 35000,
                    "duration_months": 0,
                    "tenant_notice_days": 0,
                    "landlord_notice_days": 0,
                    "daily_interest_pct": 3,
                    "painting_deduction_mandatory": False,
                    "full_deposit_forfeited_on_early_exit": False
                },
                "favors": "landlord",
                "eli5": "3% per day late fee equals 1,095% annual interest rate! The Usurious Loans Act and Indian Courts strike down interest rates over 2% per day as predatory extortion.",
                "eli5_hi": "रोजाना 3% का जुर्माना यानी साल का 1095% ब्याज! कोर्ट ऐसे अत्यधिक ब्याज को गैर-कानूनी और वसूली मानकर खारिज कर देता है।",
                "eli5_te": "రోజుకు 3% ఆలస్య రుసుము అంటే ఏడాదికి 1095% వడ్డీ! ఇది తీవ్రమైన దోపిడీ మరియు కోర్టుల ప్రకారం చట్టవిరుద్ధం.",
                "rewritten_fair_text": "In the event of delay in rent payment exceeding a 7-day grace period, a standard one-time late fee of Rs. 500 or simple interest at 1% per month shall apply.",
                "whatsapp_polite": "Uncle, 3% per day late penalty works out to over 1000% annual rate if delayed by a few days due to banking issues. Could we replace this with a standard reasonable flat fee of ₹500 after a 5-day grace period?",
                "whatsapp_firm": "Regarding Clause 5: The 3% daily penalty is legally usurious under Indian contract law (Section 74). Please amend to standard market terms: 5 days grace period followed by simple 12% per annum pro-rata interest.",
                "whatsapp_legal": "Clause 5 Stipulation Notice: Imposition of 3% per-diem penal interest constitutes an illegal in-terrorem penalty under Section 74 of the Indian Contract Act 1872 and is struck down under the Usurious Loans Act 1918. Liquidated damages must reflect genuine pre-estimated losses."
            },
            {
                "clause_id": 5,
                "clause_text": "If the Lessee terminates the tenancy or vacates the premises prior to completion of 11 months, the entire Security Deposit of Rs. 3,50,000/- shall be unconditionally forfeited to the Lessor as liquidated damages.",
                "category": "termination",
                "extracted_value": {
                    "amount_inr": 350000,
                    "monthly_rent_inr": 35000,
                    "duration_months": 11,
                    "tenant_notice_days": 0,
                    "landlord_notice_days": 0,
                    "daily_interest_pct": 0,
                    "painting_deduction_mandatory": False,
                    "full_deposit_forfeited_on_early_exit": True
                },
                "favors": "landlord",
                "eli5": "Forfeiting your full Rs. 3.5 Lakh deposit if you have to move for a job transfer is strictly illegal under Indian Contract Act Section 74.",
                "eli5_hi": "समय से पहले फ्लैट खाली करने पर पूरा ₹3.5 लाख का डिपॉजिट जब्त कर लेना भारतीय अनुबंध अधिनियम की धारा 74 के तहत गैर-कानूनी है।",
                "eli5_te": "సమయం కంటే ముందే ఖాళీ చేస్తే మొత్తం రూ. 3.5 లక్షల డిపాజిట్ జప్తు చేస్తామనడం ఇండియన్ కాంట్రాక్ట్ యాక్ట్ సెక్షన్ 74 ప్రకారం పూర్తిగా చెల్లదు.",
                "rewritten_fair_text": "If the Lessee terminates during the lock-in period, the Lessee shall give 30 days notice or pay 1 month rent in lieu of notice, and the balance Security Deposit shall be refunded in full.",
                "whatsapp_polite": "Uncle, life circumstances or job transfers can happen unexpectedly. Forfeiting the entire ₹3.5L deposit is very harsh. Could we agree on 1 month rent deduction if early exit happens?",
                "whatsapp_firm": "Sharma ji, Clause 6 stipulates total forfeiture of ₹3,50,000 on early exit. Under Section 74 of the Indian Contract Act, penalties cannot exceed actual financial loss proved. We request substituting this with 1 month rent compensation.",
                "whatsapp_legal": "Legal Notice regarding Clause 6: Total forfeiture of Rs. 3,50,000/- deposit upon early exit constitutes an unenforceable penalty clause under Kailash Nath Associates v. DDA (Supreme Court of India) and Section 74 Indian Contract Act 1872. Landlord is only entitled to reasonable compensation for actual vacant period."
            }
        ]
    },
    "preset_internship_startup": {
        "id": "preset_internship_startup",
        "title": "Tech Startup Internship & Employment Agreement",
        "category": "Employment & IP",
        "jurisdiction": "Indian Contract Act 1872 & Labour Law",
        "badge": "Severe Restraints — 3 Red Flags",
        "description": "High-growth Bengaluru startup offer letter containing void 24-month non-compete, ₹2.5L training bond forfeiture, and sweeping 24/7 personal IP assignment.",
        "raw_text": """SOFTWARE ENGINEERING INTERNSHIP & EMPLOYMENT AGREEMENT

This Agreement is executed by and between ApexCore Technologies Pvt. Ltd., Koramangala, Bengaluru ('Company') and Candidate ('Intern / Employee').

CLAUSE 1: NON-COMPETE RESTRICTIONS
The Employee explicitly covenants that for a period of twenty-four (24) months following termination of association with the Company for any reason, the Employee shall not directly or indirectly join, consult for, or establish any entity operating in software, cloud computing, artificial intelligence, or web development anywhere in India or globally.

CLAUSE 2: TRAINING BOND AND PENALTY
The Intern agrees to undergo specialized mentorship. In consideration thereof, if the Intern resigns or departs before completing twenty-four (24) months of service, the Intern shall pay a mandatory non-negotiable bond penalty of Rs. 2,50,000/- immediately, with the Company holding all academic certificates as collateral.

CLAUSE 3: EQUIPMENT RETENTION PENALTY
Upon cessation of employment, company laptop and peripherals must be returned within 24 hours, failing which a penal deduction of Rs. 5,000 per day (exceeding 5% daily value) shall accrue against all pending wages.

CLAUSE 4: NOTICE ASYMMETRY
The Employee must provide ninety (90) days prior written notice. The Company reserves the unilateral right to terminate the Employee immediately with zero (0) days notice or severance.""",
        "monthly_rent_inr": 0,
        "clauses": [
            {
                "clause_id": 1,
                "clause_text": "The Employee covenants that for a period of twenty-four (24) months following termination, Employee shall not directly or indirectly join, consult for, or establish any software or tech entity anywhere in India or globally.",
                "category": "non_compete",
                "extracted_value": {
                    "amount_inr": 0,
                    "monthly_rent_inr": 0,
                    "duration_months": 24,
                    "tenant_notice_days": 0,
                    "landlord_notice_days": 0,
                    "daily_interest_pct": 0,
                    "painting_deduction_mandatory": False,
                    "full_deposit_forfeited_on_early_exit": False
                },
                "favors": "landlord",
                "eli5": "Under Section 27 of the Indian Contract Act 1872, all post-employment non-compete restrictions are 100% void ab initio. Companies cannot legally block you from taking another engineering job.",
                "eli5_hi": "भारतीय अनुबंध अधिनियम की धारा 27 के तहत नौकरी छोड़ने के बाद किसी दूसरी कंपनी में काम करने पर रोक लगाना पूरी तरह गैर-कानूनी (Void) है।",
                "eli5_te": "ఇండియన్ కాంట్రాక్ట్ యాక్ట్ సెక్షన్ 27 ప్రకారం ఉద్యోగం మారిన తర్వాత పోటీ సంస్థల్లో పనిచేయకుండా నిరోధించడం 100% చెల్లదు.",
                "rewritten_fair_text": "During the term of employment, Employee shall not engage in competing commercial ventures. Following departure, Employee shall be free to seek lawful employment subject only to non-disclosure of proprietary trade secrets.",
                "whatsapp_polite": "Hi Team, regarding Clause 1: As per Section 27 of the Indian Contract Act 1872, post-employment non-compete restrictions are void under Indian law. Could we amend this clause to focus on confidentiality and NDA protection instead?",
                "whatsapp_firm": "Hello HR, Clause 1 imposes a 24-month post-employment non-compete. Under Supreme Court precedent (Niranjan Shankar Golikari) and Section 27 of the Contract Act, restraints on trade post-separation are unenforceable in India. Please update to standard non-solicit / NDA covenants.",
                "whatsapp_legal": "LEGAL NOTICE: Clause 1 constitutes an illegal restraint of trade prohibited under Section 27 of the Indian Contract Act 1872. Indian courts uniformly refuse injunctions against former employees exercising their livelihood. Strike this clause or align with enforceable non-disclosure limitations."
            },
            {
                "clause_id": 2,
                "clause_text": "If the Intern departs before completing 24 months, the Intern shall pay a mandatory non-negotiable bond penalty of Rs. 2,50,000/- immediately, with Company holding academic certificates.",
                "category": "penalty",
                "extracted_value": {
                    "amount_inr": 250000,
                    "monthly_rent_inr": 0,
                    "duration_months": 24,
                    "tenant_notice_days": 0,
                    "landlord_notice_days": 0,
                    "daily_interest_pct": 0,
                    "painting_deduction_mandatory": False,
                    "full_deposit_forfeited_on_early_exit": True
                },
                "favors": "landlord",
                "eli5": "Employment bonds demanding arbitrary amounts (Rs. 2.5L) without proving actual specialized training expenses, and withholding certificates, violate fundamental rights and Section 74.",
                "eli5_hi": "बिना वास्तविक ट्रेनिंग खर्च साबित किए ₹2.5 लाख का बॉन्ड मांगना और ओरिजिनल सर्टिफिकेट जब्त करना अवैध और असंवैधानिक है।",
                "eli5_te": "నిజమైన ఖర్చులను చూపించకుండా రూ. 2.5 లక్షల బాండ్ అడగడం, ఒరిజినల్ సర్టిఫికెట్లను ఉంచుకోవడం చట్టవిరుద్ధం.",
                "rewritten_fair_text": "In the event of verifiable external specialized certifications funded by the Company, the Employee shall reimburse pro-rata documented costs if leaving within 6 months, with zero retention of certificates.",
                "whatsapp_polite": "Hi HR, regarding the training bond: I am fully committed to the role, but arbitrary financial penalties and certificate retention cause serious concern. Could we link reimbursement strictly to actual external training receipts on a pro-rata basis?",
                "whatsapp_firm": "Hello HR, Clause 2 specifies an arbitrary ₹2.5 Lakh penalty and retention of educational degrees. Withholding certificates violates UGC guidelines and Ministry directives. We require removal of certificate retention and replacement with pro-rata documented training recovery.",
                "whatsapp_legal": "RE: Employment Bond & Certificate Retention. Retention of original academic certificates violates Ministry of Labour directives and constitutes unlawful restraint under Art 21 of the Constitution. Furthermore, penal bonds violate Section 74 of the Contract Act without proof of actual pecuniary loss."
            },
            {
                "clause_id": 3,
                "clause_text": "The Employee must provide ninety (90) days prior written notice. The Company reserves the unilateral right to terminate the Employee immediately with zero (0) days notice or severance.",
                "category": "notice_period",
                "extracted_value": {
                    "amount_inr": 0,
                    "monthly_rent_inr": 0,
                    "duration_months": 0,
                    "tenant_notice_days": 90,
                    "landlord_notice_days": 0,
                    "daily_interest_pct": 0,
                    "painting_deduction_mandatory": False,
                    "full_deposit_forfeited_on_early_exit": False
                },
                "favors": "landlord",
                "eli5": "You are locked into 90 days notice, but the company can fire you instantly with 0 days notice and zero severance pay! This violates natural justice.",
                "eli5_hi": "कर्मचारी को 90 दिन का नोटिस देना होगा, जबकि कंपनी तुरंत 0 दिन के नोटिस पर बिना किसी पैसे के निकाल सकती है! यह एकतरफा शोषण है।",
                "eli5_te": "ఉద్యోగి 90 రోజుల నోటీసు ఇవ్వాలి, కానీ కంపెనీ ఎటువంటి నోటీసు లేదా పరిహారం లేకుండా తక్షణమే తొలగించవచ్చు! ఇది తీవ్రమైన అన్యాయం.",
                "rewritten_fair_text": "Either party may terminate the employment relationship by providing thirty (30) days written notice or payment of salary in lieu thereof, ensuring equal reciprocal protection.",
                "whatsapp_polite": "Hi, in Clause 4 the notice requirement is 90 days for the employee vs 0 days for the company. Could we standardize this to a reciprocal 30 days for both parties?",
                "whatsapp_firm": "Reviewing Clause 4: Asymmetric notice (90 days vs 0 days) creates unacceptable career risk. In line with industry standards, this must be made bilateral at 30 days notice or equivalent pay in lieu.",
                "whatsapp_legal": "Notice Asymmetry Covenants: The 90-day vs zero-day termination asymmetry is unconscionable under Central Model Standing Orders and principles of contractual equality. The notice period must be mutually reciprocal."
            }
        ]
    },
    "preset_freelance_contract": {
        "id": "preset_freelance_contract",
        "title": "Freelance Senior React Developer Agreement",
        "category": "Independent Contractor",
        "jurisdiction": "Indian Contract Act 1872 & Commercial Law",
        "badge": "Predatory Penalties — 2 Red Flags",
        "description": "Standard client services contract with asymmetric late penalties (4% daily on developer, 0% on client) and indefinite IP indemnification.",
        "raw_text": """INDEPENDENT CONTRACTOR SERVICES AGREEMENT

This Agreement is made by and between TechVentures Media ('Client') and Freelance Software Engineer ('Contractor').

CLAUSE 1: MILESTONE DELAYS AND PENALTIES
If the Contractor delays any sprint milestone beyond the estimated delivery date, a penal interest of 4% per day of the milestone value shall be deducted from all pending invoices.

CLAUSE 2: CLIENT PAYMENT DELAYS
The Client shall have ninety (90) days credit terms to process invoices with zero percent (0%) interest or penalty for delays in disbursement.

CLAUSE 3: TERMINATION AND FORFEITURE
The Client may terminate this agreement at any time with immediate effect. Upon such termination, all contractor fees accrued for work-in-progress shall be deemed forfeited.""",
        "monthly_rent_inr": 0,
        "clauses": [
            {
                "clause_id": 1,
                "clause_text": "If the Contractor delays any sprint milestone beyond estimated delivery date, a penal interest of 4% per day of the milestone value shall be deducted from all pending invoices.",
                "category": "penalty",
                "extracted_value": {
                    "amount_inr": 4000,
                    "monthly_rent_inr": 0,
                    "duration_months": 0,
                    "tenant_notice_days": 0,
                    "landlord_notice_days": 0,
                    "daily_interest_pct": 4,
                    "painting_deduction_mandatory": False,
                    "full_deposit_forfeited_on_early_exit": False
                },
                "favors": "landlord",
                "eli5": "4% daily penalty equals 1,460% yearly interest! Indian courts consider anything over 2% per day as predatory and an invalid penalty under Section 74.",
                "eli5_hi": "सॉफ्टवेयर डिलीवरी में देरी पर रोजाना 4% जुर्माना (सालाना 1460%!) पूरी तरह अवैध है। कोर्ट ऐसे अत्यधिक जुर्माने को खारिज कर देता है।",
                "eli5_te": "డెలివరీ ఆలస్యమైతే రోజుకు 4% జరిమానా విధించడం దోపిడీ. చట్టం ప్రకారం ఇది చెల్లని జరిమానా.",
                "rewritten_fair_text": "Milestone delivery dates are good-faith estimates. In case of unexcused delays exceeding 7 business days, liquidated damages capped at a maximum of 5% of the delayed milestone shall apply.",
                "whatsapp_polite": "Hi team, regarding the 4% per day milestone penalty: Software scope frequently evolves. Could we replace the daily penalty with mutually agreed sprint grace periods and a sensible 5% overall cap?",
                "whatsapp_firm": "Hello, Clause 1 imposes a 4% daily penalty on milestone delays. Under Section 74 of the Indian Contract Act, excessive daily penalties are legally void. We need to revise this to reasonable liquidated damages capped at 5% total.",
                "whatsapp_legal": "RE: Daily Milestone Penalties. Clause 1 stipulates in-terrorem penal deductions of 4% per diem. This directly violates Section 74 of the Indian Contract Act 1872 (Fateh Chand v. Balkishan Dass). Penalties must be substituted with reasonable compensation with a maximum liability ceiling."
            },
            {
                "clause_id": 2,
                "clause_text": "The Client may terminate this agreement at any time with immediate effect. Upon such termination, all contractor fees accrued for work-in-progress shall be deemed forfeited.",
                "category": "termination",
                "extracted_value": {
                    "amount_inr": 75000,
                    "monthly_rent_inr": 0,
                    "duration_months": 0,
                    "tenant_notice_days": 0,
                    "landlord_notice_days": 0,
                    "daily_interest_pct": 0,
                    "painting_deduction_mandatory": False,
                    "full_deposit_forfeited_on_early_exit": True
                },
                "favors": "landlord",
                "eli5": "The client wants the power to cancel the project at any moment and refuse to pay for work you already completed! Quantum Meruit (Section 70) guarantees pay for work done.",
                "eli5_hi": "क्लाइंट कभी भी प्रोजेक्ट रद्द कर सकता है और पहले से किए गए काम का पैसा भी नहीं देगा! धारा 70 (Quantum Meruit) के तहत किए गए काम का भुगतान अनिवार्य है।",
                "eli5_te": "క్లయింట్ ఎప్పుడైనా ప్రాజెక్ట్‌ను రద్దు చేయవచ్చు మరియు మీరు ఇప్పటికే పూర్తి చేసిన పనికి డబ్బులు ఇవ్వకుండా జప్తు చేయలేరు. చట్టం ప్రకారం చేసిన పనికి వేతనం చెల్లించాల్సిందే.",
                "rewritten_fair_text": "In the event of termination for convenience by Client, Contractor shall be compensated in full on a pro-rata basis for all billable hours and deliverables completed up to the date of termination.",
                "whatsapp_polite": "Hi, Clause 3 allows cancellation with forfeiture of fees for work already done. Could we update this to ensure payment for all completed milestones and approved hours up to the termination date?",
                "whatsapp_firm": "Regarding Clause 3: Forfeiture of fees for completed work is unacceptable. Under Section 70 of the Indian Contract Act (Quantum Meruit), the contractor is legally entitled to compensation for all services rendered. Please amend accordingly.",
                "whatsapp_legal": "Clause 3 Notice: Unilateral termination with forfeiture of accrued compensation violates the doctrine of Quantum Meruit codified in Section 70 of the Indian Contract Act 1872. Contractor must be indemnified for all work-in-progress upon severance."
            }
        ]
    }
}
