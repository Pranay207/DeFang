<div align="center">

# 🛡️ DeFang (Bharat Edition)
### *Stop Signing Toxic Indian Agreements. Scan, DeFang, and Negotiate.*

**Deterministic Indian Contract Red-Flag Scanner & Statutory Policy Engine**
<br />
*100% On-Device & Offline • Zero Cloud Dependencies • Zero AWS Bills • Mathematical Statutory Verification*

<br />

[![Track: Build It](https://img.shields.io/badge/Track-Build_It-FF9900?style=flat-square&logo=amazonaws&logoColor=white)](https://github.com/Pranay207/DeFang)
[![Policy Engine: AWS Cedar (8 Policies)](https://img.shields.io/badge/Policy_Engine-AWS_Cedar_(8_Policies)-E11D48?style=flat-square)](https://www.cedarpolicy.com/)
[![Agent: Strands SDK](https://img.shields.io/badge/Agent-Strands_SDK-0284C7?style=flat-square)](https://github.com/Pranay207/DeFang)
[![Languages: EN • HI • TE • KN](https://img.shields.io/badge/Languages-EN_•_HI_•_TE_•_KN-8B5CF6?style=flat-square)](frontend/src/i18n.ts)
[![Backend: FastAPI](https://img.shields.io/badge/Backend-FastAPI-0D9488?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Frontend: React 19](https://img.shields.io/badge/Frontend-React_19-2563EB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)](LICENSE)

<br />

[**Watch 3-Min Demo**](#-3-minute-video-walkthrough) &nbsp;•&nbsp; [**Quick Start (2 Mins)**](#-quick-start) &nbsp;•&nbsp; [**Demo Presets**](#-demo-presets) &nbsp;•&nbsp; [**Architecture**](#-architecture) &nbsp;•&nbsp; [**8 Cedar Policies**](#-legal-frameworks-referenced)

<br />
<br />

<img src="assets/audit_dashboard.png" alt="DeFang Legal Audit Dashboard" width="920" style="border-radius: 12px; box-shadow: 0 16px 48px rgba(0,0,0,0.6);" />

<br />
<em>DeFang Dual-Engine Audit: Real-time Cedar verification, Hidden Rupee Trap simulation, and statutory redline diffs.</em>

</div>

<br />

---

### ⚡ Executive Overview

> **🎯 The Problem**: Over 85% of young Indians sign rental agreements, tech bonds, and freelance contracts without reading past page 1. Landlords demand extortionate **10-month deposits & painting deductions**, while startups enforce **illegal 2-year non-competes**. Hiring an advocate is out of reach for ordinary citizens.
> 
> **⚙️ The Dual-Engine Solution**: Unlike generic LLMs that give hallucinated, subjective legal advice, DeFang pairs **Strands Agents SDK** (for structured clause extraction) with **AWS Cedar** (`cedarpy`), a formal mathematical policy engine evaluating contracts against real Indian law.
> 
> **🏛️ Core Architectural Differentiators**:
> 1. **100% On-Device & Offline**: Preset scans execute with **0 network calls, 0 cloud dependencies, and 0 external bills**.
> 2. **Formal Statutory Verification**: Every violation cites an exact legislative section (Model Tenancy Act 2021, Indian Contract Act 1872).
> 3. **Actionable Output**: Calculates the exact **Hidden Rupee Trap (₹)** and generates **1-click WhatsApp counter-offers**.

---

## 💥 Real-World Impact: Before vs. After DeFang

| Typical Indian Scenario | ❌ Without DeFang (The Trap) | ✅ With DeFang (Protected by Cedar) |
| :--- | :--- | :--- |
| **Bengaluru 2BHK Rental** | Tenant pays ₹3,50,000 (10-mo deposit). Landlord arbitrarily deducts ₹35,000 for repainting and forfeits the entire deposit upon early job relocation. | **Cedar flags Sec 9 & 15 violations in 4ms**. Identifies ₹7,36,050 trapped liability. Generates a polite WhatsApp counter-offer. **Saves ₹3,85,000+**. |
| **Startup Fresher Offer Letter** | Engineering fresher signs an offer containing a void 24-month post-exit non-compete and a ₹2,50,000 training bond. | **Cedar executes Section 27 policy** (*restraint of trade void ab initio*). Renders GitHub-style PR diff striking down illegal liquidated damages under Sec 74. |
| **Freelance Dev Agreement** | Independent contractor agrees to a one-sided contract with 4% daily late penalties (>1,400% APR) and 90-day vs. 15-day notice asymmetry. | **Power Imbalance Meter flags 95% Counterparty Bias**. Cedar flags predatory interest under the Usurious Loans Act 1918. |

---

## 📹 3-Minute Video Walkthrough

<div align="center">

[![Watch 3-Minute Video Walkthrough](https://img.shields.io/badge/YouTube-Watch_Full_3--Minute_Walkthrough-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](VIDEO_URL)

<br />

> 📺 **[▶️ Click Here to Watch the Live Product Demonstration on YouTube](VIDEO_URL)**
*(Recorded for the First Commit | Bharat Builds Tour Hackathon submission)*

</div>

| Timestamp | Video Chapter & Proof Point | What Evaluators Will See |
| :--- | :--- | :--- |
| **`0:00 - 1:00`** | **The Crisis & Cedar Deterministic Core** | Why probabilistic LLMs fail Indian legal scrutiny; formal mathematical policy execution in Rust (`cedarpy`) with 0 hallucinations. |
| **`1:00 - 2:00`** | **Live Indiranagar Lease Audit** | Real-time audit of standard rental agreement; instant calculation of the **₹7,36,050 Hidden Rupee Trap** and 95% Power Imbalance. |
| **`2:00 - 3:00`** | **Ground-Reality Bharat Workflow** | Mobile camera capture of physical ₹100 stamp papers, regional vernacular voice readouts (`kn`, `te`, `hi`), and 1-click WhatsApp counter-offers. |

---

## 🔬 Why This Is Different: Dual-Engine Architecture

Generic AI contract tools rely on a **single LLM giving subjective, unverifiable advice** that frequently hallucinates, contradicts itself, and cannot be audited in a courtroom.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                DEFANG DUAL-ENGINE FLOW                                 │
├──────────────────────────┬─────────────────────────────────┬───────────────────────────┤
│    1. INGESTION & OCR    │      2. STRANDS AGENT SDK       │    3. FORMAL AWS CEDAR    │
│                          │                                 │                           │
│  Raw Contract (PDF/Text) │  Extracts structured parameters │  Deterministic Evaluation │
│  - Tenancy agreements    │  - amount_inr: 350000           │  - Evaluates 8 .cedar     │
│  - Employment bonds      │  - monthly_rent_inr: 35000      │    statutory policy files │
│  - Freelance MSAs        │  - painting_mandatory: true     │  - Verdict: ALLOW / DENY  │
│                          │  - non_compete_months: 24       │  - Zero Hallucinations    │
└──────────────────────────┴─────────────────────────────────┴───────────────────────────┘
```

### Proof: Real Indian Law Encoded into AWS Cedar

Here is [`backend/policies/deposit_cap.cedar`](backend/policies/deposit_cap.cedar) deterministically forbidding rental security deposits exceeding 3 months under Section 9 of the Model Tenancy Act 2021:

```cedar
// cite: Model Tenancy Act 2021, Sec 9
// Forbid security deposits exceeding 3 months of agreed monthly rent
@id("deposit_cap")
@cite("Model Tenancy Act 2021, Sec 9")
@title("Excessive Security Deposit Cap Violation")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "deposit" &&
    resource.monthly_rent_inr > 0 &&
    resource.amount_inr > (resource.monthly_rent_inr * 3)
};
```

---

## 🎯 Key Features

| Feature | What It Delivers |
| :--- | :--- |
| 🔴 **Executive Verdict Banner** | Instant Executive Clarity: Immediate `DO NOT SIGN` statutory warning, Risk Score (100/100), and top 3 fatal traps. |
| 🛡️ **Dual-Engine Scanning** | Pairs Strands agentic extraction with the AWS Cedar Policy Engine for deterministic statutory verdicts. |
| ⚖️ **8 Formal Cedar Statutory Policies** | Formally validates agreements against Model Tenancy Act 2021, Indian Contract Act 1872, and Usurious Loans Act 1918. |
| 💻 **Interactive Cedar Policy Inspector** | Live browser modal inspecting the exact Rust `.cedar` syntax and statutory citations with one click. |
| 📷 **Physical Stamp Paper Camera** | Direct `capture="environment"` mobile camera photo snap for physical ₹100 e-stamp papers at the broker's desk. |
| 🔊 **Multilingual Voice Readout** | Native Web Speech API audio in Kannada (`kn-IN`), Telugu (`te-IN`), Hindi (`hi-IN`), and English (`en-IN`) for low-literacy users. |
| 🌐 **Multilingual Bharat UI** | Native support for English, Hindi (`हिंदी`), Telugu (`తెలుగు`), and Kannada (`ಕನ್ನಡ`) across all metrics, badges, and negotiations. |
| 💸 **Hidden Rupee Trap Simulator** | Dynamically calculates the exact financial liability (excess deposits, illegal exit deductions, penal interest) buried in clauses. |
| ⚖️ **Power Imbalance Meter** | Measures contractual asymmetry (such as 90-day tenant notice vs. 15-day landlord notice) with an actionable imbalance index. |
| 💬 **1-Click WhatsApp Negotiation** | Generates calibrated counter-negotiation tones (Polite, Assertive, Hardball) with direct 1-click dispatch into WhatsApp Web/App. |
| ⚡ **Live WhatsApp Cloud Webhook** | Production FastAPI endpoint (`/api/whatsapp/webhook`) for scanning contracts directly inside WhatsApp. |
| 🔄 **GitHub-Style Contract PR Diff** | Visualizes side-by-side redline diffs comparing predatory original clauses with legally compliant redrafts. |
| 📥 **Downloadable Audit Report** | Generates certified statutory text/markdown audit reports and high-contrast printable audit certificates. |
| 💾 **Offline Recent Audits History** | Persists audit history in browser storage to compare and reload previous scans with zero network latency. |

---

## 📸 Product Tour & Interface Walkthrough

<div align="center">

### 1. One-Click Presets & Dual-Engine Contract Input
<img src="assets/landing_page.png" alt="DeFang Landing Page & Presets" width="900" style="border-radius: 10px; box-shadow: 0 12px 36px rgba(0,0,0,0.5);" />
<br />
<em>One-click offline presets (Bengaluru Rental, Tech Startup Bond, Freelance MSA) and drag-and-drop PDF contract parser.</em>

<br /><br />

### 2. Clause-by-Clause Statutory Audit & GitHub-Style Redline PR Diff
<img src="assets/clause_audit_diff.png" alt="Clause Audit Diff & WhatsApp Diplomat" width="900" style="border-radius: 10px; box-shadow: 0 12px 36px rgba(0,0,0,0.5);" />
<br />
<em>Line-by-line red-flag breakdown with statutory citations, side-by-side legal redrafts, and 1-click WhatsApp counter-offers.</em>

</div>

---

## 🏗️ Architecture

```mermaid
flowchart TD
    A[Contract Document: Text / PDF] --> B[FastAPI Backend :8000]
    
    subgraph Dual_Engine ["DeFang Dual-Engine Core"]
        B --> C{Engine Selector}
        C -->|Live Scan| D[Strands Agents SDK / Rule Extractor]
        C -->|Cached Preset| E[Instant Offline Cache]
        D --> F[Structured Clause Parameters]
        E --> F
        F --> G[AWS Cedar Policy Engine]
        H[(8 Formal .cedar Policies)] --> G
    end

    G --> I[Verdict Assembly: ALLOW / DENY + Statutory Citations]
    
    subgraph Interactive_UI ["Award-Caliber React Frontend :5173"]
        I --> J[Risk Hero Gauge & Scores]
        I --> K[Rupee Trap Simulator]
        I --> L[Power Imbalance Meter]
        I --> M[Clause PR Diffs & WhatsApp Diplomat]
        I --> N[Download / Print Audit Certificate]
    end
```

---

## 💻 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Auth & Policy Engine** | **AWS Cedar** (`cedarpy==4.12.0`) — Formal policy execution on local machine |
| **Agent & Extraction** | **Strands Agents SDK** (`strands-agents==1.56.0`) with intelligent local rule fallback |
| **Backend API** | **FastAPI**, **Uvicorn**, **Pydantic**, Python 3.12 |
| **Document Processing** | **pdfplumber**, **pypdfium2** for local client-side PDF parsing |
| **Frontend Framework** | **React 19**, **TypeScript**, **Vite** |
| **Styling & Motion** | **Tailwind CSS**, **Framer Motion** (spring physics, GPU-accelerated drift & glow) |
| **UI Components** | **Lucide React**, **React Circular Progressbar**, **Canvas Confetti** |

---

## ⚡ Quick Start

Clone the repository and run both servers locally on your machine in under 2 minutes:

### 1. Backend (FastAPI + AWS Cedar)

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1   # On macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
> *Backend API initializes at `http://127.0.0.1:8000`*

### 2. Frontend (React + Vite)

```powershell
cd frontend
npm install
npm run dev
```
> *Web App opens at `http://localhost:5173`*

### Zero-Config Offline Mode
DeFang is engineered with an **intelligent local rule-based extractor and pre-cached client fallback powered by Strands Agents SDK and AWS Cedar**. The app operates **100% locally and offline without external cloud API dependencies or mandatory API keys**.

---

## 📁 Demo Presets

DeFang includes 3 production-grade, pre-cached Indian agreements for immediate zero-config testing:

1. **Bengaluru 11-Month Rental Agreement (`High Risk — 5 Red Flags`)**:
   - Standard Indiranagar 2BHK agreement with a **₹3,50,000 (10-month) deposit** against ₹35,000 rent, **₹35,000 non-negotiable painting deduction**, and **complete deposit forfeiture** on premature exit.
2. **Tech Startup Internship & Employment Agreement (`Severe Restraints — 3 Red Flags`)**:
   - High-growth startup offer letter containing an **illegal 24-month non-compete restraint**, a **₹2,50,000 training bond**, and **24/7 blanket IP ownership**.
3. **Freelance Senior Developer Contract (`Predatory Penalties — 2 Red Flags`)**:
   - Client service agreement with **asymmetric late delivery penalties (4% per day / >1,400% APR)** against 0% client delay penalties.

---

## 📜 Legal Frameworks Referenced

Every policy file in `backend/policies/` is directly anchored to active Indian jurisprudence:

* **Model Tenancy Act 2021, Section 9**: Restricts residential tenancy deposits to a strict maximum of **2 to 3 months rent**.
* **Model Tenancy Act 2021, Section 15**: Prohibits mandatory arbitrary painting deductions; tenant is liable only for damage beyond **normal wear and tear**.
* **Model Tenancy Act 2021 & Urban Rent Control Norms**: Forbids arbitrary unilateral annual rent escalation exceeding **10%** without mutual written agreement (`arbitrary_rent_escalation.cedar`).
* **Indian Contract Act 1872, Section 27**: Declares **any agreement restraining anyone from exercising a lawful profession, trade, or business void ab initio**.
* **Indian Contract Act 1872, Section 74 (Liquidated Damages & Penal Forfeiture)**: Restricts bond penalties to **reasonable compensation for actual, proven loss**, prohibiting unconditional deposit forfeiture (`premature_exit_forfeiture.cedar`).
* **Indian Contract Act 1872, Section 74 (Unlawful Lock-in Penalties)**: Restricts demanding remaining tenure rent upon early exit without actual proved loss (`lock_in_period_penalty.cedar`).
* **Usurious Loans Act 1918**: Restricts exorbitant, unconscionable daily late payment penalties.

---

## 🚀 Features & Capabilities (100% Implemented)

- [x] **Formal AWS Cedar Verification Engine**: 8 real `.cedar` statutory policies compiled and executed via `cedarpy` in native Rust with 0 hallucinations.
- [x] **Interactive AWS Cedar Policy Inspector**: Live browser modal to inspect the exact Rust `.cedar` syntax and statutory citations.
- [x] **Executive Verdict Banner**: Instant executive decision support with `DO NOT SIGN` warning, `₹7,36,050` Rupee Trap, and Top 3 fatal traps.
- [x] **📷 Physical Stamp Paper Camera Scanner**: Direct `capture="environment"` mobile camera photo snap for physical ₹100 e-stamp papers at the broker's desk.
- [x] **🔊 Multilingual Vernacular Voice Readout**: Native Web Speech API audio in Kannada (`kn-IN`), Telugu (`te-IN`), Hindi (`hi-IN`), and English (`en-IN`) for low-literacy users.
- [x] **💬 1-Click WhatsApp Landlord Diplomat**: Deep-link dispatch to WhatsApp with pre-drafted polite, firm, and statutory counter-clauses.
- [x] **⚡ Live WhatsApp Cloud Webhook API**: Production FastAPI endpoint (`/api/whatsapp/webhook`) for scanning contracts directly inside WhatsApp.
- [x] **Interactive Rupee Trap Simulator**: Quantifies hidden financial liabilities into exact Rupee losses.
- [x] **Power Imbalance Meter**: Evaluates one-sided clauses (95% Landlord vs 5% Tenant) with contract hypocrisy alerts.
- [x] **Certified Statutory Report Export**: Localized downloadable text audit certificates and high-contrast printable audit reports.

---

## 💡 Engineering Insights & Architecture Decisions

During the design and implementation of DeFang (Bharat Edition), our core architectural takeaways were:
1. **Separation of Reasoning vs. Policy Enforcement**:
   - Probabilistic LLMs are unsuited for direct legal certification due to the risk of hallucinations.
   - We decoupled the architecture: **Strands Agents SDK** handles unstructured natural language extraction, while **AWS Cedar Policy Engine** executes deterministic, mathematical statutory verification.
2. **Authoring Formal AWS Cedar Policies**:
   - Formally encoded Indian legislative statutes (*Model Tenancy Act 2021*, *Indian Contract Act 1872*, and *Usurious Loans Act 1918*) into declarative, machine-evaluable `.cedar` policy definitions.
3. **Designing for Real-World Bharat Accessibility**:
   - Engineered for physical reality: supporting physical stamp paper camera capture, vernacular voice audio (Kannada/Telugu/Hindi), and WhatsApp communication workflows.

---

## 🏛️ Project Specifications & Architecture
 
* **Project**: **DeFang (Bharat Edition)**
* **Deployment Model**: **100% On-Device & Offline** *(Zero cloud dependency, zero external API cost)*
* **Core Engines**: **AWS Cedar Policy Engine** + **Strands Agents SDK**

---

## License

Distributed under the **MIT License**. See `LICENSE` for details.
