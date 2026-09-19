export type Language = 'en' | 'hi' | 'te';

export interface Violation {
  policy_id: string;
  title: string;
  citation: string;
  rule_text: string;
  severity: number;
  description: string;
  financial: boolean;
}

export interface WhatsAppVariants {
  polite: string;
  firm: string;
  legal: string;
}

export interface ExtractedValue {
  amount_inr?: number;
  monthly_rent_inr?: number;
  duration_months?: number;
  tenant_notice_days?: number;
  landlord_notice_days?: number;
  daily_interest_pct?: number;
  painting_deduction_mandatory?: boolean;
  full_deposit_forfeited_on_early_exit?: boolean;
}

export interface Clause {
  clause_id: number;
  clause_text: string;
  category: string;
  extracted_value: ExtractedValue;
  favors: 'landlord' | 'tenant' | 'neutral';
  verdict: 'ALLOW' | 'DENY';
  is_red_flag: boolean;
  title: string;
  citation: string;
  rule_text: string;
  severity: number;
  violations: Violation[];
  eli5: string;
  eli5_hi: string;
  eli5_te: string;
  rewritten_fair_text: string;
  whatsapp: WhatsAppVariants;
}

export interface RupeeTrapItem {
  clause_id: number;
  title: string;
  amount_inr: number;
  citation: string;
  reason: string;
}

export interface PowerImbalance {
  landlord_pct: number;
  tenant_pct: number;
  hypocrisy_callout: string;
  summary: string;
}

export interface DualEngineMetrics {
  stage_1_agent: {
    name: string;
    model: string;
    status: string;
    duration_ms: number;
    clauses_extracted: number;
  };
  stage_2_cedar: {
    name: string;
    status: string;
    duration_ms: number;
    policies_checked: number;
    policies_denied: number;
    policies_allowed: number;
  };
}

export interface ScanResult {
  contract_title: string;
  contract_category: string;
  jurisdiction: string;
  overall_risk_score: number;
  risk_level: string;
  risk_color: string;
  deny_count: number;
  allow_count: number;
  total_clauses: number;
  total_rupee_trap: number;
  rupee_breakdown: RupeeTrapItem[];
  power_imbalance: PowerImbalance;
  clauses: Clause[];
  dual_engine_metrics: DualEngineMetrics;
  raw_text?: string;
}

export interface PresetSummary {
  id: string;
  title: string;
  category: string;
  jurisdiction: string;
  badge: string;
  description: string;
}
