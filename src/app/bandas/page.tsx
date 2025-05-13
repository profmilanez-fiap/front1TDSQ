'use client';
import  Link from "next/link";
import { useEffect, useState } from "react";
import { propBandas } from "../types/props";
import URL_BASE from "../services/api";

const Banda = () =>{

    const [bandas,setBandas] = useState<propBandas[]>([]);

    useEffect(()=>{
        const buscarEstilos = async() =>{
            try{
                const response = await fetch(`${ URL_BASE }/bandas`);
                const data = await response.json();
                setBandas(data);
            }
            catch(error){
                console.error(error)
            }
        }
        buscarEstilos()
    },[])
    return(
        <>
            <h1>Bandas - Visão Usuário Comum</h1>
            <p><Link href="bandas/editar/">Editar Bandas - Visão Admin</Link></p>
            <ul>
                {
                    bandas.map((banda,index) =>(
                        <li key={ index }><Link href={`bandas/${ banda.slug }`}>{ banda.banda }</Link></li>
                    )
                )}
                
            </ul>
            
            
        </>
    )
}
export default Banda;