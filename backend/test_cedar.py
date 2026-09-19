import cedarpy

policy = """
@id("deposit_cap")
@cite("Model Tenancy Act 2021, Sec 9")
@desc("Forbid security deposit exceeding 3x monthly rent")
forbid(
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.amount_inr > (resource.monthly_rent_inr * 3)
};

permit(
    principal,
    action == Action::"enforce_clause",
    resource
);
"""

entities = [
    {
        "uid": {"type": "ContractClause", "id": "clause_1"},
        "attrs": {
            "amount_inr": 150000,
            "monthly_rent_inr": 25000
        },
        "parents": []
    }
]

req = {
    "principal": 'ContractParty::"landlord"',
    "action": 'Action::"enforce_clause"',
    "resource": 'ContractClause::"clause_1"',
    "context": {}
}

res = cedarpy.is_authorized(req, policy, entities)
print("Decision:", res.decision)
print("Allowed:", res.allowed)
print("Reasons:", res.diagnostics.reasons)
print("id_annotations_by_reason:", res.diagnostics.id_annotations_by_reason)
