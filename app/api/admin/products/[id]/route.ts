import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAdminSession } from "../../auth/route";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const { id } = await params;
  const { error } = await createClient(supabaseUrl, supabaseServiceKey)
    .from("products")
    .delete()
    .eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
