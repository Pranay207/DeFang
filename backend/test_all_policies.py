import cedarpy

policies = """
// deposit_cap.cedar
// cite: Model Tenancy Act 2021, Sec 9
@id("deposit_cap")
forbid(principal, action == Action::"enforce_clause", resource)
when {
    resource.category == "deposit" &&
    resource.amount_inr > (resource.monthly_rent_inr * 3)
};

// notice_asymmetry.cedar
// cite: Principles of Natural Justice & Contractual Fairness
@id("notice_asymmetry")
forbid(principal, action == Action::"enforce_clause", resource)
when {
    resource.category == "notice_period" &&
    resource.tenant_notice_days > (resource.landlord_notice_days * 2)
};

// interest_rate_cap.cedar
// cite: Usurious Loans Act 1918 & RBI Fair Practices Code
@id("interest_rate_cap")
forbid(principal, action == Action::"enforce_clause", resource)
when {
    resource.category == "penalty" &&
    resource.daily_interest_pct > 2
};

// non_compete_duration.cedar
// cite: Indian Contract Act Sec 27 — restraint of trade
@id("non_compete_duration")
forbid(principal, action == Action::"enforce_clause", resource)
when {
    resource.category == "non_compete" &&
    resource.duration_months > 12
};

// painting_deduction.cedar
// cite: Model Tenancy Act 2021, Sec 15 (Fair Wear and Tear)
@id("painting_deduction")
forbid(principal, action == Action::"enforce_clause", resource)
when {
    resource.category == "deposit" &&
    resource.painting_deduction_mandatory == true
};

// premature_exit_forfeiture.cedar
// cite: Indian Contract Act 1872, Sec 74 (Unreasonable Penalty)
@id("premature_exit_forfeiture")
forbid(principal, action == Action::"enforce_clause", resource)
when {
    resource.category == "termination" &&
    resource.full_deposit_forfeited_on_early_exit == true
};

// arbitrary_rent_escalation.cedar
// cite: Model Tenancy Act 2021 & Rent Control Norms
@id("arbitrary_rent_escalation")
forbid(principal, action == Action::"enforce_clause", resource)
when {
    resource.category == "rent_escalation" &&
    resource.annual_escalation_pct > 10
};

// lock_in_period_penalty.cedar
// cite: Indian Contract Act 1872, Sec 74
@id("lock_in_period_penalty")
forbid(principal, action == Action::"enforce_clause", resource)
when {
    resource.category == "lock_in" &&
    resource.demands_entire_lock_in_rent == true
};

permit(principal, action == Action::"enforce_clause", resource);
"""

entities = [
    {
        "uid": {"type": "ContractClause", "id": "c1"},
        "attrs": {
            "category": "deposit",
            "amount_inr": 250000,
            "monthly_rent_inr": 25000,
            "tenant_notice_days": 90,
            "landlord_notice_days": 15,
            "daily_interest_pct": 5,
            "duration_months": 24,
            "painting_deduction_mandatory": True,
            "full_deposit_forfeited_on_early_exit": True,
            "annual_escalation_pct": 15,
            "demands_entire_lock_in_rent": True
        },
        "parents": []
    }
]

req = {
    "principal": 'ContractParty::"landlord"',
    "action": 'Action::"enforce_clause"',
    "resource": 'ContractClause::"c1"',
    "context": {}
}

res = cedarpy.is_authorized(req, policies, entities)
print("Decision:", res.decision)
print("Allowed:", res.allowed)
print("Reasons:", res.diagnostics.reasons)
print("id_annotations_by_reason:", res.diagnostics.id_annotations_by_reason)
