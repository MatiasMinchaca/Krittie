// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ShelterDonation {
    address public shelter;
    IERC20 public wldToken;
    IERC20 public usdcToken;

    event DonationReceived(address indexed donor, uint256 amount, string token);

    constructor(address _shelter, address _wldToken, address _usdcToken) {
        shelter = _shelter;
        wldToken = IERC20(_wldToken);
        usdcToken = IERC20(_usdcToken);
    }

    function donateWLD(uint256 amount) external {
        wldToken.transferFrom(msg.sender, shelter, amount);
        emit DonationReceived(msg.sender, amount, "WLD");
    }

    function donateUSDC(uint256 amount) external {
        usdcToken.transferFrom(msg.sender, shelter, amount);
        emit DonationReceived(msg.sender, amount, "USDC");
    }
}
