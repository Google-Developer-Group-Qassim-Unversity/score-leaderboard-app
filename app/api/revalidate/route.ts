import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

export const dynamic = "force-dynamic";

function authorize(req: Request): boolean {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return false;

  const header = req.headers.get("authorization");
  if (!header || !header.startsWith("Bearer ")) return false;

  const token = header.slice("Bearer ".length);
  const secretBuf = Buffer.from(secret);
  const tokenBuf = Buffer.from(token);
  if (secretBuf.length !== tokenBuf.length || secretBuf.length === 0) return false;

  return timingSafeEqual(secretBuf, tokenBuf);
}

export async function POST(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Tags are applied in lib/api/api.ts. Callers may target a single resource
    // (?tag=members) to avoid flushing everything; with no tag, flush all.
    const requested = new URL(req.url).searchParams.get("tag");
    const tags = requested ? [requested] : ["members", "departments", "events", "semesters"];

    for (const tag of tags) {
      revalidateTag(tag);
    }
    revalidatePath("/", "layout");

    return NextResponse.json({ ok: true, revalidated: tags, at: Date.now() });
  } catch (error) {
    console.error("Revalidation failed:", error);
    return NextResponse.json({ ok: false, error: "Revalidation failed" }, { status: 500 });
  }
}
