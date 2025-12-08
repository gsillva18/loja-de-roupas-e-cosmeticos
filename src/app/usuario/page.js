"use client";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import BarraNavegacao from "../components/BarraNavegacao";

export default function Usuario() {
    const { data: session, status } = useSession();
    const route = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            route.replace("/");
        }
    }, [status, route]);

    if (status === "loading") {
        return <p className={styles.loading}>Carregando...</p>;
    }

    if (status !== "authenticated") {
        return null;
    }

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    };


    return (
        <div>
            <BarraNavegacao />

            <div className={styles.container}>
                <h1 className={styles.titulo}>
                    Bem-vindo, <span className={styles.nome}>{session.user.name}</span>
                </h1>

                <div className={styles.cardUsuario}>
                    <p><strong>Email:</strong> {session.user.email}</p>
                </div>

                <button className={styles.btnSair} onClick={handleLogout}>
                    Sair
                </button>
            </div>
        </div>
    );
}
