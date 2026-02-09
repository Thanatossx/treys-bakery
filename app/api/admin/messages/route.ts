import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAdminSession } from "../auth/route";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function GET(request: Request) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const { data, error } = await createClient(supabaseUrl, supabaseServiceKey)
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}
