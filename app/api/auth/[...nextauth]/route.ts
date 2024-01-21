import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prisma from '@/app/lib/prismaDb';

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error('email');
        }

        if (!user?.hashedPassword) {
          throw new Error('google');
        }

        if (!user.emailVerified) {
          // We can skip this step and add verification on dashbaord later
          throw new Error('not_confirmed');
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isPasswordCorrect) {
          throw new Error('password');
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true; // Allow sign-ins for other providers
    },
    async session({ session, token, user }) {
      if (token.sub) {
        const user = await prisma.user.findUnique({
          where: { id: token.sub },
        });
      }

      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  secret: process.env.SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
