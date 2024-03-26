import { mongoose } from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

// Accounts
const accountSchema = new Schema({
  mail: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Events
const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  eventDate: {
    type: Date,
    required: true,
  },
});

// Hashing og salting af adgangskoden før gemning i databasen
accountSchema.pre("save", async function (next) {
  const Account = this;

  if (!Account.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(6);
  Account.password = await bcrypt.hash(Account.password, salt);
  next();
});

// // Opretter en model
export const Account = mongoose.model("Account", accountSchema);
export const Event = mongoose.model("Event", eventSchema);

// Definition af modelnavn, skema og tilknyttet samling
export const models = [
  {
    name: "Account",
    schema: accountSchema,
    collection: "accounts",
  },
  {
    name: "Event",
    schema: eventSchema,
    collection: "events",
  },
];
