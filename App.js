// ============================================================
// SETUP INSTRUCTIONS
// ============================================================
// 1. Run: npx create-react-app friday-date
// 2. cd friday-date
// 3. Replace src/App.js with this file
// 4. In src/index.css, add: body { margin: 0; padding: 0; background: #080810; }
// 5. Run: npm start
// ============================================================

import { useState } from "react";

const destinations = {
  escape_room: {
    name: "TRAPPED Escape Room",
    location: "Markham",
    emoji: "🔐",
    vibe: "Thrilling & Teamwork",
    description: "You're doing the Death Note room — step into the world of Light and L, solve puzzles under pressure, and try not to incriminate each other in the process. Staff brief you, drop hints when needed, and take a group photo at the end.",
    duration: "~1.5–2 hrs",
    color: "#1a0a2e",
    accent: "#9b59b6",
    glow: "rgba(155, 89, 182, 0.3)",
    address: "3130 Hwy 7, Markham, ON",
    mapsQuery: "TRAPPED+Escape+Room+3130+Hwy+7+Markham",
    restaurant: {
      name: "Cafe De Hong Kong 良心冰室",
      type: "Hong Kong Cha Chaan Teng",
      address: "11 Fairburn Dr, Markham, ON",
      mapsQuery: "Cafe+De+Hong+Kong+11+Fairburn+Dr+Markham",
      quip: "\"Two are better than one, because they have a good return for their labor.\" — Ecclesiastes 4:9",
      rating: "⭐ 4.1",
      distance: "7 min walk",
    },
  },
  claw_and_kitty: {
    name: "Claw & Kitty",
    location: "Markham",
    emoji: "🕹️",
    vibe: "Playful & Competitive",
    description: "A claw machine arcade with a huge range of machines — plushies, Pokémon cards, prizes, and a points system where you can trade up for bigger rewards. Staff are genuinely helpful and want you to win.",
    duration: "~1–2 hrs",
    color: "#1a0a0a",
    accent: "#e8916a",
    glow: "rgba(232, 145, 106, 0.3)",
    address: "3215 Hwy 7, Markham, ON",
    mapsQuery: "Claw+and+Kitty+3215+Hwy+7+Markham",
    restaurant: {
      name: "Cafe De Hong Kong 良心冰室",
      type: "Hong Kong Cha Chaan Teng",
      address: "11 Fairburn Dr, Markham, ON",
      mapsQuery: "Cafe+De+Hong+Kong+11+Fairburn+Dr+Markham",
      quip: "\"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.\" — Matthew 7:7",
      rating: "⭐ 4.1",
      distance: "6 min walk",
    },
  },
  rom: {
    name: "Royal Ontario Museum",
    location: "Downtown Toronto",
    emoji: "🏛️",
    vibe: "Curious & Cultured",
    description: "Canada's largest museum — ancient Egypt, dinosaur fossils, Indigenous cultures, gemstones, and the iconic Crystal architecture. Easy to spend 2–3 hours without running out of things to look at.",
    duration: "2–3 hrs",
    color: "#0a1a0f",
    accent: "#4caf7d",
    glow: "rgba(76, 175, 125, 0.3)",
    address: "100 Queens Park, Toronto, ON",
    mapsQuery: "Royal+Ontario+Museum+100+Queens+Park+Toronto",
    restaurant: {
      name: "Crimson Teas",
      type: "Tea House & Noodles",
      address: "415 Spadina Ave, Toronto, ON",
      mapsQuery: "Crimson+Teas+415+Spadina+Ave+Toronto",
      quip: "\"Remember the days of old; consider the generations long past. Ask your father and he will tell you, your elders, and they will explain to you.\" — Deuteronomy 32:7",
      rating: "⭐ 4.8",
      distance: "12 min walk",
    },
  },
  ripley: {
    name: "Ripley's Aquarium",
    location: "Downtown Toronto",
    emoji: "🦈",
    vibe: "Magical & Dreamy",
    description: "The highlight is the 97-metre underwater tunnel — sharks, rays, and giant fish glide silently overhead. Also has a jellyfish gallery, touch tanks, and a fluorescent rainbow reef section.",
    duration: "1.5–2 hrs",
    color: "#000d1a",
    accent: "#00b4d8",
    glow: "rgba(0, 180, 216, 0.35)",
    address: "288 Bremner Blvd, Toronto, ON",
    mapsQuery: "Ripley's+Aquarium+288+Bremner+Blvd+Toronto",
    restaurant: {
      name: "Crimson Teas",
      type: "Tea House & Noodles",
      address: "415 Spadina Ave, Toronto, ON",
      mapsQuery: "Crimson+Teas+415+Spadina+Ave+Toronto",
      quip: "\"Deep calls to deep in the roar of your waterfalls; all your waves and breakers have swept over me.\" — Psalm 42:7",
      rating: "⭐ 4.8",
      distance: "20 min walk / 8 min drive",
    },
  },
};

