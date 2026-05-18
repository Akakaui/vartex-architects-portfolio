import { useState, useEffect, useRef } from "react";

/* ─── TOKENS ──────────────────────────────────────────────────────────────── */
const T = {
  bg:      "#000",
  bgDeep:  "#050505",
  white:   "#FFFFFF",
  offWhite:"#E8E4DF",
  gray:    "#666666",
  midGray: "#999999",
  ltGray:  "#CCCCCC",
  accent:  "#8B6F47",
  border:  "rgba(255,255,255,0.1)",
  borderXl:"rgba(255,255,255,0.06)",
  sans:    "'Arial Black', 'Arial Bold', Gadget, sans-serif",
  body:    "'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono:    "'Courier New', Courier, monospace",
};

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const ARCH = {
  id: "architecture",
  index: "01",
  label: "ARCHITECTURAL DESIGN",
  headline: ["ARCHITEC-", "TURAL", "DESIGN."],
  tagline: "From the site to the stone.",
  hero: "We design buildings that hold their logic from the first sketch to the final inspection. Architecture, to us, is a dialogue — between the land, the light, and the life that will occupy the space.",
  approach: "Every project begins the same way: we listen. Not just to the brief, but to the site itself — its orientation, its constraints, its latent possibilities. From there, design is not imposed. It emerges.",
  how: [
    ["01", "SITE & CONTEXT", "Before a line is drawn, we study the land — its topography, zoning, orientation, and the environment it will shape and be shaped by."],
    ["02", "DESIGN DEVELOPMENT", "Sketches evolve into precise spatial models, tested against light, structure, and how the building will actually be lived in."],
    ["03", "TECHNICAL DOCUMENTATION", "Exhaustive construction drawings — every joint, surface, and system documented with precision that leaves builders without ambiguity."],
    ["04", "REALIZATION", "We remain present through construction, ensuring the built form maintains the rigour of the original design intent."],
  ],
  engagements: [
    {
      num: "01", name: "FOUNDATION", sub: "The Essential",
      desc: "For clients who arrive with a resolved vision and require precise technical documentation to move into construction without delay.",
      timeline: "3 PHASES · ~8 WEEKS",
      phases: [
        { label: "01 — MOBILIZATION & CONCEPT", items: ["Initial consultation & briefing", "Remote site analysis", "Space planning & moodboard"] },
        { label: "02 — DESIGN", items: ["2D floor plans & exterior elevations", "Up to 2 rounds of refinement"] },
        { label: "03 — DOCUMENTATION", items: ["Architectural blueprints", "5 printed & bound hardcopy sets"] },
      ],
    },
    {
      num: "02", name: "SIGNATURE", sub: "The Professional",
      desc: "For projects demanding full design exploration, photorealistic visualization, and integrated engineering — the complete experience before a single brick is laid.",
      timeline: "4 PHASES · ~12 WEEKS",
      phases: [
        { label: "01 — MOBILIZATION & CONCEPT", items: ["In-depth multi-session consultation", "On-site and remote site & zoning analysis", "Advanced space planning & moodboard"] },
        { label: "02 — DESIGN & VISUALIZATION", items: ["Detailed 2D floor plans & elevations", "Photorealistic exterior 3D renders", "Up to 3 rounds of refinement"] },
        { label: "03 — DOCUMENTATION", items: ["Detailed architectural blueprints", "Structural engineering drawings", "MEP drawings"] },
        { label: "04 — ENGINEERING & DELIVERY", items: ["Government approval drawing set", "Executive architectural blueprints", "5 printed & bound hardcopy sets each"] },
      ],
    },
    {
      num: "03", name: "BESPOKE", sub: "The Executive",
      desc: "For high-end builds that demand the full spectrum — cinematic visualization, complete engineering, and a dedicated principal consultant at every phase.",
      timeline: "4 PHASES · ~15 WEEKS",
      phases: [
        { label: "01 — MOBILIZATION & CONCEPT", items: ["Priority multi-session consultation", "Advanced site & zoning analysis", "Survey & soil test coordination", "Advanced space planning & precedent study"] },
        { label: "02 — DESIGN & VISUALIZATION", items: ["8+ premium exterior 3D renders", "Unlimited rounds of refinement", "Highly detailed 2D plans"] },
        { label: "03 — DOCUMENTATION", items: ["Interior 3D renders — up to 5 spaces", "Animated cinematic video walkthrough", "Full architectural blueprint set"] },
        { label: "04 — ENGINEERING & DELIVERY", items: ["Executive architectural blueprints", "Structural & MEP engineering drawings", "Government approval drawing set"] },
      ],
    },
  ],
  buildSection: true,
  closing: "From first sketch to final stone.",
};

