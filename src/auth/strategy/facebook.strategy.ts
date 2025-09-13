import passport from "passport";
import {
  Strategy as FacebookStrategy,
  Profile,
  VerifyFunction,
} from "passport-facebook";
import { User } from "../../user/users.schema";
import { generateTokens } from "../auth.service";
const CLIENT_ID = process.env.FACEBOOK_CLIENT_ID as string;
const CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET as string;
const CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL as string;

passport.use(
  new FacebookStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
      profileFields: ["email", "displayName"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      try {
        console.log(profile);
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
