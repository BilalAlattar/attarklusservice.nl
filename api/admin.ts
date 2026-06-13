type VercelRequest = { method?: string; body: any };
type VercelResponse = {
  status(code: number): VercelResponse;
  json(data: unknown): void;
  setHeader(k: string, v: string): void;
  end(): void;
};

const GITHUB_OWNER = "BilalAlattar";
const GITHUB_REPO = "attarklusservice.nl";
const GALLERY_PATH = "src/assets/gallery";

function ghHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    "User-Agent": "Attar-Gallery-Admin/1.0",
  };
}

function checkPassword(password: string): boolean {
  const expected = (process.env.ADMIN_PASSWORD ?? "").trim();
  return !!expected && password.trim() === expected;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body as Record<string, string>;
  const { action, password } = body ?? {};

  if (!checkPassword(password)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // ── list images ────────────────────────────────────
    if (action === "images") {
      const r = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GALLERY_PATH}`,
        { headers: ghHeaders() }
      );
      if (!r.ok) throw new Error(`GitHub ${r.status}`);
      const files = (await r.json()) as Array<{
        name: string;
        sha: string;
        size: number;
        download_url: string;
      }>;
      return res.json(
        files.filter((f) => /\.(jpe?g|png|gif|webp|avif)$/i.test(f.name))
      );
    }

    // ── upload image ───────────────────────────────────
    if (action === "upload") {
      const { filename, content } = body;
      const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GALLERY_PATH}/${filename}`;

      let sha: string | undefined;
      const check = await fetch(url, { headers: ghHeaders() });
      if (check.ok) {
        const existing = (await check.json()) as { sha: string };
        sha = existing.sha;
      }

      const r = await fetch(url, {
        method: "PUT",
        headers: ghHeaders(),
        body: JSON.stringify({
          message: `chore: add gallery image ${filename}`,
          content,
          ...(sha ? { sha } : {}),
        }),
      });
      if (!r.ok) {
        const err = (await r.json()) as { message?: string };
        throw new Error(err.message ?? "Upload failed");
      }
      return res.json({ ok: true });
    }

    // ── delete image ───────────────────────────────────
    if (action === "delete") {
      const { filename, sha } = body;
      const r = await fetch(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GALLERY_PATH}/${filename}`,
        {
          method: "DELETE",
          headers: ghHeaders(),
          body: JSON.stringify({
            message: `chore: remove gallery image ${filename}`,
            sha,
          }),
        }
      );
      if (!r.ok) {
        const err = (await r.json()) as { message?: string };
        throw new Error(err.message ?? "Delete failed");
      }
      return res.json({ ok: true });
    }

    return res.status(400).json({ error: "Unknown action" });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
