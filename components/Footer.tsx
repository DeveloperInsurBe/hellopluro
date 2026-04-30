"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8faf9] border-t border-gray-200 mt-20">
      
      {/* TOP ROW */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Pluro_Logo_Blue.png"
            alt="Pluro"
            width={120}
            height={32}
            className="h-28 w-auto"
          />
        </Link>

        {/* COPYRIGHT */}
        <p className="text-sm text-gray-600 text-center">
          © 2026 INSURBE GmbH. All Rights Reserved.
        </p>

        {/* LINK */}
        <Link
          href="/imprint"
          className="text-sm text-gray-600 hover:text-primary transition"
        >
          Imprint
        </Link>
      </div>

     
    </footer>
  );
}