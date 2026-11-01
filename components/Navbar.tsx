"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import GetAppDrawer from "./GetAppDrawer";

// Total height taken by the floating navbar (top gap + pill). Used by the home
// hero to slide its background image underneath the navbar.
export const NAVBAR_OFFSET = 84;

const SERVICE_LINKS = [
  ["/services", "Blocked Account"],
  ["/travel-health-insurance", "Travel Health Insurance for Visa"],
  ["/private-health-insurance", "Private Health Insurance"],
  ["/statutory-health-insurance", "Statutory Health Insurance"],
  ["/our-packages", "Our Packages"],
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInsuranceMenuOpen, setIsInsuranceMenuOpen] = useState(false);
  const [showAppButton, setShowAppButton] = useState(false);
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);
  const insuranceMenuRef = useRef<HTMLDivElement | null>(null);
  const closeInsuranceMenuTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const clearInsuranceMenuCloseTimeout = () => {
    if (closeInsuranceMenuTimeout.current) {
      clearTimeout(closeInsuranceMenuTimeout.current);
      closeInsuranceMenuTimeout.current = null;
    }
  };

  const openInsuranceMenu = () => {
    clearInsuranceMenuCloseTimeout();
    setIsInsuranceMenuOpen(true);
  };

  const closeInsuranceMenuWithDelay = () => {
    clearInsuranceMenuCloseTimeout();
    closeInsuranceMenuTimeout.current = setTimeout(() => {
      setIsInsuranceMenuOpen(false);
    }, 140);
  };

  const closeInsuranceMenuNow = () => {
    clearInsuranceMenuCloseTimeout();
    setIsInsuranceMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        insuranceMenuRef.current &&
        !insuranceMenuRef.current.contains(event.target as Node)
      ) {
        closeInsuranceMenuNow();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInsuranceMenuCloseTimeout();
    };
  }, []);

  // Show the "Get the app" button in the navbar once the user scrolls down
  useEffect(() => {
    const onScroll = () => setShowAppButton(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "16px 16px 0",
        background: "transparent",
        pointerEvents: "none",
      }}
    >
      {/* FLOATING PILL */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.25rem 0 1.75rem",
          background: "#fff",
          borderRadius: isOpen ? "28px" : "9999px",
          boxShadow: "0 10px 30px rgba(11,27,51,0.14)",
          pointerEvents: "auto",
          transition: "border-radius 0.2s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "68px",
          }}
        >
          {/* LOGO */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src="/pluro-logo-v2.png"
              alt="Pluro"
              width={1731}
              height={440}
              priority
              style={{
                height: "30px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Link>

          {/* DESKTOP MENU */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            className="navbar-desktop"
          >
            {/* GET THE APP — appears on scroll */}
            <AnimatePresence>
              {showAppButton && (
                <motion.button
                  type="button"
                  onClick={() => setIsAppDrawerOpen(true)}
                  initial={{ opacity: 0, scale: 0.85, x: 12 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: 12 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    marginRight: "12px",
                    padding: "10px 20px",
                    borderRadius: "9999px",
                    background: "#0000FF",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "14.5px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 6px 16px rgba(0,0,255,0.25)",
                  }}
                >
                  <Smartphone size={16} /> Get the app
                </motion.button>
              )}
            </AnimatePresence>
            {(["/"] as const).map((href, i) => {
              const labels = ["Home"];
              return (
                <NavLink key={href} href={href}>
                  {labels[i]}
                </NavLink>
              );
            })}
            <div
              ref={insuranceMenuRef}
              style={{ position: "relative" }}
              onMouseEnter={openInsuranceMenu}
              onMouseLeave={closeInsuranceMenuWithDelay}
            >
              <button
                type="button"
                style={{
                  padding: "8px 14px",
                  borderRadius: "10px",
                  fontWeight: 500,
                  fontSize: "14.5px",
                  color: "#374151",
                  textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (isInsuranceMenuOpen) {
                    closeInsuranceMenuNow();
                    return;
                  }
                  openInsuranceMenu();
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "#e6e6ff";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#0000FF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "#374151";
                }}
              >
                Our Services
              </button>
              {isInsuranceMenuOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    minWidth: "270px",
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.12)",
                    padding: "6px",
                    marginTop: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    zIndex: 60,
                  }}
                  onMouseEnter={openInsuranceMenu}
                  onMouseLeave={closeInsuranceMenuWithDelay}
                >
                  {SERVICE_LINKS.map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    style={{
                      display: "block",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      color: "#374151",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                      transition: "background 0.15s, color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "#e6e6ff";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#0000FF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#374151";
                    }}
                    onClick={closeInsuranceMenuNow}
                  >
                    {label}
                  </Link>
                  ))}
                </div>
              )}
            </div>
            {(["/partners", "/about"] as const).map((href, i) => {
              const labels = ["Partners", "About"];
              return (
                <NavLink key={href} href={href}>
                  {labels[i]}
                </NavLink>
              );
            })}

            {/* CTA BUTTON */}
            <Link
              href="/learn-more"
              style={{
                marginLeft: "8px",
                padding: "10px 22px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #0000FF, #0000cc)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "14.5px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "opacity 0.2s, transform 0.15s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.9";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(0)";
              }}
            >
              Learn More
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: "8px",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              background: "transparent",
              cursor: "pointer",
              color: "#374151",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.15s, border-color 0.15s",
            }}
            className="navbar-mobile-btn"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#e6e6ff";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#9999ff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "transparent";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#e5e7eb";
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div
            style={{
              paddingBottom: "12px",
              borderTop: "1px solid #e6e6ff",
            }}
          >
            <div
              style={{
                background: "#f0f4ff",
                border: "1px solid #d6dcff",
                borderRadius: "14px",
                padding: "10px",
                marginTop: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              {[
                ["/", "Home"],
                ...SERVICE_LINKS,
                ["/partners", "Partners"],
                ["/about", "About"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "block",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    fontWeight: 500,
                    fontSize: "15px",
                    color: "#374151",
                    textDecoration: "none",
                    transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "#e6e6ff";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#0000FF";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "#374151";
                  }}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/learn-more"
                onClick={() => setIsOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  fontSize: "15px",
                  color: "#fff",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #0000FF, #0000cc)",
                  marginTop: "4px",
                }}
              >
                Learn More
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* RESPONSIVE STYLES */}
      <style>{`
        @media (max-width: 768px) {
          .navbar-desktop { display: none !important; }
          .navbar-mobile-btn { display: flex !important; }
        }
      `}</style>
    </nav>

    <GetAppDrawer isOpen={isAppDrawerOpen} onClose={() => setIsAppDrawerOpen(false)} />
    </>
  );
}

/* ─── NAV LINK ─── */

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        padding: "8px 14px",
        borderRadius: "10px",
        fontWeight: 500,
        fontSize: "14.5px",
        color: "#374151",
        textDecoration: "none",
        transition: "background 0.15s, color 0.15s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "#e6e6ff";
        (e.currentTarget as HTMLAnchorElement).style.color = "#0000FF";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
        (e.currentTarget as HTMLAnchorElement).style.color = "#374151";
      }}
    >
      {children}
    </Link>
  );
}
