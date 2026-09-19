// notice_asymmetry.cedar
// cite: Principles of Natural Justice & Contractual Fairness (Pacta Sunt Servanda)
// Forbid asymmetric notice periods where tenant notice is more than twice the landlord notice period.

@id("notice_asymmetry")
@cite("Principles of Natural Justice & Indian Contract Law")
@title("Asymmetric Notice Period Imbalance")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "notice_period" &&
    (
        (resource.landlord_notice_days > 0 && resource.tenant_notice_days > (resource.landlord_notice_days * 2)) ||
        (resource.landlord_notice_days == 0 && resource.tenant_notice_days > 0)
    )
};
