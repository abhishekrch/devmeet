import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { schema } from "@/db";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}

export const authConfig = {
    adapter: DrizzleAdapter(db),
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.NEXTT_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXTT_GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            const dbUser = await db
                .select()
                .from(schema.users)
                .where(eq(schema.users.email, token.email as string))
                .limit(1)
                .then(rows => rows[0]);

            if (!dbUser) {
                throw new Error("no user with email found");
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
        async session({ token, session }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                };
            }

            return session;
        },
    },
} satisfies AuthOptions;

export function getSession() {
    return getServerSession(authConfig);
}