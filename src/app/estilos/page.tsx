'use client';
import  Link from "next/link";
import { useEffect, useState } from "react";
import { propEstilos } from "../types/props";
import URL_BASE from "../services/api";

const Estilo = () =>{

    const [estilos,setEstilos] = useState<propEstilos[]>([]);

    useEffect(()=>{
        const buscarEstilos = async() =>{
            try{
                const response = await fetch(`${ URL_BASE }/estilo`);
                const data = await response.json();
                setEstilos(data);
            }
            catch(error){
                console.error(error)
            }
        }
        buscarEstilos()
    },[])
    return(
        <>
            <h1>Estilos - Visão Usuário Comum</h1>
            <p><Link href="estilos/editar/">Editar Estilos - Visão Admin</Link></p>
            <ul>
                {
                    estilos.map((estilo,index) =>(
                        <li key={ index }><Link href={`/estilos/${ estilo.links }`}>{ estilo.estilo }</Link></li>
                    )
                )}
                
            </ul>
            
            
        </>
    )
}
export default Estilo;