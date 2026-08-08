import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ShieldCheck, Zap, ArrowRight, Info } from "lucide-react";
import { useRouter } from "next/navigation";

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
    let raf = 0;

    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

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
  return n.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function BlockedAccountSection() {
  const router = useRouter();
  const [monthly, setMonthly] = useState("992");
  const [duration, setDuration] = useState(1);
  const [leftRef, leftVisible] = useReveal();
  const [cardRef, cardVisible] = useReveal();

  const required = Number(monthly) || 0;
  const total = required + BUFFER + SETUP_FEE + ADMIN_FEE;
  const animatedTotal = useCountUp(total);
  const durationIndex = DURATIONS.indexOf(duration);

  return (
    <section
      className="w-full bg-[#EEF2FB] px-6 py-24 text-[#0B1B33] overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(11,27,51,0.07) 1px, transparent 0)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto grid max-w-[1160px] grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[72px]">
        <div ref={leftRef}>
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-[rgba(47,90,245,0.2)] bg-[#E7ECFE] px-[14px] py-[7px] text-[12px] uppercase tracking-[0.06em] text-[#16308C] transition-all duration-700 ${
              leftVisible ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"
            }`}
          >
            <span className="h-[6px] w-[6px] rounded-full bg-[#2F5AF5]" />
            Blocked account estimator
          </div>

          <h2
            className={`mt-[22px] max-w-[720px] text-[clamp(34px,4.4vw,54px)] font-medium leading-[1.08] tracking-[-0.01em] transition-all duration-700 delay-75 ${
              leftVisible ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0"
            }`}
          >
            Smart visa budgeting, <em className="text-[#2F5AF5] not-italic">designed with clarity</em>
          </h2>

          <p
            className={`mt-5 max-w-[480px] text-[17px] leading-[1.65] text-[#4C5C7A] transition-all duration-700 [transition-delay:160ms] ${
              leftVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            A blocked account lets you withdraw a fixed amount every month while
            you study in Germany. Enter your monthly budget and see exactly what
            you need to deposit, fees included, nothing hidden.
          </p>

          <div className="mt-[26px] flex flex-wrap gap-[10px]">
            {[
              { icon: <CheckCircle2 size={16} />, text: "Visa-compliant" },
              { icon: <ShieldCheck size={16} />, text: "Transparent fees" },
              { icon: <Zap size={16} />, text: "Set up in 10 minutes" },
            ].map((chip, i) => (
              <span
                key={chip.text}
                className={`inline-flex items-center gap-[7px] rounded-[10px] border border-[#DCE2F3] bg-white px-[13px] py-[8px] text-[13px] font-medium text-[#0B1B33] transition-all duration-500 hover:border-[#2F5AF5] hover:shadow-[0_4px_14px_rgba(47,90,245,0.14)] ${
                  leftVisible ? "translate-y-0 opacity-100" : "translate-y-[14px] opacity-0"
                }`}
                style={{ transitionDelay: `${240 + i * 80}ms` }}
              >
                <span className="text-[#2F5AF5]">{chip.icon}</span>
                {chip.text}
              </span>
            ))}
          </div>

          <div
            className={`mt-[34px] flex flex-wrap items-center gap-[26px] transition-all duration-700 [transition-delay:400ms] ${
              leftVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => router.push("/blocked-account/application")}
              className="inline-flex cursor-pointer items-center gap-2 rounded-[12px] bg-[#0B1B33] px-6 py-[14px] text-[15px] font-semibold text-white shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-[2px] hover:bg-[#2F5AF5] hover:shadow-[0_10px_20px_rgba(47,90,245,0.3)] active:translate-y-0"
            >
              Start my blocked account
              <ArrowRight size={16} />
            </button>
            <button className="inline-flex items-center gap-[6px] border-b-[1.5px] border-[#0B1B33] bg-transparent px-0 py-1 text-[15px] font-semibold text-[#0B1B33] transition-all duration-200 hover:gap-[10px] hover:border-[#2F5AF5] hover:text-[#2F5AF5]">
              See how it works
            </button>
          </div>
        </div>

        <div
          ref={cardRef}
          className={`relative transition-all duration-700 ${
            cardVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-7 scale-[0.98] opacity-0"
          }`}
        >
          <div className="overflow-hidden rounded-[22px] border border-[#DCE2F3] bg-white shadow-[0_30px_60px_-30px_rgba(11,27,51,0.3),0_4px_14px_rgba(11,27,51,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_40px_70px_-30px_rgba(11,27,51,0.34),0_6px_18px_rgba(11,27,51,0.1)]">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#0B1B33] to-[#16308C] px-[26px] py-5">
              <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.05em] text-[rgba(255,255,255,0.65)]">
                <span className="h-[7px] w-[7px] rounded-full bg-[#6EA8FE] shadow-[0_0_0_0_rgba(110,168,254,0.6)] animate-pulse" />
                Live estimate
              </span>
              <span className="rounded-full border border-[rgba(157,187,255,0.4)] px-[9px] py-1 text-[11px] text-[#9DBBFF]">
                Real-time total
              </span>
            </div>

            <div className="px-[26px] pb-[6px] pt-[26px]">
              <div className="grid grid-cols-[1.3fr_1fr] gap-4">
                <div>
                  <label className="mb-2 inline-flex items-center gap-[5px] text-[11px] uppercase tracking-[0.04em] text-[#8891A8]">
                    Monthly amount
                  </label>
                  <div className="flex items-baseline gap-[6px] rounded-[12px] border-[1.5px] border-[#DCE2F3] px-[14px] py-3 transition-all duration-200 focus-within:border-[#2F5AF5] focus-within:shadow-[0_0_0_4px_#E7ECFE]">
                    <span className="text-[15px] text-[#8891A8]">
                      EUR
                    </span>
                    <input
                      type="number"
                      value={monthly}
                      onChange={(e) => setMonthly(e.target.value.replace(/^0+/, ""))}
                      min={0}
                      className="w-full border-none bg-transparent text-[19px] font-semibold text-[#0B1B33] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 inline-flex items-center gap-[5px] text-[11px] uppercase tracking-[0.04em] text-[#8891A8]">
                    <Info size={12} /> Duration
                  </label>
                  <div className="relative grid h-11 grid-cols-4 rounded-[12px] border-[1.5px] border-[#DCE2F3] bg-[#E7ECFE] p-1">
                    <div
                      className="absolute bottom-1 left-1 top-1 rounded-[9px] bg-gradient-to-r from-[#0B1B33] to-[#2F5AF5] shadow-[0_4px_10px_rgba(47,90,245,0.35)] transition-transform duration-300"
                      style={{
                        width: "calc(25% - 4px)",
                        transform: `translateX(${durationIndex * 100}%)`,
                      }}
                    />
                    {DURATIONS.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`relative z-10 border-none bg-transparent text-[12.5px] font-medium transition-colors duration-200 ${
                          duration === d ? "text-white" : "text-[#4C5C7A]"
                        }`}
                      >
                        {d} mo
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative mb-1 mt-[22px] h-7">
                <div className="absolute left-[26px] right-[26px] top-1/2 -translate-y-1/2 border-t-[1.5px] border-dashed border-[#DCE2F3]" />
                <span className="absolute -left-[10px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#EEF2FB]" />
                <span className="absolute -right-[10px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[#EEF2FB]" />
              </div>

              <div className="px-[26px] pb-[10px] pt-1">
                <div className="flex items-center justify-between border-b border-[#EEF1FA] py-[11px]">
                  <span className="inline-flex items-center gap-[6px] text-[14.5px] text-[#4C5C7A]">
                    <span className="w-[14px] text-[#8891A8]">
                      =
                    </span>
                    Required blocking amount
                  </span>
                  <span className="text-[14.5px] font-medium text-[#0B1B33]">
                    EUR {fmt(required)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-[#EEF1FA] py-[11px]">
                  <span className="inline-flex items-center gap-[6px] text-[14.5px] text-[#4C5C7A]">
                    <span className="w-[14px] text-[#8891A8]">
                      +
                    </span>
                    Buffer for blocked account
                  </span>
                  <span className="text-[14.5px] font-medium text-[#0B1B33]">
                    EUR {fmt(BUFFER)}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-[#EEF1FA] py-[11px]">
                  <span className="inline-flex items-center gap-[6px] text-[14.5px] text-[#4C5C7A]">
                    <span className="w-[14px] text-[#8891A8]">
                      +
                    </span>
                    Setup fee
                  </span>
                  <span className="text-[14.5px] font-medium text-[#0B1B33]">
                    EUR {fmt(SETUP_FEE)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-[11px]">
                  <span className="inline-flex items-center gap-[6px] text-[14.5px] text-[#4C5C7A]">
                    <span className="w-[14px] text-[#8891A8]">
                      +
                    </span>
                    Administrative fees
                  </span>
                  <span className="text-[14.5px] font-medium text-[#0B1B33]">
                    EUR {fmt(ADMIN_FEE)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mx-[26px] mb-[26px] mt-[14px] flex items-end justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#16308C] to-[#2F5AF5] px-[22px] py-5 text-white">
              <span className="max-w-[130px] text-[13px] leading-[1.4] opacity-85">
                Total blocked amount, due at setup
              </span>
              <span className="whitespace-nowrap text-[30px] font-semibold tracking-[-0.01em]">
                EUR {fmt(animatedTotal)}
              </span>
            </div>

            <div className="px-[26px] pb-[22px] text-center text-[11.5px] text-[#8891A8]">
              Based on the current DAAD minimum guidance of EUR 992 / month - editable
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
