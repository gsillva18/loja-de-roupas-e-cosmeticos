'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import BarraNavegacao from '@/app/components/BarraNavegacao';
import style from "./page.module.css";

export default function ProdutoBlusa() {

    const route = useRouter()

    const [produtos, setProdutos] = useState(null)

    const { id } = useParams()
    const [cor, setCor] = useState(null)
    const [tamanho, setTamanho] = useState(null)
    const [quantidade, setQuantidade] = useState(0)

    useEffect(() => {
        console.log("Chegou aqui")
        carregarProduto();
    }, [id]);

    const carregarProduto = async () => {
        try {
            const res = await fetch(`/api/produto/${id}`);
            if (!res.ok) throw new Error("Erro ao carregar produto");

            const dados = await res.json();

            const caracteristicas =
                typeof dados.caracteristicas === "string"
                    ? JSON.parse(dados.caracteristicas)
                    : (dados.caracteristicas ?? {});

            setProdutos({ ...dados, caracteristicas });

            setCor(caracteristicas?.cores?.[0] ?? null);
            setTamanho(caracteristicas?.tamanhos?.[0] ?? null);
            setQuantidade(1);

            console.log(dados)
            console.log(caracteristicas)
        } catch (error) {
            console.error("Erro:", error);
            setErro("Não foi possível carregar o produto. Tente novamente mais tarde.");
        }
    };


    const adicionarAoCarrinho = async () => {
        alert(`
      Produto adicionado ao carrinho
    `)
    }

    if (!produtos) {
        return (
            <div>
                <BarraNavegacao tela={"produto"} />
                <p style={{ padding: 20 }}>Carregando...</p>
            </div>
        );
    }

    return (
        <div>
            <BarraNavegacao tela={"produto"} />
            <header className={style.header}>
                <div className={style.pesquisar}>
                    <div className={style.produtoPage}>

                        <div className={style.produtoImagem}>
                            <img src={produtos.imagem} alt={produtos.nome} width={200} />
                        </div>

                        <div className={style.produtoInfo}>
                            <h2>{produtos.nome}</h2>
                            <p><strong>R$ {produtos.preco}</strong></p>

                            <div className={style.opcoes}>

                                <div className={style.campo}>
                                    <span>Cor:</span>
                                    {(produtos?.caracteristicas?.cores ?? []).map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setCor(c)}
                                            aria-pressed={cor === c}
                                            className={cor === c ? style.colorSelected : style.colorButton}
                                            style={{ backgroundColor: c }}
                                        ></button>
                                    ))}
                                </div>


                                <div className={style.campo}>
                                    <span>Tamanho:</span>
                                    {(produtos?.caracteristicas?.tamanhos ?? []).map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setTamanho(t)}
                                            className={`${style.tamanhoOpcao} ${tamanho === t ? style.tamanhoSelected : ''}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>

                                <div className={style.campo}>
                                    <span>Quantidade:</span>
                                    <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}>-</button>
                                    <span>{quantidade}</span>
                                    <button onClick={() => setQuantidade(q => q + 1)}>+</button>
                                </div>
                            </div>

                            <button className={style.botaoCarrinho} onClick={adicionarAoCarrinho}>
                                Adicionar ao carrinho
                            </button>
                        </div>

                    </div>
                </div>
            </header>
        </div>
    )
}