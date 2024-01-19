import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../../lib/db";
import Users from "../../../../model/Users";
import jwt from "jsonwebtoken";

const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connectDB();
        try {
          const user = await Users.findOne({ email: credentials.email });
          let token = "";
          //   if (user) {
          const isPasswordCorrect =
            (await credentials.password) === user.password;
          if (isPasswordCorrect) {
            // console.debug({user})
            token = await jwt.sign(
              { userId: user._id, email: user.email },
              "JWT-SCERET",
              { expiresIn: "1h" }
            );
            user.name = "ms";
            const userData = { token, user };
            console.log({ userData });

            return userData;
          }
          //   }
          return { user, token } as any;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      console.debug({ token, userMS: user });
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }: any) {
      console.debug({ session, msToken: token });

      return { ...session, ...token };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: "JWT_SECRET",
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
