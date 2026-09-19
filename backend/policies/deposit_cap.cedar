// deposit_cap.cedar
// cite: Model Tenancy Act 2021, Sec 9
// Forbid security deposits exceeding 3 months of agreed monthly rent for residential premises.

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
