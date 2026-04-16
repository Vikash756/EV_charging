// import { useState, useEffect, useCallback } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const DEFAULT_CONFIG = {
//   basePrice: 5,
//   rules: {
//     peak:     { enabled: true,  startHour: 8,  endHour: 22, multiplier: 1.7 },
//     demand:   { enabled: true,  threshold: 70, multiplier: 1.3 },
//     offpeak:  { enabled: false, discountPercent: 30 },
//     queue:    { enabled: false, extraPerKwh: 2 },
//   },
// };

// function calcPrice(hour, config) {
//   const { basePrice, rules } = config;
//   let price = basePrice;
//   let type = "normal";
//   const isPeak    = rules.peak.enabled    && hour >= rules.peak.startHour && hour < rules.peak.endHour;
//   const isOffpeak = rules.offpeak.enabled && (hour < 6 || hour >= 22);
//   if (isPeak) {
//     price *= rules.peak.multiplier;
//     type   = "peak";
//     if (rules.demand.enabled) price *= rules.demand.multiplier;
//     if (rules.queue.enabled)  price += rules.queue.extraPerKwh;
//   } else if (isOffpeak) {
//     price *= 1 - rules.offpeak.discountPercent / 100;
//     type   = "offpeak";
//   }
//   return { price: Math.max(0.5, parseFloat(price.toFixed(2))), type };
// }

// // ── small helpers ──────────────────────────────────────────
// function Toggle({ checked, onChange }) {
//   return (
//     <button
//       onClick={() => onChange(!checked)}
//       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-blue-500" : "bg-gray-300"}`}
//     >
//       <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`} />
//     </button>
//   );
// }

// function StatCard({ label, value, color = "text-gray-900" }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-5">
//       <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{label}</p>
//       <p className={`text-3xl font-semibold ${color}`}>{value}</p>
//     </div>
//   );
// }

// function Badge({ type }) {
//   const map = {
//     peak:    { label: "Peak hours active",       cls: "bg-red-100 text-red-700" },
//     offpeak: { label: "Off-peak discount active", cls: "bg-green-100 text-green-700" },
//     normal:  { label: "Normal pricing",           cls: "bg-blue-100 text-blue-700" },
//   };
//   const { label, cls } = map[type] || map.normal;
//   return <span className={`text-xs font-medium px-3 py-1 rounded-full ${cls}`}>{label}</span>;
// }

// // ── 24-hr bar chart ────────────────────────────────────────
// function HourlyChart({ config }) {
//   const now    = new Date().getHours();
//   const hours  = Array.from({ length: 24 }, (_, h) => ({ h, ...calcPrice(h, config) }));
//   const maxP   = Math.max(...hours.map((x) => x.price), 1);
//   const colors = { peak: "#ef4444", offpeak: "#22c55e", normal: "#3b82f6" };

//   return (
//     <div>
//       <div className="flex items-end gap-1 h-20">
//         {hours.map(({ h, price, type }) => (
//           <div key={h} className="flex-1 flex flex-col items-center justify-end h-full">
//             <div
//               title={`₹${price} at ${h}:00`}
//               className={`w-full rounded-t transition-all ${h === now ? "ring-2 ring-gray-800 ring-offset-1" : ""}`}
//               style={{ height: `${Math.round((price / maxP) * 100)}%`, background: colors[type] }}
//             />
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between mt-1">
//         {["12am", "6am", "12pm", "6pm", "11pm"].map((t) => (
//           <span key={t} className="text-xs text-gray-400">{t}</span>
//         ))}
//       </div>
//       <div className="flex gap-4 mt-3">
//         {[["Peak", "#ef4444"], ["Normal", "#3b82f6"], ["Off-peak", "#22c55e"]].map(([label, color]) => (
//           <div key={label} className="flex items-center gap-1.5">
//             <div className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} />
//             <span className="text-xs text-gray-500">{label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── main component ─────────────────────────────────────────
// export default function Pricing() {
//   const [config,     setConfig]     = useState(DEFAULT_CONFIG);
//   const [stats,      setStats]      = useState({ total: 0, active: 0, pending: 0 });
//   const [saveStatus, setSaveStatus] = useState(""); // "" | "saving" | "saved" | "error"
//   const [loading,    setLoading]    = useState(true);

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   // fetch on mount
//   useEffect(() => {
//     axios
//       .get(`${API}/api/pricing`, { headers })
//       .then(({ data }) => {
//         setConfig(data.config);
//         setStats(data.stats);
//       })
//       .catch(() => {})   // fallback to defaults silently
//       .finally(() => setLoading(false));
//   }, []);

