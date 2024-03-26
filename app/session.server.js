import { createCookieSessionStorage } from "@remix-run/node";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "event-session",
    secrets: ["build-ui-secret"],

    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: process.env.Node_ENV === "production",
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage; 