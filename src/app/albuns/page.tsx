'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { propAlbuns } from "../types/props";
import API_BASE from "../services/api";

const Albuns = () =>{
    
    const [albuns, setAlbuns] = useState<propAlbuns[]>([]);      

    useEffect(()=>{
        const buscarAlbuns = async() =>{
            try{
                const response = await fetch(`${ API_BASE }/album/buscaralbuns`);
                const data = await response.json();
                setAlbuns(data)
            }
            catch(error){
                console.error(error);
            }
        }
        buscarAlbuns();
    }, [])
    return (
        <>
            <h1>Álbuns</h1>
            <Link href={`albuns/editar/`}>Editar Álbuns</Link>
            <ul>
                {albuns.map((album, index) => (
                    <li key={ index }>
                        <Link href={`albuns/${album.slug}`}>{ album.album } - { album.nomeBanda }</Link>
                    </li>
                ))
            }
            </ul>
        </>
    )
}
export default Albuns;
