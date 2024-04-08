pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Insta_Token is ERC20 {

  address public minter;
  uint256 public faucet_amount;
  uint8 _decimals;

  constructor(string memory name_, string memory symbol_, uint8 decimals, uint256 faucet_amount_, address minter_, uint256 initial_supply_, address initial_supply_receiver_)
  ERC20(name_, symbol_)
  {
    _decimals = decimals;
    minter = minter_;
    if(initial_supply_ > 0){
      _mint(initial_supply_receiver_, initial_supply_);
    }
    faucet_amount = faucet_amount_;
  }

  function change_minter(address new_minter) public {
    require(msg.sender == minter);
    minter = new_minter;
  }


  mapping(address => uint256) public last_faucet;

  function faucet() public {
    require(faucet_amount > 0, "faucet not enabled");
    require(last_faucet[msg.sender] + 86400 < block.timestamp, "faucet can be used once per 24 hours");
    last_faucet[msg.sender] = block.timestamp;
    _mint(msg.sender, faucet_amount);
  }

  function mint(address target, uint256 amount) public {
    require(minter != address(0));
    require(msg.sender == minter, "user cannot mint");
    _mint(target, amount);
  }

  function decimals() public view override returns (uint8) {
      return _decimals;
  }



}