import { createServerFn } from "@tanstack/react-start";

const GITHUB_OWNER = "BilalAlattar";
const GITHUB_REPO = "attarklusservice.nl";
const GALLERY_PATH = "src/assets/gallery";

export type GalleryFile = {
  name: string;
  sha: string;
  size: number;
  download_url: string;
};

function buildHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
    "User-Agent": "Attar-Gallery-Admin/1.0",
  };
}

function assertPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    throw new Error("Unauthorized");
  }
}

export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => d)
  .handler(async ({ data }) => {
    assertPassword(data.password);
    return { ok: true };
  });

export const listGalleryImages = createServerFn({ method: "GET" }).handler(
  async () => {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GALLERY_PATH}`,
      { headers: buildHeaders() }
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const files = (await res.json()) as GalleryFile[];
    return files.filter((f) => /\.(jpe?g|png|gif|webp|avif)$/i.test(f.name));
  }
);

export const uploadGalleryImage = createServerFn({ method: "POST" })
  .inputValidator(
    (d: { password: string; filename: string; content: string }) => d
  )
  .handler(async ({ data }) => {
    assertPassword(data.password);

    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GALLERY_PATH}/${data.filename}`;

    // Check if file already exists so we can include its SHA (required for updates)
    let sha: string | undefined;
    const checkRes = await fetch(url, { headers: buildHeaders() });
    if (checkRes.ok) {
      const existing = (await checkRes.json()) as { sha: string };
      sha = existing.sha;
    }

    const res = await fetch(url, {
      method: "PUT",
      headers: buildHeaders(),
      body: JSON.stringify({
        message: `chore: add gallery image ${data.filename}`,
        content: data.content,
        ...(sha ? { sha } : {}),
      }),
    });

    if (!res.ok) {
      const err = (await res.json()) as { message?: string };
      throw new Error(err.message ?? "Upload failed");
    }

    return { ok: true };
  });

export const deleteGalleryImage = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string; filename: string; sha: string }) => d)
  .handler(async ({ data }) => {
    assertPassword(data.password);

    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GALLERY_PATH}/${data.filename}`,
      {
        method: "DELETE",
        headers: buildHeaders(),
        body: JSON.stringify({
          message: `chore: remove gallery image ${data.filename}`,
          sha: data.sha,
        }),
      }
    );

    if (!res.ok) {
      const err = (await res.json()) as { message?: string };
      throw new Error(err.message ?? "Delete failed");
    }

    return { ok: true };
  });
