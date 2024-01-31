import hre from 'hardhat';

const contractAddress = "0xF739B72738a8D99B6955473E2817d558Ea1fFe10";

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    // Deploy the CryptoDevs Contract
    const nftContract = await hre.ethers.deployContract("CryptoDevs", [contractAddress]);

    // wait for the contract to deploy
    await nftContract.waitForDeployment();

    // print the address of the deployed contract
    console.log("NFT Contract Address:", nftContract.target);
    // 0x39403832Ec2d0BaF7F492F5C1072D2ea19e64796

    // Sleep for 30 seconds while Etherscan indexes the new contract deployment
    await sleep(30 * 1000); // 30s = 30 * 1000 milliseconds

    // Verify the contract on etherscan
    await hre.run("verify:verify", {
      address: nftContract.target,
      constructorArguments: [contractAddress],
    });
  }

  // Call the main function and catch if there is any error
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });