async function main() {

    const InstaTokenLauncher = await ethers.getContractFactory("Insta_Token_Launcher");
    // Start deployment, returning a promise that resolves to a contract object
    const Insta_Token_Launcher = await InstaTokenLauncher.deploy();
    console.log("Contract deployed to address:", Insta_Token_Launcher.address);
}
 
 main()
 
   .then(() => process.exit(0))
 
   .catch(error => {
 
     console.error(error);
 
     process.exit(1);
 
   });