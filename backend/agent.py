import os
import json
import re
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

import warnings
warnings.filterwarnings("ignore")

load_dotenv()

# Background AI API key (optional, 100% invisible fallback)
AI_API_KEY = (
    os.environ.get("GEMINI_API_KEY") or
    os.environ.get("GOOGLE_API_KEY") or
    os.environ.get("LLM_API_KEY") or
    os.environ.get("AI_API_KEY")
)

class DeFangAgent:
    def __init__(self):
        self.api_key = AI_API_KEY
        self.strands_agent = None
        self._init_strands()

    def _init_strands(self):
        if not self.api_key:
            print("[DeFangAgent] Local statutory rule-based engine is active (100% offline & deterministic).")
            return

        try:
            from strands import Agent
            from strands.models.gemini import GeminiModel
            from google import genai

            client = genai.Client(api_key=self.api_key)
            model = GeminiModel(client=client, model_id="gemini-2.5-flash")
            self.strands_agent = Agent(
                model=model,
                system_prompt=(
                    "You are DeFang's specialized Indian Legal Intelligence Agent. "
                    "You analyze Indian contracts (rental, employment, services, freelance) and extract structured clauses "
                    "adhering to Indian statutory frameworks (Model Tenancy Act 2021, Indian Contract Act 1872, Usurious Loans Act)."
                )
            )
            print("[DeFangAgent] Strands Agents SDK initialized.")
        except Exception:
            print("[DeFangAgent] Local statutory rule-based engine is active (100% offline & deterministic).")
            self.strands_agent = None

    def extract_clauses(self, contract_text: str) -> List[Dict[str, Any]]:
        """
        Extracts structured clauses from raw contract text.
        Format required:
        {
          "clause_id": int,
          "clause_text": str,
          "category": "deposit"|"notice_period"|"penalty"|"non_compete"|"termination"|"other",
          "extracted_value": {
             "amount_inr": number,
             "duration_months": number,
             "interest_rate_pct": number,
             "monthly_rent_inr": number,
             "tenant_notice_days": number,
             "landlord_notice_days": number,
             "daily_interest_pct": number,
             "painting_deduction_mandatory": bool,
             "full_deposit_forfeited_on_early_exit": bool
          },
          "favors": "landlord"|"tenant"|"neutral"
        }
        """
        if self.strands_agent and self.api_key:
            try:
                return self._extract_via_llm(contract_text)
            except Exception:
                pass

        return self._extract_via_rules(contract_text)

    def _extract_via_llm(self, text: str) -> List[Dict[str, Any]]:
        prompt = f"""
Analyze the following Indian contract text and extract each substantive clause as a JSON array of objects.
Do not wrap in markdown quotes if possible, output valid JSON only.

Schema:
[
  {{
    "clause_id": 1,
    "clause_text": "Exact or representative clause text from contract",
    "category": "deposit" | "notice_period" | "penalty" | "non_compete" | "termination" | "other",
    "extracted_value": {{
      "amount_inr": number,
      "duration_months": number,
      "interest_rate_pct": number,
      "monthly_rent_inr": number,
      "tenant_notice_days": number,
      "landlord_notice_days": number,
      "daily_interest_pct": number,
      "painting_deduction_mandatory": boolean,
      "full_deposit_forfeited_on_early_exit": boolean
    }},
    "favors": "landlord" | "tenant" | "neutral",
    "eli5": "Plain simple explanation of why this clause is risky or what it means for the tenant/worker",
    "rewritten_fair_text": "Balanced version per Model Tenancy Act or Indian Contract Act norms"
  }}
]

Contract Text:
{text[:8000]}
"""
        response = self.strands_agent(prompt)
        content = str(response)
        # Clean JSON from backticks
        match = re.search(r'\[.*\]', content, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        return json.loads(content)

    def _extract_via_rules(self, text: str) -> List[Dict[str, Any]]:
        """Intelligent high-fidelity rule parser for Indian legal contracts."""
        # Detect global monthly rent if present in text
        monthly_rent = 0
        rent_match = re.search(r'(?:monthly\s*rent|rent\s*of)\s*(?:is|shall\s*be|of)?\s*(?:rs\.?|inr|₹)?\s*([\d,]+)', text, re.IGNORECASE)
        if rent_match:
            try:
                monthly_rent = int(rent_match.group(1).replace(",", ""))
            except ValueError:
                pass

        # Split into clauses by numbered headers or double newlines or single newlines
        raw_chunks = re.split(r'(?:\n\s*\n|\n(?=\d+[\.\)]|\bClause\b|\bARTICLE\b|\bSECTION\b|\b[A-Z\s]{4,}:))', text)
        paragraphs = []
        for chunk in raw_chunks:
            chunk = chunk.strip()
            if len(chunk) > 25:
                # If a chunk contains multiple sentences with distinct legal topics, split them
                sub_sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z])', chunk)
                if len(sub_sentences) > 1 and any(k in chunk.lower() for k in ["notice", "deposit", "penalty", "interest", "lock-in"]):
                    for s in sub_sentences:
                        if len(s.strip()) > 20:
                            paragraphs.append(s.strip())
                else:
                    paragraphs.append(chunk)

        if not paragraphs:
            paragraphs = [text.strip()]

        extracted = []
        clause_id = 1

        for p in paragraphs:
            lower = p.lower()
            category = "other"
            favors = "neutral"
            val = {
                "amount_inr": 0,
                "duration_months": 0,
                "interest_rate_pct": 0,
                "monthly_rent_inr": monthly_rent,
                "tenant_notice_days": 0,
                "landlord_notice_days": 0,
                "daily_interest_pct": 0,
                "painting_deduction_mandatory": False,
                "full_deposit_forfeited_on_early_exit": False
            }

            # Check Deposit
            if "deposit" in lower or "security" in lower:
                category = "deposit"
                favors = "landlord"
                amt_match = re.search(r'(?:rs\.?|inr|₹)\s*([\d,]+)', p, re.IGNORECASE)
                if amt_match:
                    try:
                        amt = int(amt_match.group(1).replace(",", ""))
                        val["amount_inr"] = amt
                    except ValueError:
                        pass
                if "painting" in lower or "paint" in lower or "cleaning" in lower:
                    val["painting_deduction_mandatory"] = True
                    if val["amount_inr"] == 0 and monthly_rent > 0:
                        val["amount_inr"] = monthly_rent

            # Check Painting specifically
            elif "painting" in lower or "repainting" in lower:
                category = "deposit"
                favors = "landlord"
                val["painting_deduction_mandatory"] = True
                amt_match = re.search(r'(?:rs\.?|inr|₹)\s*([\d,]+)', p, re.IGNORECASE)
                if amt_match:
                    try:
                        val["amount_inr"] = int(amt_match.group(1).replace(",", ""))
                    except ValueError:
                        pass
                elif monthly_rent > 0:
                    val["amount_inr"] = monthly_rent

            # Check Notice Period
            elif "notice" in lower and ("month" in lower or "day" in lower):
                category = "notice_period"
                favors = "landlord"
                # Check tenant notice
                t_match = re.search(r'(?:lessee|tenant|employee|contractor).*?(\d+)\s*(day|month)', lower)
                l_match = re.search(r'(?:lessor|landlord|company|client).*?(\d+)\s*(day|month)', lower)
                if t_match:
                    qty = int(t_match.group(1))
                    val["tenant_notice_days"] = qty * 30 if "month" in t_match.group(2) else qty
                if l_match:
                    qty = int(l_match.group(1))
                    val["landlord_notice_days"] = qty * 30 if "month" in l_match.group(2) else qty

                # Default asymmetry if detected in wording
                if "three" in lower or "3 month" in lower or "90 day" in lower:
                    val["tenant_notice_days"] = max(val["tenant_notice_days"], 90)
                if "fifteen" in lower or "15 day" in lower or "zero" in lower or "immediate" in lower:
                    val["landlord_notice_days"] = 15 if "15" in lower else 0

            # Check Non-Compete
            elif "non-compete" in lower or "restraint" in lower or "not.*join" in lower or "compete" in lower:
                category = "non_compete"
                favors = "landlord"
                m_match = re.search(r'(\d+)\s*(?:month|yr|year)', lower)
                if m_match:
                    qty = int(m_match.group(1))
                    val["duration_months"] = qty * 12 if "yr" in m_match.group(0) or "year" in m_match.group(0) else qty
                else:
                    val["duration_months"] = 24

            # Check Interest / Penalty
            elif ("interest" in lower or "penalty" in lower or "penal" in lower or "late" in lower) and "%" in p:
                category = "penalty"
                favors = "landlord"
                pct_match = re.search(r'(\d+(?:\.\d+)?)\s*%\s*(?:per\s*day|daily)?', p)
                if pct_match:
                    val["daily_interest_pct"] = float(pct_match.group(1))
                    val["interest_rate_pct"] = float(pct_match.group(1))

            # Check Lock-in / Early exit forfeiture
            elif "lock-in" in lower or "forfeit" in lower or "premature" in lower or "early exit" in lower:
                category = "lock_in" if "lock-in" in lower else "termination"
                favors = "landlord"
                val["full_deposit_forfeited_on_early_exit"] = True
                if "entire" in lower or "balance" in lower or "remainder" in lower or "remaining" in lower:
                    val["demands_entire_lock_in_rent"] = True
                amt_match = re.search(r'(?:rs\.?|inr|₹)\s*([\d,]+)', p, re.IGNORECASE)
                if amt_match:
                    try:
                        val["amount_inr"] = int(amt_match.group(1).replace(",", ""))
                    except ValueError:
                        pass
                elif val["amount_inr"] == 0:
                    val["amount_inr"] = monthly_rent * 10 if monthly_rent else 250000

            # Check Rent Escalation / Annual Increase
            elif ("escalat" in lower or "increment" in lower or "increase" in lower or "enhance" in lower) and ("rent" in lower or "%" in p):
                category = "rent_escalation"
                favors = "landlord"
                pct_match = re.search(r'(\d+(?:\.\d+)?)\s*%', p)
                if pct_match:
                    val["annual_escalation_pct"] = float(pct_match.group(1))
                else:
                    val["annual_escalation_pct"] = 15.0

            if category != "other" or len(p) > 50:
                extracted.append({
                    "clause_id": clause_id,
                    "clause_text": p,
                    "category": category,
                    "extracted_value": val,
                    "favors": favors
                })
                clause_id += 1

        return extracted

    def rewrite_clause(self, clause_text: str) -> str:
        """Rewrite unfair DENY clause to be balanced per Indian law."""
        if self.strands_agent and self.api_key:
            try:
                prompt = (
                    "Rewrite this clause to be fair, lawful, and balanced per Indian Model Tenancy Act "
                    "and Indian Contract Act norms, keeping similar legal draft length and tone:\n\n"
                    f"{clause_text}"
                )
                res = self.strands_agent(prompt)
                return str(res).strip()
            except Exception as e:
                print(f"[DeFangAgent Rewrite Error]: {e}")

        # Fallback balanced rewrite
        return (
            "The parties agree that this covenant shall operate reciprocally with mutual 30-day notice, "
            "security deposit capped strictly at two (2) months rent per Section 9 of the Model Tenancy Act 2021, "
            "and all penalties limited to reasonable pre-estimated actual loss under Section 74 of the Indian Contract Act 1872."
        )

    def generate_whatsapp_diplomat(self, clause_text: str, citation: str) -> Dict[str, str]:
        """Generate 3-tone WhatsApp diplomatic responses."""
        if self.strands_agent and self.api_key:
            try:
                prompt = f"""
Generate 3 distinct WhatsApp negotiation messages from a tenant or professional to the counterparty (landlord/client/HR) regarding this unfair contract clause:
Clause: "{clause_text}"
Legal Citation: "{citation}"

Return a valid JSON object with keys:
"polite": A warm, respectful message suitable for elders or family landlords.
"firm": A crisp, professional message suitable for corporate HR or freelance clients.
"legal": A formal legal shield citing the relevant Indian Act and Section by name.
"""
                res = self.strands_agent(prompt)
                content = str(res)
                match = re.search(r'\{.*\}', content, re.DOTALL)
                if match:
                    return json.loads(match.group(0))
            except Exception as e:
                print(f"[DeFangAgent WhatsApp Gen Error]: {e}")

        return {
            "polite": f"Namaste Uncle/Ma'am, regarding the clause in the draft: Could we kindly review this together? As per {citation}, standard guidelines recommend balanced terms so both parties are protected.",
            "firm": f"Hello, reviewing our draft agreement: The current clause imposes unilateral conditions contrary to {citation}. Please share an updated version reflecting standard mutual terms before signing.",
            "legal": f"Take notice that the clause in question is legally unsustainable under {citation}. Under Indian contract jurisprudence, such unilateral covenants are unenforceable. Kindly issue an amended draft."
        }

agent_service = DeFangAgent()
