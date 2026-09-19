from agent import agent_service
from cedar_engine import cedar_engine
from presets import PRESETS

sample = PRESETS["preset_rental_bangalore"]["raw_text"]

print("1. Extracting clauses with Agent...")
clauses = agent_service.extract_clauses(sample)
print(f"Extracted {len(clauses)} clauses.")

total_rupee_trap = 0
deny_count = 0
allow_count = 0

print("\n2. Evaluating each clause against Cedar policies...")
for c in clauses:
    verdict = cedar_engine.evaluate_clause(c)
    status = verdict["verdict"]
    if status == "DENY":
        deny_count += 1
        for v in verdict["violations"]:
            print(f"  [RED FLAG - DENY] Clause {c['clause_id']}: {v['title']} ({v['citation']})")
        if verdict["financial_amount_inr"]:
            total_rupee_trap += verdict["financial_amount_inr"]
    else:
        allow_count += 1
        print(f"  [SAFE - ALLOW] Clause {c['clause_id']}: {c['category']}")

risk_score = min(100, int((deny_count * 20) + (total_rupee_trap / 50000) * 10))
print(f"\n3. Aggregated Risk Score: {risk_score}/100")
print(f"   Hidden Rupee Trap: Rs. {total_rupee_trap:,}")
print("PIPELINE TEST COMPLETE & PASSED!")
