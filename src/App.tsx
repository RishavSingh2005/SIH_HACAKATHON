import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Circle, CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { serverUrl, supabase } from "./lib/supabase";

type Village = {
  name: string;
  ward: string;
  rainfall: number;
  soil: number;
  slope: number;
  water: number;
  history: number;
  lat: number;
  lng: number;
  elevation: number;
};

const villages: Village[] = [
  { name: "Kharadi", ward: "Ward 04", rainfall: 61, soil: 79, slope: 32, water: 2.9, history: 8, lat: 31.993, lng: 77.183, elevation: 1332 },
  { name: "Sainj", ward: "Ward 07", rainfall: 43, soil: 66, slope: 24, water: 1.7, history: 5, lat: 31.948, lng: 77.243, elevation: 1274 },
  { name: "Shangarh", ward: "Ward 02", rainfall: 28, soil: 48, slope: 17, water: 0.8, history: 2, lat: 31.892, lng: 77.293, elevation: 1926 },
  { name: "Ropa", ward: "Ward 09", rainfall: 52, soil: 73, slope: 29, water: 2.2, history: 6, lat: 31.844, lng: 77.178, elevation: 1765 },
  { name: "Tirthan", ward: "Ward 11", rainfall: 36, soil: 57, slope: 21, water: 1.1, history: 3, lat: 31.888, lng: 77.113, elevation: 1520 },
];

const sensors = [
  { id: "PRV-014", place: "Kharadi bridge", rain: "61 mm/h", soil: "79%", water: "2.9 m", battery: 82, updated: "2 min" },
  { id: "PRV-021", place: "Sainj school", rain: "43 mm/h", soil: "66%", water: "1.7 m", battery: 91, updated: "4 min" },
  { id: "PRV-031", place: "Ropa bend", rain: "52 mm/h", soil: "73%", water: "2.2 m", battery: 68, updated: "1 min" },
];

function calculateRisk(village: Village, rainOffset = 0, soilOffset = 0) {
  const rain = Math.max(0, village.rainfall + rainOffset);
  const soil = Math.max(0, village.soil + soilOffset);
  const flood = Math.min(99, Math.round(rain * 0.65 + soil * 0.19 + village.water * 9 + village.history * 1.25));
  const landslide = Math.min(99, Math.round(rain * 0.25 + soil * 0.35 + village.slope * 1.05 + village.history * 2));
  const score = Math.round(flood * 0.57 + landslide * 0.43);
  const level = score >= 80 ? "CRITICAL" : score >= 62 ? "HIGH" : score >= 38 ? "MODERATE" : "LOW";
  const lead = Math.max(12, Math.round(112 - score * 0.93));
  return { rain, soil, flood, landslide, score, level, lead };
}

function RiskPill({ level }: { level: string }) {
  return <span className={`risk-pill risk-${level.toLowerCase()}`}>{level}</span>;
}

const riskColor: Record<string, string> = { LOW: "#67aa72", MODERATE: "#eac85a", HIGH: "#e97451", CRITICAL: "#bd3947" };

