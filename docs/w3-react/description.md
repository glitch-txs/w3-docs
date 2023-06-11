---
sidebar_position: 3
---

# Hooks, Functions and Getters

## useConnect Hook

To create a connection component you can use `useConnect` hook. It returns two reactive values: `ìsLoading` and `connectors`, and two functions: `connectW3` and `disconnectW3`.

```tsx
import { useConnect } from '@glitch-txs/w3-react'

export default function Connect() {

  const { connectors, isLoading, connectW3, disconnectW3 } = useConnect()
  
  return (
    <>
      {connectors.map((wallet) =>(
      <button key={wallet.id} disabled={isLoading} onClick={()=>connectW3(wallet)}>
        <Image width={44} height={44} src={wallet.icon} alt={wallet.name} />
        {wallet.name}
      </button>
      })
    </>
  )
}
```

### connectors

**Connectors** is an *array* that contains all the **wallet instances** that we already initialized. Each wallet instance contains the following **properties**:

- **id**
  <br/> Unique id of the connector
- **name**
  <br/> The name of the wallet as string
- **installed**
  <br/> It's a boolean that will be true if the selected wallet is not installed
- **icon**
  <br/> It can be undefined or the icon you passed when initializing the wallet connector, it's also declared automatically for EIP-6963 compatible wallets.

### isLoading

A boolean value that will be `true` if:

- The W3 library is checking the user address and chain id on the first page load.
- The user is in the connection process. Which starts when calling `connectW3` function and finishes whenever the user rejects the connection request or accepts it.

### connectW3

It's a function that takes as argument either a string with the wallet's name or the wallet instance itself (the later one is recommended when mapping through the connectors).

### disconnectW3

It's a function that doesn't require any arguments and will clear the user's session state. Notice there's no actual way of disconnecting a wallet from a dapp unless the user disconnects it directly from the extention. This function will clear the session's state in the dapp but the wallet will still be shown as connected on the extension's UI.

:::tip Note

Both `disconnectW3` and `connectW3` functions can be either imported directly from the library or the `useConnect` hook.

:::

## Reactive Getters

Reactive Getters are similar to React hooks but will only return one value and you don't need to disctructure them. They are reactive, so your components **will** re-render whenever their value changes.

### getW3Address

Will return the current user's address

```ts
const address: string = getW3Address()
```

### getW3Chain

Will return the user's current chain.

```ts
const chain: number = getW3Chain()
```

### getW3Error

Will return an error message is something wrong happens, this one is meant to be displayed in the UI for the user.

```ts
const errorMessage: string = getW3Error()
```

### getW3Provider

Will return the provider of the connected wallet or null if the user is not connected. You can pass this one down to Web3.js, viem or ethers.js.

```ts
const w3Provider = getW3Provider()
```