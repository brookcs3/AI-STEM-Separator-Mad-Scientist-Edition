"use client"

import { useState } from 'react'
import { ChaoticCard } from './ChaoticCard'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { BrainIcon } from './icons'

type AiOverlordProps = {
  isProcessing: boolean
  onGetSuggestions: (description: string) => Promise<void>
}

export function AiOverlord({ isProcessing, onGetSuggestions }: AiOverlordProps) {
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGetSuggestions(description)
  }

  return (
    <ChaoticCard rotation="rotate-1">
      <div className="flex items-center gap-4 mb-4">
        <BrainIcon className="w-10 h-10 text-accent" />
        <h2 className="font-headline text-3xl text-accent text-shadow-neon">TOOL TIME WITH AI OVERLORD</h2>
      </div>
      <p className="mb-4 text-sm text-foreground/80">
        The AI Overlord demands context. Describe your audio's genre, instruments, and purpose to receive its supreme judgment.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="description" className="font-bold text-accent">Audio Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., A sad lo-fi synth track for studying..."
            className="bg-background/50 border-accent/50 focus:border-accent"
            rows={4}
            disabled={isProcessing}
          />
        </div>
        <Button type="submit" variant="default" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isProcessing || !description}>
          {isProcessing ? 'CONSULTING ORACLE...' : 'SUMMON AI OVERLORD'}
        </Button>
      </form>
    </ChaoticCard>
  )
}