function Icon({ name }: { name: "drop" | "layers" | "clock" | "pin" | "bell" | "arrow" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths = {
    drop: <path {...common} d="M12 2.5S5.5 10 5.5 15.3A6.5 6.5 0 0 0 12 21.8a6.5 6.5 0 0 0 6.5-6.5C18.5 10 12 2.5 12 2.5Z" />,
    layers: <><path {...common} d="m12 3 9 5-9 5-9-5 9-5Z" /><path {...common} d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
    clock: <><circle {...common} cx="12" cy="12" r="9" /><path {...common} d="M12 7v5l3.5 2" /></>,
    pin: <><path {...common} d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle {...common} cx="12" cy="10" r="2" /></>,
    bell: <><path {...common} d="M18 9a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    arrow: <path {...common} d="M5 12h14m-5-5 5 5-5 5" />,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [guest, setGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => { supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); }); const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => { setSession(next); if (next) setGuest(false); }); return () => listener.subscription.unsubscribe(); }, []);
  if (loading) return <main className="grid min-h-full place-items-center bg-[#102a25] font-mono text-xs uppercase tracking-[.16em] text-[#caef47]">Opening secure console…</main>;
  if (!session && !guest) return <LoginScreen onGuest={() => setGuest(true)} />;
  return <Dashboard session={session} guest={guest} onExitGuest={() => setGuest(false)} />;
}

function Dashboard({ session, guest, onExitGuest }: { session: Session | null; guest: boolean; onExitGuest: () => void }) {
  const [selectedName, setSelectedName] = useState("Kharadi");
  const [rainOffset, setRainOffset] = useState(0);
  const [soilOffset, setSoilOffset] = useState(0);
  const [sent, setSent] = useState(false);
  const [briefing, setBriefing] = useState("");
  const [briefingLoading, setBriefingLoading] = useState(false);
  const selected = villages.find((v) => v.name === selectedName) ?? villages[0];
  const risk = useMemo(() => calculateRisk(selected, rainOffset, soilOffset), [selected, rainOffset, soilOffset]);
  const ranked = useMemo(() => villages.map((v) => ({ ...v, risk: calculateRisk(v, v.name === selected.name ? rainOffset : 0, v.name === selected.name ? soilOffset : 0) })).sort((a, b) => b.risk.score - a.risk.score), [selected, rainOffset, soilOffset]);
  const action = risk.level === "CRITICAL" ? "Begin evacuation of low-lying homes and close the bridge approach." : risk.level === "HIGH" ? "Pre-position response teams and alert households near the stream." : "Keep local volunteers on watch and verify drainage routes.";
  const authHeaders = session ? { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` } : undefined;
  const queueAlert = async () => { setSent(true); if (authHeaders) await fetch(`${serverUrl}/alerts`, { method: "POST", headers: authHeaders, body: JSON.stringify({ location: selected.name, level: risk.level, leadTime: risk.lead, action }) }); };
  const generateBriefing = async () => { if (!authHeaders) { setBriefing("AI briefing is available after signing in. Guest mode keeps scenarios private to this browser."); return; } setBriefingLoading(true); setBriefing(""); try { const response = await fetch(`${serverUrl}/briefing`, { method: "POST", headers: authHeaders, body: JSON.stringify({ location: selected.name, risk: risk.level, leadTime: risk.lead, rainfall: risk.rain, soil: risk.soil, slope: selected.slope }) }); const data = await response.json(); setBriefing(data.briefing ?? data.error ?? "Briefing unavailable."); } finally { setBriefingLoading(false); } };

  return (
    <main className="min-h-full bg-[#e9ece6] text-[#14221f] selection:bg-[#caef47]">
      <header className="border-b border-[#14221f]/15 bg-[#102a25] text-[#f4f5ed]">
        <div className="mx-auto flex max-w-[1560px] items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-full bg-[#caef47] text-[#102a25]"><Icon name="drop" /></div><div><div className="font-display text-[22px] leading-none tracking-[-.04em]">PRAVAAH</div><div className="mt-1 font-mono text-[9px] uppercase tracking-[.16em] text-[#b7c8c2]">Early warning field console</div></div></div>
          <div className="hidden items-center gap-7 md:flex"><span className="font-mono text-[10px] uppercase tracking-[.12em] text-[#b7c8c2]">Himachal Pradesh / Kullu</span><span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.12em]"><i className="size-2 rounded-full bg-[#caef47]" /> {guest ? "Guest simulation" : "Responder session"}</span></div>
          <div className="flex items-center gap-3"><span className="hidden font-mono text-[9px] uppercase tracking-[.1em] text-[#b7c8c2] md:inline">{guest ? "Guest workspace" : session?.user.email}</span><button onClick={() => guest ? onExitGuest() : supabase.auth.signOut()} className="rounded-full border border-white/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[.1em] hover:bg-white/10">{guest ? "Sign in" : "Sign out"}</button><button className="grid size-9 place-items-center rounded-full border border-white/20 hover:bg-white/10" aria-label="Notifications"><Icon name="bell" /></button></div>
        </div>
      </header>

      <div className="mx-auto max-w-[1560px] px-5 py-5 lg:px-8 lg:py-7">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div><p className="font-mono text-[10px] font-medium uppercase tracking-[.16em] text-[#517068]">District risk overview · 27 Aug 2026 · 14:32 IST</p><h1 className="mt-2 font-display text-3xl tracking-[-.045em] md:text-[42px]">Catchment intelligence, <em>made actionable.</em></h1></div>
          <p className="max-w-sm border-l-2 border-[#e97451] pl-3 text-sm leading-5 text-[#46615b]">Prototype model using simulated sensor inputs and documented feature weights. Not a calibrated operational forecast.</p>
        </div>

        <section className="grid gap-px overflow-hidden rounded-2xl border border-[#14221f]/15 bg-[#14221f]/15 md:grid-cols-2 xl:grid-cols-5">
          <Metric label="Current risk" value={<RiskPill level={risk.level} />} note={`Score ${risk.score} / 100`} />
          <Metric label="Estimated lead time" value={`${risk.lead}`} unit="min" note="from current sensor pattern" />
          <Metric label="Rainfall intensity" value={`${risk.rain}`} unit="mm/h" note="1-hour rolling window" icon="drop" />
          <Metric label="Soil saturation" value={`${risk.soil}`} unit="%" note="near-surface moisture" icon="layers" />
          <Metric label="Slope exposure" value={`${selected.slope}`} unit="°" note="terrain-derived" icon="clock" />
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(330px,.75fr)]">
          <div className="overflow-hidden rounded-2xl border border-[#14221f]/15 bg-[#f7f8f1]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#14221f]/15 px-5 py-4"><div><div className="font-mono text-[10px] uppercase tracking-[.16em] text-[#517068]">Hyper-local risk map</div><div className="mt-1 text-sm text-[#46615b]">Select a settlement to inspect its risk drivers</div></div><div className="flex gap-3 font-mono text-[9px] uppercase tracking-[.09em]"><span><b className="mr-1.5 inline-block size-2 rounded-full bg-[#67aa72]" />Low</span><span><b className="mr-1.5 inline-block size-2 rounded-full bg-[#eac85a]" />Moderate</span><span><b className="mr-1.5 inline-block size-2 rounded-full bg-[#e97451]" />High</span><span><b className="mr-1.5 inline-block size-2 rounded-full bg-[#bd3947]" />Critical</span></div></div>
            <div className="relative h-[410px] overflow-hidden bg-[#b4c5ba]">
              <MapContainer center={[31.92, 77.2]} zoom={11} scrollWheelZoom className="h-full w-full" aria-label="Interactive map of the Kullu valley">
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {ranked.map((v) => { const isSelected = selected.name === v.name; const color = riskColor[v.risk.level]; return <Circle key={`${v.name}-zone`} center={[v.lat, v.lng]} radius={isSelected ? 1550 : 1150} pathOptions={{ color, fillColor: color, fillOpacity: isSelected ? 0.23 : 0.13, weight: isSelected ? 2 : 1 }} />; })}
                {ranked.map((v) => { const isSelected = selected.name === v.name; const color = riskColor[v.risk.level]; return <CircleMarker key={v.name} center={[v.lat, v.lng]} radius={isSelected ? 10 : 7} pathOptions={{ color: "#f7f8f1", fillColor: color, fillOpacity: 1, weight: isSelected ? 4 : 2 }} eventHandlers={{ click: () => setSelectedName(v.name) }}><Tooltip direction="top" offset={[0, -8]} opacity={1}><b>{v.name}</b><br />{v.risk.level} · {v.risk.score}/100<br />Simulated risk overlay</Tooltip></CircleMarker>; })}
              </MapContainer>
              <div className="map-overlay absolute bottom-4 left-4 z-[500] rounded-lg border border-white/50 bg-[#f7f8f1]/95 px-3 py-2 font-mono text-[9px] uppercase tracking-[.12em] text-[#38534c]">OpenStreetMap base layer<br/><b className="text-[#14221f]">Risk zones · simulated model</b></div>
            </div>
            <div className="grid border-t border-[#14221f]/15 md:grid-cols-[1fr_auto]">
              <div className="p-5"><div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] text-[#517068]"><Icon name="pin" /> Selected location</div><div className="mt-2 flex flex-wrap items-baseline gap-x-3"><h2 className="font-display text-3xl tracking-[-.04em]">{selected.name}</h2><span className="font-mono text-[10px] uppercase tracking-[.12em] text-[#517068]">{selected.ward} · Kullu</span><RiskPill level={risk.level} /></div><p className="mt-2 max-w-xl text-sm leading-5 text-[#46615b]">Rainfall has intensified across the upper catchment. Elevation {selected.elevation.toLocaleString()} m · slope {selected.slope}° · {selected.history} historical-event placeholders in the simulation profile.</p></div>
              <div className="flex items-center gap-7 border-t border-[#14221f]/15 px-5 py-4 font-mono text-[10px] uppercase tracking-[.1em] md:border-l md:border-t-0"><span>Flood <b className="block pt-1 text-base text-[#bd3947]">{risk.flood}%</b></span><span>Landslide <b className="block pt-1 text-base text-[#e97451]">{risk.landslide}%</b></span></div>
            </div>
          </div>

          <aside className="rounded-2xl border border-[#14221f]/15 bg-[#183d35] p-5 text-[#f4f5ed]">
            <div className="flex items-start justify-between"><div><div className="font-mono text-[10px] uppercase tracking-[.16em] text-[#a9c2ba]">Scenario controls</div><h2 className="mt-2 font-display text-3xl tracking-[-.04em]">Test the next hour.</h2></div><span className="rounded-full bg-[#caef47] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[.1em] text-[#183d35]">Interactive</span></div>
            <label className="mt-7 block font-mono text-[10px] uppercase tracking-[.12em] text-[#c0d1cb]">Settlement<select value={selectedName} onChange={(e) => setSelectedName(e.target.value)} className="mt-2 w-full rounded-lg border border-white/20 bg-[#102a25] px-3 py-3 font-sans text-sm text-white outline-none focus:border-[#caef47]">{villages.map((v) => <option key={v.name}>{v.name}</option>)}</select></label>
            <Range label="Rainfall change" value={rainOffset} min={-20} max={35} suffix=" mm/h" onChange={setRainOffset} />
            <Range label="Soil moisture change" value={soilOffset} min={-15} max={20} suffix=" %" onChange={setSoilOffset} />
            <div className="mt-7 border-t border-white/15 pt-5"><div className="flex items-center justify-between"><span className="font-mono text-[10px] uppercase tracking-[.12em] text-[#a9c2ba]">Predicted condition</span><RiskPill level={risk.level} /></div><p className="mt-3 text-sm leading-5 text-[#d7e1dc]">{action}</p><button onClick={queueAlert} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#caef47] px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[.11em] text-[#102a25] transition hover:bg-[#dcff65]">{sent ? "Alert queued for review" : guest ? "Keep alert in guest session" : "Queue warning for review"}<Icon name="arrow" /></button>{sent && <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[.1em] text-[#caef47]">{guest ? "Saved in this browser only · no public message sent" : "Saved to your responder workspace · no public message sent"}</p>}<button onClick={generateBriefing} disabled={briefingLoading} className="mt-3 w-full rounded-lg border border-white/25 px-4 py-3 font-mono text-[10px] uppercase tracking-[.1em] text-[#f4f5ed] hover:bg-white/10 disabled:opacity-50">{briefingLoading ? "Preparing briefing…" : "Generate AI briefing"}</button>{briefing && <p className="mt-3 border-l border-[#caef47] pl-3 text-xs leading-5 text-[#d7e1dc] whitespace-pre-line">{briefing}</p>}</div>
          </aside>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-2xl border border-[#14221f]/15 bg-[#f7f8f1] p-5"><div className="flex items-end justify-between"><div><div className="font-mono text-[10px] uppercase tracking-[.16em] text-[#517068]">Live sensor network</div><h2 className="mt-1 font-display text-2xl tracking-[-.035em]">Field telemetry</h2></div><span className="font-mono text-[10px] uppercase tracking-[.1em] text-[#517068]">3 / 3 reporting</span></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[600px] text-left"><thead className="font-mono text-[9px] uppercase tracking-[.12em] text-[#517068]"><tr><th className="pb-3 font-medium">Sensor / location</th><th className="pb-3 font-medium">Rain</th><th className="pb-3 font-medium">Soil</th><th className="pb-3 font-medium">Water</th><th className="pb-3 font-medium">Battery</th><th className="pb-3 font-medium">Updated</th></tr></thead><tbody>{sensors.map((s) => <tr key={s.id} className="border-t border-[#14221f]/10 text-sm"><td className="py-3"><b className="font-mono text-[11px]">{s.id}</b><span className="ml-2 text-[#517068]">{s.place}</span></td><td>{s.rain}</td><td>{s.soil}</td><td>{s.water}</td><td><span className="inline-block h-1.5 w-12 overflow-hidden rounded-full bg-[#dbe2dc]"><i className="block h-full bg-[#3b8d70]" style={{ width: `${s.battery}%` }} /></span></td><td className="font-mono text-[10px] text-[#517068]">{s.updated}</td></tr>)}</tbody></table></div></div>
          <div className="rounded-2xl border border-[#14221f]/15 bg-[#f7f8f1] p-5"><div className="font-mono text-[10px] uppercase tracking-[.16em] text-[#517068]">Active alerts</div><h2 className="mt-1 font-display text-2xl tracking-[-.035em]">Response board</h2><div className="mt-4 space-y-3">{ranked.slice(0, 3).map((v) => <div key={v.name} className="flex gap-3 border-t border-[#14221f]/10 pt-3"><div className={`mt-1 size-2 shrink-0 rounded-full bg-${v.risk.level.toLowerCase()}`} /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><b className="text-sm">{v.name}</b><span className="font-mono text-[10px] text-[#517068]">{v.risk.lead} MIN</span></div><p className="mt-1 text-xs leading-4 text-[#517068]">{v.risk.level === "CRITICAL" ? "Evacuation review and bridge closure." : "Monitor stream crossings; notify ward team."}</p></div><RiskPill level={v.risk.level} /></div>)}</div></div>
        </section>
      </div>
    </main>
  );
}

function LoginScreen({ onGuest }: { onGuest: () => void }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [mode, setMode] = useState<"signin" | "signup">("signin"); const [message, setMessage] = useState(""); const [working, setWorking] = useState(false);
  const submit = async (event: React.FormEvent) => { event.preventDefault(); setWorking(true); setMessage(""); const result = mode === "signin" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } }); setMessage(result.error ? result.error.message : mode === "signup" ? "Account created. Confirm from your email, then return here to sign in." : "Signed in."); setWorking(false); };
  return <main className="grid min-h-full place-items-center bg-[#102a25] px-5 py-10 text-[#f4f5ed]"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-white/15 bg-[#183d35] p-7 shadow-2xl"><div className="grid size-10 place-items-center rounded-full bg-[#caef47] text-[#102a25]"><Icon name="drop" /></div><p className="mt-6 font-mono text-[10px] uppercase tracking-[.16em] text-[#a9c2ba]">Responder access</p><h1 className="mt-2 font-display text-4xl tracking-[-.05em]">PRAVAAH</h1><p className="mt-2 text-sm leading-5 text-[#c8d5d0]">Sign in to save scenario alerts and access the secured field console.</p><label className="mt-6 block font-mono text-[10px] uppercase tracking-[.12em] text-[#c0d1cb]">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-white/20 bg-[#102a25] px-3 py-3 font-sans text-sm text-white outline-none focus:border-[#caef47]" /></label><label className="mt-4 block font-mono text-[10px] uppercase tracking-[.12em] text-[#c0d1cb]">Password<input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-white/20 bg-[#102a25] px-3 py-3 font-sans text-sm text-white outline-none focus:border-[#caef47]" /></label><button disabled={working} className="mt-6 w-full rounded-lg bg-[#caef47] px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[.11em] text-[#102a25] disabled:opacity-60">{working ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}</button><button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }} className="mt-3 w-full font-mono text-[10px] uppercase tracking-[.1em] text-[#caef47]">{mode === "signin" ? "Need an account? Create one" : "Already registered? Sign in"}</button><div className="my-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[.1em] text-[#91aaa2]"><span className="h-px flex-1 bg-white/15" />or<span className="h-px flex-1 bg-white/15" /></div><button type="button" onClick={onGuest} className="w-full rounded-lg border border-[#caef47]/70 px-4 py-3 font-mono text-[10px] uppercase tracking-[.1em] text-[#caef47] hover:bg-[#caef47]/10">Continue as guest</button>{message && <p className="mt-4 rounded-lg bg-white/10 p-3 text-xs leading-5 text-[#d7e1dc]">{message}</p>}<p className="mt-6 border-t border-white/15 pt-4 font-mono text-[9px] uppercase tracking-[.08em] text-[#a9c2ba]">Guest sessions are browser-only · Prototype system</p></form></main>;
}

function Metric({ label, value, unit, note, icon }: { label: string; value: React.ReactNode; unit?: string; note: string; icon?: "drop" | "layers" | "clock" }) {
  return <div className="min-h-32 bg-[#f7f8f1] p-4"><div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.13em] text-[#517068]"><span>{label}</span>{icon && <span className="size-4 text-[#3b8d70]"><Icon name={icon} /></span>}</div><div className="mt-4 flex items-baseline gap-1 font-display text-[32px] leading-none tracking-[-.04em]">{value}{unit && <span className="font-sans text-sm font-medium tracking-normal text-[#46615b]">{unit}</span>}</div><p className="mt-3 text-xs text-[#517068]">{note}</p></div>;
}

function Range({ label, value, min, max, suffix, onChange }: { label: string; value: number; min: number; max: number; suffix: string; onChange: (n: number) => void }) {
  return <label className="mt-6 block"><div className="flex justify-between font-mono text-[10px] uppercase tracking-[.12em] text-[#c0d1cb]"><span>{label}</span><b className="text-[#caef47]">{value > 0 ? "+" : ""}{value}{suffix}</b></div><input aria-label={label} className="range-input mt-3 w-full" type="range" value={value} min={min} max={max} onChange={(e) => onChange(Number(e.target.value))} /></label>;
}
