import { useState, useEffect } from 'react';
// import Book from "./Book";
// import { getLastTweets } from "../Services/Web3Service";
import './styles.css';

export default function List() {

  const [books, setBooks] = useState([]);

  async function loadBooks(page = 1) {
    try {
        // const results = await getLastTweets(page);
        const results = "";
        console.log(results);
        // if (page > 1) {
        //     books.push(...results);
        //     setBooks(books.reverse());
        // }
        // else
        //     setBooks(results.reverse());
    }
    catch (err) {
        console.error(err);
        // alert(err.message);
    }
}

  useEffect(() => {
    // loadBooks();
}, [])


  return (

    <div className="container">
      
      <div className="label">
        List
      </div>

      {/* books.map(b => <Book key={Number(b.timestamp)} data={b} />)  */}


      
    </div>


  )
}