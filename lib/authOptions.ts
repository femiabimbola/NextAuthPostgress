import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from 'bcrypt';



export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login'
  },
  adapter: PrismaAdapter(db),
  // The session is not compulsory
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: 'jwt',
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: '' },
        password: { label: 'Password', type: "password" },
        // username: { label: "Username", type: 'text', placeholder: 'Enter a username' },
      },
      //  The login logic
      async authorize(credentials) {

        // Check to see if email or password is typed 
        if (!credentials?.email || !credentials?.password) {
          // throw new Error('missing field')
          console.log('missing field')
        }

        // Check to see if user exists
        const user = await db.user.findUnique({
          where: { email: credentials?.email }
        });

        if (!user || !user?.password) {
          console.log('no user')
          // throw new Error(' No user found')
        }
        //  Check if the password matches 
        const passwordMatch = await compare(credentials?.password, user?.password)

        // if password does not match
        if (!passwordMatch) throw new Error('incorrect password')

        console.log(`id: ${user?.id}, username: ${user?.username}, email: ${user?.email}`)

        return { id: user?.id, username: user?.username, email: user?.email };
      }
    }),
  ],

  callbacks: {
    // without next-auth.d.ts
    async jwt({ token, user }) {
      if (user) return { ...token, username: user.username }
      return token
    },

    async session({ session, user, token }) {
      return { ...session, user: { ...session.user, username: token.username } }
    }
  }
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  // Treat the getServerSession as a type of sessioninterface
  return session;
}

