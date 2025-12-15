"use client"
import * as Tabs from "@radix-ui/react-tabs"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"

const AdminPanel = dynamic(() => import("./AdminPanel"), { ssr: false })
const TopicCard = dynamic(() => import("./TopicCard"), { ssr: false })
const ConnectWallet = dynamic(() => import("./ConnectWallet"), { ssr: false })

export default function TabsView({ address, onAddress }: { address?: string; onAddress?: (a: string) => void }) {
  return (
    <Tabs.Root defaultValue="feed" className="mx-auto max-w-7xl px-6">
      <Tabs.List className="flex gap-2 border-b border-neutral-200 dark:border-neutral-800">
        <Tabs.Trigger value="feed" className="px-4 py-2 rounded-t-md data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800">Feed</Tabs.Trigger>
        <Tabs.Trigger value="submit" className="px-4 py-2 rounded-t-md data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800">Submit</Tabs.Trigger>
        <Tabs.Trigger value="admin" className="px-4 py-2 rounded-t-md data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800">Admin</Tabs.Trigger>
        <Tabs.Trigger value="wallet" className="px-4 py-2 rounded-t-md data-[state=active]:bg-neutral-100 dark:data-[state=active]:bg-neutral-800">Wallet</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="feed" className="py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { id: 1, title: "AI Research", description: "Transformer papers, evals, safety", stakers: 42, treasury: "SP3FBR2..." },
              { id: 2, title: "Bitcoin Dev", description: "Core PRs, BIPs, Lightning", stakers: 35, treasury: "SP2J8GK..." },
              { id: 3, title: "Crypto Markets", description: "On-chain alpha, macro flows", stakers: 58, treasury: "SP1H2KQ..." },
              { id: 4, title: "DeFi", description: "Protocols, audits, governance", stakers: 27, treasury: "SP3L9RT..." },
              { id: 5, title: "Startups", description: "Founder threads, fundraising", stakers: 19, treasury: "SP2ABCD..." },
              { id: 6, title: "Design", description: "Product thinking, UX patterns", stakers: 22, treasury: "SP9XYZA..." },
          ].map((t) => (
            <TopicCard key={t.id} topic={t as { id: number; title: string; description: string; stakers: number; treasury: string }} />
          ))}
          </div>
          <div className="hidden lg:block sticky top-24 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-5">
              <div className="text-lg font-semibold">Quick Submit</div>
              <div className="mt-4 grid grid-cols-1 gap-3">
                <input placeholder="URL" className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent" />
                <input placeholder="Title" className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent" />
                <button className="px-4 py-2 rounded-md bg-brand text-white">Submit</button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/60 dark:bg-neutral-900/60 backdrop-blur p-5">
              <div className="text-lg font-semibold">Wallet</div>
              <div className="mt-3">
                <ConnectWallet onAddress={onAddress} />
              </div>
            </div>
          </div>
        </motion.div>
      </Tabs.Content>

      <Tabs.Content value="submit" className="py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}
          className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6">
          <div className="text-lg font-semibold">Submit Link</div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <input placeholder="URL" className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent" />
            <input placeholder="Title" className="px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent" />
            <button className="px-4 py-2 rounded-md bg-brand text-white">Submit</button>
          </div>
        </motion.div>
      </Tabs.Content>

      <Tabs.Content value="admin" className="py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <AdminPanel address={address} />
        </motion.div>
      </Tabs.Content>

      <Tabs.Content value="wallet" className="py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <ConnectWallet onAddress={onAddress} />
        </motion.div>
      </Tabs.Content>
    </Tabs.Root>
  )
}
