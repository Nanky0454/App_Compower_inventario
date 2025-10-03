import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase/SupabaseClient";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { cc, presupuesto } = await request.json();
    if (!cc || typeof presupuesto !== "number") {
      return new Response(JSON.stringify({ error: "Datos incompletos" }), { status: 400 });
    }
    const { data, error } = await supabase
    .from("presupuesto_cc")
    .update({ presupuesto })
    .eq("cc", cc);
    if (error) {
      return new Response(JSON.stringify({ error: "Error guardando presupuesto" }), { status: 500 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Error en el servidor" }), { status: 500 });
  }
};

export async function listCC(){
  const { data, error } = await supabase
    .from("centro_costo")
    .select("*")
    .order("codigo", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}
