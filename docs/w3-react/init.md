---
sidebar_position: 2
---
# Initialize the W3 Component

## W3 Properties

To initialize W3 we first need to create an object called w3props

```tsx
import { W3, initWallets, mainnet, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  wallets: initWallets(),
  chains:[mainnet],
  onboard: true, // Optional
  EIP6963: true // Optional
}
```

**Lest break this one down...**

### wallets

The imported wallets' names are javascript classes that create an instance of a specific wallet, they can be declared inside an array or by the `initWallets` function.

```tsx
import { W3, MetaMask, Coinbase, mainnet, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  wallets: [new MetaMask(), new Coinbase()],
  chains:[mainnet]
}
```

You can select different wallets depending on your preference.

Current supported wallets:

- MetaMask
- Coinbase
- TrustWallet
- WalletConnect
- Phantom (EVM)
- Injected - Custom Wallet
- EIP-6963 compatible wallets

:::tip Note

The Phantom instance will only work with evm chains.

:::

Wallet classes can take an **optional** argument to store the wallet's icon:

```tsx
import { W3, MetaMask, mainnet, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  wallets: [new MetaMask({ icon: '/icons/metamask.svg' })],
  chains:[mainnet]
}
```

This is going to be handy when mapping through the `wallets` array later.

:::tip Note

All classes' arguments are optional.

:::

There's a special class which will take more options as argument:

**WalletConnect Class**

```tsx
import { W3, WalletConnect, mainnet, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  wallets: [
    new WalletConnect({ 
      icon: '/icons/walletconnect.svg',
      projectId: env.process.PROJECT_ID as string,
      showQrModal: true, //true by default
      qrModalOptions: {
        themeMode: 'light'
      },
   })
  ],
  chains:[mainnet]
}
```

:::tip Note

The WalletConnect's project id can be set either as an argument or by creating an enviroment variable in your project called `NEXT_PUBLIC_WALLETCONNECT_ID`

:::

Create your WalletConnect Project ID at <a href='https://cloud.walletconnect.com/sign-in' target='_blank' >WalletConnect Cloud</a>

If you'd like to handle the modal on your own you can listen to the uri with
```ts
const handleUri = (event)=>{
  const { uri } = event.detail
  //handle uri...
}
window.addEventListener('walletconnect#uri', handleUri)
```

The uri is the value you can use to create your own QR code.

There's also a built-in abstraction in case you want to use all the classes in your application:

```tsx
import { W3, initWallets, mainnet, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  wallets: initWallets(),
  chains:[mainnet]
}
```

The `initWallets` function will return an array with all the W3 wallets initialized. You can also pass down an object with icons for each wallet's instance.

```tsx
import { W3, initWallets, mainnet, W3Props } from '@glitch-txs/w3-react'

const icons = {
  metamask: '/icons/metamask.svg',
  coinbase: '/icons/coinbase.svg',
  trustwallet: '/icons/trustwallet.svg',
  phantom:'/icons/phantom.svg',
  walletconnect: '/icons/walletconnect.svg'
}

const w3props: W3Props = {
  wallets: initWallets(icons),
  chains:[mainnet]
}
```

:::tip Note

createWallets function will expect you to have the WalletConnect project ID in a .env or .env.local file as `NEXT_PUBLIC_WALLETCONNECT_ID='YourProjectId'`

:::

**Custom Wallet - Injected**

There's a default wallet class you can customize:
```tsx
import { W3, Injected, mainnet, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  wallets: [new Injected({ 
    id: 'customwallet',
    name: 'My Wallet',
    icon: 'icons/mywallet.svg'
    install: 'https://installmywallet.com', // the website to open on onboard
    deeplink: 'https://mywallet.mobile', // The deeplink to open on mobile devices
    getProvider: ()=>{
      return window.myWalletProvider
    }, // A function that returns the wallet provider or undefined
   })],
  chains:[mainnet]
}
```
:::tip Note

- All Injected parameters are optional.
- Injected class is not returned by the `initWallets` function.

:::

### Chains

Import the chains you want your dapp to support and set them inside an array.

```tsx
import { W3, initWallets, mainnet, bsc, avalanche, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  wallets: initWallets(),
  chains:[mainnet, bsc, avalanche]
}
```
:::tip Feature

If only one chain is selected, once the user connects, a request will be sent to switch to that chain.

:::

You can also create your own chains as follow:

```tsx
const avalanche: Chain = {
  chainName: 'Avalanche',
  chainId:'0xa86a',
  nativeCurrency:{
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls:['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls:['https://snowtrace.io/ '],
  iconUrls:['']
}


/*TYPE*/
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

### Onboard

Onboard is totally optional and it's set as `true` by default. When a browser wallet is not installed it will automatically open a new tab with the installation website whenever `connectW3` function is called. If you would like to handle this on your own you can set the value to `false`.

```tsx
import { W3, initWallets, mainnet, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  wallets: initWallets(),
  chains:[mainnet],
  onboard: false
}
```

### EIP6963

EIP6963 will allow support for EIP-6963 compatible wallets. They are going to be detected by W3 automatically and create a new class for them.

EIP6963 is set as `true` by default and it's an optional parameter.

```tsx
import { W3, initWallets, mainnet, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  wallets: initWallets(),
  chains:[mainnet],
  EIP6963: false
}
```

## W3 Component
Once your w3props are set you can pass them to the W3 component.

```tsx
import { W3, initWallets, mainnet, W3Props } from '@glitch-txs/w3-react'

const w3props: W3Props = {
  wallets: initWallets(),
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

:::danger Important

- w3props must be declared outside the root component. 
- The W3 component must be placed at the root of your application, as it's only meant to be mounted once.

:::