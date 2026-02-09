import { MenuClient } from "./MenuClient";
import { MENU_CATEGORIES } from "@/lib/menu-data";

export default function MenuPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-white/10 px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="font-heading text-xs font-medium uppercase tracking-[0.4em] text-pink-400/90">
            Tatlılar & İçecekler
          </p>
          <h1 className="mt-4 font-heading text-5xl font-semibold tracking-tight text-white md:text-6xl">
            Menü
          </h1>
          <div className="mx-auto mt-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-pink-500/60" />
            <span className="font-heading text-sm text-zinc-500">Trey&apos;s Bakery</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-pink-500/60" />
          </div>
          <MenuClient />
        </div>
      </section>

      {/* Menu card */}
      <section className="px-4 py-10 pb-28 md:py-14 lg:py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-2xl shadow-black/40">
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/5" />

            {MENU_CATEGORIES.map((category, index) => (
              <div
                key={category.id}
                className={`relative ${index > 0 ? "border-t border-white/5" : ""} ${category.id === "special" ? "bg-gradient-to-b from-amber-500/10 to-transparent" : ""}`}
              >
                {/* Category header */}
                <div className="relative px-8 pt-10 pb-4 md:px-12 md:pt-12">
                  <div className="flex items-center gap-4">
                    <span className="font-heading text-[0.65rem] font-medium uppercase tracking-[0.35em] text-pink-400/80 md:text-xs">
                      {category.id === "special" ? "Öne çıkan" : category.name}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-pink-500/40 to-transparent" />
                  </div>
                  <h2
                    className={`mt-2 font-heading text-2xl font-semibold tracking-tight md:text-3xl ${category.id === "special" ? "text-amber-300/95" : "text-white"}`}
                  >
                    {category.name}
                  </h2>
                </div>

                {/* Items with dot leaders */}
                <div className="px-8 pb-10 md:px-12 md:pb-12">
                  <ul className="space-y-0.5">
                    {category.items.map((item) => (
                      <li
                        key={item.name}
                        className="group flex items-baseline gap-2 py-2.5 md:gap-3 md:py-3"
                      >
                        <span className="shrink-0 font-heading text-base text-zinc-200 transition-colors group-hover:text-white md:text-lg">
                          {item.name}
                        </span>
                        <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap">
                          <span className="inline-block min-w-full select-none text-zinc-600/70" aria-hidden>
                            {"· ".repeat(80)}
                          </span>
                        </span>
                        <span className="shrink-0 pl-2 font-heading text-base font-semibold tabular-nums text-pink-400 md:text-lg">
                          ${item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

            {/* Footer accent */}
            <div className="border-t border-white/10 px-8 py-6 md:px-12">
              <p className="text-center font-heading text-xs uppercase tracking-widest text-zinc-500">
                Tüm fiyatlar vergi dahil · Özel sipariş için bizimle iletişime geçin
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
