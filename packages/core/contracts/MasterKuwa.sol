pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract MasterKuwa {
  IERC20Metadata token;
  address public owner;
  uint256 public constant DRIP_AMOUNT = 5000;
  mapping(address => bool) drippedList;
  uint256 public givenCount = 0;

  constructor(address _tokenAddress, address _ownerAddress) {
    token = IERC20Metadata(_tokenAddress);
    owner = _ownerAddress;
  }

  function requestTokens(address _to) external payable {
    require(
      token.balanceOf(address(this)) > DRIP_AMOUNT * 10**token.decimals(),
      "Master Kuwa: I don't have Kuwa Coin any more."
    );
    require(
      !drippedList[_to],
      'Master Kuwa: You can only get Kuwa Coin from me once.'
    );

    drippedList[_to] = true;
    token.transfer(_to, DRIP_AMOUNT * 10**token.decimals());
    givenCount += 1;

    (bool sent, ) = _to.call{value: msg.value}('');
    require(sent, 'Failed to send Ether');
  }
}
