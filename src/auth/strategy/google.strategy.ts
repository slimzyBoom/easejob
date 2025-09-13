import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../../user/users.schema";
import { generateTokens } from "../auth.service";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL as string;

passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    async (accessToken: string, refreshtoken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const email = profile.emails?.[0].value;
        const user = await User.findOne({ email }).select("-password").lean();
        if (!user) {
          const newUser = await User.create({
            fullname: profile.displayName,
            email,
          });
          return done(null, { hasRole: false, credentials: newUser });
        }
        if (!user.role) {
          return done(null, { hasRole: false, credentials: user });
        }

        const tokens = generateTokens({ id: user._id, role: user.role });
        done(null, { credentials: user, tokens, hasRole: true });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