//   const effective = calcPrice(new Date().getHours(), config);

//   // generic rule updater
//   const setRule = (ruleName, field, value) =>
//     setConfig((prev) => ({
//       ...prev,
//       rules: { ...prev.rules, [ruleName]: { ...prev.rules[ruleName], [field]: value } },
//     }));

//   const handleSave = useCallback(async () => {
//     setSaveStatus("saving");
//     try {
//       await axios.put(`${API}/api/pricing`, config, { headers });
//       setSaveStatus("saved");
//       setTimeout(() => setSaveStatus(""), 2500);
//     } catch {
//       setSaveStatus("error");
//       setTimeout(() => setSaveStatus(""), 2500);
//     }
//   }, [config]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//       </div>
//     );
//   }

//   const { peak, demand, offpeak, queue } = config.rules;

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">

//       {/* ── stat cards ── */}
//       <div className="grid grid-cols-3 gap-4">
//         <StatCard label="Total"   value={stats.total} />
//         <StatCard label="Active"  value={stats.active}  color="text-green-600" />
//         <StatCard label="Pending" value={stats.pending} color="text-yellow-600" />
//       </div>

//       {/* ── effective price banner ── */}
//       <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
//         <div>
//           <p className="text-xs text-gray-500 mb-1">Current effective price</p>
//           <div className="flex items-baseline gap-2">
//             <span className="text-3xl font-semibold text-gray-900">₹{effective.price.toFixed(2)}</span>
//             <span className="text-sm text-gray-400">/ kWh</span>
//           </div>
//           <div className="mt-2"><Badge type={effective.type} /></div>
//         </div>
//         <div className="text-right">
//           <p className="text-xs text-gray-500">Base price</p>
//           <p className="text-xl font-semibold text-gray-800">₹{config.basePrice}/kWh</p>
//         </div>
//       </div>

//       {/* ── base price ── */}
//       <div className="bg-white border border-gray-200 rounded-xl p-5">
//         <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Base price</h3>
//         <div className="flex items-center gap-3">
//           <span className="text-sm text-gray-500">₹</span>
//           <input
//             type="number" min="1" max="100" step="0.5"
//             value={config.basePrice}
//             onChange={(e) => setConfig((p) => ({ ...p, basePrice: parseFloat(e.target.value) || 1 }))}
//             className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <span className="text-sm text-gray-500">per kWh — starting price before multipliers</span>
//         </div>
//       </div>

//       {/* ── pricing rules ── */}
//       <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-5">
//         <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Pricing rules</h3>

