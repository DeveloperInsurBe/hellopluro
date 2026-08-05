import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Globe2, Smartphone } from "lucide-react";

/**
 * TrustFeaturesStrip
 * Light, glassy reassurance band — frosted cards floating over soft blue
 * gradient blobs, matching the paper background used elsewhere. Same
 * icon-badge + mono-tag language as before, just re-tuned for a light surface.
 */

const FONT_IMPORTS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Safe — under German banking supervision",
    text: "Deposit protection fund covers your money up to €100,000.",
  },
  {
    icon: Globe2,
    title: "On-site — in your home country and in Germany",
    text: "We speak your native language and are available around the clock.",
  },
  {
    icon: Smartphone,
    title: "Convenient — open and unlock digitally",
    text: "Opening and activation in Germany, done from the app in minutes.",
  },
];

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

export default function TrustFeaturesStrip() {
  const [ref, visible] = useReveal();

  return (
    <section className="tfs-root">
      <style>{`
        ${FONT_IMPORTS}

        .tfs-root {
          --bg: #EEF2FB;
          --ink: #0B1B33;
          --ink-soft: #4C5C7A;
          --accent: #2F5AF5;
          --accent-light: #6EA8FE;
          --glass-fill: rgba(255,255,255,0.55);
          --glass-border: rgba(255,255,255,0.75);

          width: 100%;
          background: var(--bg);
          font-family: 'Inter', sans-serif;
          padding: 64px 24px;
          position: relative;
          overflow: hidden;
        }
        .tfs-root * { box-sizing: border-box; }

        /* soft color blobs the glass cards sit on top of / refract */
        .tfs-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.55;
          pointer-events: none;
        }
        .tfs-blob-1 {
          width: 340px; height: 340px;
          top: -140px; left: -80px;
          background: radial-gradient(circle, #A9C2FF, transparent 70%);
        }
        .tfs-blob-2 {
          width: 380px; height: 380px;
          bottom: -180px; left: 38%;
          background: radial-gradient(circle, #BFE0FF, transparent 70%);
        }
        .tfs-blob-3 {
          width: 300px; height: 300px;
          top: -120px; right: -60px;
          background: radial-gradient(circle, #C9D4FF, transparent 70%);
        }

        .tfs-inner {
          position: relative;
          max-width: 1160px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 22px;
        }
        @media (min-width: 860px) {
          .tfs-inner { grid-template-columns: repeat(3, 1fr); gap: 22px; }
        }

        .tfs-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 26px 24px;
          border-radius: 20px;
          background: var(--glass-fill);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          box-shadow: 0 8px 30px rgba(47,90,245,0.1), inset 0 1px 0 rgba(255,255,255,0.6);
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, background 0.3s ease;
        }
        .tfs-item.tfs-visible { opacity: 1; transform: translateY(0); }
        .tfs-item:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.72);
          box-shadow: 0 18px 40px rgba(47,90,245,0.16), inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .tfs-badge {
          position: relative;
          width: 54px;
          height: 54px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tfs-badge-ring {
          position: absolute;
          inset: 0;
          border: 1.5px dashed rgba(47,90,245,0.35);
          border-radius: 50%;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease;
        }
        .tfs-item:hover .tfs-badge-ring {
          transform: rotate(110deg);
          border-color: rgba(47,90,245,0.6);
        }
        .tfs-badge-core {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent-light), var(--accent));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          box-shadow: 0 6px 14px rgba(47,90,245,0.35);
          transition: transform 0.3s ease;
        }
        .tfs-item:hover .tfs-badge-core { transform: scale(1.06); }

        .tfs-copy { padding-top: 2px; }
        .tfs-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--accent);
          margin: 0 0 6px;
        }
        .tfs-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.35;
          margin: 0 0 8px;
          letter-spacing: -0.01em;
        }
        .tfs-text {
          font-size: 13.5px;
          line-height: 1.6;
          color: var(--ink-soft);
          margin: 0;
        }
      `}</style>

      <span className="tfs-blob tfs-blob-1" />
      <span className="tfs-blob tfs-blob-2" />
      <span className="tfs-blob tfs-blob-3" />

      <div className="tfs-inner" ref={ref}>
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          const [label, rest] = f.title.split(" — ");
          return (
            <div
              key={f.title}
              className={`tfs-item ${visible ? "tfs-visible" : ""}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="tfs-badge">
                <span className="tfs-badge-ring" />
                <span className="tfs-badge-core">
                  <Icon size={18} strokeWidth={2} />
                </span>
              </div>
              <div className="tfs-copy">
                <p className="tfs-tag">{label}</p>
                <h3 className="tfs-title">{rest}</h3>
                <p className="tfs-text">{f.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
