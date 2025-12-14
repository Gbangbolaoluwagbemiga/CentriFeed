"use client"
import { showConnect } from "@stacks/connect"
import { useState } from "react"

export default function ConnectWallet() {
  const [address, setAddress] = useState<string | null>(null)
  const onConnect = () => {
    showConnect({
      appDetails: { name: "CentriFeed", icon: window.location.origin + "/favicon.ico" },
      onFinish: data => {
        const stx = (data?.profile?.stxAddress as any) || {}
        const mainnet = stx?.mainnet || stx?.testnet || null
        setAddress(mainnet || null)
      },
    })
  }
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <button onClick={onConnect}>Connect Wallet</button>
      <span>{address ? address : "Not connected"}</span>
    </div>
  )
}

