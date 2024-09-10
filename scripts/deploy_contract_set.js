const contractOwner = '0x5e188618Ed275A47E0BF6Da0905F1a1067d52425'

async function main() {
  let verifyCommands = []

  // Multisig START
  console.log("Deploying multisig contract")
  const multisigContract = await ethers.getContractFactory("MultisigControl");
  const multisigInstance = await multisigContract.deploy();

  await multisigInstance.deployed();
  console.log("MultiSig contract address: ", multisigInstance.address);

  verifyCommands.push("npx hardhat verify " + multisigInstance.address);
  // Multisig END

  // AssetPool START
  console.log("Deploying asset pool contract")
  const assetPoolContract = await ethers.getContractFactory("ERC20AssetPool");
  const assetPoolInstance = await assetPoolContract.deploy(multisigInstance.address);

  await assetPoolInstance.deployed();
  console.log("Asset pool contract address: ", assetPoolInstance.address);

  verifyCommands.push("npx hardhat verify " + assetPoolInstance.address + "  " + multisigInstance.address);
  // AssetPool END

  // Bridge START
  console.log("Deploying collateral bridge contract")
  const bridgeContract = await ethers.getContractFactory("ERC20BridgeLogicRestricted");
  const bridgeInstance = await bridgeContract.deploy(assetPoolInstance.address);

  await bridgeInstance.deployed();
  console.log("Bridge contract address: ", bridgeInstance.address);

  verifyCommands.push("npx hardhat verify " + bridgeInstance.address + "  " + assetPoolInstance.address);
  // Bridge END

  // VegaToken START
  const vegaTokenContract = await ethers.getContractFactory("ERC20_Token");
  // Start deployment, returning a promise that resolves to a contract object
  const vegaTokenInstance = await vegaTokenContract.deploy(
    contractOwner,
    'Vega', 
    'VEGA', 
    18, 
    '64999723000000000000000000', 
  );

  await vegaTokenInstance.deployed();
  console.log("Vega Contract address for Vega token:", vegaTokenInstance.address);
  verifyCommands.push("npx hardhat verify " + 
    vegaTokenInstance.address + " \
'" + contractOwner + "' \
'Vega' \
'VEGA' \
'18' \
'64999723000000000000000000'");
  // VegaToken END

  // Staking START
  console.log("Deploying staking bridge contract")
  const stakingContract = await ethers.getContractFactory("StakingBridge");
  const stakingInstance = await stakingContract.deploy(vegaTokenInstance.address);

  await bridgeInstance.deployed();
  console.log("Bridge contract address: ", bridgeInstance.address);

  verifyCommands.push("npx hardhat verify " + bridgeInstance.address + "  " + assetPoolInstance.address);
  // Staking END

  console.log("");
  console.log("To verify contracts run the following commands: \n\n", verifyCommands.join(";\n"), ";")
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
   });