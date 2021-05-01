// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Token is ERC20, ERC20Burnable, ERC20Snapshot, Ownable, Pausable {
  constructor(
    string memory name,
    string memory symbol,
    uint256 initialSupply
  ) ERC20(name, symbol) {
    _mint(msg.sender, initialSupply);
  }

  function snapshot() external onlyOwner {
    _snapshot();
  }

  function pause() external onlyOwner {
    _pause();
  }

  function unpause() external onlyOwner {
    _unpause();
  }

  function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount);
  }

  function _beforeTokenTransfer(address from, address to, uint256 amount)
    internal
    whenNotPaused
    override(ERC20, ERC20Snapshot)
  {
    super._beforeTokenTransfer(from, to, amount);
  }
}
