import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAdminSession } from "../auth/route";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function supabaseAdmin() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function GET(request: Request) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin().from("products").select("*").order("category").order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  if (!getAdminSession(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }
  const body = await request.json();
  const { name, description, price, category, image_url, featured } = body;
  if (!name || price == null || !category) {
    return NextResponse.json({ error: "name, price, category gerekli" }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin()
    .from("products")
    .insert({
      name,
      description: description ?? null,
      price: Number(price),
      category,
      image_url: image_url ?? null,
      featured: Boolean(featured),
    })
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
