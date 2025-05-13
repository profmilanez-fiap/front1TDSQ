'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit as Edit, FaTrash as Trash } from 'react-icons/fa';
import { propAlbuns } from "@/app/types/props";
import API_BASE from "@/app/services/api";

const Albuns = () => { 
  const [albuns, setAlbuns] = useState<propAlbuns[]>([]);

  const buscarAlbuns = async () => { 
    try { 
      const response = await fetch(`${ API_BASE }/album/buscarTODOSalbuns`);
      const data = await response.json();
      setAlbuns(data);
    } catch (error) { 
      console.error(error);
    }
  };

  useEffect(() => { 
    buscarAlbuns();
  }, []);

  const excluirAlbum = async (id: string) => { 
    if (confirm("Tem certeza que deseja excluir?")) { 
        const response = await fetch(`${ API_BASE }/album/excluir/${ id }`, { 
            method: 'PUT',
        });

        if (response.ok) { 
            alert('Item excluído com sucesso!');
            buscarAlbuns();
        }
        else { 
            const errorData = await response.json();
            alert(`Erro ao excluir: ${ errorData.message || 'Erro desconhecido' }`);
        }
    }
  };

  return (
    <>
      <h1>Álbuns</h1>
      <Link href={ `cadastrar/novo` }>Cadastrar novos Álbuns</Link>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th colSpan={ 2 }>Ação</th>
          </tr>
        </thead>
        <tbody>
          { albuns.map((album, index) => (
            <tr key={ index }>
              <td>{ album.album }</td>
              <td>
                <Link href={ `cadastrar/${ album.slug }` }>
                  <button><Edit /></button>
                </Link>
              </td>
              <td>
                <button title="Excluir" onClick={ () => excluirAlbum(String(album.id)) } 
                disabled={ Number(album.exibir) === 0 }>
                  <Trash />
                </button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </>
  );
 };

export default Albuns;
