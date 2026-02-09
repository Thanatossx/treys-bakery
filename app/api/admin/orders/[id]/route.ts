import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAdminSession } from "../../auth/route";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const STATUSES = ["Bekliyor", "Onaylandı", "Reddedildi", "Teslim Edildi"] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();
  const status = body?.status;
  if (!status || !STATUSES.includes(status)) {
    return NextResponse.json({ error: "Geçersiz status" }, { status: 400 });
  }
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
