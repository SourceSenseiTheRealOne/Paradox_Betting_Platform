import { ethers } from "hardhat";
import { PushBetEscrow } from "../typechain-types";

async function main() {
  console.log("Deploying PushBetEscrow contract...");

  // Get the contract factory
  const PushBetEscrowFactory = await ethers.getContractFactory("PushBetEscrow");

  // Configuration - these should be set in your .env file
  const paymentToken = process.env.PAYMENT_TOKEN_ADDRESS || "0x0000000000000000000000000000000000000000"; // USDC address
  const feeRecipient = process.env.FEE_RECIPIENT || "0x0000000000000000000000000000000000000000"; // Your fee recipient address
  const pushComm = process.env.PUSH_COMM_ADDRESS || "0x0000000000000000000000000000000000000000"; // Push Communication contract
  const pushChannel = process.env.PUSH_CHANNEL_ADDRESS || "0x0000000000000000000000000000000000000000"; // Your Push channel address

  console.log("Configuration:");
  console.log("- Payment Token:", paymentToken);
  console.log("- Fee Recipient:", feeRecipient);
  console.log("- Push Comm:", pushComm);
  console.log("- Push Channel:", pushChannel);

  // Deploy the contract
  const pushBetEscrow = await PushBetEscrowFactory.deploy(
    paymentToken,
    feeRecipient,
    pushComm,
    pushChannel
  );

  await pushBetEscrow.waitForDeployment();

  const contractAddress = await pushBetEscrow.getAddress();
  console.log("PushBetEscrow deployed to:", contractAddress);

  // Verify deployment
  console.log("\nVerifying deployment...");
  const owner = await pushBetEscrow.owner();
  const platformFee = await pushBetEscrow.platformFee();
  const totalBets = await pushBetEscrow.totalBets();
  const totalVolume = await pushBetEscrow.totalVolume();

  console.log("Contract verification:");
  console.log("- Owner:", owner);
  console.log("- Platform Fee:", platformFee.toString(), "basis points");
  console.log("- Total Bets:", totalBets.toString());
  console.log("- Total Volume:", totalVolume.toString());

  // Save deployment info
  const deploymentInfo = {
    contractAddress,
    network: process.env.HARDHAT_NETWORK || "hardhat",
    timestamp: new Date().toISOString(),
    paymentToken,
    feeRecipient,
    pushComm,
    pushChannel,
    owner,
    platformFee: platformFee.toString(),
  };

  console.log("\nDeployment successful!");
  console.log("Contract Address:", contractAddress);
  console.log("Network:", process.env.HARDHAT_NETWORK || "hardhat");
  console.log("Timestamp:", deploymentInfo.timestamp);

  // Instructions for next steps
  console.log("\nNext steps:");
  console.log("1. Update your frontend with the contract address:", contractAddress);
  console.log("2. Set up Push Protocol channel if not already done");
  console.log("3. Deploy a USDC token contract for testing if needed");
  console.log("4. Test the contract functions");

  return contractAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
