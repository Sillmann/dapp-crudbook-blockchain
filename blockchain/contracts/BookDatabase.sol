// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract BookDatabase {
    
    struct Book {
        string title;
        uint16 year;
        uint256 createdDate;
    }

    struct BookUpdate {
        bytes32 id;
        string title;
        uint16 year;
    }

    struct BookPage {
        Book[] books;
        uint total;
    }

    // mapping( bytes32 => Book ) public books;
    // mapping(uint => Book) public books;

    Book[] public books;
    mapping(bytes32 => uint) private _bookIndex; //book hash => array index

    function getBook(string memory title) external view returns (Book memory) {
        return _getBook(title);
    }

    function _getBook(string memory title) public view returns (Book memory) {
        bytes32 bookId = keccak256(bytes(title));
        uint index = _bookIndex[bookId];

        if (index < books.length) {
            Book memory result = books[index];
            if (index > 0 || keccak256(bytes(result.title)) == bookId)
                return result;
        }

        return Book({
                title: "",
                year: 0,
                createdDate: 0
            });
    }

    function bookExists(string memory title ) public view returns(bool) {
        return _getBook(title).createdDate > 0;
    }

    function addBook(string memory title,
                     uint16 year ) external {

        require(!bookExists(title),"This book already exists!");

        Book memory newBook = Book({
            title: title,
            year: year,
            createdDate: block.timestamp});

        _bookIndex[keccak256(bytes(title))] = books.length;
        books.push(newBook);
        
    }

    function removeBook(string memory title) external returns (BookUpdate memory) {
        Book memory book = _getBook(title);

        require(book.createdDate > 0,"This book does not exists!");

        bytes32 bookId = keccak256(bytes(title));
        uint index = _bookIndex[bookId];

        if (index != books.length - 1) {
            Book memory latest = books[books.length - 1];
            books[index] = latest;
            _bookIndex[keccak256(bytes(latest.title))] = index;
        }

        books.pop();
        delete _bookIndex[bookId];

        return
            BookUpdate({
                id: bookId,
                title: book.title,
                year: book.year
            });
    }

   function editBook(
        string memory bookToEdit,
        uint16 year
    ) external returns (BookUpdate memory) {
        Book memory book = _getBook(bookToEdit);
        require(book.createdDate > 0, "The book does not exists");
        
        bytes32 bookId = keccak256(bytes(bookToEdit));
        uint index = _bookIndex[bookId];

        if (year > 0) books[index].year = year;

        return
            BookUpdate({
                id: bookId,
                title: book.title,
                year: book.year
            });
    }

    function getBooks(
        uint page,
        uint pageSize
    ) external view returns (BookPage memory) {
        Book[] memory result = new Book[](pageSize);
        uint skip = ((page - 1) * pageSize);
        uint index = 0;

        for (uint i = skip; i < (skip + pageSize) && i < books.length; i++) {
            result[index++] = books[i];
        }

        return BookPage({books: result, total: books.length});
    }

    // function compare(string memory str1, string memory str2)
    //     private
    //     pure
    //     returns (bool)
    // {
    //     bytes memory arrA = bytes(str1);
    //     bytes memory arrB = bytes(str2);
    //     return arrA.length == arrB.length && keccak256(arrA) == keccak256(arrB);
    // }

    // function editBook(uint32 id, Book memory newBook) public {

    //     Book memory oldBook = books[id];

    //     if(!compare(oldBook.title, newBook.title) && !compare(newBook.title, ""))
    //         books[id].title = newBook.title;

    //     if(oldBook.year != newBook.year && newBook.year > 0)
    //         books[id].year = newBook.year;
        
    // }

    
    // modifier restricted(){

    //     require(owner == msg.sender, "You don't have permission");
    //     _;

    // }

    // function getLastBooks(uint page) public view returns (Book[] memory) {
    //     if(page < 1) page = 1;
    //     uint startIndex = (PAGE_SIZE * (page - 1)) + 1;

    //     Book[] memory lastBooks = new Book[](PAGE_SIZE);
    //     for(uint i=0; i < PAGE_SIZE; i++){
    //         //uint index = startIndex + i;
    //         lastBooks[i] = books[uint32(startIndex + i)];
    //     }

    //     return lastBooks;
    // }

}
