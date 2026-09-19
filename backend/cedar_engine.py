import os
from pathlib import Path
from typing import Dict, Any, List, Optional
import cedarpy

POLICIES_DIR = Path(__file__).parent / "policies"

POLICY_METADATA = {
    "deposit_cap": {
        "title": "Excessive Security Deposit",
        "citation": "Model Tenancy Act 2021, Sec 9",
        "rule_text": "forbid when amount_inr > 3 * monthly_rent_inr",
        "severity": 85,
        "description": "Security deposit exceeds the statutory maximum of 2 to 3 months rent mandated under Model Tenancy Act 2021 Section 9.",
        "financial": True
    },
    "notice_asymmetry": {
        "title": "Gross Notice Period Asymmetry",
        "citation": "Principles of Natural Justice & Indian Contract Law",
        "rule_text": "forbid when tenant_notice_days > landlord_notice_days * 2",
        "severity": 70,
        "description": "Tenant must provide disproportionately longer notice than landlord (e.g. 90 days vs 15 days), creating one-sided leverage.",
        "financial": False
    },
    "interest_rate_cap": {
        "title": "Usurious / Predatory Daily Interest",
        "citation": "Usurious Loans Act 1918 & RBI Fair Practices Code",
        "rule_text": "forbid when daily_interest_pct > 2",
        "severity": 95,
        "description": "Daily late payment penalty exceeds 2%/day (translating to >730% APR), deemed unconscionable and penal under Indian Law.",
        "financial": True
    },
    "non_compete_duration": {
        "title": "Post-Termination Non-Compete Restraint",
        "citation": "Indian Contract Act 1872, Sec 27",
        "rule_text": "forbid when duration_months > 12",
        "severity": 90,
        "description": "Section 27 renders any agreement restraining anyone from exercising a lawful profession, trade, or business void ab initio.",
        "financial": False
    },
    "painting_deduction": {
        "title": "Mandatory Painting Charge Deducted from Deposit",
        "citation": "Model Tenancy Act 2021, Sec 15 (Fair Wear & Tear)",
        "rule_text": "forbid when painting_deduction_mandatory == true",
        "severity": 65,
        "description": "Automatic non-negotiable deduction of 1 month rent or deposit for repainting violates normal wear-and-tear statutory protections.",
        "financial": True
    },
    "premature_exit_forfeiture": {
        "title": "Total Security Deposit Forfeiture on Early Exit",
        "citation": "Indian Contract Act 1872, Sec 74 (Penal Forfeiture)",
        "rule_text": "forbid when full_deposit_forfeited_on_early_exit == true",
        "severity": 95,
        "description": "Section 74 restricts liquidated damages to reasonable compensation for actual loss proved, prohibiting unconditional deposit forfeiture.",
        "financial": True
    },
    "arbitrary_rent_escalation": {
        "title": "Uncapped / Predatory Annual Rent Escalation",
        "citation": "Model Tenancy Act 2021 & Urban Rent Norms",
        "rule_text": "forbid when annual_escalation_pct > 10",
        "severity": 80,
        "description": "Annual rent escalation exceeds 10% (standard statutory guideline caps annual increments at 5% to 10% maximum).",
        "financial": True
    },
    "lock_in_period_penalty": {
        "title": "Excessive Lock-in Period Rent Penalty",
        "citation": "Indian Contract Act 1872, Sec 74 (Penal Damages)",
        "rule_text": "forbid when demands_entire_lock_in_rent == true",
        "severity": 90,
        "description": "Demanding rent for the full remainder of a lock-in period upon early exit constitutes an unlawful penal clause under Section 74.",
        "financial": True
    }
}

