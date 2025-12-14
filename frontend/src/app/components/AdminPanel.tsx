import dynamic from "next/dynamic"
const ContractActions = dynamic(() => import("./ContractActions"), { ssr: false })

export default function AdminPanel() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Controls</h2>
        <span className="text-sm text-neutral-500">Mainnet</span>
      </div>
      <div className="mt-6">
        <ContractActions />
      </div>
    </section>
  )
}

