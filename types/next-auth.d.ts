import NextAuth from "next-auth";

declare module 'next-auth' {
  /** Returned by '
   *  useSession, getSession and rec
   */
  interface User {
    username: string
  }

  interface Session {
    user: User & {
      address: string
    }
    token: {
      username: string
    }
  }
}