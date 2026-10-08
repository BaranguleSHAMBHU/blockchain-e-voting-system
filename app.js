let provider;
let signer;
let contract;

const contractAddress = "0x7d0f731AE4e487B0F1073726224f1131c3cF30cD";

const contractABI = [
    "function candidateCount() view returns (uint256)",
    "function candidates(uint256) view returns (uint256 id, string name, uint256 voteCount)",
    "function voters(address) view returns (bool)",
    "function vote(uint256 candidateId)"
];

const connectButton = document.getElementById("connectButton");
const walletAddress = document.getElementById("walletAddress");
const candidatesDiv = document.getElementById("candidates");
const message = document.getElementById("message");


connectButton.addEventListener("click", connectWallet);


async function connectWallet() {

    if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
    }

    try {

        await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        provider = new ethers.BrowserProvider(window.ethereum);

        signer = await provider.getSigner();

        const address = await signer.getAddress();

        walletAddress.innerText =
            "Connected Wallet: " + address;

        contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );

        await loadCandidates();

    } catch (error) {

        console.error(error);

        message.innerText =
            "Failed to connect wallet.";

    }
}


async function loadCandidates() {

    try {

        const count = await contract.candidateCount();

        const address = await signer.getAddress();

        const alreadyVoted = await contract.voters(address);

        candidatesDiv.innerHTML = "";

        for (let i = 1; i <= Number(count); i++) {

            const candidate = await contract.candidates(i);

            const candidateId = candidate[0];
            const candidateName = candidate[1];
            const voteCount = candidate[2];

            const candidateDiv = document.createElement("div");

            candidateDiv.className = "candidate";

            if (alreadyVoted) {

                candidateDiv.innerHTML = `
                    <h3>${candidateName}</h3>

                    <p>
                        Votes: ${voteCount}
                    </p>

                    <button class="vote-button" disabled>
                        ✓ You have already voted
                    </button>
                `;

            } else {

                candidateDiv.innerHTML = `
                    <h3>${candidateName}</h3>

                    <p>
                        Votes: ${voteCount}
                    </p>

                    <button
                        class="vote-button"
                        onclick="vote(${candidateId})">

                        Vote

                    </button>
                `;
            }

            candidatesDiv.appendChild(candidateDiv);
        }

    } catch (error) {

        console.error(error);

        message.innerText =
            "Could not load candidates.";
    }
}

async function vote(candidateId) {

    try {

        message.innerText =
            "Checking voting eligibility...";

        const address =
            await signer.getAddress();

        const alreadyVoted =
            await contract.voters(address);

        if (alreadyVoted) {

            message.innerText =
                "You have already voted!";

            return;
        }

        message.innerText =
            "Waiting for MetaMask confirmation...";

        const transaction =
            await contract.vote(candidateId);

        message.innerText =
            "Transaction submitted. Waiting for confirmation...";

        await transaction.wait();

        message.innerText =
            "Vote recorded successfully!";

        await loadCandidates();

    } catch (error) {

        console.error(error);

        message.innerText =
            "Voting failed or transaction was rejected.";

    }
}