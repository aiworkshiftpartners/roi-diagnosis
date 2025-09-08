// functions/submit.js
export async function onRequestPost(context) {
  try {
    // ★最新のGAS Webアプリ（/exec）に必ず差し替えてください
    const GAS_URL = "https://script.google.com/macros/s/AKfycbyBZ1e3s3NGKY2Gsk_C_Y1Z70J-upd_7BGCa_qyPpyqWeUMFfbx2lDRWgkOIcWtCZU/exec";

    const body = await context.request.text();
    const res  = await fetch(GAS_URL, { method: "POST", body });

    const txt  = await res.text(); // GASはJSON返却想定

    return new Response(txt, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": context.request.headers.get("Origin") || "*",
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok:false, error:String(e) }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
