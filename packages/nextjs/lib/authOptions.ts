import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: "123" || process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      id: "worldcoin",
      name: "Worldcoin",
      credentials: {
        id: { label: "ID", type: "text" },
      },
      authorize: async credentials => {
        const user: any = { id: credentials?.id };
        return user || null;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
};