class CedarEngine:
    def __init__(self):
        self.individual_policies: Dict[str, str] = {}
        self._load_policies()

    def _load_policies(self):
        policy_files = [
            "deposit_cap.cedar",
            "notice_asymmetry.cedar",
            "interest_rate_cap.cedar",
            "non_compete_duration.cedar",
            "painting_deduction.cedar",
            "premature_exit_forfeiture.cedar",
            "arbitrary_rent_escalation.cedar",
            "lock_in_period_penalty.cedar"
        ]
        for pf in policy_files:
            policy_id = pf.replace(".cedar", "")
            filepath = POLICIES_DIR / pf
            if filepath.exists():
                with open(filepath, "r", encoding="utf-8") as f:
                    self.individual_policies[policy_id] = f.read()

    def evaluate_clause(self, clause: Dict[str, Any]) -> Dict[str, Any]:
        """
        Runs clause against Cedar policies.
        Returns detailed Cedar verdict, determining rule, citation, and explanation.
        """
        clause_id = f"clause_{clause.get('clause_id', 1)}"
        category = clause.get("category", "other")
        val = clause.get("extracted_value") or {}

        # Construct Cedar entity attrs
        attrs = {
            "category": category,
            "amount_inr": int(val.get("amount_inr") or 0),
            "monthly_rent_inr": int(val.get("monthly_rent_inr") or 0),
            "tenant_notice_days": int(val.get("tenant_notice_days") or 0),
            "landlord_notice_days": int(val.get("landlord_notice_days") or 0),
            "daily_interest_pct": int(val.get("daily_interest_pct") or 0),
            "duration_months": int(val.get("duration_months") or 0),
            "painting_deduction_mandatory": bool(val.get("painting_deduction_mandatory", False)),
            "full_deposit_forfeited_on_early_exit": bool(val.get("full_deposit_forfeited_on_early_exit", False)),
            "annual_escalation_pct": int(val.get("annual_escalation_pct") or 0),
            "demands_entire_lock_in_rent": bool(val.get("demands_entire_lock_in_rent", False))
        }

        entities = [
            {
                "uid": {"type": "ContractClause", "id": clause_id},
                "attrs": attrs,
                "parents": []
            }
        ]

        req = {
            "principal": 'ContractParty::"landlord"',
            "action": 'Action::"enforce_clause"',
            "resource": f'ContractClause::"{clause_id}"',
            "context": {}
        }

        violations = []
        allow_count = 0

        # Evaluate against each individual Cedar policy
        for pid, pcode in self.individual_policies.items():
            # Combine individual forbid rule with default permit so Cedar produces a decision
            combined_policy = f"{pcode}\npermit(principal, action == Action::\"enforce_clause\", resource);"
            try:
                result = cedarpy.is_authorized(req, combined_policy, entities)
                if not result.allowed:
                    meta = POLICY_METADATA.get(pid, {})
                    violations.append({
                        "policy_id": pid,
                        "title": meta.get("title", pid),
                        "citation": meta.get("citation", "Indian Contract Law"),
                        "rule_text": meta.get("rule_text", ""),
                        "severity": meta.get("severity", 70),
                        "description": meta.get("description", ""),
                        "financial": meta.get("financial", False)
                    })
                else:
                    allow_count += 1
            except Exception as e:
                print(f"[CedarEngine Error] evaluating {pid}: {e}")

        is_denied = len(violations) > 0
        primary_violation = violations[0] if violations else None

        return {
            "clause_id": clause.get("clause_id"),
            "verdict": "DENY" if is_denied else "ALLOW",
            "is_red_flag": is_denied,
            "violations": violations,
            "determining_policy": primary_violation["policy_id"] if primary_violation else None,
            "citation": primary_violation["citation"] if primary_violation else "Indian Contract Act / Standard Model Guidelines",
            "rule_text": primary_violation["rule_text"] if primary_violation else "ALLOW (Complies with statutory thresholds)",
            "title": primary_violation["title"] if primary_violation else "Compliant Clause",
            "severity": max([v["severity"] for v in violations], default=0),
            "financial_amount_inr": val.get("amount_inr") if (primary_violation and primary_violation.get("financial")) else 0
        }

# Global singleton
cedar_engine = CedarEngine()