const steps = [
  {
    id: "time",
    question: "How long do you have together on Friday? 🗓️",
    subtitle: "This sets the whole vibe for the day",
    choices: [
      { label: "Around 3 hours", sublabel: "A sweet afternoon out", next: "markham_dark", icon: "⏳" },
      { label: "5–6 hours", sublabel: "A proper date day", next: "toronto_vibe", icon: "🌆" },
    ],
  },
  {
    id: "markham_dark",
    question: "Does your concussion make it hard to see in the dark? 🌑",
    subtitle: "No pressure — just want to make sure you're comfy",
    choices: [
      { label: "No, I'm okay!", sublabel: "Bring on the darkness", next: "result_escape_room", icon: "✅" },
      { label: "Yes, bright spaces are better", sublabel: "Let's keep it light", next: "result_claw_and_kitty", icon: "💡" },
    ],
  },
  {
    id: "toronto_vibe",
    question: "What's calling to you today? ✨",
    subtitle: "Follow your gut",
    choices: [
      { label: "I'm feeling history & culture", sublabel: "Ancient worlds, big ideas", next: "result_rom", icon: "🏛️" },
      { label: "I want to see fish", sublabel: "Sharks. Jellyfish. The works.", next: "result_ripley", icon: "🐠" },
    ],
  },
];

function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4,
    dur: 2 + Math.random() * 3,
  }));
  return (
    <svg style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s) => (
        <circle key={s.id} cx={`${s.x}%`} cy={`${s.y}%`} r={s.size} fill="white">
          <animate attributeName="opacity" values="0.1;0.7;0.1" dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

function RouteCard({ d }) {
  const r = d.restaurant;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${d.mapsQuery}&destination=${r.mapsQuery}&travelmode=walking`;

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${d.accent}33`,
      borderRadius: "1.25rem",
      padding: "1.25rem 1.25rem 1rem",
      animation: "fadeSlideUp 0.5s ease 0.2s both",
    }}>
      {/* Header */}
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: "0.62rem",
        color: "#666", letterSpacing: "0.18em", textTransform: "uppercase",
        marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem",
      }}>
        <span style={{ color: d.accent }}>✦</span> where to eat after
      </div>

      {/* A → B Route Visual */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {/* Point A */}
        <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `${d.accent}22`, border: `2px solid ${d.accent}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: d.accent, fontWeight: 700,
            }}>A</div>
            <div style={{ width: 2, height: 28, background: `linear-gradient(to bottom, ${d.accent}88, ${d.accent}22)`, margin: "4px 0" }} />
          </div>
          <div style={{ paddingTop: "6px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", color: "#ddd", fontWeight: 700 }}>{d.name}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#555", marginTop: "2px", letterSpacing: "0.04em" }}>{d.address}</div>
          </div>
        </div>

        {/* Distance badge */}
        <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
          <div style={{ width: 32, display: "flex", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ width: 2, height: 10, background: `${d.accent}22` }} />
          </div>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
            color: d.accent, background: `${d.accent}15`, border: `1px solid ${d.accent}33`,
            borderRadius: "2rem", padding: "0.15rem 0.6rem", letterSpacing: "0.08em",
          }}>
            🚶 {r.distance}
          </div>
        </div>

        {/* Point B */}
        <div style={{ display: "flex", gap: "0.85rem", alignItems: "flex-start", marginTop: "0px" }}>
          <div style={{ flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `${d.accent}33`, border: `2px solid ${d.accent}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", color: d.accent, fontWeight: 700,
            }}>B</div>
          </div>
          <div style={{ paddingTop: "6px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", color: "#fff", fontWeight: 700 }}>{r.name}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: d.accent, letterSpacing: "0.08em", marginTop: "2px" }}>{r.type} · {r.rating}</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", color: "#555", marginTop: "2px", letterSpacing: "0.04em" }}>{r.address}</div>
          </div>
        </div>
      </div>

      {/* Quip */}
      <p style={{
        fontFamily: "'Lora', serif", fontStyle: "italic",
        fontSize: "0.78rem", color: "#888", lineHeight: 1.65,
        margin: "1rem 0 1rem", paddingTop: "0.75rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        {r.quip}
      </p>

      {/* Directions button */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          width: "100%", padding: "0.65rem",
          background: `${d.accent}18`, border: `1px solid ${d.accent}55`,
          borderRadius: "0.75rem", textDecoration: "none",
          fontFamily: "'DM Mono', monospace", fontSize: "0.72rem",
          color: d.accent, letterSpacing: "0.1em",
          transition: "all 0.2s ease",
        }}
        onMouseOver={e => { e.currentTarget.style.background = `${d.accent}28`; e.currentTarget.style.borderColor = `${d.accent}99`; }}
        onMouseOut={e => { e.currentTarget.style.background = `${d.accent}18`; e.currentTarget.style.borderColor = `${d.accent}55`; }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
        OPEN IN GOOGLE MAPS
      </a>
    </div>
  );
}

