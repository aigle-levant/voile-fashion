export async function GET() {
  console.log("Function invoked!");
  const res = await fetch(
    "https://jglngbvclcdemvgrryvj.supabase.co/functions/v1/handle-met-api",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hasImages: true }),
    }
  );

  if (!res.ok) {
    return Response.json({ error: await res.text() }, { status: res.status });
  }

  const data = await res.json();
  console.log(data);
  return Response.json({ status: "ok", data });
}
