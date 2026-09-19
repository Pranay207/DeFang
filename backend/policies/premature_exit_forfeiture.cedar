// premature_exit_forfeiture.cedar
// cite: Indian Contract Act 1872, Sec 74 (Unreasonable Penalty)
// Forbid complete forfeiture of security deposit or arbitrary penalty upon early termination where notice is served.

@id("premature_exit_forfeiture")
@cite("Indian Contract Act 1872, Sec 74")
@title("Full Deposit Forfeiture on Early Exit Penalty")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    (resource.category == "termination" || resource.category == "penalty") &&
    resource.full_deposit_forfeited_on_early_exit == true
};
