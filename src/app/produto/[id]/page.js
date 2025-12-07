'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import BarraNavegacao from '@/app/components/BarraNavegacao';
import style from "./page.module.css";

export default function ProdutoBlusa() {

    const route = useRouter()

    // ------- MOCK DO PRODUTO  -------
    const [produtos, setProdutos] = useState({
        id: 1,
        nome: "Blusa Manga Longa",
        preco: "30,00",
        tipo: "blusa",
        imagem_url: "https://images.tcdn.com.br/img/img_prod/746427/blusa_manga_longa_canelada_com_detalhe_de_botao_na_manga_2747_1_e1f97e83e48b23785b238bbeed077af2_20230523113510.jpg",
        cores: ["#000000ff"],
        tamanhos: ["P", "M", "G"]
    })

    const { id } = useParams()
    //const [produtos, setProdutos ] = useState(null)
    //const [cor, setCor] = useState('')
    //const [tamanho, setTamanho] = useState('')
    //const [quantidade, setQuantidade] = useState(1)
    const [cor, setCor] = useState(produtos.cores[0])
    const [tamanho, setTamanho] = useState(produtos.tamanhos[0])
    const [quantidade, setQuantidade] = useState(1)


    const adicionarAoCarrinho = async () => {
        alert(`
      PRODUTO ADICIONADO
      Nome: ${produtos.nome}
      Cor: ${cor}
      Tam: ${tamanho}
      Quantidade: ${quantidade}
    `)
    }

    return (
        <div>
            <BarraNavegacao tela={"produto"} />
            <header className={style.header}>
                <div className={style.pesquisar}>
                    <div className={style.produtoPage}>

                        <div className={style.produtoImagem}>
                            <img src={produtos.imagem_url} alt={produtos.nome} width={200} />
                        </div>

                        <div className={style.produtoInfo}>
                            <h2>{produtos.nome}</h2>
                            <p><strong>R$ {produtos.preco}</strong></p>

                            <div className={style.opcoes}>

                                <div className={style.campo}>
                                    <span>Cor:</span>
                                    {produtos.cores.map(c => (
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
                                    {produtos.tamanhos.map(t => (
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