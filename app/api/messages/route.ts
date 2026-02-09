import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(request: Request) {
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json(
      { error: "Supabase yapılandırılmamış. .env.local içinde NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY (veya NEXT_PUBLIC_SUPABASE_ANON_KEY) tanımlı olmalı." },
      { status: 500 }
    );
  }
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : (typeof body?.email === "string" ? body.email.trim() : "");
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (!name || !phone || !message) {
      return NextResponse.json({ error: "İsim, telefon numarası ve mesaj gerekli" }, { status: 400 });
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase
      .from("messages")
      .insert({ name, email: phone, message })
      .select("id")
      .single();
    if (error) {
      if (error.code === "42P01" || error.message?.includes("does not exist")) {
        return NextResponse.json(
          { error: "Veritabanında 'messages' tablosu yok. Supabase SQL Editor'de supabase/schema.sql dosyasını çalıştırın (veya en azından messages tablosunu oluşturun)." },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ id: data?.id });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Sunucu hatası" },
      { status: 500 }
    );
  }
}
