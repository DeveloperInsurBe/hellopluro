"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 1px 16px rgba(0,0,255,0.08)",
        transition: "all 0.3s",
      }}
    >
      {/* TOP TEAL ACCENT BAR — matches ContactModal */}
      <div
        style={{
          height: "3px",
          background: "linear-gradient(90deg, #0000FF, #3333FF, #6666FF)",
          width: "100%",
        }}
      />

      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}
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
              src="/Pluro_Logo_Blue.png"
              alt="Pluro"
              width={140}
              height={40}
              priority
              style={{
                height: "140px",
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
            {(["/", "/services",  "/partners", "/about"] as const).map((href, i) => {
              const labels = ["Home", "Services", "Partners", "About"];
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
                padding: "9px 20px",
                borderRadius: "12px",
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
                ["/services", "Services"],
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
