---
sidebar_position: 1
---

# Getting Started

W3 Core is an evm wallet connectors library for decentralized applications. It's inspired by <a href="https://github.com/wagmi-dev/references" target="_blank">Wagmi's references</a> with the difference that it's eth-lib agnostic. (Eth-lib for ethereum libraries such as ethers.js, viem or web3.js).<br/>
It sets up for you a wallet connection infrastructure with a built-in store to handle the wallet state and user's sessions.

**Compatible with <a href="https://docs.ethers.org/v6/" target="_blank">ethers.js</a>, <a href="https://viem.sh/" target="_blank">viem</a> and <a href="https://docs.web3js.org/" target="_blank">Web3.js</a>**

### Current supported protocols & wallets
The core package of this library supports **injected** *(browser extension)* and **EIP-6963** compliant wallet.

Additional packages that can be optionally installed:
- **WalletConnect** v2 connector *(recommended)*
- **Coinbase SDK** connector *(coming soon)*
- **MetaMask SDK** connector *(coming soon)*

### Install

```bash npm2yarn
npm i @w3vm/core
```

### Install WalletConnect connector

```bash npm2yarn
npm i @w3vm/walletconnect
```

### Init W3

Call `initW3` function at the top of your main.js file

```tsx
import { initW3, Injected } from '@w3vm/core'
import { WalletConnect } from '@w3vm/walletconnect'

/* Icons */
import walletconnect from 'public/walletconnect.svg'
import wallet from 'public/extension-wallet.png'

/* WalletConnect Project Id */
const projectId = 'YOUR_PROJECT_ID'

initW3({
  connectors: [
    new Injected({ icon: wallet }), 
    new WalletConnect({ 
      projectId,
      icon: walletconnect,
      showQrModal: true,
      optionalChains:[1, 137]
    })
  ],
  defaultChain: 1, // Optional
})
```

Create your WalletConnect Project ID at <a href='https://cloud.walletconnect.com/sign-in' target='_blank' >WalletConnect Cloud</a>

### Connect to a Wallet

```tsx
//TODO
```

### Get & Subscribe

```tsx
// TODO
```