import React, { useState } from 'react';
import { Book, addBook } from '../Services/Web3Service';
import './styles.css';

export default function AddBook() {

  const [titulo,setTitulo] = useState(''); 
  const [edicao,setEdicao] = useState(''); 

  const [book, setBook] = useState<Book>({} as Book);

  function addBook() {

    setBook({titulo,edicao});
    
    //alert(titulo + edicao);
    // alert([titulo,edicao])
    // alert(book);

    addBook(book)
    .then(result => {
        alert("Livro cadastrado.")
        // setText("");
        // setMessage("Tweet foi enviado. Aguarde um minuto para atualizar.");
    })
    .catch(err => {
        // setMessage(err.message);
        console.error(err);
    })

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