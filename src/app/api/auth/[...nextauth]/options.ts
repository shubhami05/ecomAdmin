
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '../../../../lib/db'
import type { Adapter } from 'next-auth/adapters'
export const authOptions: NextAuthOptions = {
    providers: [
        // OAuth authentication providers...
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
    ],
    adapter:MongoDBAdapter(clientPromise) as Adapter
}