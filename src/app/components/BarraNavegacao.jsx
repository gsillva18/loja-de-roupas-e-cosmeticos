'use client'

import React from "react";
import style from "./styles.module.css";

export default function BarraNavegacao(props) {

    return (
        <div>
            <header className={style.header}>

                <img src="/logo da loja.png" alt="J&G" width={70} height={70} />
                {props.tela === "home" ? (
                    <div className={style.pesquisar}>
                        <input type="text" placeholder="" />
                        <span className={style.imagempesquisa}>

                            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                                <path d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
                                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                    </div>
                ) : null}


                <div className={style.header1}>
                    <button className={style.iconeBotao} aria-label="Carrinho">
                        <img src="/carrinho.png.png" alt="" width={50} height={30} />
                    </button>
                    <button className={style.iconeBotao} aria-label="Perfil">
                        <img src="/iconperfil.png.png" alt="" width={50} height={30} />
                    </button>
                    {/*
                    <button className={style.iconeBotao} onClick={() => route.replace("/login")}>
                        Login
                    </button>
                    */}
                </div>
            </header>
            <nav className={style.nav}>
                <ul>
                    <li><a className={style.active} href="#">Início</a></li>
                    <li><a href="#">Roupas Femininas</a></li>
                    <li><a href="#">Infantil</a></li>
                    <li><a href="#">Roupas Masculinas</a></li>
                    <li><a href="#">Cosméticos</a></li>
                </ul>
            </nav>
        </div>
    );
}