//         {/* peak */}
//         <div className="flex gap-4 pb-5 border-b border-gray-100">
//           <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-base flex-shrink-0">⏰</div>
//           <div className="flex-1">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-800">Peak hour pricing</p>
//                 <p className="text-xs text-gray-400 mt-0.5">Higher price during busy hours</p>
//               </div>
//               <Toggle checked={peak.enabled} onChange={(v) => setRule("peak", "enabled", v)} />
//             </div>
//             {peak.enabled && (
//               <div className="mt-3 grid grid-cols-2 gap-3">
//                 <label className="text-xs text-gray-500">
//                   Start hour
//                   <input type="number" min="0" max="23" value={peak.startHour}
//                     onChange={(e) => setRule("peak", "startHour", parseInt(e.target.value))}
//                     className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
//                 </label>
//                 <label className="text-xs text-gray-500">
//                   End hour
//                   <input type="number" min="0" max="23" value={peak.endHour}
//                     onChange={(e) => setRule("peak", "endHour", parseInt(e.target.value))}
//                     className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
//                 </label>
//                 <label className="text-xs text-gray-500 col-span-2">
//                   Multiplier: <span className="font-medium text-blue-600">{peak.multiplier.toFixed(1)}x</span>
//                   <input type="range" min="1" max="3" step="0.1" value={peak.multiplier}
//                     onChange={(e) => setRule("peak", "multiplier", parseFloat(e.target.value))}
//                     className="mt-1 w-full accent-blue-500" />
//                 </label>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* demand */}
//         <div className="flex gap-4 pb-5 border-b border-gray-100">
//           <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-base flex-shrink-0">📊</div>
//           <div className="flex-1">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-800">Demand-based pricing</p>
//                 <p className="text-xs text-gray-400 mt-0.5">Price rises when {demand.threshold}%+ chargers are busy</p>
//               </div>
//               <Toggle checked={demand.enabled} onChange={(v) => setRule("demand", "enabled", v)} />
//             </div>
//             {demand.enabled && (
//               <div className="mt-3">
//                 <label className="text-xs text-gray-500">
//                   Multiplier: <span className="font-medium text-blue-600">{demand.multiplier.toFixed(1)}x</span>
//                   <input type="range" min="1" max="2.5" step="0.1" value={demand.multiplier}
//                     onChange={(e) => setRule("demand", "multiplier", parseFloat(e.target.value))}
//                     className="mt-1 w-full accent-blue-500" />
//                 </label>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* off-peak */}
//         <div className="flex gap-4 pb-5 border-b border-gray-100">
//           <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center text-base flex-shrink-0">🌙</div>
//           <div className="flex-1">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-800">Off-peak discount</p>
//                 <p className="text-xs text-gray-400 mt-0.5">Night hours (before 6am / after 10pm)</p>
//               </div>
//               <Toggle checked={offpeak.enabled} onChange={(v) => setRule("offpeak", "enabled", v)} />
//             </div>
//             {offpeak.enabled && (
//               <div className="mt-3">
//                 <label className="text-xs text-gray-500">
//                   Discount: <span className="font-medium text-green-600">{offpeak.discountPercent}% off</span>
//                   <input type="range" min="5" max="50" step="5" value={offpeak.discountPercent}
//                     onChange={(e) => setRule("offpeak", "discountPercent", parseInt(e.target.value))}
//                     className="mt-1 w-full accent-green-500" />
//                 </label>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* queue */}
//         <div className="flex gap-4">
//           <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-base flex-shrink-0">🚗</div>
//           <div className="flex-1">
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-800">Queue penalty</p>
//                 <p className="text-xs text-gray-400 mt-0.5">Extra charge when wait time exceeds 15 min</p>
//               </div>
//               <Toggle checked={queue.enabled} onChange={(v) => setRule("queue", "enabled", v)} />
//             </div>
//             {queue.enabled && (
//               <div className="mt-3 flex items-center gap-2">
//                 <span className="text-xs text-gray-500">Extra: ₹</span>
//                 <input type="number" min="0" max="20" step="0.5" value={queue.extraPerKwh}
//                   onChange={(e) => setRule("queue", "extraPerKwh", parseFloat(e.target.value))}
//                   className="w-20 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
//                 <span className="text-xs text-gray-500">/ kWh</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* ── 24hr preview ── */}
//       <div className="bg-white border border-gray-200 rounded-xl p-5">
//         <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">24-hour price preview</h3>
//         <HourlyChart config={config} />
//       </div>

//       {/* ── save button ── */}
//       <div className="flex items-center gap-4">
//         <button
//           onClick={handleSave}
//           disabled={saveStatus === "saving"}
//           className="bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white font-medium px-6 py-2.5 rounded-xl transition-colors text-sm"
//         >
//           {saveStatus === "saving" ? "Saving..." : "Save pricing rules"}
//         </button>
//         {saveStatus === "saved" && <span className="text-sm text-green-600 font-medium">Rules saved!</span>}
//         {saveStatus === "error"  && <span className="text-sm text-red-500 font-medium">Save failed, try again.</span>}
//       </div>
//     </div>
//   );
// }
