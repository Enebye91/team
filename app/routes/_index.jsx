import { Link } from "@remix-run/react";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    //Server side rendering
    <section style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Team A</h1>
      <div>
        <Link to="/event_page">
          <button
            type="submit"
            className="w-aut border-width: 1px border-gray-200"
          >
            Events
          </button>
        </Link>
        <Link to="/login">
          Login
        </Link>
      </div>
    </section>
  );
}
