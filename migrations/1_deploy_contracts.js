const SmokieJoe = artifacts.require("SmokieJoe");
const Vesting = artifacts.require("Vesting");
const Staking = artifacts.require("Staking");

module.exports = async function (deployer, network, accounts) {
  const initialOwner = "0x6368f0267b916CC578657D6C897F49426bbBd6E7"; // Replace with actual owner address
  const devWallet = "0xFe43eB48bfD905F4768cDAc18B7d0c6c6AD6240D"; // Replace with your dev wallet address
  const vestingVault = "0xC1cFb417F1D2059229eDE032b24A066d4761eB01"; // Replace with vesting vault address

  // Deploy the SmokieJoe contract
  console.log("Deploying SmokieJoe...");
  await deployer.deploy(SmokieJoe, initialOwner, devWallet, vestingVault);
  const smokieJoe = await SmokieJoe.deployed();
  console.log("SmokieJoe deployed to:", smokieJoe.address);

  // Deploy the Vesting contract
  console.log("Deploying Vesting...");
  await deployer.deploy(Vesting, smokieJoe.address, initialOwner);
  const vesting = await Vesting.deployed();
  console.log("Vesting deployed to:", vesting.address);

  // Deploy the Staking contract
  console.log("Deploying Staking...");
  await deployer.deploy(Staking, smokieJoe.address, initialOwner);
  const staking = await Staking.deployed();
  console.log("Staking deployed to:", staking.address);

  // Approve the staking contract to use tokens for rewards
  const allowance = web3.utils.toWei("100000000", "ether"); // Allowance amount (18 decimals)
  await smokieJoe.approveStakingContract(staking.address, allowance);
  console.log(`Approved ${allowance} tokens for staking rewards`);
};
