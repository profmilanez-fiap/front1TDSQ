"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import URL_BASE from "@/app/services/api";

const CriarEstilos = () =>{

    const [formData,setFormData] = useState({
        id : 0,
        links : '',
        estilo : '',
        exibir : 1
    })

    const [mensagem,setMensagem] = useState('');

    const params = useParams();
    const linkParams = params.links;
    const isEdit = linkParams !== 'novo';
    const links = isEdit ? String(linkParams) : undefined;

    useEffect(() =>{
        if(isEdit && links){
            fetch(`${ URL_BASE }/estilo/${ links }`)
            .then(res =>{
                if(!res.ok) throw new Error("Não encontrado!");
                return res.json();
            })
            .then(data =>{
                setFormData({
                    id : data.id,
                    links : data.links,
                    estilo : data.estilo,
                    exibir : data.exibir
                })
            })
            .catch(()=> setMensagem("Erro ao carregar estilo musical"))
        }
    },[links,isEdit])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.name === 'exibir' ? Number(e.target.value) : e.target.value
        })

    }

    const handleSubmit = async (e : React.FormEvent) =>{
        e.preventDefault();

        const url = isEdit
            ? `${ URL_BASE }/estilo/${ links }`
            : `${ URL_BASE }/estilo/`

        const method = isEdit ? 'PUT' : 'POST';

        try{
            const response = await fetch(url,{
                method,
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData)
            });
            if (response.ok){
                setMensagem(isEdit ? 'Estilo atualizado com sucesso!' : 'Estilo cadastrado com sucesso')
            }
            else{
                const erro = await response.text();
                setMensagem(`Erro ao salvar: ${ erro }`)
            }
        }
        catch(error){
            console.error('Erro:', error)
            setMensagem(`Erro ao salvar: ${ error }`)
        }
    }

    return(
        <>
            <h1>
                { isEdit ? "Editar Categoria" : "Cadastrar Categoria"}
            </h1>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label>Estilo: 
                        <input 
                            type="text"
                            name="estilo"
                            value={ formData.estilo }
                            onChange={ handleChange }
                        />
                    </label>
                </div>

                <div>
                    <label>Exibir:
                        <select name="exibir" value={ formData.exibir } onChange={ handleChange }>
                            <option value={ 1 }>Exibir</option>
                            <option value={ 0 }>Ocultar</option>
                        </select>
                    </label>
                </div>

                <input 
                    type="hidden"
                    name="estilo"
                    value={ formData.id }
                    onChange={ handleChange }
                />
                <button type="submit">
                    { isEdit ? "Atualizar Categoria" : "Cadastrar Nova Categoria"}
                </button>
            </form>
            
            { mensagem && <p>{ mensagem }</p> }

        </>
    )
}
export default CriarEstilos;