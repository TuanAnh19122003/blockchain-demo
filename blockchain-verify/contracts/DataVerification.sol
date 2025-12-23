// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataVerification {

    struct Record {
        address owner;
        uint timestamp;
        bool exists;
    }

    mapping(bytes32 => Record) private records;

    function storeHash(bytes32 _hash) public {
        require(!records[_hash].exists, "Hash already exists");
        records[_hash] = Record(msg.sender, block.timestamp, true);
    }

    function verifyHash(bytes32 _hash) public view returns (bool) {
        return records[_hash].exists;
    }
}
