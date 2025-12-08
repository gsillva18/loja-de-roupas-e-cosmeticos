import { NextResponse } from 'next/server';
import pool from "@/lib/db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get("categoria") || "all";

    try {
        const client = await pool.connect();

        let query = `
      SELECT DISTINCT ON (p.id_produto)
        p.id_produto AS id,
        p.nome,
        p.preco,
        p.promocao,
        COALESCE(i.url_img, '') AS srcImage,
        c.nome AS categoria
      FROM produto p
      LEFT JOIN produto_imagem i
          ON p.id_produto = i.id_produto
      LEFT JOIN categoria c
          ON p.id_categoria = c.id_categoria
    `;

        let sqlParams = [];

        if (categoria !== "all") {
            query += `WHERE LOWER(c.nome) = LOWER($1)`;
            sqlParams.push(categoria);
        }

        query += ` ORDER BY p.id_produto, i.id_imagem ASC`;

        const res = await client.query(query, sqlParams);
        client.release();

        const produtos = res.rows.map(p => ({
            id: p.id,
            srcImage: p.srcimage || "/default.png",
            alt: p.nome,
            nome: p.nome,
            preco: `R$ ${Number(p.preco).toFixed(2).replace('.', ',')}`,
            promocao: p.promocao,
            categoria: p.categoria
        }));

        return NextResponse.json(produtos, { status: 200 });

    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return NextResponse.json(
            { error: "Erro ao listar produtos", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            id_categoria,
            nome,
            preco,
            estoque,
            caracteristicas,
            promocao,
            imagens
        } = body;

        const client = await pool.connect();
        await client.query("BEGIN");

        const insertProduto = `
      INSERT INTO produto
      (id_categoria, nome, preco, estoque, caracteristicas, promocao)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_produto
    `;

        const result = await client.query(insertProduto, [
            id_categoria,
            nome,
            preco,
            estoque,
            caracteristicas,
            promocao
        ]);

        const id_produto = result.rows[0].id_produto;

        if (imagens && imagens.length > 0) {
            const sqlImg = `
        INSERT INTO produto_imagem (id_produto, url_img)
        VALUES ($1, $2)
      `;
            for (const url of imagens) {
                await client.query(sqlImg, [id_produto, url]);
            }
        }

        await client.query("COMMIT");
        client.release();

        return NextResponse.json(
            {
                success: true,
                message: "Produto salvo!",
                id_produto
            },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao salvar produto", details: error.message },
            { status: 500 }
        );
    }
}
