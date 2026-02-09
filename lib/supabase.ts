import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!_client) _client = createClient(url, key);
  return _client;
}

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  featured?: boolean;
  created_at?: string;
};

export type Order = {
  id: string;
  customer_name: string;
  contact_info: string;
  order_details: Record<string, unknown>;
  status: "Bekliyor" | "Onaylandı" | "Reddedildi" | "Teslim Edildi";
  date_needed: string | null;
  created_at?: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at?: string;
};
