"use client";

import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomOrder } from "@/components/CustomOrderSheet";

export function MenuClient() {
  const { openCustomOrder } = useCustomOrder();
  return (
    <div className="mt-8">
      <Button
        type="button"
        onClick={openCustomOrder}
        className="rounded-xl border border-pink-400/50 bg-pink-500/15 px-8 py-6 text-base font-medium text-pink-300 shadow-lg shadow-pink-500/10 transition hover:bg-pink-500/25 hover:text-pink-200 hover:shadow-pink-500/20"
      >
        <Gift className="mr-2 size-5" /> Özel Sipariş Ver
      </Button>
    </div>
  );
}
