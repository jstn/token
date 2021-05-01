import { ethers } from "hardhat";
import { BigNumber } from "ethers";

const name: string = "Token";
const symbol: string = "TOKE";
const initialSupply: string = "420";

const initialSupplyInWei: BigNumber = ethers.utils.parseEther(initialSupply);
const contractArgs: string[] = [name, symbol, initialSupplyInWei.toString()];

export default contractArgs;
