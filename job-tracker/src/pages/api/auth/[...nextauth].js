import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {

            if(account){
                token.accessToken = account.access_token;
                token.user = profile;
                token.username = profile.login;
            
            }
            return token
            
        }     
    },
    secret: process.env.NEXTAUTH_SECRET,
})