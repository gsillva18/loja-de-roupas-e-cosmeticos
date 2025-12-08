'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import style from "./page.module.css";
import Produto from './components/Produto';
import BarraNavegacao from './components/BarraNavegacao';
import "./globals.css";

export default function ClientesProdutos() {

  const [produtos, setProdutos] = useState([]);
  const { data: session, status } = useSession();

  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria") || "all";

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const resp = await fetch(`/api/produto?categoria=${categoria}`);
        const data = await resp.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    carregarProdutos();
  }, [categoria]); 

  const route = useRouter();

  return (
    <div>

      <BarraNavegacao tela={"home"} usuario={status === "authenticated"} />

      <section className={style.promocao}>
        <h1>PROMOÇÃO <br /> DO DIA</h1>

        <section className={style.promocaonome}>
          <p>
            Perfume Ilía Secreto <br /> Feminino 50 ml <br /> De: R$ 185,00 <br /> Por: R$ 140,00
          </p>
          <div className={style.promoimg}>
            <img src="ilia.png" alt="" />
          </div>
        </section>
      </section>

      <section className={style.produtos}>
        <div className={style.produtoscards}>
          {produtos.length === 0 ? (
            <p>Nenhum produto encontrado.</p>
          ) : (
            produtos.map((p) => (
              <Produto key={p.id} produto={p} />
            ))
          )}
        </div>
      </section>

    </div>
  )
}
