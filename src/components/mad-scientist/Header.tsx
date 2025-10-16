"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type HeaderProps = {
  showMatrix: boolean
  onToggleMatrix: () => void
}

export function Header({ showMatrix, onToggleMatrix }: HeaderProps) {
  return (
    <header className="container mx-auto p-4 md:py-6 md:px-8 flex justify-between items-center">
      <h1 className="font-headline text-3xl md:text-5xl text-primary-foreground/90 select-none" style={{ textShadow: '2px 2px #000' }}>
        AI-STEM SEPARATOR
        <span className="block text-xl md:text-2xl text-accent -mt-2 md:-mt-4">MAD SCIENTIST EDITION</span>
      </h1>
      <div className="flex items-center space-x-2">
        <Label htmlFor="matrix-toggle" className="font-bold text-accent text-shadow-neon">
          CYBER-MADNESS
        </Label>
        <Switch
          id="matrix-toggle"
          checked={showMatrix}
          onCheckedChange={onToggleMatrix}
        />
      </div>
    </header>
  )
}
