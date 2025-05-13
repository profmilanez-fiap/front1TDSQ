'use client';

import { useParams } from "next/navigation";
import { propBandas } from "@/app/types/props";
import URL_BASE from "@/app/services/api";
import { useEffect, useState } from "react";
import Image from "next/image";

const Banda = () =>{

    const { slug } = useParams();
    const [banda, setBanda] = useState<propBandas | null>(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() =>{
        const buscarBanda = async() =>{
            try{
                const response = await fetch(`${ URL_BASE }/bandas/${slug}`);
                const data = await response.json();

                if (Array.isArray(data) && data.length > 0){
                    setBanda(data[0])
                }
                else if(!Array.isArray(data) && data?.length){
                    setBanda(data);
                }
                else(
                    setBanda(null)
                )
            }
            catch(error){
                console.error(error);
                setBanda(null)
            }
            finally{
                setCarregando(false)
            }
        }
        buscarBanda();
    },[slug])

    if(carregando){
        return(
            <h2>
                Carregando dados da banda...
            </h2>
        )
    }

    if(!banda){
        return(
            <h2>
                A banda procurada não foi encontrada
            </h2>
        )
    }

    return(
        <>
            <h1>Banda { banda.banda }</h1>
            <Image src={`/imagens/${ banda.imagem}`} alt={ banda.banda } width={ 0 } height={ 0 } sizes="100%" style={{width:"auto", height: "auto" }} />
            <p><strong>Integrantes: </strong>{ banda.integrantes }</p>
            <p><strong>Descrição: </strong>{ banda.descricao }</p>
        </>
    )
}
export default Banda;