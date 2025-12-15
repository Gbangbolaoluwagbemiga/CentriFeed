"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
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
