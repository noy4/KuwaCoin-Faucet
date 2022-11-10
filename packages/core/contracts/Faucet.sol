pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Faucet {
  IERC20Metadata token;
  address public owner;
  mapping(address => uint256) nextRequestAt;
  uint256 faucetDripAmount = 1;

  constructor(address _tokenAddress, address _ownerAddress) {
    token = IERC20Metadata(_tokenAddress);
    owner = _ownerAddress;
  }

  function send() external {
    require(token.balanceOf(address(this)) > 1, 'FausetError: Empty');
    require(
      nextRequestAt[msg.sender] < block.timestamp,
      'FaucetError: Try again later'
    );

    nextRequestAt[msg.sender] = block.timestamp + (5 minutes);
    token.transfer(msg.sender, faucetDripAmount * 10**token.decimals());
  }
}
