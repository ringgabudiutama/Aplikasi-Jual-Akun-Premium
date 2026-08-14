import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "rifora_admin_session";
const SESSION_DAYS = 7;

function secretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET belum diset. Tambahkan di .env / Vercel Environment Variables."
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signAdminToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secretKey());
}

export async function verifyAdminToken(token: string | undefined | null) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}
