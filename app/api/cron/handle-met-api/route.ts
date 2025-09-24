import { createClient } from "@supabase/supabase-js";

export async function GET() {
  // no one can spam access like an idiot
  // NO ONE! [in future]
  //   const authHeader = req.headers.get("authorization");
  //   if (authHeader !== `Bearer ${process.env.API_SECRET!}`) {
  //     return new Response("Unauthorized", { status: 401 });
  //   }
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  //   what it does is to invoke my edge function at supabase
  // this funct parses data from met api, cleans it up a bit
  // then stuffs em in gallery db
  const { data, error } = await supabase.functions.invoke("handle-met-api", {
    body: JSON.stringify({ hasImages: true }),
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ status: "ok", data });
}
