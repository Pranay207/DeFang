// lock_in_period_penalty.cedar
// cite: Indian Contract Act 1872, Sec 74 (Penal Lock-in Damages)
// Forbid demanding rent for the entire unexpired lock-in period upon early exit.

@id("lock_in_period_penalty")
@cite("Indian Contract Act 1872, Sec 74")
@title("Excessive Lock-in Period Rent Forfeiture")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "lock_in" &&
    resource.demands_entire_lock_in_rent == true
};
