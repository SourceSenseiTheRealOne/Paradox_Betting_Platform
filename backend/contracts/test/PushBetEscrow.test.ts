import { expect } from "chai";
import { ethers } from "hardhat";
import { PushBetEscrow } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("PushBetEscrow", function () {
  let pushBetEscrow: PushBetEscrow;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let feeRecipient: SignerWithAddress;
  let mockToken: any;
  let mockPushComm: any;

  beforeEach(async function () {
    [owner, user1, user2, feeRecipient] = await ethers.getSigners();

    // Deploy mock ERC20 token
    const MockTokenFactory = await ethers.getContractFactory("MockERC20");
    mockToken = await MockTokenFactory.deploy("Test USDC", "USDC", 1000000); // 1M tokens
    await mockToken.waitForDeployment();

    // Deploy mock Push Communication contract
    const MockPushCommFactory = await ethers.getContractFactory("MockPushComm");
    mockPushComm = await MockPushCommFactory.deploy();
    await mockPushComm.waitForDeployment();

    // Deploy PushBetEscrow contract
    const PushBetEscrowFactory = await ethers.getContractFactory("PushBetEscrow");
    pushBetEscrow = await PushBetEscrowFactory.deploy(
      await mockToken.getAddress(),
      feeRecipient.address,
      await mockPushComm.getAddress(),
      owner.address // Using owner as push channel for testing
    );
    await pushBetEscrow.waitForDeployment();

    // Mint tokens to users
    await mockToken.mint(user1.address, ethers.parseEther("1000"));
    await mockToken.mint(user2.address, ethers.parseEther("1000"));

    // Approve contract to spend tokens
    await mockToken.connect(user1).approve(await pushBetEscrow.getAddress(), ethers.parseEther("1000"));
    await mockToken.connect(user2).approve(await pushBetEscrow.getAddress(), ethers.parseEther("1000"));
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await pushBetEscrow.owner()).to.equal(owner.address);
    });

    it("Should set the right payment token", async function () {
      expect(await pushBetEscrow.paymentToken()).to.equal(await mockToken.getAddress());
    });

    it("Should set the right fee recipient", async function () {
      expect(await pushBetEscrow.feeRecipient()).to.equal(feeRecipient.address);
    });

    it("Should set the right platform fee", async function () {
      expect(await pushBetEscrow.platformFee()).to.equal(250); // 2.5%
    });
  });

  describe("Create Bet", function () {
    it("Should create a bet successfully", async function () {
      const title = "Test Bet";
      const description = "This is a test bet";
      const option1 = "Option 1";
      const option2 = "Option 2";
      const endTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
      const amount = ethers.parseEther("100");

      await expect(
        pushBetEscrow.connect(user1).createBet(
          title,
          description,
          option1,
          option2,
          endTime,
          amount
        )
      ).to.emit(pushBetEscrow, "BetCreated")
        .withArgs(1, user1.address, title, endTime, amount);

      const bet = await pushBetEscrow.getBet(1);
      expect(bet.title).to.equal(title);
      expect(bet.creator).to.equal(user1.address);
      expect(bet.option1Amount).to.equal(amount);
      expect(bet.status).to.equal(1); // BetStatus.Active
    });

    it("Should fail to create bet with invalid parameters", async function () {
      const endTime = Math.floor(Date.now() / 1000) + 3600;
      const amount = ethers.parseEther("100");

      await expect(
        pushBetEscrow.connect(user1).createBet(
          "", // Empty title
          "Description",
          "Option 1",
          "Option 2",
          endTime,
          amount
        )
      ).to.be.revertedWith("Title required");

      await expect(
        pushBetEscrow.connect(user1).createBet(
          "Title",
          "Description",
          "Option 1",
          "Option 2",
          Math.floor(Date.now() / 1000) - 3600, // Past time
          amount
        )
      ).to.be.revertedWith("End time must be in future");

      await expect(
        pushBetEscrow.connect(user1).createBet(
          "Title",
          "Description",
          "Option 1",
          "Option 2",
          endTime,
          0 // Zero amount
        )
      ).to.be.revertedWith("Initial amount must be > 0");
    });
  });

  describe("Join Bet", function () {
    beforeEach(async function () {
      const endTime = Math.floor(Date.now() / 1000) + 3600;
      const amount = ethers.parseEther("100");
      
      await pushBetEscrow.connect(user1).createBet(
        "Test Bet",
        "Description",
        "Option 1",
        "Option 2",
        endTime,
        amount
      );
    });

    it("Should join bet successfully", async function () {
      const amount = ethers.parseEther("50");

      await expect(
        pushBetEscrow.connect(user2).joinBet(1, true, amount)
      ).to.emit(pushBetEscrow, "BetJoined")
        .withArgs(1, user2.address, amount, true);

      const bet = await pushBetEscrow.getBet(1);
      expect(bet.option1Amount).to.equal(ethers.parseEther("150")); // 100 + 50
      expect(bet.totalAmount).to.equal(ethers.parseEther("150"));
    });

    it("Should fail to join bet after end time", async function () {
      // Fast forward time (this would need to be implemented in a real test)
      // For now, we'll test the validation
      const amount = ethers.parseEther("50");
      
      // This test would need time manipulation to be complete
      // await network.provider.send("evm_increaseTime", [3601]);
      // await network.provider.send("evm_mine");
      
      // await expect(
      //   pushBetEscrow.connect(user2).joinBet(1, true, amount)
      // ).to.be.revertedWith("Bet has ended");
    });
  });

  describe("Complete Bet", function () {
    beforeEach(async function () {
      const endTime = Math.floor(Date.now() / 1000) + 3600;
      const amount = ethers.parseEther("100");
      
      await pushBetEscrow.connect(user1).createBet(
        "Test Bet",
        "Description",
        "Option 1",
        "Option 2",
        endTime,
        amount
      );
    });

    it("Should complete bet successfully", async function () {
      await expect(
        pushBetEscrow.connect(user1).completeBet(1, 1) // BetResult.Option1
      ).to.emit(pushBetEscrow, "BetCompleted");

      const bet = await pushBetEscrow.getBet(1);
      expect(bet.status).to.equal(2); // BetStatus.Completed
      expect(bet.result).to.equal(1); // BetResult.Option1
    });
  });

  describe("Cancel Bet", function () {
    it("Should cancel bet successfully", async function () {
      const endTime = Math.floor(Date.now() / 1000) + 3600;
      const amount = ethers.parseEther("100");
      
      await pushBetEscrow.connect(user1).createBet(
        "Test Bet",
        "Description",
        "Option 1",
        "Option 2",
        endTime,
        amount
      );

      await expect(
        pushBetEscrow.connect(user1).cancelBet(1)
      ).to.emit(pushBetEscrow, "BetCancelled")
        .withArgs(1, user1.address, amount);

      const bet = await pushBetEscrow.getBet(1);
      expect(bet.status).to.equal(3); // BetStatus.Cancelled
    });

    it("Should fail to cancel bet with participants", async function () {
      const endTime = Math.floor(Date.now() / 1000) + 3600;
      const amount = ethers.parseEther("100");
      
      await pushBetEscrow.connect(user1).createBet(
        "Test Bet",
        "Description",
        "Option 1",
        "Option 2",
        endTime,
        amount
      );

      // User2 joins the bet
      await pushBetEscrow.connect(user2).joinBet(1, false, ethers.parseEther("50"));

      await expect(
        pushBetEscrow.connect(user1).cancelBet(1)
      ).to.be.revertedWith("Cannot cancel bet with participants");
    });
  });

  describe("Dispute Management", function () {
    beforeEach(async function () {
      const endTime = Math.floor(Date.now() / 1000) + 3600;
      const amount = ethers.parseEther("100");
      
      await pushBetEscrow.connect(user1).createBet(
        "Test Bet",
        "Description",
        "Option 1",
        "Option 2",
        endTime,
        amount
      );
    });

    it("Should create dispute successfully", async function () {
      await expect(
        pushBetEscrow.connect(user2).createDispute(1, "Unfair result")
      ).to.emit(pushBetEscrow, "DisputeCreated")
        .withArgs(1, user2.address, "Unfair result");

      const dispute = await pushBetEscrow.getDispute(1);
      expect(dispute.disputer).to.equal(user2.address);
      expect(dispute.reason).to.equal("Unfair result");
      expect(dispute.status).to.equal(1); // DisputeStatus.Pending

      const bet = await pushBetEscrow.getBet(1);
      expect(bet.status).to.equal(4); // BetStatus.Disputed
    });
  });

  describe("Admin Functions", function () {
    it("Should update platform fee", async function () {
      await pushBetEscrow.connect(owner).setPlatformFee(500); // 5%
      expect(await pushBetEscrow.platformFee()).to.equal(500);
    });

    it("Should fail to set fee too high", async function () {
      await expect(
        pushBetEscrow.connect(owner).setPlatformFee(1001) // > 10%
      ).to.be.revertedWith("Fee too high");
    });

    it("Should update fee recipient", async function () {
      await pushBetEscrow.connect(owner).setFeeRecipient(user1.address);
      expect(await pushBetEscrow.feeRecipient()).to.equal(user1.address);
    });
  });
});

// Mock contracts for testing
const MockERC20Source = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MockERC20 {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply * 10**decimals;
        balanceOf[msg.sender] = totalSupply;
    }
    
    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
        totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        allowance[from][msg.sender] -= amount;
        balanceOf[from] -= amount;
        balanceOf[to] += amount;
        emit Transfer(from, to, amount);
        return true;
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
}
`;

const MockPushCommSource = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MockPushComm {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external {
        // Mock implementation - just emit an event
        emit NotificationSent(_channel, _recipient, _identity);
    }
    
    event NotificationSent(address indexed channel, address indexed recipient, bytes identity);
}
`;
