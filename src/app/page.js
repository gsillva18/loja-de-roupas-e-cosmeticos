'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import style from "./page.module.css";
import Produto from './components/Produto';
import BarraNavegacao from './components/BarraNavegacao';
import "./globals.css";

export default function ClientesProdutos() {
  const [produtos] = useState(
    [
      { id: 1, srcImage: "blusamangalonga.png", alt: "Blusa Manga Longa", nome: "Blusa Manga Longa", preco: "R$ 34,99" },
      { id: 2, srcImage: "vestidoinfantilmidi.png", alt: "Vestido Infantil Midi", nome: "Vestido Infantil Midi", preco: "R$ 49,99" },
      { id: 3, srcImage: "calcacargojeans.png", alt: "Calça Cargo Jeans", nome: "Calça Cargo Jeans", preco: "R$ 99,99" },
      { id: 4, srcImage: "meiasunissex.png", alt: "Meias Unissex", nome: "Meias Unissex", preco: "R$ 9,99" },
      { id: 5, srcImage: "ilia.png", alt: "Perfume Ilía Secreto Feminino", nome: "Perfume Ilía Secreto Feminino", preco: "R$ 140,00" },
      { id: 6, srcImage: "semicropped.png", alt: "Semi Cropped", nome: "Semi Cropped", preco: "R$ 19,99" },
      { id: 7, srcImage: "colonialuna.png", alt: "Deo Colônia Luna", nome: "Deo Colônia Luna - Natura 75ml", preco: "R$ 119,99" },
      { id: 8, srcImage: "petitattitude.png", alt: "Petit Attitude Bee 50 ml - Avon", nome: "Petit Attitude Bee 50ml - Avon", preco: "R$ 39,99" },
      { id: 9, srcImage: "parfumuna.png", alt: "Deo Parfum Una Brilho 75ml - Natura", nome: "Deo Parfum Una Brilho 75ml - Natura", preco: "R$ 199,99" },
      { id: 10, srcImage: "coloniakaiak.png", alt: "Kaiak Colônia Masculino 100ml - Natura", nome: "Kaiak Colônia Masculino 100ml - Natura", preco: "R$ 131,99" },
    ]);

  const [barra] = useState('');
  const [menuSuperior] = useState('');
  const [menuDeCategorias] = useState('');
  const [carrinho] = useState('');
  const [promocao] = useState('');
  const [pagamento] = useState('');
  const [contato] = useState('');

  const route = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/autenticacao/criarconta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barra, menuSuperior, menuDeCategorias, carrinho, promocao, produtos, pagamento, contato })
      })

      if (response.ok) {
        const data = await response.json()
        const id = data.id
        route.push(`/perfil/${id}`)
      } else {
        const errorData = await response.json()
        alert(`Erro ao fazer compra: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Erro ao fazer compra:', error)
      alert('Erro de conexão com o servidor.')
    }
  }

  return (
    <div>

      <BarraNavegacao tela= {"home"} />
      
      <section className={style.promocao}>
        <h1>PROMOÇÃO <br></br> DO DIA</h1>
        <section className={style.promocaonome}>
          <p>
            Perfume Ilía Secreto <br></br> Feminino 50 ml <br></br> De: R$ 185,00 <br></br> Por: R$ 140,00
          </p>
          <div className={style.promoimg}>
            <img src="ilia.png" alt="" />
          </div>
        </section>
      </section>

      <section className={style.produtos}>
        <div className={style.produtoscards}>
          {
            produtos.map((p) =>
              (<Produto key={p.id} produto={p} />))
          }
        </div>
      </section>

    </div>
  )
}
