pragma solidity 0.8.24;

import "./Insta_Token.sol";

contract Insta_Token_Launcher {


  event Token_Created(address addr);

  function create_token(string memory name_, string memory symbol_, uint8 decimals, uint256 faucet_amount_, address minter_, uint256 initial_supply_, address initial_supply_receiver_) public returns(address){
    address new_address = address(new Insta_Token( name_, symbol_, decimals, faucet_amount_, minter_, initial_supply_, initial_supply_receiver_));
    emit Token_Created(new_address);
    return new_address;

  }

}