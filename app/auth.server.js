import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import { mongoose } from "mongoose";
import bcrypt from "bcrypt";

// authentication
export const authenticator = new Authenticator(sessionStorage, {
  sessionErrorKey: "sessionErrorKey",
});

// create account
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let mail = form.get("mail");
    let password = form.get("password");

    if (!mail || mail?.length === 0) {
      return Promise.reject(new AuthorizationError("mail is required"));
    }

    if (!password || password?.length === 0) {
      return Promise.reject(new AuthorizationError("password is required"));
    }

    let user = await getAccount({ mail, password });
    if (!user) {
      throw new AuthorizationError("No user found");
    }
    return user;
  }),
  "user-pass"
);



authenticator.use(
  new FormStrategy(async ({ form }) => {
    const validation = {
      eventName: "your need to call your event a name",
      eventDate: "your need to give it a date",
      eventDescription: "your need tell us about the Event",
      location: "Give it a location",
    };

 
    for (const field in validation) {
      if (!form.get(field) || form.get(field).length === 0) {
        return Promise.reject(new AuthorizationError(validation[field]));
      }
    }
    // Henter værdierne fra formularen
    const eventName = form.get("eventName");
    const eventDate = form.get("eventDate");
    const eventDescription = form.get("eventDescription");
    const location = form.get("location");

    // Event oprettes og gemmes i databasen
    let event = await createEvent({
      eventName,
      eventDate,
      eventDescription,
      location,
    });
    return event;
  }),
  "create-event"
);


// Opretter event i databasen
async function createEvent({
  eventName,
  eventDate,
  eventDescription,
  location,
}) {
  const event = await mongoose.models.Event.create({
    eventName,
    eventDate,
    eventDescription,
    location,
  });
  return event;
}

//henter account fra databasen baseret på mail og password. verificere den
async function getAccount({ mail, password }) {
  const account = await mongoose.models.Account.findOne({ mail }).select(
    "+password"
  );
  if (!account) {
    throw new AuthorizationError("No account found");
  }

  const validPassword = await bcrypt.compare(password, account.password);
  if (!validPassword) {
    throw new AuthorizationError("Wrong password");
  }
  account.password = undefined; // Sørger for at password ikke sendes med til clientside
  return account;
}
