import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      console.log("INSIDE OF THE SESSION CALLBACK", session);
      const sessionUser = { ...session.user, ...user };
      console.log("INSIDE OF THE SESSION CALLBACK ADD user", sessionUser);

      return Promise.resolve({
        ...session,
        user: sessionUser,
      });
    },
  },
});
