"use client";

import { useEffect } from "react";
import { useCustomOrder } from "@/components/CustomOrderSheet";
import { useRouter } from "next/navigation";

export default function CustomOrderPage() {
  const { openCustomOrder } = useCustomOrder();
  const router = useRouter();

  useEffect(() => {
    openCustomOrder();
    router.replace("/menu");
  }, [openCustomOrder, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <p className="text-zinc-400">Özel sipariş formu açılıyor...</p>
    </div>
  );
}