function ResultCard({ destKey }) {
  const d = destinations[destKey];
  return (
    <div style={{
      animation: "fadeSlideUp 0.6s ease forwards",
      maxWidth: 480, margin: "0 auto",
      padding: "2.5rem 2rem",
      borderRadius: "1.5rem",
      background: `linear-gradient(145deg, ${d.color} 0%, #0a0a0a 100%)`,
      border: `1px solid ${d.accent}44`,
      boxShadow: `0 0 60px ${d.glow}, 0 20px 40px rgba(0,0,0,0.6)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: -60, right: -60, width: 200, height: 200,
        borderRadius: "50%", background: d.glow, filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ fontSize: "4rem", marginBottom: "0.5rem", textAlign: "center" }}>{d.emoji}</div>
      <div style={{ textAlign: "center", marginBottom: "0.25rem" }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: d.accent, fontFamily: "'DM Mono', monospace" }}>
          {d.location} · {d.vibe}
        </span>
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif", fontSize: "1.9rem", fontWeight: 700,
        color: "#fff", textAlign: "center", margin: "0.25rem 0 1rem",
        textShadow: `0 0 30px ${d.accent}88`,
      }}>{d.name}</h2>
      <p style={{ fontFamily: "'Lora', serif", fontSize: "0.95rem", color: "#ccc", lineHeight: 1.7, textAlign: "center", marginBottom: "0.5rem" }}>
        {d.description}
      </p>
      <div style={{ textAlign: "center", fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: d.accent, marginBottom: "1.75rem" }}>
        ⏱ {d.duration}
      </div>

      <RouteCard d={d} />
    </div>
  );
}

function EasterEgg() {
  const [stage, setStage] = useState(null); // null | 'board' | 'listing'

  const muted = "rgba(255,255,255,0.07)";
  const dim = "rgba(255,255,255,0.55)";
  const subtle = "rgba(255,255,255,0.2)";
  const gold = (a) => `rgba(255,210,90,${a})`;

  const ghostBtn = {
    background: "none", border: `1px solid ${muted}`, borderRadius: "2rem",
    color: subtle, fontFamily: "'DM Mono', monospace", fontSize: "0.62rem",
    letterSpacing: "0.12em", padding: "0.3rem 0.8rem", cursor: "pointer",
  };

  const Pill = ({ children }) => (
    <span style={{ display: "inline-block", background: gold(0.06), border: `1px solid ${gold(0.18)}`, borderRadius: "2rem", padding: "0.15rem 0.6rem", fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: gold(0.55), letterSpacing: "0.08em", marginRight: "0.4rem", marginBottom: "0.35rem" }}>{children}</span>
  );

  const Label = ({ children }) => (
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: gold(0.38), letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.45rem" }}>{children}</div>
  );

  const Body = ({ children }) => (
    <div style={{ fontFamily: "'Lora', serif", fontSize: "0.82rem", color: "rgba(255,235,180,0.6)", lineHeight: 1.75, marginBottom: "1.1rem" }}>{children}</div>
  );

  if (stage === 'listing') {
    return (
      <div style={{ position: "relative", zIndex: 1, marginTop: "2rem", maxWidth: 500, width: "100%", animation: "fadeSlideUp 0.4s ease forwards" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${muted}`, borderRadius: "1.25rem", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ padding: "1.1rem 1.5rem 1rem", borderBottom: `1px solid ${muted}` }}>
            <button onClick={() => setStage('board')} style={{ ...ghostBtn, padding: "0.2rem 0.6rem", fontSize: "0.58rem", marginBottom: "1rem" }}>← all openings</button>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: dim, margin: "0 0 0.3rem", fontWeight: 700 }}>Jonathan's Girlfriend</h3>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.6rem", color: subtle, letterSpacing: "0.08em" }}>Confidential · Full-Time · Permanent</div>
              </div>
              <span style={{ background: "rgba(100,220,130,0.07)", border: "1px solid rgba(100,220,130,0.18)", borderRadius: "2rem", padding: "0.2rem 0.65rem", fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", color: "rgba(120,220,140,0.55)", letterSpacing: "0.1em", whiteSpace: "nowrap", flexShrink: 0 }}>● OPEN</span>
            </div>
            <div style={{ marginTop: "0.75rem" }}><Pill>In-Person</Pill><Pill>No Experience Required</Pill><Pill>Benefits Included</Pill></div>
          </div>

          {/* Body */}
          <div style={{ padding: "1.25rem 1.5rem 0.5rem" }}>
            <Label>About the Role</Label>
            <Body>We are seeking a motivated individual to fill the long-vacant position of Jonathan's Girlfriend. This is a full-time, in-person role requiring strong interpersonal skills, a willingness to share food, and a general openness to weekend activities on short notice.</Body>

            <Label>Responsibilities</Label>
            <Body>
              <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                <li>Attend scheduled dates, outings, and food-adjacent activities</li>
                <li>Provide candid feedback on restaurant selections, movie picks, and general life decisions</li>
                <li>Maintain consistent communication (texts accepted)</li>
                <li>Demonstrate reasonable tolerance for enthusiasm about niche interests</li>
                <li>Contribute to snack procurement on a rotating basis</li>
              </ul>
            </Body>

            <Label>Qualifications</Label>
            <Body>
              <ul style={{ margin: 0, paddingLeft: "1.1rem" }}>
                <li>Must be a Christian — non-negotiable</li>
                <li>Cantonese fluency is a strong asset</li>
                <li>A genuine sense of humour is required</li>
                <li>No prior experience necessary — full onboarding provided</li>
              </ul>
            </Body>

            <Label>Compensation</Label>
            <Body>Quality time · Dedicated attention · Menu veto power · Consistent emotional availability · Access to one (1) curated playlist</Body>

            {/* Coming soon */}
            <div style={{ borderTop: `1px solid ${muted}`, paddingTop: "1.1rem", marginTop: "0.5rem" }}>
              <Label>How to Apply</Label>
              <div style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: "0.82rem", color: subtle, lineHeight: 1.7, marginBottom: "0.5rem" }}>
                Full application details will be available shortly. Interested candidates are encouraged to contact Jonathan directly.
              </div>
            </div>
          </div>
          <div style={{ height: "1.5rem" }} />
        </div>
      </div>
    );
  }

  if (stage === 'board') {
    return (
      <div style={{ position: "relative", zIndex: 1, marginTop: "2rem", maxWidth: 500, width: "100%", animation: "fadeSlideUp 0.4s ease forwards" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${muted}`, borderRadius: "1.25rem", overflow: "hidden" }}>
          <div style={{ padding: "1.1rem 1.5rem", borderBottom: `1px solid ${muted}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.56rem", color: subtle, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Current Openings</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: dim, fontWeight: 700 }}>Career Opportunities</div>
            </div>
            <button onClick={() => setStage(null)} style={{ ...ghostBtn, padding: "0.2rem 0.55rem", fontSize: "0.65rem" }}>✕</button>
          </div>
          <div style={{ padding: "0.6rem 1.5rem", borderBottom: `1px solid ${muted}` }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: subtle, letterSpacing: "0.1em" }}>1 position · Markham, ON</span>
          </div>
          <button onClick={() => setStage('listing')} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "1.1rem 1.5rem", background: "none", border: "none", cursor: "pointer", transition: "background 0.2s", textAlign: "left" }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
            onMouseOut={e => e.currentTarget.style.background = "none"}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", color: dim, fontWeight: 700, marginBottom: "0.25rem" }}>Jonathan's Girlfriend</div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.58rem", color: subtle, letterSpacing: "0.08em" }}>Full-Time · In-Person · Markham, ON</div>
              <div style={{ marginTop: "0.4rem" }}><Pill>No Experience Required</Pill><Pill>Benefits Included</Pill></div>
            </div>
            <span style={{ color: subtle, fontSize: "1rem", flexShrink: 0, paddingLeft: "1rem" }}>›</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <button onClick={() => setStage('board')} style={{ position: "relative", zIndex: 1, marginTop: "1.25rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.55rem", color: "rgba(255,255,255,0.1)", letterSpacing: "0.18em", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.07)", textUnderlineOffset: "3px" }}>job opening</span>
    </button>
  );
}

