// functions/submit.js
export async function onRequestPost(context) {
  try {
    // ← ここに「いま使っている最新の GAS /exec」をコピペ
    const GAS_URL = "https://script.google.com/macros/s/AKfycbwEIHiqqsvL1SLTyDxBjhw7SKE6NRM3wKKPBuXQwfhqW4RI0BGbXzq1UZ5MTjPignF1/exec";

    // クライアントのJSONをそのままGASへ中継（ヘッダ不要 → プリフライト回避）
    const body = await context.request.text();
    const res  = await fetch(GAS_URL, { method: "POST", body });

    const txt  = await res.text(); // GASの返答（JSON想定）

    // 同一オリジンで返すのでCORS不要（念のため許可も付けておく）
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