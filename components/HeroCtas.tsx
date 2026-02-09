"use client";

import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomOrder } from "@/components/CustomOrderSheet";

export function HeroCtas() {
  const { openCustomOrder } = useCustomOrder();
  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
      <Button
        asChild
        size="lg"
        className="rounded-xl bg-pink-500 px-8 py-6 text-base font-medium text-white shadow-lg shadow-pink-500/25 transition hover:bg-pink-600 hover:shadow-pink-500/30"
      >
        <Link href="/menu">
          Menüyü Gör <ArrowRight className="ml-2 size-5" />
        </Link>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        onClick={openCustomOrder}
        className="rounded-xl border-pink-400/50 bg-white/5 px-8 py-6 text-base font-medium text-pink-300 backdrop-blur transition hover:bg-pink-500/15 hover:text-pink-200 hover:border-pink-400/70"
      >
        <Gift className="mr-2 size-5" /> Özel Sipariş Ver
      </Button>
    </div>
  );
}
