// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract BookDatabase_v2 {

    struct Book {
        string title;
        uint16 year;
    }

    uint32 private nextId = 0;
    mapping(uint32 => Book) public books;
    uint256 public count;

    function compare(string memory str1, string memory str2)
            private
            pure
            returns (bool)
        {
            bytes memory arrA = bytes(str1);
            bytes memory arrB = bytes(str2);
            return arrA.length == arrB.length && keccak256(arrA) == keccak256(arrB);
        }

    function addBook(Book memory newBook) public {
        nextId++;
        books[nextId] = newBook;
        count++;
    }

    function editBook(uint32 id, Book memory newBook) public {
        Book memory oldBook = books[id];

        if ( !compare(oldBook.title, newBook.title) &&
             !compare(newBook.title, '') )
          books[id].title = newBook.title;

        if ( oldBook.year != newBook.year &&
             newBook.year > 0 )
          books[id].year = newBook.year;
    }

    function removeBook(uint32 id) public {
        if(books[id].year > 0){
          delete books[id];
          count--;
        }
    }
}
