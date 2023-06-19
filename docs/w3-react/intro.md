---
sidebar_position: 1
---

# Getting Started

W3 React is an evm wallet connectors library for React.js and its frameworks. It's inspired by <a href="https://github.com/wagmi-dev/references" target="_blank">Wagmi's references</a> with the difference that it's eth-lib agnostic. (*Eth-lib* for ethereum libraries such as ethers.js, viem or web3.js). <br/>
It sets up for you a wallet connection infrastructure with a built-in store and React hooks to handle the wallet state and user's sessions.

### Current supported wallets
- MetaMask
- Coinbase
- WalletConnect
- Trust Wallet
- Phantom (EVM)
- Injected - Custom Wallet
- EIP-6963 compatible wallets

**Compatible with <a href="https://docs.ethers.org/v6/" target="_blank">ethers.js</a>, <a href="https://viem.sh/" target="_blank">viem</a> and <a href="https://docs.web3js.org/" target="_blank">Web3.js</a>**

### Install

```bash npm2yarn
npm i w3-evm-react
```

### Init W3

Select the wallets and chains you want to support. Calling `initWallets` function will invoke all wallet classes supported by W3.

:::danger Take care

Make sure props are set outside the App component.

:::
```tsx
import { W3, initWallets, mainnet, initW3 } from 'w3-evm-react'

const w3props = initW3({
  wallets: initWallets(),
  chains:[mainnet]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <W3 {...w3props} />
      <Component {...pageProps} />
    </>
  )
}
```

:::tip NOTE

With this type of config you need to set an enviroment variable for WalletConnect's project ID: `NEXT_PUBLIC_WALLETCONNECT_ID="yourProjectID"`. For others ways of configuration see [Initialize the W3 Component](./init.md)

:::

Create your WalletConnect Project ID at <a href='https://cloud.walletconnect.com/sign-in' target='_blank' >WalletConnect Cloud</a>

### Connect to a Wallet

Import the `useConnect` hook and map through the `wallets` array:
```tsx
import { useConnect } from 'w3-evm-react'

export default function Connect() {

  const { wallets, connectW3, disconnectW3, wait } = useConnect()
  
  return (
    <>
      {wallets.map((wallet) =>(
        <button key={wallet.id} disabled={wait.state} onClick={()=>connectW3(wallet)}>
          {wallet.name}
        </button>
      )}
    </>
  )
}
```

### Reactive Getters

Reactive Getters are custom hooks that only return one value which doesn't need to be disctructured. They are reactive, so your components **will** re-render whenever their value changes.

```tsx
import { getW3Chain, getW3Address } from 'w3-evm-react'

export default function UserInfo() {
  
  const address = getW3Address()
  const chain = getW3Chain()
  
  return (
    <div>
      address: {address}
      <br/>
      Chain ID: {chain}
    </div>
  )
}
```

### Use with <a href="https://docs.ethers.org/v6/" target="_blank">ethers.js</a>
```tsx
import { BrowserProvider } from 'ethers'
import { getW3Provider } from 'w3-evm-react'

export default function useEthersProvider() {

  const w3Provider = getW3Provider()

  const provider = useMemo(()=>{
    if(w3Provider)
    return new BrowserProvider(w3Provider)
  },[w3Provider])
  
  return { provider }
}
```

### Use with <a href="https://docs.web3js.org/" target="_blank">Web3.js</a>
```tsx
import Web3 from 'web3'
import { getW3Provider } from 'w3-evm-react'

export default function useWeb3Provider() {

  const w3Provider = getW3Provider()

  const provider = useMemo(()=>{
    if(w3Provider)
    return new Web3(w3Provider)
  },[w3Provider])
  
  return { provider }
}
```

### Use with <a href="https://viem.sh/" target="_blank">viem</a>
```tsx
import { getW3Provider } from 'w3-evm-react'
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

export default function useWalletClient() {

  const w3Provider = getW3Provider()

  const client = useMemo(()=>{
    if(w3Provider)
    return createWalletClient({
  chain: mainnet,
  transport: custom(w3Provider)
})
  },[w3Provider])
  
  return { client }
}
```