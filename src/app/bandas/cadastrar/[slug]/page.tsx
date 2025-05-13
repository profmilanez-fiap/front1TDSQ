'use client';

import URL_BASE from "@/app/services/api";
import { propBandas, propEstilos } from "@/app/types/props";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Banda = () => {

    const params = useParams();
    const slugParam = params.slug;
    const isEdit = slugParam !== "novo";
    const slug = isEdit ? slugParam : undefined;

    const [estilos, setEstilos] = useState<propEstilos[]>([]);
    const [mensagem, setMensagem] = useState('');

    const [formData, setFormData] = useState<propBandas>({
        id: '0',
        banda: '',
        integrantes: '',
        links: '',
        slug: '',
        imagem: '',
        descricao: '',
        categoria: '',
        exibir: ''
    });

    useEffect(() => {
        // carrega os estilos musicais
        fetch(`${URL_BASE}/estilo/`)
            .then((res) => res.json())
            .then((data) => setEstilos(data))
            .catch(() => setMensagem("Erro ao carregar as categorias!"))

        // carrega informações da banda, se for edição
        if (isEdit && slug) {
            fetch(`${URL_BASE}/bandas/editar/${slug}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data && data.length > 0) {
                        setFormData({
                            id: data[0].id,
                            banda: data[0].banda,
                            integrantes: data[0].integrantes,
                            links: data[0].links,
                            slug: data[0].slug,
                            imagem: data[0].imagem,
                            descricao: data[0].descricao,
                            categoria: String(data[0].categoria),
                            exibir: data[0].exibir
                        })
                    }
                })
                .catch(() => setMensagem('Erro ao carregar informações da banda!'))
        }
    }, [slug, isEdit])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value || '',
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = isEdit
            ? `${URL_BASE}/bandas/atualizar/${formData.id}`
            : `${URL_BASE}/bandas/cadastrar`;

        const method = isEdit ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setMensagem(isEdit ? 'Banda atualizada com sucesso!' : 'Banda cadastrada com sucesso');
                if (!isEdit) {
                    setFormData({
                        id: '0',
                        banda: '',
                        integrantes: '',
                        links: '',
                        slug: '',
                        imagem: '',
                        descricao: '',
                        categoria: '',
                        exibir: ''
                    });
                }
                else {
                    const msg = await response.text();
                    setMensagem(`${msg}`)
                }
            }
        }
        catch (error) {
            setMensagem(`Erro na requisição: ${error}`)
        }
    };

    return (
        <>
            <h1>{isEdit ? 'Editar Bandas' : 'Cadastrar uma nova Banda'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="banda">Nome da Banda: </label>
                    <input
                        type="text"
                        name="banda"
                        id="banda"
                        value={formData.banda}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="integrantes">Integrantes: </label>
                    <input
                        type="text"
                        name="integrantes"
                        id="integrantes"
                        value={formData.integrantes}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="imagem">Imagem: </label>
                    <input
                        type="text"
                        name="imagem"
                        id="imagem"
                        value={formData.imagem}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição: </label>
                    <textarea
                        name="descricao"
                        id="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="categoria">Categoria/Estilo Musical: </label>
                    <select
                        name="categoria"
                        id="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um estilo musical: </option>
                        {
                            estilos.map((estilo) => (
                                <option key={estilo.id} value={estilo.id}>{estilo.estilo}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="exibir">Exibir: </label>
                    <select
                        name="exibir"
                        id="exibir"
                        value={formData.exibir}
                        onChange={handleChange}
                    >
                        <option value={1}>Exibir</option>
                        <option value={0}>Ocultar</option>
                    </select>
                </div>
                <input
                    type="hidden"
                    name="id"
                    id="id"
                    value={formData.id}
                />
                <button type="submit">{isEdit ? 'Atualizar' : 'Cadastrar'}</button>
            </form>
            {mensagem && <p>{mensagem}</p>}
        </>
    )
}
export default Banda;