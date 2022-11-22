pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Faucet {
  IERC20Metadata token;
  address public owner;
  uint256 public constant DRIP_AMOUNT = 5000;
  mapping(address => bool) drippedList;

  constructor(address _tokenAddress, address _ownerAddress) {
    token = IERC20Metadata(_tokenAddress);
    owner = _ownerAddress;
  }

  function requestTokens(address _to) external {
    require(
      token.balanceOf(address(this)) > DRIP_AMOUNT * 10**token.decimals(),
      'FausetError: Empty'
    );
    require(
      !drippedList[_to],
      'FaucetError: You have already got KuwaCoin before'
    );

    drippedList[_to] = true;
    token.transfer(_to, DRIP_AMOUNT * 10**token.decimals());
  }

  receive() external payable {}
}
