"use client";

import Link from "next/link";
import { useEffect, useState } from "react"
import { FaEdit as Edit, FaTrash as Trash} from 'react-icons/fa'; 
import { propBandas } from "@/app/types/props";
import URL_BASE from "@/app/services/api";


const Banda = () =>{

    const [bandas,setBandas] = useState<propBandas[]>([])

    useEffect(() =>{
        buscarBandas();      
    },[])

    const buscarBandas = async() =>{
        try{
        
            const response = await fetch(`${ URL_BASE }/bandas/editar`);
            const data = await response.json();
            setBandas(data);
        }
        catch(error){
            console.log(error)
        }
    }
    
    const handleDelete = async(id : string) =>{
        if(confirm("Tem certeza que deseja ecluir?")){
            try{
                const response = await fetch(`${ URL_BASE }/bandas/excluir/${id}`,{ 
                    method : 'PUT',
                    headers: { 'Content-Type' : 'application/json'}
                }
                )
                if(response.ok){
                    alert("Registro excluído sucesso!");
                    buscarBandas();   
                }
                else{
                    const erroData = await response.json();
                    alert(`Erro ao excluir:  ${erroData.message || 'Erro desconhecido'}`);
                }
            }
            catch(error){
                console.log(error);
            }
        }
    }

    return(
        <>
            <h1>Editar Bandas</h1>
            <p><Link href="/bandas/cadastrar/novo">Cadastrar nova Banda</Link></p>
            <table>
                <thead>
                    <tr>
                        <th>Banda</th>
                        <th colSpan={ 2 }>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bandas.map((banda,index) => (
                            <tr key={ index }>
                                <td>{ banda.banda }</td>
                                <td>
                                    <Link href={`cadastrar/${ banda.slug }`}>
                                        <Edit />
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(String(banda.id)) } disabled={ Number(banda.exibir) === 0 }>
                                        <Trash />
                                    </button>
                                    </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>    
        </>
    )
}
export default Banda