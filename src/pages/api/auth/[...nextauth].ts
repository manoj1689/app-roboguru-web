// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        authorization: {
          params: {
            scope: 'email', // Request the email scope
          },
        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
        // Ensure that after sign-in, user is redirected to the correct page
        return baseUrl + '/'; // Custom redirect to Dashboard
      },
    
    // Called when a JWT is created or updated
    async jwt({ token, account, user }) {
      if (account && user) {
        token.access_token = account.access_token;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    // Called whenever the session is checked
    async session({ session, token }) {
      // Type assertions for TypeScript
      session.access_token = token.access_token as string | undefined;
      session.email = token.email as string | undefined;
      session.name = token.name as string | undefined;
      return session;
    },
  },
});
