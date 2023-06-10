---
sidebar_position: 1
---

# Getting Started

W3 is an evm wallet connectors library for vanilla JS and React.js. <br/>
It sets up for you a wallet connection infrastructure with a built-in store and React hooks to handle the wallet state and user's sessions.

Compatible with ethers.js, viem and web3.js

### Install

npm
```bash
npm i @glitch-txs/w3-react
```
yarn
```bash
yarn add @glitch-txs/w3-react
```
pnpm
```bash
pnpm i @glitch-txs/w3-react
```

### Init W3 Components

Select the connectors and chains you want to add. Calling `connectors` function will invoke all supported connectors.
:::danger Take care

Make sure props are set outside the App component.

:::
```tsx
import { W3, connectors, mainnet, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  connectors: connectors(),
  chains:[mainnet]
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <W3 {...w3props} />
      <Component {...pageProps} />
    </>
  )
}
```

### Connect to a Wallet

Import the `useConnect` hook and loop through the connectors:
```tsx
import { useConnect } from '@glitch-txs/w3-react'

export default function Connect() {

  const { connectors, connectW3, disconnectW3, errorMessage } = useConnect()
  
  return (
    {<>
      connectors.map((wallet) =>
      (<button key={wallet.id} disabled={wallet.ready} onClick={()=>connectW3(wallet)}>
        {wallet.name}
      </button>)
    </>
    }
  )
}
```

You can also set a connection to a single wallet by using the wallet name or id as argument to the `connectW3` function:

:::tip NOTE

You can also import `connectW3` and `disconnectW3` functions directly from the library

:::

```tsx
import { connectW3 } from '@glitch-txs/w3-react'

export default function Connect() {
  return (
    <div>
      <button onClick={()=>connectW3('MetaMask')} >Connect to MetaMask</button>
    </div>
  )
}
```
For disconnecting you can use the `disconnectW3` function.

### Reactive Getters

Reactive Getters are similar to React hooks but will only return one value and you don't need to disctructure them. They are reactive, so your components **will** re-render whenever their value changes.
```tsx
import { getW3Chain, getW3Address, connectW3, disconnectW3 } from '@glitch-txs/w3-react'

export default function Connect() {
  
  const address = getW3Address()
  const chain = getW3Chain()
  
  return (
    <div>
      {address ?
      <button onClick={()=>disconnectW3()} >Disconnect</button> :
      <button disable={isLoading} onClick={()=>connectW3('MetaMask')} >Connect to MetaMask</button>
      }
      Chain ID: {chain}
    </div>
  )
}
```

4. wrap it with ether.js, viem or web3.js!
```tsx
import { BrowserProvider } from 'ethers'
import { getW3Provider } from '@glitch-txs/w3-react'

export default function useEthersProvider() {

  const w3Povider = getW3Provider()

  const provider = useMemo(()=>{
    if(w3Provider)
    return new BrowserProvider(w3Provider)
  },[w3Provider])
  
  return { provider }
}
```

### Current supported connectors
1. MetaMask
2. Coinbase
3. WalletConnect
4. Trust Wallet
5. Phantom (EVM)
6. EIP-6963 compatible wallets

### Create a custom chain

```ts
type Chain = {
  chainId:`0x${string}`
  chainName:string
  nativeCurrency?:{
    name:string
    symbol:string
    decimals:number
  }
  rpcUrls: string[]
  blockExplorerUrls?:string[]
  iconUrls?:string[]
}
```
