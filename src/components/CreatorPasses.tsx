import React, { useState, useEffect } from "react";
import { 
  Check, 
  Flame, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  X, 
  Lock, 
  CreditCard, 
  Award, 
  RefreshCw,
  Terminal,
  Receipt,
  Copy
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CreatorPass } from "../types";

export default function CreatorPasses() {
  const [activePlan, setActivePlan] = useState<"basic" | "pro" | "ultimate" | null>(null);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showFullTerms, setShowFullTerms] = useState(false);
  
  // Payment Form States
  const [artistName, setArtistName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("123");

  // Transaction processing states
  const [processing, setProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [purchasedPass, setPurchasedPass] = useState<CreatorPass | null>(null);
  const [auditPasses, setAuditPasses] = useState<CreatorPass[]>([]);
  const [copiedKey, setCopiedKey] = useState(false);

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {
      const res = await fetch("/api/passes");
      if (res.ok) {
        const data = await res.json();
        setAuditPasses(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenCheckout = (plan: "basic" | "pro" | "ultimate") => {
    setActivePlan(plan);
    setCheckoutModal(true);
    setAgreedToTerms(false);
    setShowFullTerms(false);
  };

  const handleCloseCheckout = () => {
    if (!processing) {
      setCheckoutModal(false);
      setActivePlan(null);
      setPurchasedPass(null);
      setAgreedToTerms(false);
      setShowFullTerms(false);
    }
  };

  const getPlanPrice = () => {
    if (activePlan === "basic") return { price: 99, label: "Basic Pass" };
    if (activePlan === "pro") return { price: 199, label: "Pro Pass" };
    if (activePlan === "ultimate") return { price: 5999, label: "Ultimate Pass" };
    return { price: 0, label: "" };
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistName.trim() || !email.trim() || !fullName.trim()) return;

    try {
      setProcessing(true);
      const steps = [
        "Initializing secure routing gateway...",
        "Authorizing token handshake with bank node...",
        "Securing license authorization keys...",
        "Writing transaction log to database..."
      ];

      for (let i = 0; i < steps.length; i++) {
        setStatusMessage(steps[i]);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      const { price, label } = getPlanPrice();
      const payload = {
        name: fullName.trim(),
        email: email.trim(),
        artistName: artistName.trim(),
        tier: activePlan,
        price
      };

      const res = await fetch("/api/passes/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setPurchasedPass(data.pass);
        fetchPasses();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const planDetails = [
    {
      id: "basic" as const,
      name: "Basic Pass",
      price: "₹99",
      period: "one-time",
      desc: "Perfect for single releases needing immediate, visual lyrics timing files.",
      features: [
        "1 Active Smart Link Hub",
        "Standard 9:16 Kinetic Theme",
        "Up to 4 Timing lyric segments",
        "Standard canvas wallpaper export",
        "30-day view statistics backup"
      ],
      icon: Zap,
      accent: "border-neutral-800 hover:border-neutral-700 bg-neutral-900/20 text-neutral-300"
    },
    {
      id: "pro" as const,
      name: "Pro Suite Pass",
      price: "₹199",
      period: "one-time",
      desc: "Our most popular setup for visual automation, full analytics, and dynamic templates.",
      features: [
        "5 Active Smart Link Hubs",
        "All Custom Landing Themes unlocked",
        "Advanced Gemini Lyric Layout coordination",
        "Infinite high-resolution PNG exports",
        "Full Platform-by-Platform click statistics",
        "Custom URLs & branding tags"
      ],
      icon: Flame,
      accent: "border-rose-500/80 bg-rose-950/10 text-white relative shadow-lg shadow-rose-950/20"
    },
    {
      id: "ultimate" as const,
      name: "Ultimate Studio",
      price: "₹5,999",
      period: "one-time",
      desc: "Premium, unlimited consulting and release management with Heartscript engineers.",
      features: [
        "Unlimited Smart Link Hubs",
        "Dedicated custom domain masking",
        "Priority Gemini suggestions (faster routing)",
        "Direct oEmbed API scraping channels",
        "1-on-1 marketing consulting (30 mins)",
        "Lifetime platform feature access"
      ],
      icon: Award,
      accent: "border-amber-900/60 hover:border-amber-800 bg-amber-950/5 text-amber-100"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-12 relative z-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-display font-extrabold text-white tracking-tight">Creator Passes</h2>
        <p className="text-sm text-neutral-400 mt-2">
          Pick your tier to unlock advanced Gemini suggestions, unlimited smart-link analytics click monitoring, and custom layout styling modules.
        </p>
      </div>

      {/* Pricing Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {planDetails.map((plan) => {
          const IconComp = plan.icon;
          return (
            <div
              key={plan.id}
              className={`border p-8 rounded-3xl flex flex-col justify-between transition-all group text-left ${plan.accent}`}
            >
              <div>
                {/* Popular Badge */}
                {plan.id === "pro" && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-rose-600 border border-rose-500 text-[10px] font-bold uppercase tracking-widest rounded-full text-white">
                    RECOMMENDED CHOICE
                  </span>
                )}

                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold font-display">{plan.name}</h3>
                  <IconComp className={`w-5 h-5 ${plan.id === "pro" ? "text-rose-500" : "text-neutral-500"}`} />
                </div>

                <div className="flex items-baseline gap-1.5 mb-4">
                  <span className="text-4xl font-display font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-neutral-500 font-mono">/ {plan.period}</span>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6 border-b border-neutral-850 pb-6">
                  {plan.desc}
                </p>

                <ul className="space-y-3.5">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-normal">
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.id === "pro" ? "text-rose-500" : "text-neutral-400"}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleOpenCheckout(plan.id)}
                id={`buy-pass-btn-${plan.id}`}
                className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-wider uppercase transition cursor-pointer mt-8 ${
                  plan.id === "pro"
                    ? "bg-rose-600 hover:bg-rose-500 text-white shadow-xl shadow-rose-900/20"
                    : "bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-neutral-200"
                }`}
              >
                Access Creator Suite
              </button>
            </div>
          );
        })}
      </div>

      {/* Checkout Modal Overlay */}
      <AnimatePresence>
        {checkoutModal && activePlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseCheckout}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl z-10 p-8 text-left"
            >
              <button
                onClick={handleCloseCheckout}
                disabled={processing}
                id="close-checkout-modal"
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {!purchasedPass ? (
                // Checkout Panel
                <form onSubmit={handleProcessPayment} className="space-y-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-rose-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Secure checkout gateway
                    </span>
                    <h3 className="text-lg font-display font-bold text-white mt-1">
                      Order: {getPlanPrice().label}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Register your credentials to claim your license token (Indian Rupee checkout mock).
                    </p>
                  </div>

                  {/* Pricing Overview */}
                  <div className="bg-black/40 border border-neutral-850 p-4 rounded-xl flex justify-between items-center">
                    <span className="text-xs font-semibold text-neutral-300 uppercase font-mono">Invoice Amount:</span>
                    <span className="text-xl font-display font-extrabold text-white">₹{getPlanPrice().price}</span>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Artist Name</label>
                        <input
                          type="text"
                          required
                          value={artistName}
                          id="checkout-artist-name"
                          onChange={(e) => setArtistName(e.target.value)}
                          className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition"
                          placeholder="e.g. Mercer Beats"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Billing Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          id="checkout-email"
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition"
                          placeholder="alex@mercerbeats.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono uppercase tracking-wider text-neutral-400">Cardholder Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        id="checkout-fullname"
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition"
                        placeholder="Alex Mercer"
                      />
                    </div>

                    {/* Card inputs */}
                    <div className="bg-black/20 border border-neutral-850 rounded-xl p-4 space-y-3.5">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-neutral-500" /> Simulated card number
                        </span>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          id="checkout-card-num"
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase">Expiry (MM/YY)</span>
                          <input
                            type="text"
                            required
                            value={expiry}
                            id="checkout-expiry"
                            onChange={(e) => setExpiry(e.target.value)}
                            className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-neutral-400 uppercase">CVV / CVN</span>
                          <input
                            type="password"
                            required
                            maxLength={3}
                            value={cvv}
                            id="checkout-cvv"
                            onChange={(e) => setCvv(e.target.value)}
                            className="w-full bg-black/40 border border-neutral-800 focus:border-rose-500 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms of Service Section */}
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Terms of Service & Liability Disclaimer</span>
                      <button
                        type="button"
                        onClick={() => setShowFullTerms(!showFullTerms)}
                        className="text-[10px] text-rose-400 hover:text-rose-300 underline font-mono cursor-pointer"
                      >
                        {showFullTerms ? "Collapse Terms" : "View Full Terms"}
                      </button>
                    </div>

                    <div className={`text-[10px] text-neutral-400 font-sans leading-relaxed border border-neutral-850 bg-black/45 rounded-xl p-3.5 transition-all duration-300 overflow-y-auto ${showFullTerms ? 'max-h-36' : 'max-h-16'}`}>
                      <p className="font-bold text-neutral-300 mb-1">Terms of Service: Liability & Disclaimer</p>
                      
                      <p className="font-semibold text-neutral-300 mt-2 mb-0.5">1. Service Delivery and "As-Is" Provision</p>
                      <p className="mb-2">Heartscript Studios provides its Visual Engine, HeartLinks tool, and associated creator platform services on an "as-is" and "as-available" basis. While we aim to deliver automated marketing assets and smart links seamlessly, we do not guarantee uninterrupted, secure, or error-free operation. The platform relies on third-party integrations (including but not limited to the Google AI Studio Gemini API, Spotify API, YouTube API, and Apple Music scraping mechanisms). Heartscript Studios is not responsible for disruptions caused by modifications, outages, or technical changes implemented by these third-party platforms.</p>
                      
                      <p className="font-semibold text-neutral-300 mt-2 mb-0.5">2. Limitation of Liability</p>
                      <p className="mb-2">To the maximum extent permitted by applicable law, in no event shall Heartscript Studios, its founder, or its affiliates be liable for any direct, indirect, incidental, special, consequential, or exemplary damages. This includes, but is not limited to, damages for: Loss of profits, revenue, or business opportunities resulting from platform downtime; Loss of data, lyrics, track metadata, or visual assets; Any issues, errors, or delays in generating the 9:16 video/image layouts; The performance or non-performance of social media marketing campaigns utilizing assets generated on this website.</p>
                      
                      <p className="font-semibold text-neutral-300 mt-2 mb-0.5">3. Maximum Remedy cap</p>
                      <p className="mb-2">In the event that a court of competent jurisdiction finds Heartscript Studios liable for damages despite the limitations outlined above, our total aggregate liability to you for any and all claims arising out of or relating to the use of the platform—including the purchase of a Basic, Pro, or Ultimate Creator Pass—shall be strictly limited to the actual amount paid by you to Heartscript Studios for the specific service or pass tier giving rise to the liability.</p>
                      
                      <p className="font-semibold text-neutral-300 mt-2 mb-0.5">4. Payment and Order Processing</p>
                      <p>All monetary transactions for Creator Passes are processed through secure, third-party payment gateways (such as Razorpay or Stripe). Heartscript Studios does not directly store your sensitive financial information or credit card data. Any disputes regarding payment processing errors, failed transactions, or unauthorized charges must be handled directly with the payment gateway provider.</p>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="checkout-agree-tos"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-neutral-800 bg-black/40 text-rose-500 accent-rose-500 focus:ring-0 cursor-pointer"
                        required
                      />
                      <label htmlFor="checkout-agree-tos" className="text-[11px] text-neutral-400 select-none cursor-pointer leading-tight">
                        I agree to the Terms of Service and understand that platform tools are provided as-is.
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={processing || !agreedToTerms}
                    id="submit-checkout-btn"
                    className="w-full py-4 bg-rose-600 hover:bg-rose-500 disabled:bg-neutral-850 disabled:text-neutral-500 disabled:border-neutral-800/40 text-white rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    {processing ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>{statusMessage}</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pay and Unlock Creator Pass</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                // Success Invoice Receipt Panel
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-rose-950/30 border border-rose-500/30 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-4">
                      <Receipt className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-extrabold text-white">License Verified</h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Thank you! Your Creator Pass purchase was logged and activated successfully.
                    </p>
                  </div>

                  {/* Receipt items */}
                  <div className="bg-black/40 border border-neutral-850 p-6 rounded-2xl space-y-4 font-mono text-xs">
                    <div className="flex justify-between border-b border-neutral-850 pb-3">
                      <span className="text-neutral-500">Tier Tier:</span>
                      <span className="text-rose-400 font-bold uppercase">{purchasedPass.tier}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-850 pb-3">
                      <span className="text-neutral-500">Artist Name:</span>
                      <span className="text-white font-bold">{purchasedPass.artistName}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-850 pb-3">
                      <span className="text-neutral-500">Transaction ID:</span>
                      <span className="text-neutral-300">{purchasedPass.id}</span>
                    </div>
                    
                    {/* Key segment */}
                    <div className="bg-black border border-neutral-850 p-3.5 rounded-xl space-y-1.5">
                      <span className="text-[10px] text-neutral-500 uppercase tracking-widest flex items-center justify-between">
                        <span>Access Key Key</span>
                        <span className="text-emerald-400">ACTIVE</span>
                      </span>
                      <div className="flex justify-between items-center gap-2">
                        <span className="text-sm font-bold tracking-widest text-emerald-400 select-all">{purchasedPass.activationKey}</span>
                        <button
                          onClick={() => handleCopyKey(purchasedPass.activationKey)}
                          id="copy-invoice-key-btn"
                          className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
                        >
                          {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCloseCheckout}
                    id="finish-checkout-btn"
                    className="w-full py-4.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
                  >
                    Enter Unlocked Suite
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Developer Audit Ledger Logs (GET /api/passes logs) */}
      <div className="bg-neutral-900/40 border border-neutral-850 p-8 rounded-3xl text-left">
        <div className="flex items-center gap-2 border-b border-neutral-800/80 pb-4 mb-6">
          <Terminal className="w-5 h-5 text-rose-500" />
          <div>
            <h3 className="font-display font-bold text-white text-base">Studio Ledger Console</h3>
            <p className="text-[10px] text-neutral-500">Live, database-synced transaction logging for audits and license tracking.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-neutral-850 text-neutral-500 pb-2">
                <th className="py-2.5 font-semibold text-left uppercase">TX ID</th>
                <th className="py-2.5 font-semibold text-left uppercase">Artist</th>
                <th className="py-2.5 font-semibold text-left uppercase">Tier</th>
                <th className="py-2.5 font-semibold text-left uppercase">Amount</th>
                <th className="py-2.5 font-semibold text-left uppercase">License License Key</th>
                <th className="py-2.5 font-semibold text-right uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {auditPasses.map((pass) => (
                <tr key={pass.id} className="border-b border-neutral-850/40 text-neutral-300 hover:bg-white/2.5 transition">
                  <td className="py-3 text-neutral-500">{pass.id.substring(0, 10)}</td>
                  <td className="py-3 font-semibold text-white">{pass.artistName}</td>
                  <td className="py-3 uppercase text-rose-400">{pass.tier}</td>
                  <td className="py-3">₹{pass.price}</td>
                  <td className="py-3 font-semibold text-neutral-400">{pass.activationKey}</td>
                  <td className="py-3 text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-900 text-emerald-400 font-bold uppercase tracking-widest text-[9px]">
                      SUCCESS
                    </span>
                  </td>
                </tr>
              ))}
              {auditPasses.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-500 italic">
                    No license purchase logs detected in data layer.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
