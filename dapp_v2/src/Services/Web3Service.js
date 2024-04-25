import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x8BCFa264b93fe053ee2FDb06376f2ac3da31c025";

export async function doLogin() {

  if (!window.ethereum) throw new Error('No Metamask found.');
  const web3 = new Web3(window.ethereum);

  const accounts = await web3.eth.requestAccounts();

  if (!accounts || !accounts.length)
    throw new Error('Wallet not found/allowed.');

  localStorage.setItem("wallet",accounts[0]);
  
  return accounts[0];

}

function getContract() {
  if (!window.ethereum) throw new Error("No MetaMask found");

  const web3 = new Web3(window.ethereum);
  const from = localStorage.getItem("wallet") || undefined; 

  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addBook(title,year) {

  const contract = getContract();
  return contract.methods.addBook({title,year}).send();
}

export async function getBook(id) {

  const contract = getContract();
  return contract.methods.books(id).call();

}

export async function getListBooks() {

  const contract = getContract();
  const books = await contract.methods.listBooks().call();
  return books.map(t => { return { ...t } }).filter(t => t.text !== "");

}

// export type Book = {
//   title: string;
//   year: string 
// }

// export async function getBook(id:string): Promise<Book> {
//   const contract = getContract();
//   return contract.methods.books[id] as Promise<Book>;
// }

