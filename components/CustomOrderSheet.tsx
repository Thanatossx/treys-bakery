"use client";

import { createContext, useContext, useState, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Gift } from "lucide-react";

const AROMAS = [
  "Çikolata",
  "Vanilya",
  "Red Velvet",
  "Limon",
  "Frambuaz",
  "Karadut",
  "Muz",
  "Hindistan Cevizi",
  "Kahve",
  "Diğer (notta belirtin)",
];

type CustomOrderContextType = {
  openCustomOrder: () => void;
};

const CustomOrderContext = createContext<CustomOrderContextType | null>(null);

export function useCustomOrder() {
  const ctx = useContext(CustomOrderContext);
  if (!ctx) throw new Error("useCustomOrder must be used within CustomOrderProvider");
  return ctx;
}

export function CustomOrderProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dateNeeded: "",
    guestCount: "",
    aroma: "",
    notes: "",
  });

  const openCustomOrder = useCallback(() => {
    setSent(false);
    setForm({ name: "", phone: "", dateNeeded: "", guestCount: "", aroma: "", notes: "" });
    setOpen(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name,
          contact_info: form.phone,
          order_details: {
            date_needed: form.dateNeeded,
            guest_count: form.guestCount,
            aroma: form.aroma,
            notes: form.notes,
          },
          date_needed: form.dateNeeded || null,
        }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => {
          setOpen(false);
          setSent(false);
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <CustomOrderContext.Provider value={{ openCustomOrder }}>
      {children}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full border-l border-white/10 bg-[#0f0a0c] sm:max-w-lg"
        >
          <SheetHeader className="border-b border-white/10 pb-6">
            <SheetTitle className="flex items-center gap-2 text-2xl text-white">
              <Gift className="size-7 text-pink-400" />
              Özel Sipariş
            </SheetTitle>
            <SheetDescription className="text-zinc-400">
              Doğum günü pastası veya özel günler için siparişinizi iletin.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 overflow-y-auto pb-8">
            {sent ? (
              <div className="rounded-2xl border border-pink-500/30 bg-pink-500/10 p-6 text-center">
                <p className="text-lg font-medium text-pink-400">Siparişiniz alındı.</p>
                <p className="mt-2 text-sm text-zinc-400">En kısa sürede sizinle iletişime geçeceğiz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="co-name" className="text-zinc-300">İsim</Label>
                  <Input
                    id="co-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500/50"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co-phone" className="text-zinc-300">Telefon</Label>
                  <Input
                    id="co-phone"
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500/50"
                    placeholder="xxxxxx"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co-date" className="text-zinc-300">İstenen Tarih</Label>
                  <Input
                    id="co-date"
                    type="date"
                    value={form.dateNeeded}
                    onChange={(e) => setForm((f) => ({ ...f, dateNeeded: e.target.value }))}
                    className="border-white/10 bg-white/5 text-white focus-visible:ring-pink-500/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co-guests" className="text-zinc-300">Kişi Sayısı</Label>
                  <Input
                    id="co-guests"
                    type="number"
                    min={1}
                    value={form.guestCount}
                    onChange={(e) => setForm((f) => ({ ...f, guestCount: e.target.value }))}
                    className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500/50"
                    placeholder="Örn. 10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-zinc-300">Aroma</Label>
                  <Select value={form.aroma} onValueChange={(v) => setForm((f) => ({ ...f, aroma: v }))}>
                    <SelectTrigger className="border-white/10 bg-white/5 text-white focus:ring-pink-500/50">
                      <SelectValue placeholder="Aroma seçin" />
                    </SelectTrigger>
                    <SelectContent className="border-white/10 bg-[#0f0a0c]">
                      {AROMAS.map((a) => (
                        <SelectItem key={a} value={a} className="text-white focus:bg-pink-500/20">
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="co-notes" className="text-zinc-300">Tarif / Not</Label>
                  <Textarea
                    id="co-notes"
                    value={form.notes}
                    onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                    className="min-h-[100px] border-white/10 bg-white/5 text-white placeholder:text-zinc-500 focus-visible:ring-pink-500/50"
                    placeholder="Özel istekleriniz, yazı, süsleme vb."
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-pink-500 py-6 text-base font-medium text-white shadow-lg shadow-pink-500/25 transition hover:bg-pink-600 hover:shadow-pink-500/30"
                >
                  {loading ? "Gönderiliyor..." : "Siparişi Gönder"}
                </Button>
              </form>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </CustomOrderContext.Provider>
  );
}
