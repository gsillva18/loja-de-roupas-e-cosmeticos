import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const { nome, email, telefone, senha } = await request.json();

        if (!nome || !email || !senha) {
            return NextResponse.json(
                { error: "Nome, email e senha são obrigatórios" },
                { status: 400 }
            );
        }

        const client = await pool.connect();

        // Verifica se o email já existe
        const check = await client.query(
            "SELECT id_consumidor FROM consumidor WHERE email = $1",
            [email]
        );

        if (check.rows.length > 0) {
            client.release();
            return NextResponse.json(
                { error: "Email já cadastrado" },
                { status: 409 }
            );
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const insert = await client.query(
            `INSERT INTO consumidor (nome, email, senha, telefone, role)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id_consumidor`,
            [nome, email, senhaHash, telefone, "client"]
        );

        const id = insert.rows[0].id_consumidor;

        client.release();

        return NextResponse.json(
            { message: "Conta criada com sucesso", id },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erro ao criar conta:", error);
        return NextResponse.json(
            { error: "Erro interno ao criar conta", details: error.message },
            { status: 500 }
        );
    }
}
