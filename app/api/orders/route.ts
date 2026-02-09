import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: Request) {
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: "Supabase yapılandırılmamış" }, { status: 500 });
  }
  try {
    const body = await request.json();
    const { customer_name, contact_info, order_details, date_needed } = body;
    if (!customer_name || !contact_info) {
      return NextResponse.json({ error: "İsim ve iletişim gerekli" }, { status: 400 });
    }
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase
      .from("orders")
      .insert({
        customer_name,
        contact_info,
        order_details: order_details ?? {},
        date_needed: date_needed || null,
        status: "Bekliyor",
      })
      .select("id")
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ id: data?.id });
  } catch (e) {
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}
