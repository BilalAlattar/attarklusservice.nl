// @ts-ignore
import serverEntry from "../dist/server/index.js";

export default async function handler(req: any, res: any) {
  const host = req.headers.host ?? "localhost";
  const url = new URL(req.url ?? "/", `https://${host}`);
  
  // تحويل طلب Vercel إلى Request قياسي
  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers as HeadersInit,
    // معالجة الجسم (Body) فقط إذا لم تكن الأساليب GET أو HEAD
    body: req.method === "GET" || req.method === "HEAD" ? undefined : (req as any),
  });

  try {
    const response = await serverEntry.fetch(request, undefined, undefined);

    // نسخ الـ Headers من استجابة الخادم إلى Vercel هذا هو التعديل الاخير
    for (const [key, value] of response.headers.entries()) {
      if (value !== undefined) {
        res.setHeader(key, value);
      }
    }

    res.statusCode = response.status;
    const body = await response.arrayBuffer();
    res.end(Buffer.from(body));
  } catch (error) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: "Internal Server Error", details: String(error) }));
  }
}
