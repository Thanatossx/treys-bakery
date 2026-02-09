import Link from "next/link";
import { Cake, Globe } from "lucide-react";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/contact", label: "İletişim" },
];

const FACEBROWSER_URL = "https://facebrowser-tr.gta.world/pages/treysbakery";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/10 bg-black/60 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-4 py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & slogan */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 font-heading text-xl font-semibold text-white transition-opacity hover:opacity-90">
              <Cake className="size-7 text-pink-400" />
              <span className="bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
                Trey&apos;s Bakery
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-zinc-400 leading-relaxed">
              Tatlı krizinin en şık hali. Los Santos&apos;ta butik pastane ve fırın.
            </p>
          </div>

          {/* Linkler */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Sayfalar
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-pink-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Facebrowser */}
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              Facebrowser
            </h3>
            <a
              href={FACEBROWSER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-400 transition-colors hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-pink-400"
              aria-label="Facebrowser - Trey's Bakery"
            >
              <Globe className="size-5" />
              Sayfamız
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-10 md:flex-row md:gap-0">
          <p className="text-xs text-zinc-500">
            © {year} Trey&apos;s Bakery. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-zinc-600">
            Hawick, Trey&apos;s Bakery
          </p>
        </div>
      </div>
    </footer>
  );
}
