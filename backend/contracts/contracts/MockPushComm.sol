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
