export async function onRequestPost(context) {
  try {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbwRewLckJixtssgG6CRMVzaOKjCGdjkB27Dwt8OVabktyAx31YZYLRsZYyCQD4-xswb/exec";
    const body = await context.request.text();
    const res  = await fetch(GAS_URL, { method:"POST", body });
    const txt  = await res.text();

    return new Response(txt, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": context.request.headers.get("Origin") || "*",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok:false }), {
      status: 500,
      headers: { "Content-Type":"application/json", "Access-Control-Allow-Origin":"*" },
    });
  }
}
