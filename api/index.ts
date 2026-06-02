import serverEntry from "../dist/server/index.js";

export default async function handler(req, res) {
  const host = req.headers.host ?? "localhost";
  const url = new URL(req.url ?? "/", `https://${host}`);
  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
  });

  const response = await serverEntry.fetch(request);

  for (const [key, value] of response.headers.entries()) {
    if (value !== undefined) {
      res.setHeader(key, value);
    }
  }

  res.statusCode = response.status;
  const body = await response.arrayBuffer();
  res.end(Buffer.from(body));
}
