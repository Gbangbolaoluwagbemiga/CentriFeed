"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false })
const Hero = dynamic(() => import("./components/Hero"), { ssr: false })
const TabsView = dynamic(() => import("./components/TabsView"), { ssr: false })

export default function Home() {
  const [address, setAddress] = useState<string | undefined>(undefined)
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
      <Navbar onAddress={(addr) => setAddress(addr)} />
      <Hero />
      <TabsView address={address} onAddress={(addr) => setAddress(addr)} />
      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-neutral-500">© CentriFeed</footer>
    </div>
  );
}
