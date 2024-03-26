
import { authenticator } from "../auth.server";
import { useLoaderData } from "@remix-run/react";
import { Form } from "@remix-run/react";
// import mongoose from "mongoose";

// Kalder til databasen for at hente brugeroplysninger
export async function loader({ request }) {
  //authendication
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return { user };
}

export default function Profile() {
  const { user } = useLoaderData(); // Brug afstrukturopdeling til at hente brugeroplysninger fra brugerens data

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Din profil</h1>{" "}
      <section className="mb-8">
        <p className="text-lg">Navn: {user?.name}</p> 
        <p className="text-lg">Email: {user?.mail}</p>{" "}

      </section>
      <section>
        <div>
          <Form method="post">
            <button>Logout</button>
          </Form>
        </div>
      </section>
    </>
  );
}

export async function action({ request }) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return await authenticator.logout(request, { redirectTo: "/login" });
}
