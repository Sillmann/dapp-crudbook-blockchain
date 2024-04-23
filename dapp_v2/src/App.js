import React, { useState } from 'react';
import { doLogin, addBook } from './Services/Web3Service';

import './App.css';

function App() {

  const [msg,setMsg] = useState(''); 
  const [user,setUser] = useState("");
  const [title,setTitle] = useState(''); 
  const [year,setYear] = useState(''); 

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

    </div>
  );
}

export default App;
