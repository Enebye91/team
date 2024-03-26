import { useState } from "react";
import { Form } from "@remix-run/react";
import { mongoose } from "mongoose";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";

export default function CreateAccount() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section>
      <div>
        <h1>Create your account</h1>
      </div>

      <Form method="post">
        <div>
          <input
            name="mail"
            id="mail"
            required
            type="mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Your Email"
          />
        </div>
        <div>
          <input
            name="password"
            id="password"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Choose a password"
          />
        </div>

        <div>
          <button type="submit">Create</button>
          <Link to="/login">No thanks </Link>
        </div>
      </Form>
    </section>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const newAccount = Object.fromEntries(formData);

  try {
    await mongoose.models.Account.create(newAccount);

    return redirect("/login");
  } catch (error) {
    console.error("Error", error.message);
    return redirect("/error");
  }
}
