// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

// Push Protocol Interface
interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}

/**
 * @title PushBetEscrow Contract
 * @dev A decentralized escrow contract for betting platform with Push Protocol integration
 * @notice This contract handles betting escrow, dispute resolution, and Push notifications
 */
contract PushBetEscrow is Ownable, ReentrancyGuard {
    
    // Enums
    enum BetStatus { Pending, Active, Completed, Cancelled, Disputed }
    enum DisputeStatus { None, Pending, Resolved }
    enum BetResult { Pending, Option1, Option2, Draw }
    
    // Structs
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
    
    // State variables
    mapping(uint256 => Bet) public bets;
    mapping(uint256 => Dispute) public disputes;
    mapping(address => uint256[]) public userBets;
    mapping(address => uint256) public userWinnings;
    mapping(address => uint256) public userLosses;
    
    uint256 public nextBetId = 1;
    uint256 public totalBets = 0;
    uint256 public totalVolume = 0;
    uint256 public platformFee = 250; // 2.5% (250/10000)
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    address public feeRecipient;
    IERC20 public paymentToken; // USDC or other ERC20 token
    
    // Events
    event BetCreated(
        uint256 indexed betId,
        address indexed creator,
        string title,
        uint256 endTime,
        uint256 totalAmount
    );
    
    event BetJoined(
        uint256 indexed betId,
        address indexed participant,
        uint256 amount,
        bool isOption1
    );
    
    event BetCompleted(
        uint256 indexed betId,
        address indexed winner,
        uint256 winnings,
        BetResult result
    );
    
    event BetCancelled(
        uint256 indexed betId,
        address indexed creator,
        uint256 refundAmount
    );
    
    event DisputeCreated(
        uint256 indexed betId,
        address indexed disputer,
        string reason
    );
    
    event DisputeResolved(
        uint256 indexed betId,
        address indexed arbitrator,
        BetResult result
    );
    
    event FundsWithdrawn(
        address indexed user,
        uint256 amount
    );
    
    IPUSHCommInterface public pushComm;
    address public pushChannel;
    
    // Modifiers
    modifier onlyBetCreator(uint256 _betId) {
        require(bets[_betId].creator == msg.sender, "Only bet creator");
        _;
    }
    
    modifier onlyArbitrator(uint256 _betId) {
        require(disputes[_betId].arbitrator == msg.sender, "Only arbitrator");
        _;
    }
    
    modifier betExists(uint256 _betId) {
        require(bets[_betId].betId != 0, "Bet does not exist");
        _;
    }
    
    modifier betActive(uint256 _betId) {
        require(bets[_betId].status == BetStatus.Active, "Bet not active");
        _;
    }
    
    // Constructor
    constructor(
        address _paymentToken,
        address _feeRecipient,
        address _pushComm,
        address _pushChannel
    ) Ownable(msg.sender) {
        paymentToken = IERC20(_paymentToken);
        feeRecipient = _feeRecipient;
        pushComm = IPUSHCommInterface(_pushComm);
        pushChannel = _pushChannel;
    }
    
    // Create a new bet
    function createBet(
        string memory _title,
        string memory _description,
        string memory _option1,
        string memory _option2,
        uint256 _endTime,
        uint256 _initialAmount
    ) external nonReentrant {
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_description).length > 0, "Description required");
        require(bytes(_option1).length > 0, "Option 1 required");
        require(bytes(_option2).length > 0, "Option 2 required");
        require(_endTime > block.timestamp, "End time must be in future");
        require(_initialAmount > 0, "Initial amount must be > 0");
        
        // Transfer initial amount from creator
        require(
            paymentToken.transferFrom(msg.sender, address(this), _initialAmount),
            "Transfer failed"
        );
        
        uint256 betId = nextBetId++;
        bets[betId] = Bet({
            betId: betId,
            creator: msg.sender,
            title: _title,
            description: _description,
            option1: _option1,
            option2: _option2,
            option1Amount: _initialAmount,
            option2Amount: 0,
            totalAmount: _initialAmount,
            endTime: _endTime,
            status: BetStatus.Active,
            result: BetResult.Pending,
            winner: address(0),
            createdAt: block.timestamp,
            completedAt: 0
        });
        
        userBets[msg.sender].push(betId);
        totalBets++;
        totalVolume += _initialAmount;
        
        emit BetCreated(betId, msg.sender, _title, _endTime, _initialAmount);
        
        // Send Push notification
        _sendPushNotification(
            msg.sender,
            string(abi.encodePacked("New bet created: ", _title))
        );
    }
    
    // Join a bet
    function joinBet(
        uint256 _betId,
        bool _isOption1,
        uint256 _amount
    ) external nonReentrant betExists(_betId) betActive(_betId) {
        Bet storage bet = bets[_betId];
        require(block.timestamp < bet.endTime, "Bet has ended");
        require(_amount > 0, "Amount must be > 0");
        
        // Transfer amount from participant
        require(
            paymentToken.transferFrom(msg.sender, address(this), _amount),
            "Transfer failed"
        );
        
        if (_isOption1) {
            bet.option1Amount += _amount;
        } else {
            bet.option2Amount += _amount;
        }
        
        bet.totalAmount += _amount;
        userBets[msg.sender].push(_betId);
        totalVolume += _amount;
        
        emit BetJoined(_betId, msg.sender, _amount, _isOption1);
        
        // Send Push notification
        _sendPushNotification(
            bet.creator,
            string(abi.encodePacked("Someone joined your bet: ", bet.title))
        );
    }
    
    // Complete a bet (only by creator or after end time)
    function completeBet(
        uint256 _betId,
        BetResult _result
    ) external nonReentrant betExists(_betId) {
        Bet storage bet = bets[_betId];
        require(
            msg.sender == bet.creator || block.timestamp >= bet.endTime,
            "Not authorized or too early"
        );
        require(bet.status == BetStatus.Active, "Bet not active");
        require(_result != BetResult.Pending, "Invalid result");
        
        bet.status = BetStatus.Completed;
        bet.result = _result;
        bet.completedAt = block.timestamp;
        
        if (_result == BetResult.Draw) {
            // Refund all participants proportionally
            _refundBet(_betId);
        } else {
            // Determine winner and distribute winnings
            address winner = _result == BetResult.Option1 ? 
                _getOption1Winner(_betId) : _getOption2Winner(_betId);
            bet.winner = winner;
            
            if (winner != address(0)) {
                uint256 winnings = _calculateWinnings(_betId, winner);
                userWinnings[winner] += winnings;
                
                // Transfer winnings to winner
                require(
                    paymentToken.transfer(winner, winnings),
                    "Transfer failed"
                );
                
                emit BetCompleted(_betId, winner, winnings, _result);
            }
        }
        
        // Send Push notification
        _sendPushNotification(
            bet.creator,
            string(abi.encodePacked("Bet completed: ", bet.title))
        );
    }
    
    // Cancel a bet (only by creator, before any participants join)
    function cancelBet(uint256 _betId) external nonReentrant onlyBetCreator(_betId) {
        Bet storage bet = bets[_betId];
        require(bet.status == BetStatus.Active, "Bet not active");
        require(bet.option2Amount == 0, "Cannot cancel bet with participants");
        
        bet.status = BetStatus.Cancelled;
        
        // Refund creator
        require(
            paymentToken.transfer(bet.creator, bet.option1Amount),
            "Transfer failed"
        );
        
        emit BetCancelled(_betId, bet.creator, bet.option1Amount);
    }
    
    // Create a dispute
    function createDispute(
        uint256 _betId,
        string memory _reason
    ) external nonReentrant betExists(_betId) {
        require(disputes[_betId].status == DisputeStatus.None, "Dispute already exists");
        require(bytes(_reason).length > 0, "Reason required");
        
        disputes[_betId] = Dispute({
            betId: _betId,
            disputer: msg.sender,
            reason: _reason,
            status: DisputeStatus.Pending,
            arbitrator: address(0),
            createdAt: block.timestamp,
            resolvedAt: 0
        });
        
        bets[_betId].status = BetStatus.Disputed;
        
        emit DisputeCreated(_betId, msg.sender, _reason);
    }
    
    // Assign arbitrator to dispute
    function assignArbitrator(
        uint256 _betId,
        address _arbitrator
    ) external onlyOwner {
        require(disputes[_betId].status == DisputeStatus.Pending, "No pending dispute");
        require(_arbitrator != address(0), "Invalid arbitrator");
        
        disputes[_betId].arbitrator = _arbitrator;
    }
    
    // Resolve dispute
    function resolveDispute(
        uint256 _betId,
        BetResult _result
    ) external nonReentrant onlyArbitrator(_betId) {
        require(disputes[_betId].status == DisputeStatus.Pending, "No pending dispute");
        require(_result != BetResult.Pending, "Invalid result");
        
        disputes[_betId].status = DisputeStatus.Resolved;
        disputes[_betId].resolvedAt = block.timestamp;
        
        // Complete the bet with arbitrator's decision
        Bet storage bet = bets[_betId];
        bet.status = BetStatus.Completed;
        bet.result = _result;
        bet.completedAt = block.timestamp;
        
        if (_result == BetResult.Draw) {
            // Refund all participants proportionally
            _refundBet(_betId);
        } else {
            // Determine winner and distribute winnings
            address winner = _result == BetResult.Option1 ? 
                _getOption1Winner(_betId) : _getOption2Winner(_betId);
            bet.winner = winner;
            
            if (winner != address(0)) {
                uint256 winnings = _calculateWinnings(_betId, winner);
                userWinnings[winner] += winnings;
                
                // Transfer winnings to winner
                require(
                    paymentToken.transfer(winner, winnings),
                    "Transfer failed"
                );
                
                emit BetCompleted(_betId, winner, winnings, _result);
            }
        }
        
        // Send Push notification
        _sendPushNotification(
            bet.creator,
            string(abi.encodePacked("Bet completed: ", bet.title))
        );
        
        emit DisputeResolved(_betId, msg.sender, _result);
    }
    
    // Withdraw winnings
    function withdrawWinnings() external nonReentrant {
        uint256 amount = userWinnings[msg.sender];
        require(amount > 0, "No winnings to withdraw");
        
        userWinnings[msg.sender] = 0;
        
        require(
            paymentToken.transfer(msg.sender, amount),
            "Transfer failed"
        );
        
        emit FundsWithdrawn(msg.sender, amount);
    }
    
    // Internal functions
    function _refundBet(uint256 _betId) internal {
        Bet storage bet = bets[_betId];
        
        // Refund option1 participants
        if (bet.option1Amount > 0) {
            require(
                paymentToken.transfer(bet.creator, bet.option1Amount),
                "Transfer failed"
            );
        }
        
        // Refund option2 participants (would need to track participants)
        // This is simplified - in production, you'd track all participants
    }
    
    function _getOption1Winner(uint256 _betId) internal view returns (address) {
        // Simplified - in production, you'd track all participants
        return bets[_betId].creator;
    }
    
    function _getOption2Winner(uint256 _betId) internal view returns (address) {
        // Simplified - in production, you'd track all participants
        return bets[_betId].creator;
    }
    
    function _calculateWinnings(uint256 _betId, address /* _winner */) internal view returns (uint256) {
        Bet storage bet = bets[_betId];
        uint256 totalWinnings = bet.totalAmount;
        uint256 fee = (totalWinnings * platformFee) / FEE_DENOMINATOR;
        return totalWinnings - fee;
    }
    
    function _sendPushNotification(address _recipient, string memory _message) internal {
        if (address(pushComm) != address(0) && pushChannel != address(0)) {
            bytes memory identity = abi.encodePacked(
                "0", // notification type
                "+", // separator
                "3", // payload type
                "+", // separator
                _message
            );
            
            try pushComm.sendNotification(pushChannel, _recipient, identity) {
                // Notification sent successfully
            } catch {
                // Notification failed, but don't revert transaction
            }
        }
    }
    
    // View functions
    function getBet(uint256 _betId) external view returns (Bet memory) {
        return bets[_betId];
    }
    
    function getUserBets(address _user) external view returns (uint256[] memory) {
        return userBets[_user];
    }
    
    function getDispute(uint256 _betId) external view returns (Dispute memory) {
        return disputes[_betId];
    }
    
    function getPlatformStats() external view returns (
        uint256 _totalBets,
        uint256 _totalVolume,
        uint256 _platformFee,
        address _feeRecipient
    ) {
        return (totalBets, totalVolume, platformFee, feeRecipient);
    }
    
    // Admin functions
    function setPlatformFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 1000, "Fee too high"); // Max 10%
        platformFee = _newFee;
    }
    
    function setFeeRecipient(address _newRecipient) external onlyOwner {
        require(_newRecipient != address(0), "Invalid address");
        feeRecipient = _newRecipient;
    }
    
    function setPushComm(address _newPushComm) external onlyOwner {
        pushComm = IPUSHCommInterface(_newPushComm);
    }
    
    function setPushChannel(address _newChannel) external onlyOwner {
        pushChannel = _newChannel;
    }
    
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(balance > 0, "No funds to withdraw");
        
        require(
            paymentToken.transfer(owner(), balance),
            "Transfer failed"
        );
    }
}
