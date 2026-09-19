import sys
import os
import time

sys.path.insert(0, os.path.abspath("backend"))

from fastapi.testclient import TestClient
from main import app
from presets import PRESETS

client = TestClient(app)

print("="*60)
print("AUDIT: FULL FEATURE CLICK-THROUGH & FIELD VALIDATION")
print("="*60)

for pid in PRESETS.keys():
    print(f"\n>>> TESTING PRESET: {pid}")
    
    # 1. Timing test
    times = []
    for _ in range(5):
        t0 = time.perf_counter()
        resp = client.get(f"/api/presets/{pid}")
        t1 = time.perf_counter()
        times.append((t1 - t0) * 1000)
    
    avg_ms = sum(times) / len(times)
    min_ms = min(times)
    print(f"Timing (5 runs): min = {min_ms:.2f}ms, avg = {avg_ms:.2f}ms")
    
    data = resp.json()
    
    # a) Dual-engine bar
    dem = data.get("dual_engine_metrics", {})
    s1 = dem.get("stage_1_agent", {})
    s2 = dem.get("stage_2_cedar", {})
    s1_ok = s1.get("status") == "COMPLETED"
    s2_ok = s2.get("status") == "COMPLETED"
    print(f"a) Dual Engine Bar: Stage 1 = {s1.get('status')}, Stage 2 = {s2.get('status')} -> OK: {s1_ok and s2_ok}")
    
    # b) Risk Score Gauge
    score = data.get("overall_risk_score")
    print(f"b) Risk Score: {score} (type: {type(score).__name__}) -> OK: {isinstance(score, (int, float)) and 0 <= score <= 100}")
    
    # c) Rupee Trap Simulator
    trap = data.get("total_rupee_trap")
    bd = data.get("rupee_breakdown", [])
    print(f"c) Rupee Trap: total = {trap}, items = {len(bd)} -> OK: {isinstance(trap, (int, float)) and trap >= 0}")
    
    # d) Power Imbalance
    pimb = data.get("power_imbalance", {})
    lp = pimb.get("landlord_pct", 0)
    tp = pimb.get("tenant_pct", 0)
    print(f"d) Power Imbalance: {lp}% counterparty / {tp}% protected (Sum = {lp + tp}%) -> OK: {lp + tp == 100}")
    
    # e & f) Clause cards checks
    clauses = data.get("clauses", [])
    print(f"e & f) Clauses audit ({len(clauses)} clauses):")
    for idx, c in enumerate(clauses):
        cid = c.get("clause_id")
        verdict = c.get("verdict")
        cit = c.get("citation")
        eli5_en = c.get("eli5")
        eli5_hi = c.get("eli5_hi")
        eli5_te = c.get("eli5_te")
        orig = c.get("clause_text")
        rewritten = c.get("rewritten_fair_text")
        wa = c.get("whatsapp", {})
        wa_p = wa.get("polite")
        wa_f = wa.get("firm")
        wa_l = wa.get("legal")
        
        errors = []
        if not verdict: errors.append("missing verdict")
        if not cit: errors.append("missing citation")
        if not eli5_en or not eli5_en.strip(): errors.append("missing eli5_en")
        if not eli5_hi or not eli5_hi.strip(): errors.append("missing eli5_hi")
        if not eli5_te or not eli5_te.strip(): errors.append("missing eli5_te")
        if not orig or not orig.strip(): errors.append("missing original text")
        if not rewritten or not rewritten.strip(): errors.append("missing rewritten text")
        if not wa_p or not wa_p.strip(): errors.append("missing wa_polite")
        if not wa_f or not wa_f.strip(): errors.append("missing wa_firm")
        if not wa_l or not wa_l.strip(): errors.append("missing wa_legal")
        
        if errors:
            print(f"   [FAIL] Clause {cid}: {', '.join(errors)}")
        else:
            print(f"   [PASS] Clause {cid} ({verdict}): citation, all 3 ELI5s, diff (orig+rewritten), and all 3 WA tones valid.")
