// Web3 Connection and Authentication

// Global variables
let web3;
let userAccount;
let isConnected = false;

// DOM elements
const connectWalletBtn = document.getElementById('connectWallet');
const walletInfo = document.getElementById('walletInfo');
const walletAddress = document.getElementById('walletAddress');

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    checkIfWalletIsConnected();
    
    // Add event listener to connect wallet button
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', connectWallet);
    }
});

// Check if MetaMask is installed and if the user is already connected
async function checkIfWalletIsConnected() {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        
        try {
            // Check if we're authorized to access the user's wallet
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            
            if (accounts.length > 0) {
                // User is already connected
                userAccount = accounts[0];
                isConnected = true;
                console.log('Found an authorized account:', userAccount);
                updateUIOnConnect();
                
                // Check if we're on the right network (Sepolia)
                checkNetwork();
            } else {
                console.log('No authorized account found');
            }
            
            // Listen for account changes
            window.ethereum.on('accountsChanged', handleAccountsChanged);
            
            // Listen for chain changes
            window.ethereum.on('chainChanged', handleChainChanged);
            
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('Please install MetaMask!');
        if (connectWalletBtn) {
            connectWalletBtn.textContent = 'Install MetaMask';
            connectWalletBtn.addEventListener('click', () => {
                window.open('https://metamask.io/download.html', '_blank');
            });
        }
    }
}

// Connect to MetaMask wallet
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            isConnected = true;
            console.log('Connected to account:', userAccount);
            
            // Update UI
            updateUIOnConnect();
            
            // Check network
            checkNetwork();
            
            // Refresh the page to update any data that depends on the wallet
            // Commenting this out for now as it might be disruptive
            // location.reload();
            
        } catch (error) {
            console.error('User denied account access', error);
        }
    } else {
        alert('Please install MetaMask!');
    }
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // User has disconnected all accounts
        console.log('Please connect to MetaMask.');
        userAccount = null;
        isConnected = false;
        updateUIOnDisconnect();
    } else if (accounts[0] !== userAccount) {
        // User has switched accounts
        userAccount = accounts[0];
        console.log('Account switched to:', userAccount);
        updateUIOnConnect();
        
        // Refresh the page to update any data that depends on the wallet
        location.reload();
    }
}

// Handle chain/network changes
function handleChainChanged(chainId) {
    console.log('Network changed to:', chainId);
    // Reload the page when the network changes
    window.location.reload();
}

// Check if we're on the Sepolia testnet
async function checkNetwork() {
    if (window.ethereum) {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        
        // Sepolia testnet chain ID is 0xaa36a7 (11155111 in decimal)
        if (chainId !== '0xaa36a7') {
            alert('Please connect to the Sepolia testnet to use this application.');
            
            // Ask user to switch to Sepolia
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0xaa36a7' }], // Sepolia testnet
                });
            } catch (switchError) {
                // This error code means the chain has not been added to MetaMask
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: '0xaa36a7',
                                chainName: 'Sepolia Testnet',
                                nativeCurrency: {
                                    name: 'Sepolia ETH',
                                    symbol: 'ETH',
                                    decimals: 18
                                },
                                rpcUrls: ['https://rpc.sepolia.org'],
                                blockExplorerUrls: ['https://sepolia.etherscan.io']
                            }]
                        });
                    } catch (addError) {
                        console.error('Failed to add Sepolia network', addError);
                    }
                } else {
                    console.error('Failed to switch to Sepolia network', switchError);
                }
            }
        }
    }
}

// Update UI when wallet is connected
function updateUIOnConnect() {
    if (connectWalletBtn && walletInfo && walletAddress) {
        connectWalletBtn.classList.add('d-none');
        walletInfo.classList.remove('d-none');
        
        // Format address for display (0x1234...5678)
        const formattedAddress = `${userAccount.substring(0, 6)}...${userAccount.substring(userAccount.length - 4)}`;
        walletAddress.textContent = formattedAddress;
    }
}

// Update UI when wallet is disconnected
function updateUIOnDisconnect() {
    if (connectWalletBtn && walletInfo) {
        connectWalletBtn.classList.remove('d-none');
        walletInfo.classList.add('d-none');
    }
}

// Export for use in other scripts
window.BlockTrust = {
    isWalletConnected: () => isConnected,
    getUserAccount: () => userAccount,
    connectWallet: connectWallet
};
