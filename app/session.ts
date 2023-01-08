import { createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",

      secure: process.env.NODE_ENV === "production",
      secrets: [sessionSecret],
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
    },
  });

function getUserSession(request: Request) {
  return getSession(request.headers.get("Cookie"));
}

export { getSession, commitSession, destroySession, getUserSession };
