import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x61447246818Fc3946B77955465cB99795F5f32a6";

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