const INT = {
  id: "interior",
  index: "02",
  label: "INTERIOR DESIGN",
  headline: ["INTERIOR", "DESIGN."],
  tagline: "Every void considered.",
  hero: "We treat the interior not as decoration applied after the fact — but as the completion of a spatial idea that began the moment the building was conceived.",
  approach: "The interior volume is where architecture is most intimately experienced. The height of a ceiling, the texture of a wall, the quality of light at noon — these are not stylistic decisions. They are spatial ones. We resolve them with the same rigour we apply to structure.",
  how: [
    ["01", "SPATIAL ANALYSIS", "We begin by understanding how the space is lived in — traffic, light, function, and the relationship between rooms — before proposing any layout."],
    ["02", "VISUALIZATION", "From spatial diagrams to photorealistic renders and cinematic walkthroughs, you inhabit the design before a single piece is procured."],
    ["03", "SPECIFICATION", "Every material, finish, fixture, and fitting is specified exactly — schedules that leave artisans and contractors no room for interpretation."],
    ["04", "EXECUTION", "For clients who require it, we manage procurement, supervise fit-out, and oversee final staging through to project handover."],
  ],
  engagements: [
    {
      num: "01", name: "CONCEPT", sub: "The Essential",
      desc: "For clients who want a professional spatial direction and visual concept — clarity and confidence to brief a contractor and begin procurement independently.",
      timeline: "2 PHASES · ~5 WEEKS",
      phases: [
        { label: "01 — SPATIAL PLANNING & CONCEPT", items: ["Initial consultation & briefing", "Site measurement review", "2D furniture layout", "Conceptual moodboard"] },
        { label: "02 — VISUALIZATION", items: ["Standard 3D visualization", "Material palette guide"] },
      ],
    },
    {
      num: "02", name: "SPECIFICATION", sub: "The Professional",
      desc: "For clients who require a complete interior design outcome — fully documented, technically exact, ready for any skilled artisan to execute without ambiguity.",
      timeline: "3 PHASES · ~9 WEEKS",
      phases: [
        { label: "01 — SPATIAL PLANNING & CONCEPT", items: ["In-depth multi-session consultation", "Site verification & measurement", "Advanced 2D layouts", "Design moodboard"] },
        { label: "02 — VISUALIZATION & DEVELOPMENT", items: ["Photorealistic 3D renders", "Exact specification schedule", "Furniture sourcing guide"] },
        { label: "03 — TECHNICAL DOCUMENTATION", items: ["Interior elevations & joinery drawings", "5 printed & bound hardcopy sets"] },
      ],
    },
    {
      num: "03", name: "WHITE GLOVE", sub: "The Executive",
      desc: "For clients who want a completely hands-off journey — from first spatial analysis to the final staging of a move-in-ready, immaculately realized interior.",
      timeline: "3 PHASES · ~11 WEEKS",
      phases: [
        { label: "01 — SPATIAL PLANNING & CONCEPT", items: ["Priority executive consultation", "Full site verification & measurement", "Advanced spatial planning & reflected ceiling plans", "Executive moodboard"] },
        { label: "02 — VISUALIZATION & DEVELOPMENT", items: ["Comprehensive photorealistic 3D renders — all key spaces", "Bespoke furniture design", "Animated interior video walkthrough"] },
        { label: "03 — TECHNICAL DOCUMENTATION", items: ["Interior elevations — all rooms", "Custom millwork & cabinetry blueprints", "Tile layout & setting-out plans", "Full build-ready specification set"] },
      ],
    },
  ],
  buildSection: false,
  closing: "Every void considered. Every surface resolved.",
};

