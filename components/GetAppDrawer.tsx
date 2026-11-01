"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X } from "lucide-react";
import { AndroidIcon, AppleIcon } from "./AppDownloadSection";

// QR code points to the Android app on the live website
const APP_DOWNLOAD_URL = "https://www.hellopluro.com/pluro.apk";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GetAppDrawer({ isOpen, onClose }: Props) {
  const [showIosNote, setShowIosNote] = useState(false);

  // Close on Escape + lock page scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    setShowIosNote(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[70] bg-[#0b1b33]/40 backdrop-blur-[2px]"
          />

          {/* DRAWER */}
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="get-app-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full sm:w-[440px] flex-col overflow-y-auto bg-gradient-to-b from-primary via-[#0a2a8f] to-[#061a5c] text-white shadow-[-20px_0_60px_rgba(0,0,0,0.25)]"
          >
            <div className="flex justify-end p-5">
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0b1b33] transition hover:scale-105 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center px-8 pb-10 text-center">
              <h2 id="get-app-title" className="text-3xl font-medium">
                Scan. Tap. Open
              </h2>
              <p className="mt-4 max-w-xs text-white/90">
                Just scan the QR code to download the Pluro app — and manage
                your blocked account and insurance from your phone.
              </p>

              {/* QR — on desktop only; on phones the buttons are enough */}
              <div className="mt-8 hidden sm:block rounded-3xl bg-white p-5 shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
                <QRCodeSVG
                  value={APP_DOWNLOAD_URL}
                  size={260}
                  level="M"
                  fgColor="#0b1b33"
                  bgColor="#ffffff"
                />
              </div>

              {/* STORE BUTTONS */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowIosNote(true)}
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/30 bg-black px-4 py-2 transition hover:scale-[1.03] cursor-pointer"
                >
                  <AppleIcon className="h-6 w-6" />
                  <span className="flex flex-col text-left leading-tight">
                    <span className="text-[10px]">Download on the</span>
                    <span className="text-base font-semibold -mt-0.5">App Store</span>
                  </span>
                </button>

                <a
                  href="/pluro.apk"
                  download="Pluro.apk"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-white/30 bg-black px-4 py-2 transition hover:scale-[1.03]"
                >
                  <AndroidIcon className="h-6 w-7 text-[#3DDC84]" />
                  <span className="flex flex-col text-left leading-tight">
                    <span className="text-[10px] uppercase">Download for</span>
                    <span className="text-base font-semibold -mt-0.5">Android</span>
                  </span>
                </a>
              </div>

              <AnimatePresence>
                {showIosNote && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 rounded-xl bg-white/15 px-4 py-2.5 text-sm"
                  >
                    The iOS app is coming soon. Meanwhile, use Pluro on our website.
                  </motion.p>
                )}
              </AnimatePresence>

              <p className="mt-auto pt-10 text-sm text-white/70">
                For international students moving to Germany.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