export default function App() {
  const [history, setHistory] = useState([]);
  const [current, setCurrent] = useState("time");
  const [animating, setAnimating] = useState(false);

  const step = steps.find((s) => s.id === current);
  const isResult = current.startsWith("result_");
  const resultKey = isResult ? current.replace("result_", "") : null;

  const choose = (next) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setHistory((h) => [...h, current]); setCurrent(next); setAnimating(false); }, 300);
  };
  const goBack = () => {
    if (animating || history.length === 0) return;
    setAnimating(true);
    setTimeout(() => { const prev = history[history.length - 1]; setHistory((h) => h.slice(0, -1)); setCurrent(prev); setAnimating(false); }, 300);
  };
  const reset = () => { setHistory([]); setCurrent("time"); };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 30% 20%, #1a0d2e 0%, #080810 50%, #0d0818 100%)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "2rem 1rem 4rem", fontFamily: "sans-serif", position: "relative",
    }}>
      <StarField />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lora:ital,wght@0,400;0,500;1,400&family=DM+Mono&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .choice-btn {
          width: 100%; padding: 1rem 1.25rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 1rem; cursor: pointer;
          transition: all 0.25s ease;
          text-align: left; display: flex; align-items: center; gap: 1rem;
        }
        .choice-btn:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,192,203,0.4);
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255,105,180,0.15);
        }
        .back-btn {
          background: none; border: 1px solid rgba(255,255,255,0.15);
          border-radius: 2rem; color: #888; padding: 0.4rem 1rem;
          font-family: 'DM Mono', monospace; font-size: 0.75rem;
          letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s ease;
        }
        .back-btn:hover { border-color: rgba(255,255,255,0.35); color: #ccc; }
      `}</style>

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", marginBottom: "2rem", marginTop: "1rem" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#e8748a", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          ✦ friday date planner ✦
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.1,
          textShadow: "0 0 40px rgba(232,116,138,0.4)",
        }}>What are we doing?</h1>
      </div>

      <div style={{
        position: "relative", zIndex: 1, width: "100%", maxWidth: 500,
        opacity: animating ? 0 : 1, transform: animating ? "translateY(10px)" : "translateY(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
        {isResult ? (
          <div>
            <ResultCard destKey={resultKey} />
            <div style={{ textAlign: "center", marginTop: "1.5rem", display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button className="back-btn" onClick={goBack}>← back</button>
              <button className="back-btn" onClick={reset} style={{ color: "#e8748a", borderColor: "rgba(232,116,138,0.3)" }}>start over ✦</button>
            </div>
          </div>
        ) : step ? (
          <div style={{ animation: "fadeSlideUp 0.4s ease forwards" }}>
            <div style={{
              background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.5rem",
              padding: "2rem 1.75rem", marginBottom: "1rem",
            }}>
              <div style={{ display: "flex", gap: "0.4rem", justifyContent: "center", marginBottom: "1.5rem" }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{
                    width: i <= history.length ? 20 : 8, height: 8, borderRadius: 4,
                    transition: "all 0.3s ease",
                    background: i <= history.length ? "linear-gradient(90deg, #e8748a, #c084fc)" : "rgba(255,255,255,0.15)",
                  }} />
                ))}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#fff", margin: "0 0 0.5rem", lineHeight: 1.3, fontWeight: 700 }}>
                {step.question}
              </h2>
              <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", color: "#888", fontSize: "0.9rem", margin: "0 0 1.5rem" }}>
                {step.subtitle}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {step.choices.map((c) => (
                  <button key={c.next} className="choice-btn" onClick={() => choose(c.next)}>
                    <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Lora', serif", fontSize: "0.95rem", fontWeight: 600, color: "#eee", marginBottom: "0.15rem" }}>{c.label}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#777", letterSpacing: "0.05em" }}>{c.sublabel}</div>
                    </div>
                    <span style={{ marginLeft: "auto", color: "#555", fontSize: "1rem" }}>›</span>
                  </button>
                ))}
              </div>
            </div>
            {history.length > 0 && (
              <div style={{ textAlign: "center" }}>
                <button className="back-btn" onClick={goBack}>← go back</button>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <div style={{
        position: "relative", zIndex: 1, marginTop: "2.5rem",
        fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
        color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em", textAlign: "center",
      }}>made with 💗 for friday</div>

      <EasterEgg />
    </div>
  );
}
