import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Scale, Cpu, CheckCircle2, Code } from 'lucide-react';

interface CedarArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CedarPolicyInfo {
  id: string;
  name: string;
  statute: string;
  description: string;
  code: string;
}

const CEDAR_POLICIES: CedarPolicyInfo[] = [
  {
    id: 'deposit_cap',
    name: 'Security Deposit Ceiling',
    statute: 'Model Tenancy Act 2021, Sec 9',
    description: 'Forbids residential security deposits exceeding 2 to 3 months of agreed monthly rent.',
    code: `// deposit_cap.cedar
@id("deposit_cap")
@cite("Model Tenancy Act 2021, Sec 9")
@title("Excessive Security Deposit Cap Violation")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "deposit" &&
    resource.monthly_rent_inr > 0 &&
    resource.amount_inr > (resource.monthly_rent_inr * 3)
};`
  },
  {
    id: 'painting_deduction',
    name: 'Unfair Painting Deductions',
    statute: 'Model Tenancy Act 2021, Sec 15 (Fair Wear & Tear)',
    description: 'Prohibits automatic mandatory painting deductions from deposit for normal wear and tear.',
    code: `// painting_deduction.cedar
@id("painting_deduction")
@cite("Model Tenancy Act 2021, Sec 15")
@title("Mandatory Painting Charge Deducted from Deposit")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "painting" &&
    resource.is_mandatory_deduction == true
};`
  },
  {
    id: 'notice_asymmetry',
    name: 'Gross Notice Period Asymmetry',
    statute: 'Principles of Natural Justice & Indian Contract Act 1872',
    description: 'Flags unconscionable asymmetry where tenant requires 30-90 days notice while counterparty requires minimal or zero notice.',
    code: `// notice_asymmetry.cedar
@id("notice_asymmetry")
@cite("Principles of Natural Justice & Indian Contract Law")
@title("Gross Notice Period Asymmetry")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "termination_notice" &&
    (resource.tenant_notice_days > (resource.landlord_notice_days * 2))
};`
  },
  {
    id: 'premature_exit_forfeiture',
    name: 'Deposit Forfeiture Penalty',
    statute: 'Indian Contract Act 1872, Sec 74 (Liquidated Damages vs Penalty)',
    description: 'Restricts full deposit forfeiture on early exit to proven damages only.',
    code: `// premature_exit_forfeiture.cedar
@id("premature_exit_forfeiture")
@cite("Indian Contract Act 1872, Sec 74")
@title("Total Security Deposit Forfeiture on Early Exit")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "early_exit" &&
    resource.forfeiture_pct > 0 &&
    resource.proof_of_loss_required == false
};`
  },
  {
    id: 'arbitrary_rent_escalation',
    name: 'Excessive Rent Escalation',
    statute: 'Standard Tenancy Guidelines & Reasonable Indexing',
    description: 'Flags annual rent escalation clauses exceeding 10% without prior mutual renegotiation.',
    code: `// arbitrary_rent_escalation.cedar
@id("arbitrary_rent_escalation")
@cite("State Rent Control Acts & Fair Indexing Norms")
@title("Excessive Annual Rent Escalation")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "escalation" &&
    resource.escalation_rate_pct > 10
};`
  },
  {
    id: 'interest_rate_cap',
    name: 'Usurious Daily Interest Penalties',
    statute: 'Usurious Loans Act 1918 & RBI Fair Practices Code',
    description: 'Prevents compound daily late penalty rates that exceed statutory interest caps.',
    code: `// interest_rate_cap.cedar
@id("interest_rate_cap")
@cite("Usurious Loans Act 1918")
@title("Predatory Daily Late Payment Interest")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "late_interest" &&
    resource.annual_effective_rate_pct > 24
};`
  },
  {
    id: 'lock_in_period_penalty',
    name: 'Unreasonable Lock-In Penalty',
    statute: 'Indian Contract Act 1872, Sec 73 & 74',
    description: 'Disallows unreasonable multi-month financial penalties for exits beyond agreed lock-in notice.',
    code: `// lock_in_period_penalty.cedar
@id("lock_in_period_penalty")
@cite("Indian Contract Act 1872, Sec 74")
@title("Excessive Lock-In Breach Penalty")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "lock_in" &&
    resource.penalty_months > 2
};`
  },
  {
    id: 'non_compete_duration',
    name: 'Void Post-Termination Non-Compete',
    statute: 'Indian Contract Act 1872, Sec 27 (Restraint of Trade)',
    description: 'Under Sec 27, any agreement restraining exercise of lawful trade or profession is completely void.',
    code: `// non_compete_duration.cedar
@id("non_compete_duration")
@cite("Indian Contract Act 1872, Sec 27")
@title("Void Restraint of Trade / Non-Compete")
forbid (
    principal,
    action == Action::"enforce_clause",
    resource
)
when {
    resource.category == "non_compete" &&
    resource.post_termination_months > 0
};`
  }
];

export const CedarArchitectureModal: React.FC<CedarArchitectureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('deposit_cap');

  if (!isOpen) return null;

  const activePolicy = CEDAR_POLICIES.find(p => p.id === selectedPolicyId) || CEDAR_POLICIES[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-slate-950 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 p-[2px] flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>AWS Cedar Policy Engine & Architecture</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Rust / cedarpy
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Zero-hallucination deterministic statutory verification pipeline
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-200 flex-1">
            {/* Architecture Pipeline Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2 font-mono">
                  <Cpu className="w-4 h-4" />
                  <span>Stage 1: Strands Agents SDK</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Extracts raw legal natural language clauses and maps them to clean structured entities (<code className="text-cyan-300 font-mono">monthly_rent_inr</code>, <code className="text-cyan-300 font-mono">deposit_amount</code>, <code className="text-cyan-300 font-mono">notice_days</code>).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2 font-mono">
                  <Scale className="w-4 h-4" />
                  <span>Stage 2: AWS Cedar Policy Engine</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Evaluates 8 compiled <code className="text-emerald-300 font-mono">.cedar</code> policies via the official Rust-backed <code className="text-emerald-300 font-mono">cedarpy</code> engine. Generates mathematical <code className="text-red-400 font-mono">DENY</code> / <code className="text-emerald-400 font-mono">ALLOW</code> decisions with <strong>zero LLM hallucinations</strong>.
                </p>
              </div>
            </div>

            {/* Policy Viewer Tabs */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-amber-400" />
                  <span>Active Statutory Cedar Policies (8 Executed):</span>
                </h4>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Deterministic Audit Guarantee</span>
                </span>
              </div>

              {/* Policy Selector Pills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {CEDAR_POLICIES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPolicyId(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                      selectedPolicyId === p.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 font-bold shadow-sm'
                        : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/20'
                    }`}
                  >
                    {p.id}.cedar
                  </button>
                ))}
              </div>

              {/* Selected Policy Detail Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                  <div>
                    <h5 className="text-sm font-bold text-white">{activePolicy.name}</h5>
                    <p className="text-xs text-amber-300/90 font-mono mt-0.5">{activePolicy.statute}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-white/10">
                    Rule ID: @id("{activePolicy.id}")
                  </span>
                </div>

                <p className="text-xs text-slate-300">{activePolicy.description}</p>

                {/* Code Block */}
                <div className="rounded-lg bg-black/70 border border-white/10 p-3 text-xs font-mono overflow-x-auto max-h-44 overflow-y-auto text-emerald-300 leading-relaxed shadow-inner custom-scrollbar">
                  <pre>{activePolicy.code}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-white/10 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Official AWS Open-Source Stack: Strands + Cedar</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
