"use client";

import Link from "next/link";
import { Cake, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/contact", label: "İletişim" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0708]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0708]/90">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-semibold tracking-tight text-white transition-colors hover:text-pink-300"
        >
          <Cake className="size-7 text-pink-400" />
          <span className="bg-gradient-to-r from-pink-300 to-rose-400 bg-clip-text text-transparent">
            Trey&apos;s Bakery
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-pink-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menüyü aç"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-black/98 px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-xl px-3 py-2 text-zinc-400 hover:bg-white/5 hover:text-pink-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
