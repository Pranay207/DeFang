// painting_deduction.cedar
// cite: Model Tenancy Act 2021, Sec 15 (Fair Wear and Tear)
// Forbid mandatory non-negotiable painting charges deducted directly from tenant security deposit.

@id("painting_deduction")
@cite("Model Tenancy Act 2021, Sec 15")
@title("Mandatory Repainting Deduction Violation")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "deposit" &&
    resource.painting_deduction_mandatory == true
};
