import { ethers } from "hardhat";
import { expect } from "chai";
import { BigNumber, Signer } from "ethers";
import { Token, Token__factory } from "../typechain";
import contractArgs from "../scripts/arguments";

describe("Token", function () {
  let _contract: Token;
  let _signers: Signer[];
  let _sender: string;
  let _receiver: string;

  const _name: string = contractArgs[0];
  const _symbol: string = contractArgs[1];
  const _initialSupply: string = contractArgs[2];

  beforeEach(async function() {
    _signers = await ethers.getSigners();
    _sender = await _signers[0].getAddress();
    _receiver = await _signers[1].getAddress();

    const factory = await ethers.getContractFactory("Token") as Token__factory;
    _contract = await factory.connect(_signers[0]).deploy(_name, _symbol, _initialSupply) as Token;
    await _contract.deployed();
  });

  it("should do token stuff", async function () {
    const senderBalanceBefore: BigNumber = await _contract.balanceOf(_sender);
    const receiverBalance: BigNumber = await _contract.balanceOf(_receiver);

    console.log("sender balance before", ethers.utils.formatEther(senderBalanceBefore));
    console.log("receiver balance before", ethers.utils.formatEther(receiverBalance));

    expect(senderBalanceBefore.eq(_initialSupply)).to.be.true;
    expect(receiverBalance.isZero()).to.be.true;
    
    console.log("sending $TOKE to receiver...");
    const transferAmount: BigNumber = ethers.utils.parseEther("0.666");
    await _contract.connect(_signers[0]).transfer(_receiver, transferAmount);

    const senderBalanceAfter: BigNumber = await _contract.balanceOf(_sender);
    const receiverBalanceAfter: BigNumber = await _contract.balanceOf(_receiver);

    console.log("sender balance after", ethers.utils.formatEther(senderBalanceAfter));
    console.log("receiver balance after", ethers.utils.formatEther(receiverBalanceAfter));

    const difference: BigNumber = senderBalanceBefore.sub(senderBalanceAfter);
    expect(difference.eq(transferAmount)).to.be.true;
    expect(receiverBalanceAfter.eq(transferAmount)).to.be.true;
  });
});
