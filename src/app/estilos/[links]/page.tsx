'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { propAlbuns } from "@/app/types/props";
import URL_BASE from "@/app/services/api";

const Estilos = () => {
    const params = useParams();

    const [estilos, setEstilos] = useState<propAlbuns[]>([]);

    useEffect(() => {
        const buscarAlbuns = async () => {
            try {
                const response = await fetch(`${ URL_BASE }/album/buscarporcategoria/${params.links}`);
                const data = await response.json();
                setEstilos(data);
            } catch (error) {
                console.error("Erro ao buscar albuns:", error);
            }
        };
    
        if (params.links) {
            buscarAlbuns();
        }

    }, [params?.links]);

    if(estilos.length == 0){
        return(
            <>
            <h1>Busca por Estilo</h1>
            <h2>
               Não existem álbuns para a estilo selecionada!
            </h2>
            </>
        )
    }

    return (
        <>
        <h1>Busca por Estilo - { estilos[0].nomeEstilo }</h1>

            <ul>
                {estilos.map((estilo, index) => (
                    <li key={index}>
                        <Link href={ `/albuns/${ estilo.slug }` }>{ estilo.album }</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Estilos;
