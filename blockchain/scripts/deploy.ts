import dotenv from "dotenv";
dotenv.config();

import { ethers } from "hardhat";

async function main() {

  const bookdatabase = await ethers.deployContract("BookDatabase");

  await bookdatabase.waitForDeployment();

  const address = await bookdatabase.getAddress();

  console.log(`Deploy finished at ${address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
