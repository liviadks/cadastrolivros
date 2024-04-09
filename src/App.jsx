import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    isbn: '',
    titulo: '',
    editora: '',
    autor: '',
    genero: '',
  });
  
  useEffect(() => {
    fetchLivros();
  }, []);
  
  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:8090/livro');
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/livro', novoLivro);
      fetchLivros();
      setNovoLivro({
        isbn: '',
        titulo: '',
        editora: '',
        autor: '',
        genero: '',
      });
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/livro/${id}`);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };
  
  const handleUpdate = async (id, livroAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/livro/${id}`, livroAtualizado);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  return (
    <div>
      {/* Cabeçalho */}
      <h1>Gerenciamento de Livros</h1>
  
      {/* Formulário de adição de livro */}
      <form onSubmit={handleSubmit}>
        {/* Campo para a isbn */}
        <input
          type="text"
          name="isbn"
          placeholder="Isbn"
          value={novoLivro.isbn}
          onChange={handleInputChange}
        />
        {/* Campo para a titulo */}
        <input
          type="text"
          name="titulo"
          placeholder="Titulo"
          value={novoLivro.titulo}
          onChange={handleInputChange}
        />
        {/* Campo para o editora */}
        <input
          type="text"
          name="editora"
          placeholder="Editora"
          value={novoLivro.editora}
          onChange={handleInputChange}
        />
        {/* Campo para o autor */}
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          value={novoLivro.autor}
          onChange={handleInputChange}
        />
          {/* Campo para o genero */}
          <input
          type="text"
          name="genero"
          placeholder="Genero"
          value={novoLivro.genero}
          onChange={handleInputChange}
        />
        {/* Botão de envio do formulário */}
        <button type="submit">Adicionar Livro</button>
      </form>
  
      {/* Lista de Livros */}
      <ul>
        {/* Mapeamento dos Livros */}
        {livros.map((livro) => (
          <li key={livro.id}>
            {/* Exibição dos detalhes do veículo */}
            {livro.isbn} - {livro.titulo} {livro.editora} {livro.autor} {livro.genero}
            
            {/* Botão de exclusão */}
            <button onClick={() => handleDelete(livro.id)}>Excluir</button>
            
            {/* Botão de atualização */}
            <button onClick={() =>
                handleUpdate(livro.id, {
                ...livro,
                isbn: novoLivro.isbn !== "" ? ( novoLivro.isbn) : livro.isbn,
                titulo: novoLivro.titulo !== "" ? ( novoLivro.titulo) : livro.titulo,
                editora: novoLivro.editora !== "" ? ( novoLivro.editora) : livro.editora,
                autor: novoLivro.autor !== "" ? ( novoLivro.autor) : livro.autor,
                genero: novoLivro.genero !== "" ? ( novoLivro.genero) : livro.genero,
                })                
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default App;