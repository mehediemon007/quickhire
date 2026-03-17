import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: `${process.env.API_URL}/auth/google/callback`,
            passReqToCallback: true

        },
        async (req, _accessToken, _refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if(!email) return done(new Error("No email from Google"), undefined);

                const role = (req.query.state as string) ?? null;
                const validROles = ["employee", "organization"];
                const assignROle = validROles.includes(role) ? role : "";

                let user = await User.findOne({ email });

                if(user) {
                    if(user.provider === "local"){
                        user.provider = "google";
                        user.providerId = profile.id;
                        await user.save();
                    }

                    return done(null, user);
                }

                if (!user) {
                    if (!assignROle) {
                        return done(null, false, { message: "Account not found. Please sign up first." });
                    }

                    user = await User.create({
                        fullname: profile.displayName,
                        email,
                        provider: "google",
                        providerId: profile.id,
                        avatar: profile.photos?.[0]?.value,
                        role: assignROle,
                        isProfileComplete: !!assignROle,
                    });
                }

                return done(null, user)
            } catch ( error) {
                return done(error as Error, undefined)
            }
        } 
    )
)

export default passport;