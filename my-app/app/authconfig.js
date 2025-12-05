
export const authConfig = {
    pages: {
        signIn: "/login",
    },
    providers: [],
    session: {
        strategy: "jwt",
    },
    trustHost: true, // Add this for Next.js 14
}
