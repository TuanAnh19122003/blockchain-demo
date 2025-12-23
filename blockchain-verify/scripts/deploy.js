const hre = require("hardhat");

async function main() {
  const DataVerification = await hre.ethers.getContractFactory("DataVerification");
  const contract = await DataVerification.deploy();

  await contract.waitForDeployment();

  console.log("DataVerification deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
