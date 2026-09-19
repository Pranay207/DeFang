// non_compete_duration.cedar
// cite: Indian Contract Act Sec 27 — restraint of trade
// Forbid post-termination non-compete clauses exceeding 12 months (void under Section 27).

@id("non_compete_duration")
@cite("Indian Contract Act 1872, Sec 27")
@title("Unlawful Post-Employment Restraint of Trade")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "non_compete" &&
    resource.duration_months > 12
};
