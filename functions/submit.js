// functions/submit.js
export async function onRequestPost(context) {
  try {
    // ここはGASのデプロイURL（/exec）に差し替え
    const GAS_URL = "https://script.google.com/macros/s/AKfycbzW2mWWkXcs-HOrevzDX4NYUcQ4xYV8XUH-f42InfxTyWq_5_khrEwDwb0QrmjWnwFb/exec";

    // クライアントからのJSONをそのままGASへ中継（ヘッダ付与しない＝プリフライト回避）
    const body = await context.request.text();
    const res  = await fetch(GAS_URL, { method: "POST", body });

    const txt  = await res.text(); // GAS側はJSON返却想定

    // 同一オリジン返却（CORSは念のため許可）
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
