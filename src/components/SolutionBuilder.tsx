import React, { useState } from "react";
import { Check, ClipboardList, Info, Loader2, Cpu, Wrench, Shield, CheckCircle, Wind } from "lucide-react";

interface SolutionBuilderProps {
  onLeadSubmitted: () => void;
}

export default function SolutionBuilder({ onLeadSubmitted }: SolutionBuilderProps) {
  // Form state
  const [buildingType, setBuildingType] = useState("Commercial Office (High-Rise)");
  const [elevatorCount, setElevatorCount] = useState(4);
  
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([
    "Water Discharge Ban",
    "CAT6 Breakages"
  ]);

  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([
    "Dry AC Integration",
    "Wireless CCTV System"
  ]);

  // Contact details
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any>(null);

  const constraintsList = [
    { id: "Water Discharge Ban", label: "Car-Top Water Discharge Ban (Local Safety Code)", hint: "Standard AC units cannot discharge water inside hoistways." },
    { id: "CAT6 Breakages", label: "CAT6 Traveling Cable Fatigue/Breakage", hint: "Relentless elevator motion snaps copper data links repeatedly." },
    { id: "No Signal", label: "Steel Faraday-Cage Cabin Dropouts", hint: "Passengers suffer cellular/radio drops inside steel car bodies." },
    { id: "HVAC Complaints", label: "Tenant Air Quality & Heat Complaints", hint: "Hot, humid shafts make the cabin atmosphere stagnant." },
    { id: "Security Risks", label: "Unauthorized Floor Access Concerns", hint: "Sensitive corporate or clinical floors lack strict secure passage." }
  ];

  const upgradesList = [
    { id: "Dry AC Integration", label: "Dry AC Condensation-Free Air Conditioner", desc: "Re-evaporates condensation water safely; keeps high-voltage rails completely dry." },
    { id: "Wireless CCTV System", label: "Wireless CCTV Smart-Link Bridge", desc: "Gigabit-speed millimeter wave transceiver eliminates physical moving data lines." },
    { id: "IoT Monitoring", label: "G3 IoT Smart Gateway & Sensor Array", desc: "Non-intrusive edge telemetry sensors detect mechanical wear before shutdowns." },
    { id: "Interactive Screen", label: "15.6\" Interactive Screen & Emergency Intercom", desc: "SIP HD video links keep passengers connected, even inside Faraday-cages." },
    { id: "Biometric Access", label: "Biometric Access & Secure RFID Readers", desc: "Ultra-fast local facial recognition terminals integrated directly in-cab." }
  ];

  const toggleConstraint = (id: string) => {
    setSelectedConstraints((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleUpgrade = (id: string) => {
    setSelectedUpgrades((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate dynamic B2B estimates
  const estCoolingCapacity = elevatorCount * 9000;
  const wirelessBridgesNeeded = selectedUpgrades.includes("Wireless CCTV System") ? elevatorCount : 0;
  const projectedMaintenanceSavings = selectedConstraints.includes("CAT6 Breakages") ? elevatorCount * 2400 : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !companyName || !email) {
      alert("Please provide your contact name, company name, and email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          companyName,
          email,
          phone,
          buildingType,
          elevatorCount,
          shaftConstraints: selectedConstraints,
          selectedSolutions: selectedUpgrades,
          additionalNotes,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitSuccess(true);
        setSubmittedLead(data.lead);
        onLeadSubmitted();
      } else {
        alert(data.error || "Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting request to B2B backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-900/45 border-b border-slate-950 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs text-sky-400 font-mono uppercase tracking-widest block mb-2">
            Interactive Self-Service Spec Tool
          </span>
          <h2 className="text-3xl font-sans font-bold text-white tracking-tight">
            Interactive Elevator Solution Configurator
          </h2>
          <p className="text-slate-400 font-sans font-light mt-2 text-sm leading-relaxed">
            Construct an engineering draft tailored to your building constraints. Receive an instant technical assessment powered by Elevatech Systems AI.
          </p>
        </div>

        {submitSuccess ? (
          // Success Screen
          <div className="max-w-2xl mx-auto bg-slate-950 border border-sky-500/20 p-8 sm:p-10 rounded-2xl space-y-6 text-center shadow-xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-sans font-bold text-white">RFQ Drafting Successful</h3>
              <p className="text-xs text-slate-400 font-mono">
                Lead ID: {submittedLead?.id} | Registered Timestamp: {new Date(submittedLead?.timestamp).toLocaleString()}
              </p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Thank you, <strong className="text-white font-semibold">{clientName}</strong>. Your custom elevator configuration has been drafted and saved inside our CRM console.
            </p>

            {submittedLead?.aiAssessment && (
              <div className="bg-sky-500/5 border border-sky-500/10 p-5 rounded-xl text-left space-y-2 max-w-xl mx-auto">
                <span className="text-[10px] text-sky-400 font-mono uppercase tracking-widest block font-bold">
                  Instant AI Technical Pre-Assessment
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans font-light italic">
                  "{submittedLead.aiAssessment}"
                </p>
              </div>
            )}

            <button
              onClick={() => {
                setSubmitSuccess(false);
                setClientName("");
                setCompanyName("");
                setEmail("");
                setPhone("");
                setAdditionalNotes("");
                setSelectedConstraints(["Water Discharge Ban"]);
              }}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold px-6 py-2.5 rounded-lg text-xs cursor-pointer transition-colors"
            >
              Draft Another Specification
            </button>
          </div>
        ) : (
          // Solution Builder Interactive Grid
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Options Form: 7 Cols */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8 bg-slate-950 border border-slate-900 p-6 sm:p-8 rounded-2xl">
              
              {/* Step 1: Base Parameters */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-slate-950 text-xs font-mono font-bold">
                    1
                  </span>
                  <h3 className="text-sm font-mono uppercase text-white tracking-wider font-semibold">
                    Building Parameters
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                      Building Classification
                    </label>
                    <select
                      value={buildingType}
                      onChange={(e) => setBuildingType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 font-mono"
                    >
                      <option>Commercial Office (High-Rise)</option>
                      <option>Healthcare & Medical Center</option>
                      <option>Luxury Residential Tower</option>
                      <option>Industrial Warehouse / Mine Shaft</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                      Active Elevator Cabin Count: {elevatorCount}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="24"
                      value={elevatorCount}
                      onChange={(e) => setElevatorCount(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 my-3"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>1 Car</span>
                      <span>12 Cars</span>
                      <span>24 Cars</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Mechanical & Architectural Constraints */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-slate-950 text-xs font-mono font-bold">
                    2
                  </span>
                  <h3 className="text-sm font-mono uppercase text-white tracking-wider font-semibold">
                    Architectural & Structural Constraints
                  </h3>
                </div>
                <p className="text-xs text-slate-500 font-sans font-light">
                  Select the vertical transportation roadblock constraints that are currently raising compliance flags or causing hardware failures:
                </p>

                <div className="space-y-2.5">
                  {constraintsList.map((c) => (
                    <label
                      key={c.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedConstraints.includes(c.id)
                          ? "bg-slate-900/60 border-rose-500/20"
                          : "bg-slate-900/10 border-slate-900 hover:border-slate-850"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedConstraints.includes(c.id)}
                        onChange={() => toggleConstraint(c.id)}
                        className="mt-0.5 rounded border-slate-800 text-rose-500 focus:ring-rose-500"
                      />
                      <div>
                        <span className="text-xs font-semibold text-slate-200 block leading-tight">
                          {c.label}
                        </span>
                        <span className="text-[10px] text-slate-500 font-sans font-light mt-1 block">
                          {c.hint}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 3: Selected Cabin Upgrades */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-slate-950 text-xs font-mono font-bold">
                    3
                  </span>
                  <h3 className="text-sm font-mono uppercase text-white tracking-wider font-semibold">
                    Select Elevatech Engineering Upgrades
                  </h3>
                </div>
                
                <div className="space-y-2.5">
                  {upgradesList.map((u) => (
                    <label
                      key={u.id}
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedUpgrades.includes(u.id)
                          ? "bg-slate-900/60 border-sky-500/20"
                          : "bg-slate-900/10 border-slate-900 hover:border-slate-850"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedUpgrades.includes(u.id)}
                        onChange={() => toggleUpgrade(u.id)}
                        className="mt-0.5 rounded border-slate-800 text-sky-500 focus:ring-sky-500"
                      />
                      <div>
                        <span className="text-xs font-semibold text-slate-200 block leading-tight">
                          {u.label}
                        </span>
                        <span className="text-[10px] text-slate-400 font-sans font-light mt-1 block">
                          {u.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Step 4: Contact RFQ Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-900 pb-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-slate-950 text-xs font-mono font-bold">
                    4
                  </span>
                  <h3 className="text-sm font-mono uppercase text-white tracking-wider font-semibold">
                    Corporate Contact Details (DRAFT RFQ)
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Lead Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Structures LLP"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. j.doe@company.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                      Business Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +1 (555) 000-0000"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    Specialized Shaft Notes or Architectural Constraints Description
                  </label>
                  <textarea
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Describe any particular spatial layout issues, shaft temperatures, or elevator speeds..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 disabled:from-slate-800 disabled:to-slate-800 text-slate-950 font-bold py-3 px-6 rounded-lg tracking-wide shadow-md hover:shadow-lg transition-all active:scale-[0.99] shrink-0 text-xs font-mono uppercase"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Analyzing Constraints & Drafting RFQ...</span>
                  </>
                ) : (
                  <span>Compile Spec & Request RFQ Assessment</span>
                )}
              </button>

            </form>

            {/* Right Panel: Solution Draft Review Estimate (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-slate-950 border border-slate-900 p-6 rounded-2xl space-y-6">
                <h3 className="font-sans font-bold text-md text-white border-b border-slate-900 pb-3 flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-sky-400" />
                  <span>RFQ Draft Spec Estimate</span>
                </h3>

                <div className="space-y-4">
                  {/* Dynamic Parameter Readouts */}
                  <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-850 space-y-2">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block font-bold">
                      Calculated Sizing Estimates
                    </span>
                    
                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-400 font-light">Total Target Elevators</span>
                      <span className="font-mono text-white font-medium">{elevatorCount} cars</span>
                    </div>

                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-400 font-light">Target Classification</span>
                      <span className="font-mono text-sky-400 font-medium text-right max-w-[200px] line-clamp-1">
                        {buildingType}
                      </span>
                    </div>

                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-400 font-light">HVAC Cooling Target</span>
                      <span className="font-mono text-white font-medium">{estCoolingCapacity.toLocaleString()} BTU Total</span>
                    </div>

                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-400 font-light">Wireless CCTV Bridges</span>
                      <span className="font-mono text-white font-medium">{wirelessBridgesNeeded} links</span>
                    </div>
                  </div>

                  {/* Projected Financial / Operational Impact */}
                  <div className="bg-sky-950/20 p-4 rounded-xl border border-sky-950/40 space-y-2">
                    <span className="text-[10px] text-sky-400 font-mono uppercase tracking-widest block font-bold">
                      Projected B2B ROI Impact
                    </span>

                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-300 font-light">Cable Maintenance Savings</span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        ~${projectedMaintenanceSavings.toLocaleString()}/yr
                      </span>
                    </div>

                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-300 font-light">Comfort-related Complaints</span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        -95% projected reduction
                      </span>
                    </div>

                    <div className="flex justify-between text-xs py-1">
                      <span className="text-slate-300 font-light">Elevator Safety Violation Risk</span>
                      <span className="font-mono text-emerald-400 font-semibold">
                        Reduced to 0.00%
                      </span>
                    </div>
                  </div>

                  {/* Safety & Compliance Pre-Check */}
                  <div className="bg-slate-900/25 p-4 rounded-xl border border-slate-900 space-y-3">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block font-bold">
                      Safety Compliance Checklist
                    </span>

                    <div className="space-y-1.5 text-[11px] font-sans font-light text-slate-300">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Zero overhead water discharge (Safe code pass)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Brand-agnostic chassis mounting plate compliance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>FCC/CE certified shaft wireless frequencies</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 p-3 bg-indigo-950/20 border border-indigo-900/30 rounded-xl text-[11px] text-slate-400 font-sans leading-relaxed">
                    <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>
                      Adding structural parameters sends detailed vectors to our systems engineer so they can finalize mechanical mounting blueprints before making initial sales outreach.
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
