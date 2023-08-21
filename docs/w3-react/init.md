---
sidebar_position: 2
---
# Initialize W3

## W3 Properties

To initialize W3 we call `initW3` function.
:::caution Important

initW3 must be called outside the root component. We want to avoid unwanted rerenders.

:::
```tsx
import { W3, initW3, Injected, WalletConnect } from 'w3-evm-react'

import walletconnect from 'public/walletconnect.svg'
import wallet from 'public/wallet.png'

/* WalletConnect Project Id */
const projectId = 'YOUR_PROJECT_ID'

initW3({
  connectors: [
    new Injected({ icon: wallet }), 
    new WalletConnect({ projectId, icon: walletconnect, showQrModal: true })
  ],
  chains:[1],
  SSR: true //Optional
})
```

**Lest break this one down...**

## Connectors

Connectors are classes that instantiate a type of communication protocol between a website and a wallet. There are three main connectors: Injected, EIP6963 and WalletConnect.

### Injected Connector

Injected connector class doesn't require any parameters but you can:

- Pass an `icon` to use it later on.
- Pass a `name` to display in the website UI.
- Pass an `id`, useful if you would like to use the Injected connector multiple times to target different extension wallet.
- Pass a `getProvider` function.

```tsx
import { W3, Injected, initW3 } from 'w3-evm-react'

function getProvider(){
  return window.ethereum
}

const browserWallet = new Injected({ 
 name: 'Extension Wallet',
 id: 'extensionWallet',
 getProvider,
 icon: '/icons/extension-wallet.svg'
})

initW3({
  connectors: [browserWallet],
  //...
})
```

### WalletConnect Connector

Only the projectId is a required param in WalletConnect connector.

```tsx
import { W3, WalletConnect, initW3 } from 'w3-evm-react'

const projectId = env.process.PROJECT_ID as string

const walletConnect = new WalletConnect({ 
  icon: '/icons/walletconnect.svg',
  projectId,
  showQrModal: true, //true by default
  qrModalOptions: {
    themeMode: 'light'
  },
})

initW3({
  connectors: [walletConnect],
  //...
})
```

Create your WalletConnect Project ID in <a href='https://cloud.walletconnect.com/sign-in' target='_blank' >WalletConnect's Cloud Website</a>

**URI**<br/>
If you'd like to handle the modal on your own you can listen to the uri with
```ts
import { subW3 } from 'w3-evm'

function handler(uri: string){
  //handle uri
}

const unsub = subW3.uri(handler)
```

The **uri** is the value you can use to create your own QR code.

### Chains

You can either pass an array of chain id's or and array of chain objects following [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085)

```tsx
initW3({
  //...
  chains:[1, 137],
  //...
})
```

or

```tsx
import { Chain } from "w3-evm-react";

export const mainnet: Chain = {
  chainName: 'Ethereum Mainnet',
  chainId: '0x1',
  nativeCurrency:{
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls:['https://eth.llamarpc.com'],
  blockExplorerUrls:['https://etherscan.io/'],
  iconUrls:['']
}

initW3({
  //...
  chains:[mainnet],
  //...
})
```
If only one chain is set in the initW3 or if a chain is pass down to the `connectW3` function then W3 will request the user to switch to that chain first before connecting, if the user doesn't have the chain added then W3 with request to add it (this will only happen if the chain passed is EIP-3085 compliant).

### EIP6963

EIP6963 will allow support for EIP-6963 compatible wallets. They are going to be detected by W3 automatically and create a new class for them internally. You don't need to do anything, W3 will handle it for you.

## W3 Component
W3 component is only required if you're using SSR flag.

:::caution Important

The W3 component must be placed at the root of your application, as it's only meant to be mounted once.

:::

```tsx
const w3props = initW3({
  //...
  SSR: true, // For SSR Frameworks like Next.js
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <W3 {...w3props} /> { /* Required when SSR: true */ }
      <Component {...pageProps} />
    </>
  )
}
```