/* ─── NAV ─────────────────────────────────────────────────────────────────── */
function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const links = ["PROJECTS","STUDIO","PROCESS","SERVICES","JOURNAL"];

  return (
    <>
      <nav style={{ position:"sticky", top:0, zIndex:200, display:"flex", justifyContent:"space-between", alignItems:"center", padding:"1rem 1.25rem", background:"rgba(0,0,0,0.97)", borderBottom:`1px solid ${T.border}`, backdropFilter:"blur(8px)" }}>
        <button onClick={() => setPage("index")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", flexDirection:"column", gap:"3px" }}>
          <svg width="38" height="29" viewBox="0 0 38 29">
            <polygon points="19,2 36,27 2,27" fill="none" stroke={T.white} strokeWidth="1.8"/>
            <text x="12" y="23" fill={T.white} fontSize="8.5" fontFamily="Arial" fontWeight="900" letterSpacing="0.5">VA</text>
          </svg>
          <span style={{ fontFamily:T.mono, fontSize:"6.5px", color:T.offWhite, letterSpacing:"0.22em", display:"block" }}>VARTEX ARCHITECTS</span>
        </button>
        <button onClick={() => setOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", gap:"5px", padding:"4px 0" }}>
          {[0,1,2].map(i => <span key={i} style={{ display:"block", width:"22px", height:"1.5px", background:T.white }} />)}
        </button>
      </nav>

      {open && (
        <div style={{ position:"fixed", inset:0, background:"#000", zIndex:300, display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
          <button onClick={() => setOpen(false)} style={{ position:"absolute", top:"1.2rem", right:"1.4rem", background:"none", border:"none", cursor:"pointer", color:T.white, fontSize:"1.6rem", lineHeight:1, fontWeight:300 }}>✕</button>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1.8rem", marginBottom:"3rem" }}>
            {links.map(l => {
              const active = (l==="SERVICES" && ["index","architecture","interior"].includes(page));
              return (
                <button key={l} onClick={() => { setPage(l==="SERVICES" ? "index" : "ext"); setOpen(false); }}
                  style={{ background:"none", border:"none", cursor:"pointer", fontFamily:T.sans, fontSize:"clamp(2.2rem, 11vw, 4rem)", fontWeight:900, color: active ? T.white : T.gray, textTransform:"uppercase", lineHeight:1, letterSpacing:"0.01em" }}>
                  {l}
                </button>
              );
            })}
          </div>
          <div style={{ width:"85%", maxWidth:"360px" }}>
            <button style={{ width:"100%", padding:"1.1rem", background:T.white, color:"#000", border:"none", cursor:"pointer", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase" }}>
              START PROJECT
            </button>
          </div>
          <div style={{ display:"flex", gap:"2.5rem", marginTop:"2.5rem" }}>
            {["INSTAGRAM","LINKEDIN"].map(s => <span key={s} style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.15em", cursor:"pointer" }}>{s}</span>)}
          </div>
          <div style={{ fontFamily:T.mono, fontSize:"8px", color:T.gray, letterSpacing:"0.15em", marginTop:"0.8rem" }}>© 2026 VARTEX ARCHITECTS</div>
        </div>
      )}
    </>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop:`1px solid ${T.border}`, padding:"2.5rem 1.25rem 3rem" }}>
      <div style={{ fontFamily:T.mono, fontSize:"8px", color:T.gray, letterSpacing:"0.18em", marginBottom:"1.2rem", textTransform:"uppercase" }}>Vartex Architects</div>
      <div style={{ fontFamily:T.body, fontSize:"13px", color:T.white, marginBottom:"0.25rem" }}>+234 703 269 7179</div>
      <div style={{ fontFamily:T.body, fontSize:"13px", color:T.white, marginBottom:"2rem" }}>info@vartexarchitects.com</div>
      <div style={{ display:"flex", gap:"2rem", marginBottom:"2rem" }}>
        {["INSTAGRAM","LINKEDIN"].map(s => <span key={s} style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.12em", cursor:"pointer" }}>{s}</span>)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.6rem", marginBottom:"2rem" }}>
        {["PROJECTS","STUDIO","PROCESS","SERVICES","JOURNAL"].map(l => (
          <button key={l} onClick={() => setPage(l==="SERVICES" ? "index" : "ext")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.12em", textAlign:"left", padding:0 }}>{l}</button>
        ))}
      </div>
      <div style={{ fontFamily:T.mono, fontSize:"8px", color:T.gray, letterSpacing:"0.12em" }}>© 2026 VARTEX ARCHITECTS. ALL RIGHTS RESERVED.</div>
    </footer>
  );
}

/* ─── GUIDE FORM MODAL ────────────────────────────────────────────────────── */
function GuideModal({ service, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function submit() {
    if (!name.trim()) return setErr("Please enter your name.");
    if (!email.includes("@")) return setErr("Please enter a valid email.");
    setErr(""); setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false); setSent(true);
  }

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:400, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#0d0d0d", border:`1px solid ${T.border}`, borderBottom:"none", width:"100%", maxWidth:"480px", padding:"2rem 1.5rem 2.5rem", position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute", top:"1.2rem", right:"1.2rem", background:"none", border:"none", color:T.gray, fontSize:"1.3rem", cursor:"pointer", lineHeight:1 }}>✕</button>

        {!sent ? (
          <>
            <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.accent, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"0.6rem" }}>SERVICE GUIDE</div>
            <h3 style={{ fontFamily:T.sans, fontSize:"1.5rem", fontWeight:900, color:T.white, textTransform:"uppercase", lineHeight:0.95, marginBottom:"0.8rem" }}>
              {service === "architecture" ? "ARCHITECTURAL\nDESIGN GUIDE" : "INTERIOR\nDESIGN GUIDE"}
            </h3>
            <p style={{ fontFamily:T.body, fontSize:"12px", color:T.gray, lineHeight:1.7, marginBottom:"1.5rem" }}>
              Receive our full service overview — every engagement level, phase breakdown, and deliverable — straight to your inbox. No commitment required.
            </p>

            <div style={{ marginBottom:"0.9rem" }}>
              <div style={{ fontFamily:T.mono, fontSize:"8px", color:T.gray, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.4rem" }}>Your Name</div>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Adaeze Okonkwo"
                style={{ width:"100%", background:"#1a1a1a", border:`1px solid ${T.border}`, color:T.white, padding:"0.75rem 0.9rem", fontFamily:T.body, fontSize:"13px", outline:"none", borderRadius:0 }} />
            </div>
            <div style={{ marginBottom:"1.2rem" }}>
              <div style={{ fontFamily:T.mono, fontSize:"8px", color:T.gray, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"0.4rem" }}>Email Address</div>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="e.g. adaeze@email.com"
                style={{ width:"100%", background:"#1a1a1a", border:`1px solid ${T.border}`, color:T.white, padding:"0.75rem 0.9rem", fontFamily:T.body, fontSize:"13px", outline:"none", borderRadius:0 }} />
            </div>

            {err && <div style={{ fontFamily:T.body, fontSize:"11px", color:"#e07050", marginBottom:"0.8rem" }}>{err}</div>}

            <button onClick={submit} disabled={loading} style={{ width:"100%", padding:"1rem", background: loading ? "#333" : T.white, color:"#000", border:"none", cursor: loading ? "wait" : "pointer", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase" }}>
              {loading ? "SENDING..." : "SEND ME THE GUIDE →"}
            </button>
            <div style={{ fontFamily:T.mono, fontSize:"9px", color:"#444", textAlign:"center", marginTop:"0.8rem" }}>No spam. No sales calls. Just the guide.</div>
          </>
        ) : (
          <div style={{ textAlign:"center", padding:"1rem 0" }}>
            <div style={{ fontFamily:T.mono, fontSize:"2rem", color:T.accent, marginBottom:"1rem" }}>✓</div>
            <h3 style={{ fontFamily:T.sans, fontSize:"1.4rem", fontWeight:900, color:T.white, textTransform:"uppercase", marginBottom:"0.8rem" }}>GUIDE ON ITS WAY.</h3>
            <p style={{ fontFamily:T.body, fontSize:"12px", color:T.gray, lineHeight:1.7, marginBottom:"1.5rem" }}>
              Check your inbox. If it doesn't arrive within a few minutes, check your spam folder.<br /><br />
              Once you've reviewed it, reach out when you're ready.
            </p>
            <button onClick={onClose} style={{ width:"100%", padding:"1rem", background:T.white, color:"#000", border:"none", cursor:"pointer", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase" }}>
              BACK TO SERVICES
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── ENGAGEMENT CARD ─────────────────────────────────────────────────────── */
function EngCard({ eng, isOpen, toggle }) {
  return (
    <div style={{ borderBottom:`1px solid ${T.border}` }}>
      <button onClick={toggle} style={{ width:"100%", background:"none", border:"none", cursor:"pointer", padding:"1.6rem 1.25rem", display:"flex", justifyContent:"space-between", alignItems:"center", textAlign:"left" }}>
        <div>
          <div style={{ fontFamily:T.mono, fontSize:"8px", color:T.gray, letterSpacing:"0.18em", marginBottom:"0.4rem" }}>{eng.num} / 03</div>
          <div style={{ fontFamily:T.sans, fontSize:"1.15rem", fontWeight:900, color:T.white, letterSpacing:"0.02em" }}>{eng.name}</div>
          <div style={{ fontFamily:T.mono, fontSize:"8px", color:T.gray, letterSpacing:"0.1em", marginTop:"0.2rem" }}>{eng.sub}</div>
        </div>
        <span style={{ color:T.gray, fontSize:"1.4rem", transform: isOpen ? "rotate(45deg)" : "none", transition:"transform 0.25s", display:"inline-block", lineHeight:1, flexShrink:0, marginLeft:"1rem" }}>+</span>
      </button>

      {isOpen && (
        <div style={{ padding:"0 1.25rem 1.8rem" }}>
          <p style={{ fontFamily:T.body, fontSize:"12px", color:T.gray, lineHeight:1.8, marginBottom:"1rem", paddingBottom:"1rem", borderBottom:`1px solid ${T.borderXl}` }}>{eng.desc}</p>
          <div style={{ fontFamily:T.mono, fontSize:"8px", color:T.midGray, letterSpacing:"0.14em", marginBottom:"1.2rem" }}>{eng.timeline}</div>
          {eng.phases.map((ph, i) => (
            <div key={i} style={{ marginBottom:"1.2rem" }}>
              <div style={{ fontFamily:T.mono, fontSize:"8px", color:T.accent, letterSpacing:"0.1em", marginBottom:"0.6rem", paddingBottom:"0.4rem", borderBottom:`1px solid ${T.borderXl}` }}>{ph.label}</div>
              {ph.items.map((item, j) => (
                <div key={j} style={{ display:"flex", gap:"0.6rem", fontFamily:T.body, fontSize:"12px", color:T.ltGray, lineHeight:1.65, marginBottom:"0.35rem" }}>
                  <span style={{ color:T.accent, flexShrink:0, fontSize:"10px", paddingTop:"2px" }}>→</span>{item}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── SERVICES INDEX ──────────────────────────────────────────────────────── */
function IndexPage({ setPage }) {
  return (
    <div>
      {/* HERO */}
      <div style={{ padding:"3.5rem 1.25rem 3rem", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.18em", marginBottom:"1.2rem" }}>03 — WHAT WE DO</div>
        <h1 style={{ fontFamily:T.sans, fontSize:"clamp(3rem, 14vw, 5.5rem)", fontWeight:900, color:T.white, lineHeight:0.9, letterSpacing:"-0.02em", textTransform:"uppercase", marginBottom:"1.6rem" }}>
          EVERY<br />LINE<br />SERVES<br />A PURPOSE.
        </h1>
        <p style={{ fontFamily:T.body, fontSize:"14px", color:T.gray, lineHeight:1.8, maxWidth:"380px" }}>
          Vartex operates across two disciplines. In each, the same principle holds — nothing is arbitrary. Every decision is resolved through rigour, not instinct alone.
        </p>
      </div>

      {/* ARCH */}
      <div style={{ padding:"2.5rem 1.25rem", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.18em", marginBottom:"1.2rem" }}>01</div>
        <h2 style={{ fontFamily:T.sans, fontSize:"clamp(2.2rem, 11vw, 4rem)", fontWeight:900, color:T.white, lineHeight:0.9, textTransform:"uppercase", marginBottom:"1rem" }}>
          ARCHITEC-<br />TURAL<br />DESIGN.
        </h2>
        <p style={{ fontFamily:T.body, fontSize:"13px", color:T.gray, lineHeight:1.8, marginBottom:"1.8rem" }}>
          We design structures from the inside out — beginning with the site, the light, and the life that will inhabit the space. The result is architecture that holds its logic from the first sketch to the final stone.
        </p>
        <button onClick={() => setPage("architecture")} style={{ width:"100%", padding:"1.05rem", background:T.white, color:"#000", border:"none", cursor:"pointer", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase" }}>
          EXPLORE THIS SERVICE →
        </button>
      </div>

      {/* INTERIOR */}
      <div style={{ padding:"2.5rem 1.25rem", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.18em", marginBottom:"1.2rem" }}>02</div>
        <h2 style={{ fontFamily:T.sans, fontSize:"clamp(2.2rem, 11vw, 4rem)", fontWeight:900, color:T.white, lineHeight:0.9, textTransform:"uppercase", marginBottom:"1rem" }}>
          INTERIOR<br />DESIGN.
        </h2>
        <p style={{ fontFamily:T.body, fontSize:"13px", color:T.gray, lineHeight:1.8, marginBottom:"1.8rem" }}>
          We approach the interior as a continuation of the architecture — not decoration applied after the fact. Materiality, proportion, and light are resolved as carefully inside as out.
        </p>
        <button onClick={() => setPage("interior")} style={{ width:"100%", padding:"1.05rem", background:"transparent", color:T.white, border:`1px solid ${T.border}`, cursor:"pointer", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase" }}>
          EXPLORE THIS SERVICE →
        </button>
      </div>

      {/* NOT SURE */}
      <div style={{ padding:"2.5rem 1.25rem", borderBottom:`1px solid ${T.border}`, background:T.bgDeep }}>
        <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.18em", marginBottom:"1rem" }}>NOT SURE WHERE TO BEGIN?</div>
        <h3 style={{ fontFamily:T.sans, fontSize:"clamp(1.8rem, 9vw, 3rem)", fontWeight:900, color:T.white, lineHeight:0.9, textTransform:"uppercase", marginBottom:"1rem" }}>
          SOME<br />PROJECTS<br />NEED BOTH.
        </h3>
        <p style={{ fontFamily:T.body, fontSize:"13px", color:T.gray, lineHeight:1.8, marginBottom:"1.8rem" }}>
          Architecture and interior design are most powerful when resolved together from the outset. If you are still defining the scope of your project, begin with a conversation.
        </p>
        <a href="https://vartexarchitects.com/contact" style={{ display:"block", width:"100%", padding:"1.05rem", background:"transparent", color:T.white, border:`1px solid ${T.border}`, textDecoration:"none", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", textAlign:"center" }}>
          BEGIN THE CONVERSATION
        </a>
      </div>

      <Footer setPage={setPage} />
    </div>
  );
}

/* ─── SERVICE DETAIL ──────────────────────────────────────────────────────── */
function DetailPage({ data, setPage }) {
  const [openEng, setOpenEng] = useState(1);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div>
      {/* BREADCRUMB */}
      <div style={{ padding:"0.75rem 1.25rem", borderBottom:`1px solid ${T.border}`, display:"flex", gap:"0.5rem", alignItems:"center" }}>
        <button onClick={() => setPage("index")} style={{ background:"none", border:"none", cursor:"pointer", fontFamily:T.mono, fontSize:"8px", color:T.gray, letterSpacing:"0.12em", padding:0 }}>SERVICES</button>
        <span style={{ color:T.gray, fontSize:"9px" }}>→</span>
        <span style={{ fontFamily:T.mono, fontSize:"8px", color:T.white, letterSpacing:"0.12em" }}>{data.label}</span>
      </div>

      {/* HERO */}
      <div style={{ padding:"3rem 1.25rem 2.5rem", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.18em", marginBottom:"1.2rem" }}>{data.index} — {data.label}</div>
        <h1 style={{ fontFamily:T.sans, fontSize:"clamp(2.8rem, 13vw, 5rem)", fontWeight:900, color:T.white, lineHeight:0.9, letterSpacing:"-0.01em", textTransform:"uppercase", marginBottom:"1.5rem" }}>
          {data.headline.map((l, i) => <span key={i} style={{ display:"block" }}>{l}</span>)}
        </h1>
        <p style={{ fontFamily:T.body, fontSize:"14px", color:T.gray, lineHeight:1.8, marginBottom:"0.5rem" }}>{data.hero}</p>
        <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.accent, letterSpacing:"0.15em", marginBottom:"2rem" }}>{data.tagline}</div>

        {/* TWO CTAs */}
        <button onClick={() => setShowGuide(true)} style={{ width:"100%", padding:"1.05rem", background:T.white, color:"#000", border:"none", cursor:"pointer", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"0.7rem" }}>
          RECEIVE OUR SERVICE GUIDE
        </button>
        <a href="https://vartexarchitects.com/contact" style={{ display:"block", width:"100%", padding:"1.05rem", background:"transparent", color:T.white, border:`1px solid ${T.border}`, textDecoration:"none", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", textAlign:"center" }}>
          START A PROJECT
        </a>
      </div>

      {/* APPROACH */}
      <div style={{ padding:"2.5rem 1.25rem", borderBottom:`1px solid ${T.border}`, background:T.bgDeep }}>
        <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.18em", marginBottom:"1rem" }}>OUR APPROACH</div>
        <p style={{ fontFamily:T.body, fontSize:"14px", color:T.ltGray, lineHeight:1.85, borderLeft:`2px solid ${T.accent}`, paddingLeft:"1rem" }}>
          {data.approach}
        </p>
      </div>

      {/* HOW WE WORK */}
      <div style={{ padding:"2.5rem 1.25rem", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.18em", marginBottom:"1.5rem" }}>HOW WE WORK</div>
        {data.how.map(([num, title, desc]) => (
          <div key={num} style={{ display:"flex", gap:"1rem", marginBottom:"1.6rem", paddingBottom:"1.6rem", borderBottom:`1px solid ${T.borderXl}`, alignItems:"flex-start" }}>
            <span style={{ fontFamily:T.mono, fontSize:"9px", color:T.accent, letterSpacing:"0.1em", flexShrink:0, paddingTop:"2px" }}>{num}</span>
            <div>
              <div style={{ fontFamily:T.sans, fontSize:"0.9rem", fontWeight:900, color:T.white, textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:"0.4rem" }}>{title}</div>
              <p style={{ fontFamily:T.body, fontSize:"12px", color:T.gray, lineHeight:1.75 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ENGAGEMENTS */}
      <div style={{ padding:"2.5rem 1.25rem 0", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.18em", marginBottom:"0.5rem" }}>DESIGN PACKAGES</div>
        <h2 style={{ fontFamily:T.sans, fontSize:"clamp(1.8rem, 9vw, 3.2rem)", fontWeight:900, color:T.white, lineHeight:0.9, textTransform:"uppercase", marginBottom:"0.8rem" }}>THREE<br />DESIGN<br />PACKAGES.</h2>
        <p style={{ fontFamily:T.body, fontSize:"13px", color:T.gray, lineHeight:1.8, marginBottom:"2rem" }}>
          Every project differs in scale and complexity. Our engagements are structured to match — from essential technical execution to the full design experience.
        </p>
        {data.engagements.map((eng, i) => (
          <EngCard key={i} eng={eng} isOpen={openEng === i} toggle={() => setOpenEng(openEng === i ? null : i)} />
        ))}
        <div style={{ padding:"1.2rem 0", fontFamily:T.body, fontSize:"11px", color:"#444", lineHeight:1.7, borderBottom:`1px solid ${T.borderXl}` }}>
          All engagements are scoped and confirmed in a project proposal following your initial consultation.
        </div>
      </div>

      {/* THE BUILD */}
      {data.buildSection && (
        <div style={{ padding:"2.5rem 1.25rem", borderBottom:`1px solid ${T.border}`, background:T.bgDeep }}>
          <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.18em", marginBottom:"0.8rem" }}>CONSTRUCTION OVERSIGHT</div>
          <h3 style={{ fontFamily:T.sans, fontSize:"clamp(1.6rem, 8vw, 2.8rem)", fontWeight:900, color:T.white, lineHeight:0.9, textTransform:"uppercase", marginBottom:"0.4rem" }}>THE BUILD.</h3>
          <div style={{ fontFamily:T.mono, fontSize:"8px", color:T.accent, letterSpacing:"0.12em", marginBottom:"1rem" }}>FOR CLIENTS WITH APPROVED DRAWINGS</div>
          <p style={{ fontFamily:T.body, fontSize:"13px", color:T.gray, lineHeight:1.8, marginBottom:"1.5rem" }}>
            If you have an approved design and are ready to move into construction, Vartex can engage as Lead Consultant — managing the build with the same precision applied in design.
          </p>
          {["QS Coordination & Bill of Quantities","Contractor Tendering & Bid Management","Scheduled Site Inspections","Material Approval & Quality Review","Payment Certificate Authorisation","Snag List & Final Handover Package"].map((item, i) => (
            <div key={i} style={{ display:"flex", gap:"0.6rem", fontFamily:T.body, fontSize:"12px", color:T.ltGray, lineHeight:1.65, marginBottom:"0.4rem" }}>
              <span style={{ color:T.accent, flexShrink:0, fontSize:"10px", paddingTop:"2px" }}>→</span>{item}
            </div>
          ))}
        </div>
      )}

      {/* CLOSING CTA */}
      <div style={{ padding:"3.5rem 1.25rem", textAlign:"center", borderBottom:`1px solid ${T.border}` }}>
        <div style={{ fontFamily:T.mono, fontSize:"9px", color:T.gray, letterSpacing:"0.18em", marginBottom:"1.2rem" }}>READY TO BEGIN</div>
        <h2 style={{ fontFamily:T.sans, fontSize:"clamp(2.2rem, 11vw, 4rem)", fontWeight:900, color:T.white, lineHeight:0.9, textTransform:"uppercase", marginBottom:"1rem" }}>LET'S BUILD.</h2>
        <p style={{ fontFamily:T.body, fontSize:"13px", color:T.gray, lineHeight:1.8, marginBottom:"2rem" }}>
          {data.closing}<br />Begin with a conversation.
        </p>
        <button onClick={() => setShowGuide(true)} style={{ width:"100%", padding:"1.05rem", background:T.white, color:"#000", border:"none", cursor:"pointer", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:"0.7rem" }}>
          RECEIVE OUR SERVICE GUIDE
        </button>
        <a href="https://vartexarchitects.com/contact" style={{ display:"block", width:"100%", padding:"1.05rem", background:"transparent", color:T.white, border:`1px solid ${T.border}`, textDecoration:"none", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.2em", textTransform:"uppercase", textAlign:"center" }}>
          START A PROJECT
        </a>
      </div>

      <Footer setPage={setPage} />

      {showGuide && <GuideModal service={data.id} onClose={() => setShowGuide(false)} />}
    </div>
  );
}

/* ─── APP ─────────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("index");
  useEffect(() => { window.scrollTo(0,0); }, [page]);

  return (
    <div style={{ background:T.bg, color:T.white, minHeight:"100vh", maxWidth:"430px", margin:"0 auto", position:"relative" }}>
      <style>{`* { box-sizing:border-box; margin:0; padding:0; } input { outline:none; } button { cursor:pointer; } a { cursor:pointer; }`}</style>
      <Nav page={page} setPage={setPage} />
      {page === "index"        && <IndexPage  setPage={setPage} />}
      {page === "architecture" && <DetailPage data={ARCH} setPage={setPage} />}
      {page === "interior"     && <DetailPage data={INT}  setPage={setPage} />}
      {page === "ext" && (
        <div style={{ padding:"5rem 1.25rem", textAlign:"center" }}>
          <p style={{ fontFamily:T.body, fontSize:"13px", color:T.gray, marginBottom:"1.5rem" }}>This links to the live Vartex site.</p>
          <button onClick={() => setPage("index")} style={{ width:"100%", padding:"1rem", background:T.white, color:"#000", border:"none", fontFamily:T.mono, fontSize:"11px", letterSpacing:"0.18em" }}>← BACK TO SERVICES</button>
        </div>
      )}
    </div>
  );
}
