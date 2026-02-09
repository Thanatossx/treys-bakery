"use client";

import Image from "next/image";
import { useState } from "react";

export function MenuImage() {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="relative flex min-h-[500px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/95 to-zinc-900 p-10 text-center">
        <p className="text-lg text-zinc-400">
          Menü fotoğrafınızı <code className="rounded bg-white/10 px-2 py-1 text-sm">public/menu.jpg</code> olarak ekleyin.
        </p>
        <p className="text-sm text-zinc-500">JPG veya PNG, yatay veya dikey format desteklenir.</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] w-full min-h-[480px] overflow-hidden md:min-h-[560px] lg:aspect-[4/3] lg:min-h-[520px]">
      <Image
        src="/menu.jpg"
        alt="Trey's Bakery menüsü"
        fill
        className="object-contain object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1152px"
        priority
        onError={() => setError(true)}
      />
    </div>
  );
}
