const contractOwner = "0x395c78311A693B463Ce0B0b8a66C4bda04FB8924"

async function main() {
  const tokens = [
    {
      "initialOwner": contractOwner,
      "name": "Vega USDC",
      "symbol": "vegaUSDC",
      "decimals": 6,
      "totalSupply": BigInt("60000000000000"), // 60kk
    },
    {
      "initialOwner": contractOwner,
      "name": "Vega tBTC",
      "symbol": "vegaTBTC",
      "decimals": 18,
      "totalSupply": BigInt("60000000000000000000000000"), // 60kk
    },
    {
      "initialOwner": contractOwner,
      "name": "Vega WETH",
      "symbol": "vegaWETH",
      "decimals": 18,
      "totalSupply": BigInt("60000000000000000000000000"), // 60kk
    },
    {
      "initialOwner": contractOwner,
      "name": "Vega EURT",
      "symbol": "vegaEURT",
      "decimals": 6,
      "totalSupply": BigInt("60000000000000"), // 60kk
    },
  ];
  var verifyCommands = []

  for (const idx in tokens) {
    const token = await ethers.getContractFactory("ERC20_Token");
    // Start deployment, returning a promise that resolves to a contract object
    const tokenEVM = await token.deploy(
      tokens[idx].initialOwner,
      tokens[idx].name, 
      tokens[idx].symbol, 
      tokens[idx].decimals, 
      tokens[idx].totalSupply.toString(), 
    );
  
    await tokenEVM.deployed();
    console.log("Contract address for " + tokens[idx].name + ":", tokenEVM.address);
    verifyCommands.push("npx hardhat verify " + 
      tokenEVM.address + " \
'" + tokens[idx].initialOwner + "' \
'" + tokens[idx].name + "' \
'" + tokens[idx].symbol + "' \
'" + tokens[idx].decimals + "' \
'" + tokens[idx].totalSupply.toString() + "'");
  }
 
  console.log("");
  console.log("To verify contracts run the following commands: \n\n", verifyCommands.join(";\n"))

}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
   });