// interest_rate_cap.cedar
// cite: Usurious Loans Act 1918 & RBI Fair Practice Norms
// Forbid predatory late fee or penalty interest rates exceeding 2% per day.

@id("interest_rate_cap")
@cite("Usurious Loans Act 1918 & RBI Fair Practices Code")
@title("Predatory Daily Late Interest Rate Cap")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "penalty" &&
    resource.daily_interest_pct > 2
};
