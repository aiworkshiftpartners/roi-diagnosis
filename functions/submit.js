// functions/submit.js
export async function onRequestPost(context) {
  try {
    // ← 最新のGAS Webアプリ（/exec）URLに差し替え
    const GAS_URL = "https://script.google.com/macros/s/AKfycbyyKFdF8aP7U8Hq-hANkbq9lX4AMyIi0fBQApwscPl-qcXQZ0I-kYSxGhqhtOuybv33/exec";

    const body = await context.request.text(); // ヘッダ付けずにそのまま転送（プリフライト回避）
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
