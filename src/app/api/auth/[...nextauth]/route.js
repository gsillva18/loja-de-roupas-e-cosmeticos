import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import pool from "@/lib/db";


async function getUserByEmail(email) {
    const client = await pool.connect();
    const res = await client.query(
        "SELECT id, nome, email, senha, role FROM cadastro WHERE email = $1",
        [email]
    );
    client.release();
    return res.rows[0] || null;
}

const authOptions = {
    session: { strategy: "jwt" },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            name: "Credenciais",
            credentials: {
                email: { label: "E-mail", type: "email" },
                senha: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {
                const { email, senha } = credentials;
                const user = await getUserByEmail(email);
                if (!user || !user.senha) return null;
                const ok = await compare(senha, user.senha);
                if (!ok) return null;
                return { id: user.id, name: user.nome, email: user.email, role: user.role };
            }
        })
    ],

    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (account && profile && !user) {
                const existing = await getUserByEmail(profile.email);
                if (existing) {
                    token.role = existing.role;
                    token.id = existing.id;
                    token.name = existing.nome;
                } else {
                    const client = await pool.connect();
                    const res = await client.query(
                        "INSERT INTO cadastro (nome, email, role) VALUES ($1, $2, $3) RETURNING id, role",
                        [profile.name ?? "Usuário", profile.email, "cliente"]
                    );
                    client.release();
                    token.id = res.rows[0].id;
                    token.role = res.rows[0].role;
                }
            }

            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.name = user.name;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.name = token.name ?? session.user.name;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login"
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions };