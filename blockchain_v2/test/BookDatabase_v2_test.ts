import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("BookDatase_v2", function () {
  async function deployFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const BookDatase_v2 = await hre.ethers.getContractFactory("BookDatabase_v2");
    const bookdatabase = await BookDatase_v2.deploy();

    return { bookdatabase, owner, otherAccount };
  }

  it("Should add book", async function () {
    const { bookdatabase, owner, otherAccount } = await loadFixture(deployFixture);
    await bookdatabase.addBook({ title: "New Book", year: 2023});
    const count = await bookdatabase.count();
    expect(count).to.equal(1);
  });

});
