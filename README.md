# Decentralized E-Voting System

A simple blockchain-based electronic voting system developed using Solidity, Ethereum-compatible blockchain, MetaMask, and a web frontend.

## 📌 Project Overview

This project demonstrates how blockchain technology can be used to create a transparent and decentralized voting system.

Users connect their MetaMask wallet and vote for one of the available candidates. The voting logic is handled by a Solidity smart contract deployed on the Ganache blockchain.

Each wallet address is allowed to vote only once.

## 🚀 Features

- Connect wallet using MetaMask
- Display available candidates
- Cast a vote using blockchain transaction
- One vote per wallet address
- Display candidate vote counts
- Prevent duplicate voting
- Store voting data in a smart contract
- Simple and user-friendly web interface

## 🛠️ Technologies Used

- **Solidity** – Smart contract development
- **Ganache** – Local Ethereum-compatible blockchain
- **MetaMask** – Blockchain wallet
- **JavaScript** – Frontend blockchain interaction
- **HTML & CSS** – User interface
- **Remix IDE** – Smart contract compilation and deployment
- **Git & GitHub** – Version control

## 🏗️ Project Structure

```text
blockchain-e-voting-system/
│
├── blockchain/
│   └── Election.sol
│
├── index.html
├── app.js
└── style.css

⚙️ How It Works
User
  ↓
MetaMask Wallet
  ↓
Web Frontend
  ↓
Smart Contract
  ↓
Ganache Blockchain
  ↓
Vote Stored

Voting Process
1. Start the Ganache local blockchain.
2. Connect MetaMask to the Ganache network.
3. Open the voting website.
4. Connect the MetaMask wallet.
5. Select a candidate.
6. Confirm the transaction in MetaMask.
7. The smart contract records the vote.
8. The updated vote count is displayed.
🔐 One-Vote Restriction
The smart contract maintains a mapping between wallet addresses and voting status.
mapping(address => bool) public voters;

Before accepting a vote, the contract checks:
require(!voters[msg.sender], "You have already voted");

After voting, the wallet is marked as having voted.
Therefore, the same wallet cannot vote twice in the same election contract.

👥 Candidates
The initial smart contract contains three candidates:
- Candidate A
- Candidate B
- Candidate C
Additional candidates can be added by the contract owner.

🧪 Testing
The system was tested using multiple Ganache accounts.
Example:
Account 1 → Candidate A → Vote accepted
Account 1 → Candidate B → Vote rejected

Account 2 → Candidate B → Vote accepted

This demonstrates the one-vote-per-wallet rule

📷 Demo
The application provides:
- MetaMask wallet connection
- Candidate list
- Current vote counts
- Voting buttons
- Already-voted status

🔮 Future Improvements
- User identity and voter eligibility verification
- Better voter authentication
- Election start and end times
- Admin dashboard
- Multiple elections
- Improved vote privacy
- Deployment on a public test network

⚠️ Note
This project is an educational prototype developed to demonstrate blockchain-based voting concepts. It is not intended for use in real-world government elections.

👨‍💻 Author
Shambhu Barangule