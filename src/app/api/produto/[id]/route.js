import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function GET(request, { params }) {

  const resolvedParams = params && typeof params.then === 'function' ? await params : params;
  const { id } = resolvedParams || {};

  let client;

  try {
    client = await pool.connect();
    const produtoId = parseInt(id, 10);

    if (isNaN(produtoId)) {
      console.error('ID inválido:', id);
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const result = await client.query(`
      SELECT DISTINCT ON (p.id_produto)
        p.id_produto AS id,
        p.nome,
        p.preco,
        p.promocao,
        p.caracteristicas,
        COALESCE(pi.url_img, '') AS imagem
      FROM produto p
      LEFT JOIN produto_imagem pi
        ON p.id_produto = pi.id_produto
      WHERE p.id_produto = $1
      ORDER BY p.id_produto, pi.id_imagem ASC;
    `, [produtoId]);

    const produto = result.rows[0];

    if (!produto) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    return NextResponse.json(produto);

  } catch (error) {
    console.error('Erro ao consultar o banco de dados ou outro erro:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (client) {
      try {
        client.release();
      } catch (releaseError) {
        console.error('Erro ao liberar cliente do pool:', releaseError);
      }
    }
  }
}
