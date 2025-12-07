import Link from 'next/link';
import style from './styles.module.css';

export default ({ produto = {} }) => {
    const { id, srcImage, alt, nome, preco } = produto;

    return (
        <div className={style.produto}>
            <Link href={`/produto/${id}`}>
                <img src={srcImage} alt={alt} width={200} />
            </Link>
            <p>{nome}</p>
            <span>{preco}</span>

        </div>
    );
};


