import { ethers } from "hardhat";

async function main() {
  const bookDatabase = await ethers.deployContract("BookDatabase_v2");

  await bookDatabase.waitForDeployment();

  const address = await bookDatabase.getAddress();

  console.log(`Deploy finished at ${address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
