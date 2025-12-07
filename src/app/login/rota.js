/*
import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function GET() {
  try {
    const usuario = await pool.connect()
    const result = await usuario.query('SELECT * FROM conta')
    usuario.release()
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Erro listando alunos:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const {email, senha} = await request.json()
    const usuario = await pool.connect()
    await usuario.query(
      'INSERT INTO conta (email, senha) VALUES ($1, $2)',
      [email, senha]
    )
    usuario.release()
    return NextResponse.json({ status: 201 })
  } catch (error) {
    console.error('Error adding aluno:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
  */