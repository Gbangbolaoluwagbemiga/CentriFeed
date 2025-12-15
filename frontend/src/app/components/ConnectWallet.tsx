"use client"
import { useEffect, useRef, useState } from "react"
import type { UserSession } from "@stacks/connect"

type StxAddr = { mainnet?: string; testnet?: string }
type FinishPayload = { profile?: { stxAddress?: StxAddr } }

export default function ConnectWallet({ onAddress }: { onAddress?: (addr: string) => void }) {
  const [address, setAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const userSessionRef = useRef<UserSession | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { AppConfig, UserSession } = await import("@stacks/connect")
      const appConfig = new AppConfig([])
      const userSession = new UserSession({ appConfig })
      userSessionRef.current = userSession
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
    import("@stacks/connect").then(({ authenticate, isStacksWalletInstalled, WALLET_CONNECT_PROVIDER, setSelectedProviderId }) => {
      const userSession = userSessionRef.current as UserSession
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

  const onDisconnect = () => {
    import("@stacks/connect").then(({ disconnect }) => {
      const userSession = userSessionRef.current as UserSession
      try {
        if (userSession?.isUserSignedIn()) {
          userSession.signUserOut()
        }
        disconnect()
      } finally {
        setAddress(null)
        if (onAddress) onAddress("")
      }
    })
  }
  return (
    <div className="flex items-center gap-3">
      {address ? (
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-sm shadow-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
          <button className="text-sm px-3 py-1 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
      ) : (
        <button className="px-4 py-2 rounded-md bg-brand text-white hover:drop-shadow-glow" onClick={onConnect} disabled={loading}>
          {loading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </div>
  )
}
