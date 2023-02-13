import NextAuth, { Awaitable, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Auth0Provider from "next-auth/providers/auth0";

const secret = process.env.NEXTAUTH_SECRET;

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any | null> {
        const response = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              accessToken: "access_token",
              refreshToken: "refresh_token",
              expiredIn: "expired_in",
            });
          }, 1000);
        });

        const token = await response;

        if (token) {
          // Any object returned will be saved in `user` property of the JWT
          return token;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        const userProfile = await new Promise((resolve) =>
          setTimeout(
            () => resolve({ id: "2", email: "a@a.com", first_name: "John" }),
            1000
          )
        );
        token = { ...token, ...user };
        token.user = userProfile;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user = token.user as User;

      return session;
    },
  },
};

export default NextAuth(authOptions);
