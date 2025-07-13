"use client";

import { Zap } from "lucide-react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";

import { useUser } from "@clerk/nextjs";
import { api } from "../../../../convex/_generated/api";

export default function UpgradeButton() {
  const router = useRouter();
  const { user } = useUser();
  const upgradeToPro = useMutation(api.users.upgradeToPro);

  const handleUpgrade = async () => {
    try {
      if (!user?.id) {
        throw new Error("User not logged in");
      }

      await upgradeToPro(); // Auth is handled inside mutation
      router.push("/"); // Redirect after upgrading
    } catch (err) {
      console.error("Upgrade failed:", err);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </button>
  );
}
