import { useLoaderData, Link } from "@remix-run/react";
import { authenticator } from "../auth.server";
import { sessionStorage } from "../session.server";
import { Form } from "@remix-run/react";
import { json } from "@remix-run/node";

export async function loader({ request }) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/profile",
  });

  // Modtager error message
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  // Get the error message
  const error = session.get("sessionErrorKey");
  session.unset("sessionErrorKey");

  const headers = new Headers({
    "Set-Cookie": await sessionStorage.commitSession(session),
  });

  return json({ error }, { headers });
}

export default function Login() {
  const loaderData = useLoaderData();

  return (
    //
    <section>
      <h1>Login</h1>
      <Form method="post">
        <input placeholder="email" name="mail" type="email" />
        <input placeholder="password" name="password" type="password" />

        <Link to="/profile">Login </Link>
        <Link to="/create_account">Create account</Link>
      </Form>
      <div>
        <p>{loaderData?.error ? <p>{loaderData?.error?.message}</p> : null}</p>
      </div>
    </section>
  );
}

export async function action({ request }) {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/profile",
    failureRedirect: "/login",
  });
}
