'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { propEstilos, propAlbuns, propBandas } from '@/app/types/props';
import API_BASE from '@/app/services/api';

const albunsIniciais: propAlbuns = {
  id: 0,
  album: '',
  banda: '',
  categoria: '',
  imagem: '',
  lancamento: '',
  faixas: '',
  descricao: '',
  exibir: 1,
  links: '',
  slug: '',
  nomeBanda: '',
  nomeEstilo: ''
}

const Album = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const [formData, setFormData] = useState<propAlbuns>(albunsIniciais);

  const [bandas, setBandas] = useState<propBandas[]>([]);
  const [categorias, setCategorias] = useState<propEstilos[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch(`${ API_BASE }/bandas/`)
      .then((res) => res.json())
      .then(setBandas)
      .catch(() => setMensagem('Erro ao carregar bandas'));

    fetch(`${ API_BASE }/estilo/`)
      .then((res) => res.json())
      .then(setCategorias)
      .catch(() => setMensagem('Erro ao carregar categorias'));

    if (slug && slug !== 'novo') {
      fetch(`${ API_BASE }/album/buscar/${slug}`)
        .then((res) => res.json())
        .then((data) => setFormData({ ...data, banda: String(data.banda), categoria: String(data.categoria) }))
        .catch(() => setMensagem('Erro ao carregar álbum'));
    }
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const metodo = slug && slug !== 'novo' ? 'PUT' : 'POST';
    const endpoint = slug && slug !== 'novo'
      ? `${ API_BASE }/album/atualizar/${formData.id}`
      : `${ API_BASE }/album/cadastrar`

    try {
      const response = await fetch(endpoint, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMensagem(`Álbum ${metodo === 'POST' ? 'cadastrado' : 'atualizado'} com sucesso!`);
        if (metodo === 'POST') {
          setFormData(albunsIniciais);
        }
      } else {
        const erro = await response.text();
        setMensagem(`Erro ao salvar: ${erro}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      setMensagem('Erro na requisição.');
    }
  };

  return (
    <div>
      <h2>
        {slug && slug !== 'novo' ? 'Editar Álbum' : 'Cadastrar Novo Álbum'}
      </h2>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={formData.id} />

        <div>
          <label>Título do Álbum</label>
          <input type="text" name="album" value={formData.album} onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1">Imagem (URL)</label>
          <input type="text" name="imagem" value={formData.imagem} onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1">Ano de Lançamento</label>
          <input type="number" name="lancamento" value={formData.lancamento} onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1">Faixas</label>
          <textarea name="faixas" value={formData.faixas} onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1">Descrição</label>
          <textarea name="descricao" value={formData.descricao ?? ''} onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1">Banda</label>
          <select name="banda" value={formData.banda} onChange={handleChange} required>
            <option value="">Selecione uma banda</option>
            {bandas.map((b) => (
              <option key={b.id} value={b.id}>{b.banda}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Categoria</label>
          <select name="categoria" value={formData.categoria} onChange={handleChange} required>
            <option value="">Selecione uma categoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.estilo}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Exibir (1 = Sim, 0 = Não)</label>
          <select name="exibir" value={formData.exibir} onChange={handleChange} >
            <option value="1">Exibir</option>
            <option value="0">Ocultar</option>
          </select>
        </div>

        <button type="submit">
          {slug && slug !== 'novo' ? 'Atualizar Álbum' : 'Cadastrar Álbum'}
        </button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default Album;
