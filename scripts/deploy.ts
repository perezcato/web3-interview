import { ethers } from "hardhat";

async function main() {
  const MemberRole = await ethers.getContractFactory('MemberRole');
  const memberRole = await MemberRole.deploy();

  await memberRole.deployed();

  console.log('Member Role smart contract successfully deployed to this address: ', memberRole.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
