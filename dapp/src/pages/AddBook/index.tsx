import React, { useState } from 'react';
import './styles.css';

export default function AddBook() {

  const [titulo,setTitulo] = useState(''); 
  const [edicao,setEdicao] = useState(''); 

  function addBook() {
    
    alert(titulo + edicao);
  }
  return (

    <div className="container">
      
      <div className="label">
        Incluir Novo Livro:
      </div>

      <div className="box1">

        <text>Titulo do Livro</text>
        <input
          value={titulo}    
          onChange={e => setTitulo(e.target.value)}
        />  

      </div>

      <div className="box2">

        <text>Ano Edição</text>
        <input
          value={edicao}    
          onChange={e => setEdicao(e.target.value)}
        />  

      </div>

      <div className="box3">

        <button className="buttonbook"
              onClick={ () => addBook()}
        >Gravar</button>
      </div>

      
    </div>

  )
}