// arbitrary_rent_escalation.cedar
// cite: Model Tenancy Act 2021 & Urban Rent Control Norms
// Forbid excessive unilateral annual rent escalation exceeding 10% per annum without mutual agreement.

@id("arbitrary_rent_escalation")
@cite("Model Tenancy Act 2021 & Rent Control Norms")
@title("Uncapped / Predatory Annual Rent Escalation")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "rent_escalation" &&
    resource.annual_escalation_pct > 10
};
