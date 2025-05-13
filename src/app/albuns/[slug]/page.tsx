'use client';

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import API_BASE from '@/app/services/api';

interface propAlbuns {
    id: string;
    album: string;
    imagem?: string;
    categoria: string;
    lancamento: string;
    exibir: string;
    faixas: string;
    descricao: string;
    nomeBanda?: string;
    slugBanda?: string;
}

const Album = () => {
    const params = useParams();
    const [album, setAlbum] = useState<propAlbuns | null>(null);

    useEffect(() => {
        const buscarAlbum = async () => {
            try {
                const response = await fetch(`${ API_BASE }/album/buscaalbum/${params.slug}`);
                const data = await response.json();
                setAlbum(data);
            } catch (error) {
                console.error("Erro ao buscar Álbum:", error);
            }
        };

        if (params?.slug) {
            buscarAlbum();
        }
    }, [params]);

    if (!album) {
        return <p>Carregando ou álbum não encontrado...</p>;
    }

    return (
        <>
            <h2 className="text-xl font-bold mb-4">{album.album}</h2>
            <Image 
                src={`/imagens/${album.imagem}`}  
                alt={`Capa do álbum ${album.album}`} 
                width={300} 
                height={300} 
            />
            <p><strong>Banda:</strong> <Link href={`/bandas/${album.slugBanda}`}>{ album.nomeBanda }</Link></p>
            <p><strong>Faixas:</strong> {album.faixas}</p>
            <p><strong>Descrição:</strong> {album.descricao}</p>

        </>
    );
};

export default Album;
