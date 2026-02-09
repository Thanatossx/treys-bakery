"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, LogOut, Package, MessageSquare, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUSES = ["Bekliyor", "Onaylandı", "Reddedildi", "Teslim Edildi"] as const;

type Order = {
  id: string;
  customer_name: string;
  contact_info: string;
  order_details: Record<string, unknown>;
  status: string;
  date_needed: string | null;
  created_at: string;
};

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

const fetchOpts = { credentials: "include" as RequestCredentials };

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"orders" | "messages">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const checkAuth = useCallback(async () => {
    const res = await fetch("/api/admin/orders", fetchOpts);
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  const loadMessages = useCallback(async () => {
    const res = await fetch("/api/admin/messages", fetchOpts);
    if (res.ok) setMessages(await res.json());
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (auth && tab === "messages") loadMessages();
  }, [auth, tab, loadMessages]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const ordersRes = await fetch("/api/admin/orders", fetchOpts);
        if (ordersRes.ok) setOrders(await ordersRes.json());
        const msgRes = await fetch("/api/admin/messages", fetchOpts);
        if (msgRes.ok) setMessages(await msgRes.json());
        setAuth(true);
      } else {
        setLoginError(data?.error ?? "Giriş başarısız. Şifreyi kontrol edin.");
      }
    } catch {
      setLoginError("Bağlantı hatası. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE", credentials: "include" });
    setAuth(false);
  }

  async function updateOrderStatus(id: string, status: string) {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
      credentials: "include",
    });
    if (res.ok) setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  if (auth === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-zinc-400">Yükleniyor...</p>
      </div>
    );
  }

  if (auth === false) {
    return (
      <div className="container mx-auto max-w-sm px-4 py-16">
        <Card className="border-white/10 bg-zinc-900/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Lock className="size-5 text-pink-400" /> Admin Girişi
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Devam etmek için şifrenizi girin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                  {loginError}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError(null);
                  }}
                  className="border-white/10 bg-zinc-800 text-white placeholder:text-zinc-500"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-pink-500 hover:bg-pink-600">
                {loading ? "Giriş yapılıyor..." : "Giriş"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: "orders" as const, label: "Siparişler", icon: Package },
    { id: "messages" as const, label: "Mesajlar", icon: MessageSquare },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:max-w-6xl md:py-12 lg:max-w-7xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
        <Button variant="outline" size="sm" onClick={handleLogout} className="border-white/10 text-zinc-400">
          <LogOut className="mr-2 size-4" /> Çıkış
        </Button>
      </div>

      <div className="mb-6 flex gap-2 border-b border-white/10">
        {tabs.map((t) => (
          <Button
            key={t.id}
            variant={tab === t.id ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setTab(t.id)}
            className={tab === t.id ? "border-pink-500/30 text-pink-400" : "text-zinc-400"}
          >
            <t.icon className="mr-2 size-4" /> {t.label}
          </Button>
        ))}
      </div>

      {tab === "orders" && (
        <Card className="border-white/10 bg-zinc-900/80">
          <CardHeader>
            <CardTitle className="text-white">Özel Siparişler</CardTitle>
            <CardDescription className="text-zinc-400">Durumu güncelleyebilirsiniz. Detaylar tam okunabilir.</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-zinc-500">Henüz sipariş yok.</p>
            ) : (
              <div className="space-y-6">
                {orders.map((o) => {
                  const details = (o.order_details || {}) as Record<string, unknown>;
                  const aroma = details.aroma as string | undefined;
                  const notes = details.notes as string | undefined;
                  const guestCount = details.guest_count as string | number | undefined;
                  const dateDetail = details.date_needed as string | undefined;
                  const knownKeys = new Set(["aroma", "notes", "guest_count", "date_needed"]);
                  const otherKeys = Object.keys(details).filter((k) => !knownKeys.has(k));
                  return (
                    <div
                      key={o.id}
                      className="rounded-xl border border-white/10 bg-zinc-800/50 p-6"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0 flex-1 space-y-3">
                          <div className="flex flex-wrap items-center gap-3 gap-y-1">
                            <span className="font-semibold text-white">{o.customer_name}</span>
                            <span className="text-zinc-400">{o.contact_info}</span>
                            <span className="text-sm text-zinc-500">
                              İstenen tarih: {o.date_needed ?? dateDetail ?? "-"}
                            </span>
                          </div>
                          <div className="rounded-lg border border-white/10 bg-black/30 p-4">
                            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                              Sipariş detayı
                            </p>
                            <dl className="space-y-3 text-sm">
                              {aroma != null && String(aroma).trim() !== "" && (
                                <div>
                                  <dt className="text-zinc-500">Aroma</dt>
                                  <dd className="mt-0.5 text-zinc-200">{String(aroma)}</dd>
                                </div>
                              )}
                              {guestCount != null && String(guestCount).trim() !== "" && (
                                <div>
                                  <dt className="text-zinc-500">Kişi sayısı</dt>
                                  <dd className="mt-0.5 text-zinc-200">{String(guestCount)}</dd>
                                </div>
                              )}
                              {notes != null && String(notes).trim() !== "" && (
                                <div>
                                  <dt className="text-zinc-500">Not / Tarif</dt>
                                  <dd className="mt-1 whitespace-pre-wrap break-words text-zinc-200">
                                    {String(notes)}
                                  </dd>
                                </div>
                              )}
                              {otherKeys.map((k) => (
                                <div key={k}>
                                  <dt className="text-zinc-500 capitalize">{k.replace(/_/g, " ")}</dt>
                                  <dd className="mt-0.5 break-words text-zinc-200">
                                    {typeof details[k] === "object"
                                      ? JSON.stringify(details[k])
                                      : String(details[k])}
                                  </dd>
                                </div>
                              ))}
                              {Object.keys(details).length === 0 && (
                                <p className="text-zinc-500">Detay yok</p>
                              )}
                            </dl>
                          </div>
                        </div>
                        <div className="shrink-0 md:pl-4">
                          <Select
                            value={o.status}
                            onValueChange={(v) => updateOrderStatus(o.id, v)}
                          >
                            <SelectTrigger className="w-full min-w-[160px] border-white/10 bg-zinc-800 text-white md:w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="border-white/10 bg-zinc-900">
                              {STATUSES.map((s) => (
                                <SelectItem key={s} value={s} className="text-white">
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {tab === "messages" && (
        <Card className="border-white/10 bg-zinc-900/80">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">İletişim Mesajları</CardTitle>
                <CardDescription className="text-zinc-400">Formdan gelen mesajlar. Sekmeye her girdiğinizde liste yenilenir.</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={loadMessages} className="shrink-0 border-white/10 text-zinc-400">
                <RefreshCw className="mr-2 size-4" /> Yenile
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <p className="text-zinc-500">Henüz mesaj yok. İletişim formundan gelen mesajlar burada görünür.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-lg border border-white/10 bg-zinc-800/50 p-4"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="font-medium text-white">{m.name}</span>
                      <span className="text-sm text-zinc-500">Telefon: {m.email}</span>
                      <span className="text-xs text-zinc-600">
                        {new Date(m.created_at).toLocaleString("tr-TR")}
                      </span>
                    </div>
                    <p className="text-zinc-300 whitespace-pre-wrap">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
