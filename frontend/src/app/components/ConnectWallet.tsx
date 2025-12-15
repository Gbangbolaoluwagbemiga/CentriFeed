"use client"
import { useEffect, useState } from "react"

type StxAddr = { mainnet?: string; testnet?: string }
type FinishPayload = { profile?: { stxAddress?: StxAddr } }

export default function ConnectWallet({ onAddress }: { onAddress?: (addr: string) => void }) {
  const [address, setAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { AppConfig, UserSession } = await import("@stacks/connect")
      const appConfig = new AppConfig([])
      const userSession = new UserSession({ appConfig })
      if (userSession.isUserSignedIn()) {
        const data = userSession.loadUserData() as FinishPayload
        const stx = data?.profile?.stxAddress
        const mainnet = stx?.mainnet || stx?.testnet || null
        if (mounted) {
          setAddress(mainnet || null)
          if (mainnet && onAddress) onAddress(mainnet)
        }
      }
    })()
    return () => { mounted = false }
  }, [onAddress])

  const onConnect = () => {
    setLoading(true)
    import("@stacks/connect").then(({ authenticate, isStacksWalletInstalled, WALLET_CONNECT_PROVIDER, setSelectedProviderId, AppConfig, UserSession }) => {
      const appConfig = new AppConfig([])
      const userSession = new UserSession({ appConfig })
      try {
        if (!isStacksWalletInstalled()) setSelectedProviderId(WALLET_CONNECT_PROVIDER.id)
        authenticate({
          appDetails: { name: "CentriFeed", icon: window.location.origin + "/favicon.ico" },
          userSession,
          onFinish: () => {
            const data = userSession.loadUserData() as FinishPayload
            const stx = data?.profile?.stxAddress
            const mainnet = stx?.mainnet || stx?.testnet || null
            setAddress(mainnet || null)
            if (mainnet && onAddress) onAddress(mainnet)
            setLoading(false)
          },
          onCancel: () => {
            setLoading(false)
          },
        })
      } catch {
        setLoading(false)
      }
    })
  }
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <button onClick={onConnect} disabled={loading}>{loading ? "Connecting..." : "Connect Wallet"}</button>
      <span>{address ? address : "Not connected"}</span>
    </div>
  )
}
