import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { envVars } from "./env";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_ID,
      callbackURL: envVars.GOOGLE_CLIENT_ID,
    },
    () => {}
  )
);
