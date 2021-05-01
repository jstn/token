import { ethers } from "hardhat";
import { Wallet } from "ethers";
import { Token, Token__factory } from "../typechain";
import contractArgs from "./arguments";

async function main() {
  const wallet: Wallet = new Wallet(`${process.env.WALLET_PRIVATE_KEY}`, ethers.provider);
  const factory = await ethers.getContractFactory("Token") as Token__factory;
  const contract = await factory.connect(wallet).deploy(contractArgs[0], contractArgs[1], contractArgs[2]) as Token;
  await contract.deployed();
  console.log("contract address:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
