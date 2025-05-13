"use client";

import Link from "next/link";
import { useEffect, useState } from "react"
import { FaEdit as Edit, FaTrash as Trash} from 'react-icons/fa'; 
import { propEstilos } from "@/app/types/props";
import URL_BASE from "@/app/services/api";


const Estilo = () =>{

    const [estilos,setEstilos] = useState<propEstilos[]>([])

    useEffect(() =>{
        buscarEstilos();      
    },[])

    const buscarEstilos = async() =>{
        try{
        
            const response = await fetch(`${ URL_BASE }/estilo/Editar`);
            const data = await response.json();
            setEstilos(data);
        }
        catch(error){
            console.log(error)
        }
    }
    
    const handleDelete = async(id : string) =>{
        if(confirm("Tem certeza que deseja ecluir?")){
            try{
                const response = await fetch(`${ URL_BASE }/estilo/excluir/${id}`,{ 
                    method : 'PUT',
                    headers: { 'Content-Type' : 'application/json'}
                }
                )
                if(response.ok){
                    alert("Registro excluído sucesso!");
                    buscarEstilos();   
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
            <h1>Editar Estilo Musicais</h1>
            <p><Link href="/estilos/cadastrar/novo">Cadastrar novo Estilo</Link></p>
            <table>
                <thead>
                    <tr>
                        <th>Estilo</th>
                        <th colSpan={ 2 }>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        estilos.map((estilo,index) => (
                            <tr key={ index }>
                                <td>{ estilo.estilo }</td>
                                <td>
                                    <Link href={`cadastrar/${ estilo.links }`}>
                                        <Edit />
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(String(estilo.id)) } disabled={ Number(estilo.exibir) === 0 }>
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
export default Estilo