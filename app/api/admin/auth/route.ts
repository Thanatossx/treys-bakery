import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";

export async function POST(request: Request) {
  const { password } = (await request.json()) as { password?: string };
  const configured = process.env.ADMIN_PASSWORD?.trim();
  if (!configured) {
    return NextResponse.json({ error: "Admin şifresi yapılandırılmamış" }, { status: 500 });
  }
  if (String(password ?? "").trim() === configured) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    return res;
  }
  return NextResponse.json({ error: "Yanlış şifre" }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}

export function getAdminSession(request: Request): boolean {
  const cookie = request.headers.get("cookie") ?? "";
  return cookie.includes("admin_session=1");
}
