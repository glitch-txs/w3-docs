# Getting Started

WalletConnect legacy Modal is a wallets modal library built on top of W3 which implements the old UI design of Web3modal with additional support for WalletConnect v2, custom wallets and EIP-6963 compliant wallets.

**Compatible with <a href="https://docs.ethers.org/v6/" target="_blank">ethers.js</a>, <a href="https://viem.sh/" target="_blank">viem</a> and <a href="https://docs.web3js.org/" target="_blank">Web3.js</a>**

### Install

```bash npm2yarn
npm i w3-evm-react walletconnect-legacy-ui
```

### Init W3

Select the wallets and chains you want to support. Calling `initModalWallets` function will invoke WalletConnect v2 and MetaMask classes.

:::danger Take care

Make sure props are set outside the App component.

:::
```tsx
import { W3, mainnet, initW3 } from 'w3-evm-react'
import { initModalWallets, W3Modal } from 'walletconnect-legacy-ui'

const w3props = initW3({
  wallets: initModalWallets(),
  chains:[mainnet]
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <W3 {...w3props} />
      <W3Modal/>
      <Component {...pageProps} />
    </>
  )
}
```

:::tip NOTE

With this type of config you need to set an enviroment variable for WalletConnect's project ID: `NEXT_PUBLIC_WALLETCONNECT_ID="yourProjectID"`. For others ways of configuration see [Initialize the W3 Component](../w3-react/init.md)

:::

# Open the modal anywhere
```tsx
import { openModal } from 'walletconnect-legacy-ui'
import { disconnectW3, getW3Address } from 'w3-evm-react'

export default function Connect() {
  
  const address = getW3Address()
  
  return (
    <div>
      {address ?
        <>
          <div> Address: {address} </div>
          <button onClick={disconnectW3}>Disconnect</button>
        </> :
        <button onClick={openModal}>Open Modal</button>
      }
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