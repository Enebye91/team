// import { authenticator } from "../auth.server";
// import { useLoaderData, useFetcher } from "./loader";
// import mongoose from "mongoose";

// // Kalder til databasen
// export async function loader({ request }) {
//   //authendication
//   const user = await authenticator.isAuthenticated(request, {
//     failureRedirect: "/login",
//   });
//   const userId = new mongoose.Types.ObjectId(user?._id);

//   return { user };
// }

// export default function Profile() {
//   const { user } = useLoaderData(); // Brug afstrukturopdeling til at hente brugeroplysninger fra brugerens data
//   const fetcher = useFetcher(); // Brug af useFetcher hook

//   return (
//     <>
//       <h1 className="text-3xl font-bold mb-4">Din profil</h1>{" "}
//       {/* Overskrift med brug af tailwind CSS klasser */}
//       <section className="mb-8">
//         <p className="text-lg">Navn: {user?.name}</p> {/* Vis brugerens navn */}
//         <p className="text-lg">Email: {user?.mail}</p>{" "}
//         {/* Vis brugerens email-adresse */}
//       </section>
//       <section>
//         <div>
//           <form method="post">
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               Log ud
//             </button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

// export async function action({ request }) {
//   const user = await authenticator.isAuthenticated(request, {
//     failureRedirect: "/login",
//   });
// }

// import { authenticator } from "../auth.server";
// import { useLoaderData, useFetcher } from "./loader";
// import mongoose from "mongoose";

// export async function loader({ request }) {
//   try {
//     // Authenticating user
//     const user = await authenticator.isAuthenticated(request, {
//       failureRedirect: "/login",
//     });

//     return { user };
//   } catch (error) {
//     console.error("Error loading user data:", error);
//     throw new Error("Failed to load user data");
//   }
// }

// export default function Profile() {
//   const { user } = useLoaderData(); // Brug afstrukturopdeling til at hente brugeroplysninger fra brugerens data
//   const fetcher = useFetcher(); // Brug af useFetcher hook

//   const handleLogout = async () => {
//     try {
//       await fetcher.logout(); // Brug af fetcher til at logge brugeren ud
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   return (
//     <>
//       <h1 className="text-3xl font-bold mb-4">Din profil</h1>{" "}
//       {/* Overskrift med brug af tailwind CSS klasser */}
//       <section className="mb-8">
//         <p className="text-lg">Navn: {user?.name}</p> {/* Vis brugerens navn */}
//         <p className="text-lg">Email: {user?.mail}</p>{" "}
//         {/* Vis brugerens email-adresse */}
//       </section>
//       <section>
//         <div>
//           <form onSubmit={handleLogout}>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Log ud
//             </button>
//           </form>
//         </div>
//       </section>
//     </>
//   );
// }

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
        <p className="text-lg">Navn: {user?.name}</p> {/* Vis brugerens navn */}
        <p className="text-lg">Email: {user?.mail}</p>{" "}
        {/* Vis brugerens email-adresse */}
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
