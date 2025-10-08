# PushBet Escrow Contract

A decentralized escrow contract for betting platform with Push Protocol integration, designed for Push Chain deployment.

## Overview

The PushBetEscrow contract enables users to create, join, and manage betting escrows with the following features:

- **Decentralized Escrow**: Secure holding of betting funds
- **Push Protocol Integration**: Real-time notifications for all betting activities
- **Dispute Resolution**: Built-in arbitration system for contested bets
- **Multi-token Support**: Works with any ERC20 token (USDC, PUSH, etc.)
- **Platform Fees**: Configurable fee structure for platform sustainability

## Contract Features

### Core Functionality

1. **Create Bet**: Users can create betting escrows with custom terms
2. **Join Bet**: Other users can join existing bets by choosing an option
3. **Complete Bet**: Bets can be completed by creators or after end time
4. **Cancel Bet**: Creators can cancel bets before participants join
5. **Dispute Management**: Users can create disputes for contested results
6. **Arbitration**: Designated arbitrators can resolve disputes

### Push Protocol Integration

- **Real-time Notifications**: Users receive notifications for:
  - New bet creation
  - Bet participation
  - Bet completion
  - Dispute creation
  - Dispute resolution
- **Channel Management**: Uses Push Protocol channels for communication
- **Error Handling**: Graceful handling of notification failures

### Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Admin functions restricted to contract owner
- **Input Validation**: Comprehensive validation of all inputs
- **Emergency Withdraw**: Owner can withdraw funds in emergency situations

## Contract Structure

### Enums

```solidity
enum BetStatus { Pending, Active, Completed, Cancelled, Disputed }
enum DisputeStatus { None, Pending, Resolved }
enum BetResult { Pending, Option1, Option2, Draw }
```

### Key Structs

```solidity
struct Bet {
    uint256 betId;
    address creator;
    string title;
    string description;
    string option1;
    string option2;
    uint256 option1Amount;
    uint256 option2Amount;
    uint256 totalAmount;
    uint256 endTime;
    BetStatus status;
    BetResult result;
    address winner;
    uint256 createdAt;
    uint256 completedAt;
}

struct Dispute {
    uint256 betId;
    address disputer;
    string reason;
    DisputeStatus status;
    address arbitrator;
    uint256 createdAt;
    uint256 resolvedAt;
}
```

## Deployment

### Prerequisites

1. **Node.js** (v16 or higher)
2. **Hardhat** development environment
3. **Push Chain** network access
4. **ERC20 Token** contract (for payments)

### Configuration

1. Copy `config.example.ts` to `config.ts`
2. Update configuration with your values:
   - Push Chain RPC URLs
   - Wallet mnemonic
   - Contract addresses
   - Gas settings

### Environment Variables

Create a `.env` file with:

```env
# Push Chain Configuration
PUSH_TESTNET_URL=https://testnet.pushchain.io
PUSH_MAINNET_URL=https://mainnet.pushchain.io

# Wallet Configuration
MNEMONIC=your twelve word mnemonic phrase here

# Contract Configuration
PAYMENT_TOKEN_ADDRESS=0x... # USDC or other ERC20 token
FEE_RECIPIENT=0x... # Your fee recipient address
PUSH_COMM_ADDRESS=0x... # Push Communication contract
PUSH_CHANNEL_ADDRESS=0x... # Your Push channel address
```

### Deployment Commands

```bash
# Compile contracts
npm run compile

# Run tests
npm run test:pushbet

# Deploy to Push Chain testnet
npm run deploy:pushbet:testnet

# Deploy to Push Chain mainnet
npm run deploy:pushbet:mainnet

# Verify contract on Push Chain
npm run verify:pushbet:testnet
```

## Usage

### Creating a Bet

```solidity
// Create a new bet
await pushBetEscrow.createBet(
    "Lakers vs Celtics",           // title
    "Who will win the championship?", // description
    "Lakers",                      // option1
    "Celtics",                     // option2
    endTime,                       // end time (timestamp)
    ethers.parseEther("100")       // initial amount
);
```

### Joining a Bet

```solidity
// Join a bet by choosing an option
await pushBetEscrow.joinBet(
    betId,                         // bet ID
    true,                          // isOption1 (true for option1, false for option2)
    ethers.parseEther("50")        // amount to bet
);
```

### Completing a Bet

```solidity
// Complete a bet with result
await pushBetEscrow.completeBet(
    betId,                         // bet ID
    1                              // BetResult (1 = Option1, 2 = Option2, 3 = Draw)
);
```

### Creating a Dispute

```solidity
// Create a dispute for a bet
await pushBetEscrow.createDispute(
    betId,                         // bet ID
    "Unfair result"                // reason
);
```

## Push Protocol Integration

### Setting Up Push Channel

1. Create a Push Protocol channel
2. Deploy the contract with your channel address
3. Add the contract as a delegate to your channel

### Notification Types

The contract sends notifications for:

- **Bet Creation**: "New bet created: [title]"
- **Bet Participation**: "Someone joined your bet: [title]"
- **Bet Completion**: "Bet completed: [title]"
- **Dispute Creation**: "Dispute created for bet: [title]"

## Testing

### Running Tests

```bash
# Run all tests
npm run test:pushbet

# Run specific test file
npx hardhat test test/PushBetEscrow.test.ts --network hardhat
```

### Test Coverage

The test suite covers:

- Contract deployment
- Bet creation and validation
- Bet joining and participation
- Bet completion and resolution
- Dispute creation and resolution
- Admin functions
- Error conditions
- Push Protocol integration

## Security Considerations

### Access Control

- **Owner Functions**: Only contract owner can modify platform settings
- **Bet Creator**: Only bet creator can complete or cancel their bets
- **Arbitrator**: Only assigned arbitrators can resolve disputes

### Input Validation

- All string inputs are validated for non-empty values
- Amounts must be greater than zero
- End times must be in the future
- Bet IDs must exist before operations

### Reentrancy Protection

- All external calls are protected with `nonReentrant` modifier
- State changes occur before external calls
- Emergency withdraw function for owner

## Gas Optimization

### Optimizations Applied

- **Packed Structs**: Efficient storage layout
- **Batch Operations**: Multiple operations in single transaction
- **Event Optimization**: Minimal event data
- **Function Visibility**: Appropriate visibility levels

### Gas Estimates

- **Create Bet**: ~150,000 gas
- **Join Bet**: ~100,000 gas
- **Complete Bet**: ~80,000 gas
- **Create Dispute**: ~60,000 gas

## Upgradeability

The contract is designed to be upgradeable using OpenZeppelin's upgradeable contracts pattern. Future versions can be deployed and users can migrate to new implementations.

## License

MIT License - see LICENSE file for details.

## Support

For questions and support:

- **Documentation**: [Push Protocol Docs](https://push.org/docs)
- **Community**: [Push Protocol Discord](https://discord.gg/pushprotocol)
- **Issues**: Create an issue in this repository

## Changelog

### v1.0.0
- Initial release
- Core escrow functionality
- Push Protocol integration
- Dispute resolution system
- Multi-token support
