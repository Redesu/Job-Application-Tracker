import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            profile(profile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name || profile.login,
                    username: profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                    githubProfile: profile.html_url,
                    rawProfile: profile
                };
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/handle-github-login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        githubId: profile.id,
                        login: profile.login,
                        name: profile.name || profile.login,
                        avatarUrl: profile.avatar_url,
                        profileUrl: profile.html_url,
                        accessToken: account.access_token
                    })
                });
                if (!response.ok) throw new Error('Backend user handling failed');
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})