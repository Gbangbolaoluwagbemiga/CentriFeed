"use client"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const isDark = (mounted ? resolvedTheme : theme) === "dark"
  return (
    <button
      aria-label="Toggle Theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-md border border-neutral-300 dark:border-neutral-700"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}

