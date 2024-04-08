pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";

contract ERC20_Token is ERC20, Ownable, ERC20Permit, ERC20FlashMint {
    uint8 private _decimalPlaces;

    constructor(address initialOwner, string memory tokenName, string memory tokenSymbol, uint8 _decimals, uint256 total_supply_whole_tokens)
        ERC20(tokenName, tokenSymbol)
        Ownable(initialOwner)
        ERC20Permit(tokenName)
    {
        _mint(initialOwner, total_supply_whole_tokens);

        _decimalPlaces = _decimals;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function decimals() override public view returns (uint8) {
        return _decimalPlaces;
    }
}
