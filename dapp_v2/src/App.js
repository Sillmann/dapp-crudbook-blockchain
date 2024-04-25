import React, { useState, useEffect } from 'react';
import { doLogin, addBook, getBook, getListBooks } from './Services/Web3Service';

import './App.css';

function App() {

  const [msg,setMsg] = useState(''); 
  const [user,setUser] = useState('');
  const [title,setTitle] = useState(''); 
  const [year,setYear] = useState(''); 
  const [id,setId] = useState(''); 
  
  // const [lista,setLista] = useState([{title:"aaaa",year:"2000"},{title:"bbbbbb",year:"2001"}]);
  const [lista,setLista] = useState([]);
  
  async function loadBooks() {
    try {
        const results = await getListBooks();

        console.log(results[2].title);
        console.log(results[2].year);

        setLista(results);
        // setLista(results.reverse());
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
}

  useEffect(() => {
    loadBooks();
}, [])

  function onBtnLogin() {

    doLogin()
       .then(result => {
          setUser(result);
          setMsg("Logado em Dapp-book-database_v2: " + user);
      } )
       .catch(err => {
          setMsg(err);
       })
  }

  function newBook() {

    addBook(title,year)
        .then(result => {
            alert("Livro cadastrado.")
        })
        .catch(err => {
            console.error(err);
        })
  }

  function psqBook() {

    getBook(id)
        .then(result => {
            // alert("Livro encontrado." + result.title);
            setTitle(result.title);
            setYear(parseInt(result.year));
        })
        .catch(err => {
            console.error(err);
        })
  }

  return (
    <div className="container">
      
      <div className="label">
        Login Metamask
      </div>
      
      <div className="btnLogin" onClick={onBtnLogin}>
        Login  
      </div>

      <div className="label">
        {msg}
      </div>


      <div className="content">
      
        <div className="label">
          Incluir Novo Livro:
        </div>

        <div className="box1">

          <text>Titulo do Livro</text>
          <input
            value={title}    
            onChange={e => setTitle(e.target.value)}
          />  

        </div>

        <div className="box2">

          <text>Ano Edição</text>
          <input
            value={year}    
            onChange={e => setYear(e.target.value)}
          />  

        </div>

        <div className="box3">

          <button className="buttonbook"
                onClick={newBook}
          >Gravar</button>

        </div>

      </div>     


      <div className="content">
      
        <div className="label">
          Pesquisar Livro:
        </div>

        <div className="box1">

          <text>Numero do Livro</text>
          <input
            value={id}    
            onChange={e => setId(e.target.value)}
          />  

        </div>

        <div className="box3">

          <button className="buttongetbook"
                onClick={psqBook}
          >Pesquisar</button>

        </div>

      </div>: 


      <div className="main">

        <h1>listagem</h1>
        <ul>
        
          <div className="cabecalho">
            <div className="Título">Título</div>
            <div className="Ano">Ano</div>
          </div>
          
          {lista.map(item => (
            <li key={item.title}>
              <div className="title">{item.title}</div>
              <div className="year">{item.year ? parseInt(item.year) : ""}</div>
            </li>
          ))} 
        </ul> 

      </div>    

    </div>
  );
}

export default App;
