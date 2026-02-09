import { getSupabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .limit(3)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as Product[];
}

export async function getProductsByCategory(category?: string): Promise<Product[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  let query = supabase.from("products").select("*").order("category").order("name");
  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  if (error) return [];
  return (data ?? []) as Product[];
}
