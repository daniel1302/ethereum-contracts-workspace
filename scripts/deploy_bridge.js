async function main() {
  let verifyCommands = []

  console.log("Deploying multisig contract")
  const multisigContract = await ethers.getContractFactory("MultisigControl");
  const multisigInstance = await multisigContract.deploy();

  await multisigInstance.deployed();
  console.log("MultiSig contract address: ", multisigInstance.address);

  verifyCommands.push("npx hardhat verify " + multisigInstance.address);

  console.log("Deploying asset pool contract")
  const assetPoolContract = await ethers.getContractFactory("ERC20_Asset_Pool");
  const assetPoolInstance = await assetPoolContract.deploy(multisigInstance.address);

  await assetPoolInstance.deployed();
  console.log("Asset pool contract address: ", assetPoolInstance.address);

  verifyCommands.push("npx hardhat verify " + assetPoolInstance.address + "  " + multisigInstance.address);

  console.log("Deploying asset pool contract")
  const bridgeContract = await ethers.getContractFactory("ERC20_Bridge_Logic_Restricted");
  const bridgeInstance = await bridgeContract.deploy(assetPoolInstance.address);

  await bridgeInstance.deployed();
  console.log("Bridge contract address: ", bridgeInstance.address);

  
  verifyCommands.push("npx hardhat verify " + bridgeInstance.address + "  " + assetPoolInstance.address);

  console.log("");
  console.log("To verify contracts run the following commands: \n\n", verifyCommands.join(";\n"), ";")
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
   });