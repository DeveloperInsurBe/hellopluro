import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, Info } from "lucide-react";

/**
 * BlockedAccountSection — redesigned
 * Direction: "ledger, in blue" — cool paper background, deep navy ink, a serif
 * headline for warmth, and a monospaced "statement" card for the calculator
 * with a sliding-pill duration switcher as the refined signature detail.
 */

const FONT_IMPORTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
`;

const DURATIONS = [1, 3, 6, 12];
const BUFFER = 70;
const SETUP_FEE = 99;
const ADMIN_FEE = 6;

function useCountUp(target: number, duration = 450) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible] as const;
}

function fmt(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function BlockedAccountSection() {
  const [monthly, setMonthly] = useState("992");
  const [duration, setDuration] = useState(1);
  const [leftRef, leftVisible] = useReveal();
  const [cardRef, cardVisible] = useReveal();

  const required = Number(monthly) || 0;
  const total = required + BUFFER + SETUP_FEE + ADMIN_FEE;
  const animatedTotal = useCountUp(total);
  const durationIndex = DURATIONS.indexOf(duration);

  return (
    <section className="bas-root">
      <style>{`
        ${FONT_IMPORTS}

        .bas-root {
          --bg: #EEF2FB;
          --surface: #FFFFFF;
          --ink: #0B1B33;
          --ink-soft: #4C5C7A;
          --muted: #8891A8;
          --accent: #2F5AF5;
          --accent-dark: #16308C;
          --accent-soft: #E7ECFE;
          --line: #DCE2F3;

          width: 100%;
          background: var(--bg);
          background-image:
            radial-gradient(circle at 1px 1px, rgba(11,27,51,0.07) 1px, transparent 0);
          background-size: 28px 28px;
          padding: 96px 24px;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          box-sizing: border-box;
        }

        .bas-root * { box-sizing: border-box; }

        .bas-grid {
          max-width: 1160px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (min-width: 968px) {
          .bas-grid { grid-template-columns: 1.05fr 0.95fr; gap: 72px; }
        }

        /* ---------- LEFT COLUMN ---------- */
        .bas-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--accent-dark);
          background: var(--accent-soft);
          border: 1px solid rgba(47,90,245,0.2);
          padding: 7px 14px;
          border-radius: 999px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .bas-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
        }

        .bas-h1 {
          font-family: 'Fraunces', serif;
          font-weight: 500;
          font-size: clamp(34px, 4.4vw, 54px);
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin: 22px 0 0;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.7s ease 0.08s, transform 0.7s ease 0.08s;
        }
        .bas-h1 em {
          font-style: italic;
          color: var(--accent);
        }

        .bas-p {
          margin: 20px 0 0;
          font-size: 17px;
          line-height: 1.65;
          color: var(--ink-soft);
          max-width: 480px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.16s, transform 0.7s ease 0.16s;
        }

        .bas-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 26px;
        }
        .bas-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
          background: var(--surface);
          border: 1px solid var(--line);
          padding: 8px 13px;
          border-radius: 10px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .bas-chip:hover {
          border-color: var(--accent);
          box-shadow: 0 4px 14px rgba(47,90,245,0.14);
        }
        .bas-chip svg { color: var(--accent); flex-shrink: 0; }

        .bas-cta-row {
          display: flex;
          align-items: center;
          gap: 26px;
          margin-top: 34px;
          flex-wrap: wrap;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s;
        }
        .bas-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--ink);
          color: #fff;
          border: none;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 15px;
          padding: 14px 24px;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
          box-shadow: 0 1px 0 rgba(0,0,0,0.04);
        }
        .bas-btn-primary:hover {
          background: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(47,90,245,0.3);
        }
        .bas-btn-primary:active { transform: translateY(0); }
        .bas-btn-primary svg { transition: transform 0.18s ease; }
        .bas-btn-primary:hover svg { transform: translateX(3px); }

        .bas-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: var(--ink);
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          padding: 4px 0;
          border-bottom: 1.5px solid var(--ink);
          transition: color 0.18s ease, border-color 0.18s ease, gap 0.18s ease;
        }
        .bas-btn-ghost:hover { color: var(--accent); border-color: var(--accent); gap: 10px; }

        .bas-visible { opacity: 1 !important; transform: translateY(0) !important; }

        /* ---------- RIGHT COLUMN — LEDGER CARD ---------- */
        .bas-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          transition: opacity 0.75s ease, transform 0.75s ease;
        }
        .bas-card-wrap.bas-visible { transform: translateY(0) scale(1) !important; }

        .bas-card {
          background: var(--surface);
          border-radius: 22px;
          border: 1px solid var(--line);
          box-shadow: 0 30px 60px -30px rgba(11,27,51,0.3), 0 4px 14px rgba(11,27,51,0.08);
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .bas-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 40px 70px -30px rgba(11,27,51,0.34), 0 6px 18px rgba(11,27,51,0.1);
        }

        .bas-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 26px;
          background: linear-gradient(120deg, #0B1B33, #16308C);
        }
        .bas-card-head-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.65);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .bas-live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #6EA8FE;
          box-shadow: 0 0 0 0 rgba(110,168,254,0.6);
          animation: bas-pulse 1.8s infinite;
        }
        @keyframes bas-pulse {
          0% { box-shadow: 0 0 0 0 rgba(110,168,254,0.55); }
          70% { box-shadow: 0 0 0 7px rgba(110,168,254,0); }
          100% { box-shadow: 0 0 0 0 rgba(110,168,254,0); }
        }
        .bas-card-head-badge {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #9DBBFF;
          border: 1px solid rgba(157,187,255,0.4);
          padding: 4px 9px;
          border-radius: 999px;
        }

        .bas-card-body { padding: 26px 26px 6px; }

        .bas-field-row {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 16px;
        }
        .bas-field label {
          font-size: 11px;
          font-family: 'IBM Plex Mono', monospace;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 8px;
        }
        .bas-amount-input {
          display: flex;
          align-items: baseline;
          gap: 6px;
          border: 1.5px solid var(--line);
          border-radius: 12px;
          padding: 12px 14px;
          transition: border-color 0.18s ease, box-shadow 0.18s ease;
        }
        .bas-amount-input:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 4px var(--accent-soft);
        }
        .bas-amount-input span { font-family: 'IBM Plex Mono', monospace; color: var(--muted); font-size: 15px; }
        .bas-amount-input input {
          border: none;
          outline: none;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 19px;
          font-weight: 600;
          color: var(--ink);
          width: 100%;
          background: transparent;
        }

        /* ---- redesigned duration: sliding-pill switcher ---- */
        .bas-duration-track {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: var(--accent-soft);
          border: 1.5px solid var(--line);
          border-radius: 12px;
          padding: 4px;
          height: 44px;
        }
        .bas-duration-indicator {
          position: absolute;
          top: 4px;
          bottom: 4px;
          left: 4px;
          width: calc(25% - 4px);
          background: linear-gradient(120deg, #0B1B33, #2F5AF5);
          border-radius: 9px;
          box-shadow: 0 4px 10px rgba(47,90,245,0.35);
          transition: transform 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .bas-duration-btn {
          position: relative;
          z-index: 1;
          background: transparent;
          border: none;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12.5px;
          font-weight: 500;
          color: var(--ink-soft);
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .bas-duration-btn.active { color: #fff; }

        .bas-perforation {
          position: relative;
          height: 28px;
          margin: 22px -26px 4px;
        }
        .bas-perforation::before {
          content: "";
          position: absolute;
          left: 26px; right: 26px; top: 50%;
          border-top: 1.5px dashed var(--line);
        }
        .bas-perforation .notch {
          position: absolute;
          top: 50%;
          width: 20px; height: 20px;
          background: var(--bg);
          border-radius: 50%;
          transform: translateY(-50%);
        }
        .bas-perforation .notch.left { left: -10px; }
        .bas-perforation .notch.right { right: -10px; }

        .bas-lines { padding: 4px 26px 10px; }
        .bas-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 0;
          border-bottom: 1px solid #EEF1FA;
        }
        .bas-line:last-child { border-bottom: none; }
        .bas-line-label {
          font-size: 14.5px;
          color: var(--ink-soft);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .bas-line-label .op {
          font-family: 'IBM Plex Mono', monospace;
          color: var(--muted);
          width: 14px;
        }
        .bas-line-value {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14.5px;
          font-weight: 500;
          color: var(--ink);
        }

        .bas-total {
          margin: 14px 26px 26px;
          border-radius: 16px;
          padding: 20px 22px;
          background: linear-gradient(135deg, #16308C, #2F5AF5);
          color: #fff;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
        }
        .bas-total-label {
          font-size: 13px;
          line-height: 1.4;
          opacity: 0.85;
          max-width: 130px;
        }
        .bas-total-value {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 30px;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .bas-total-value span { font-size: 16px; opacity: 0.75; margin-left: 4px; }

        .bas-footnote {
          text-align: center;
          font-size: 11.5px;
          color: var(--muted);
          padding: 0 26px 22px;
        }
      `}</style>

      <div className="bas-grid">
        {/* LEFT */}
        <div ref={leftRef}>
          <div className={`bas-eyebrow ${leftVisible ? "bas-visible" : ""}`}>
            <span className="bas-eyebrow-dot" />
            Blocked account estimator
          </div>

          <h2 className={`bas-h1 ${leftVisible ? "bas-visible" : ""}`}>
            Smart visa budgeting, <em>designed with clarity</em>
          </h2>

          <p className={`bas-p ${leftVisible ? "bas-visible" : ""}`}>
            A blocked account lets you withdraw a fixed amount every month while
            you study in Germany. Enter your monthly budget and see exactly
            what you need to deposit — fees included, nothing hidden.
          </p>

          <div className="bas-chips">
            {[
              { icon: <CheckCircle2 size={16} />, text: "Visa-compliant" },
              { icon: <ShieldCheck size={16} />, text: "Transparent fees" },
              { icon: <Zap size={16} />, text: "Set up in 10 minutes" },
            ].map((chip, i) => (
              <span
                key={chip.text}
                className={`bas-chip ${leftVisible ? "bas-visible" : ""}`}
                style={{ transitionDelay: `${0.24 + i * 0.08}s` }}
              >
                {chip.icon}
                {chip.text}
              </span>
            ))}
          </div>

          <div className={`bas-cta-row ${leftVisible ? "bas-visible" : ""}`}>
            <button className="bas-btn-primary">
              Start my blocked account
              <ArrowRight size={16} />
            </button>
            <button className="bas-btn-ghost">See how it works</button>
          </div>
        </div>

        {/* RIGHT — LEDGER CARD */}
        <div ref={cardRef} className={`bas-card-wrap ${cardVisible ? "bas-visible" : ""}`}>
          <div className="bas-card">
            <div className="bas-card-head">
              <span className="bas-card-head-label">
                <span className="bas-live-dot" />
                Live estimate
              </span>
              <span className="bas-card-head-badge">Real-time total</span>
            </div>

            <div className="bas-card-body">
              <div className="bas-field-row">
                <div className="bas-field">
                  <label>Monthly amount</label>
                  <div className="bas-amount-input">
                    <span>€</span>
                    <input
                      type="number"
                      value={monthly}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setMonthly(e.target.value.replace(/^0+/, ""))
                      }
                      min={0}
                    />
                  </div>
                </div>
                <div className="bas-field">
                  <label>
                    <Info size={12} /> Duration
                  </label>
                  <div className="bas-duration-track">
                    <div
                      className="bas-duration-indicator"
                      style={{ transform: `translateX(${durationIndex * 100}%)` }}
                    />
                    {DURATIONS.map((d) => (
                      <button
                        key={d}
                        className={`bas-duration-btn ${duration === d ? "active" : ""}`}
                        onClick={() => setDuration(d)}
                      >
                        {d} mo
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bas-perforation">
                <span className="notch left" />
                <span className="notch right" />
              </div>

              <div className="bas-lines">
                <div className="bas-line">
                  <span className="bas-line-label">
                    <span className="op">=</span>Required blocking amount
                  </span>
                  <span className="bas-line-value">€ {fmt(required)}</span>
                </div>
                <div className="bas-line">
                  <span className="bas-line-label">
                    <span className="op">+</span>Buffer for blocked account
                  </span>
                  <span className="bas-line-value">€ {fmt(BUFFER)}</span>
                </div>
                <div className="bas-line">
                  <span className="bas-line-label">
                    <span className="op">+</span>Setup fee
                  </span>
                  <span className="bas-line-value">€ {fmt(SETUP_FEE)}</span>
                </div>
                <div className="bas-line">
                  <span className="bas-line-label">
                    <span className="op">+</span>Administrative fees
                  </span>
                  <span className="bas-line-value">€ {fmt(ADMIN_FEE)}</span>
                </div>
              </div>
            </div>

            <div className="bas-total">
              <span className="bas-total-label">Total blocked amount, due at setup</span>
              <span className="bas-total-value">
                € {fmt(animatedTotal)}
              </span>
            </div>

            <div className="bas-footnote">
              Based on the current DAAD minimum guidance of €992 / month · editable
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
