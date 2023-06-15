---
sidebar_position: 5
---

# SSR and Hydration

This section is for an advance feature. If you're following the rest of the guide, you should **not** face hydration errors.

## Hydration

If you are **not** using SSR or want to deal with hydration mismatch errors to get a faster first load of W3, this section is for you

1. Add the `hydration` flag on init as `false`
2. Remove the W3 component

```tsx
import { initWallets, mainnet, initW3 } from 'w3-evm-react'

initW3({
  wallets: initWallets(),
  chains:[mainnet],
  hydration: false
})

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

You're good to go!