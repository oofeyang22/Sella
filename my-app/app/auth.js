// lib/auth.js
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import { authConfig } from './authconfig'
import { connectToDB } from './lib/utils'
import { User } from './lib/models'
import bcrypt from 'bcrypt'



const login = async (credentials) => {
    await connectToDB()

    const user = await User.findOne({ username: credentials.username })
    if (!user) return null

    // If passwords are NOT hashed in DB
    const isPasswordCorrect = credentials.password === user.password

    if (!isPasswordCorrect) return null

    return {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
    }
}


export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                
                const user = await login(credentials);
                return user;
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            if (user){
                token.username = user.username;
                token.img = user.img;
            }
            return token;
        },
        async session({session, token}){
            if (token){
                session.user.username = token.username;
                session.user.img = token.img;
            }
            return session;
        }
    }
})