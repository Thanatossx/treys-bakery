"use client";

import { useState } from "react";
import { MapPin, Phone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ADDRESS = "Hawick, Trey's Bakery";
const PHONES = [
  { number: "73302114", name: "Lucy" },
  { number: "64736486", name: "Polina" },
  { number: "5709614", name: "Luna" },
];
const FACEBROWSER_URL = "https://facebrowser-tr.gta.world/pages/treysbakery";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  async function copyPhone(number: string) {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(number);
      setTimeout(() => setCopiedNumber(null), 2000);
    } catch {
      setCopiedNumber(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSent(true);
      } else {
        setError(data?.error ?? "Mesaj gönderilemedi. Lütfen tekrar deneyin.");
      }
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
      <p className="font-heading text-sm font-medium uppercase tracking-[0.2em] text-pink-400/80">
        İletişim
      </p>
      <h1 className="mt-3 font-heading text-4xl font-semibold text-white md:text-5xl">
        Bize ulaşın
      </h1>
      <p className="mt-4 text-zinc-400">
        Adres, telefon, sosyal medya ve mesaj formu.
      </p>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <Card className="rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-white">
                <MapPin className="size-5 text-pink-400" /> Adres
              </CardTitle>
              <CardDescription className="text-zinc-400">
                {ADDRESS}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-white">
                <Phone className="size-5 text-pink-400" /> Telefon numaraları
              </CardTitle>
              <CardDescription className="text-zinc-400">
                <ul className="mt-2 space-y-1">
                  {PHONES.map((p) => (
                    <li key={p.number}>
                      <button
                        type="button"
                        onClick={() => copyPhone(p.number)}
                        className="cursor-pointer text-left hover:text-pink-400 transition-colors"
                      >
                        {p.number} – {p.name}
                        {copiedNumber === p.number && (
                          <span className="ml-2 text-xs text-pink-400">Kopyalandı</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading text-white">
                Facebrowser
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Bizi Facebrowser&apos;da takip edin.
              </CardDescription>
              <div className="mt-4">
                <a
                  href={FACEBROWSER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-zinc-400 transition-colors hover:border-pink-400/40 hover:bg-pink-500/10 hover:text-pink-400"
                  aria-label="Facebrowser - Trey's Bakery"
                >
                  <Globe className="size-5" />
                  Trey&apos;s Bakery sayfası
                </a>
              </div>
            </CardHeader>
          </Card>
        </div>

        <Card className="rounded-2xl border-white/10 bg-white/[0.03] shadow-xl shadow-black/20">
          <CardHeader>
            <CardTitle className="font-heading text-white">Bize Ulaşın</CardTitle>
            <CardDescription className="text-zinc-400">
              Soru veya önerinizi yazın, en kısa sürede dönüş yapalım.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="rounded-xl border border-pink-500/30 bg-pink-500/10 p-6 text-center">
                <p className="font-medium text-pink-400">Mesajınız alındı. Teşekkürler.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">İsim</Label>
                  <Input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500/50"
                    placeholder="Adınız"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300">Telefon numarası</Label>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500/50"
                    placeholder="xxxxxx"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-zinc-300">Mesaj</Label>
                  <Textarea
                    id="message"
                    required
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="min-h-[120px] border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500/50"
                    placeholder="Mesajınız..."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-pink-500 py-6 text-white shadow-lg shadow-pink-500/25 hover:bg-pink-600"
                >
                  {loading ? "Gönderiliyor..." : "Gönder"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
