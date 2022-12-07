const { ethers } = require("hardhat");

/MANUAL WAY/;

async function main() {
  console.log("Getting Admin Contract...");
  const BoxProxyAdmin = await ethers.getContract("BoxProxyAdmin");
  console.log("Getting the Proxy Contract (originally pointing to Box V1)....");
  const transparentProxy = await ethers.getContract("Box_Proxy");
  console.log("Getting Box V2 Contract ....");
  const boxV2 = await ethers.getContract("BoxV2");
  console.log(
    "Reading data through Proxy Contract (using Box ABI)[Box ABI is accessible by default]"
  );
  const proxyBox1 = await ethers.getContractAt("Box", transparentProxy.address);
  const version1 = await proxyBox1.version();
  console.log(`Current version : ${version1.toString()}`);
  console.log(
    "Upgrading Contract ... (Making Proxy Contract to point to Box V2 instead of V1..[Requires AdminContract]..)"
  );
  const upgradeTx = await BoxProxyAdmin.upgrade(
    transparentProxy.address,
    boxV2.address
  );
  await upgradeTx.wait(1);
  console.log(
    "Reading data through Proxy Contract (using BoxV2 ABI)[BoxV2 ABI is required]"
  );
  const proxyBox2 = await ethers.getContractAt(
    "BoxV2",
    transparentProxy.address
  );
  const version2 = await proxyBox2.version();
  console.log(`Current version : ${version2.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
