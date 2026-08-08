"use client";

import { useRouter } from "next/navigation";
import BlockedAccountApplicationFlow from "@/components/BlockedAccountApplicationFlow";

export default function BlockedAccountApplicationPage() {
  const router = useRouter();

  return (
    <BlockedAccountApplicationFlow
      mode="page"
      onClose={() => router.push("/")}
    />
  );
}
