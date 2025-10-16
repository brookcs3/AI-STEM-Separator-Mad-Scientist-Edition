"use client"

import { ChaoticCard } from './ChaoticCard'
import { Button } from '@/components/ui/button'
import { VocalIcon, InstrumentalIcon, DownloadIcon } from './icons'
import type { SeparateStemsFromAudioOutput } from '@/ai/flows/separate-stems-from-audio'

type StemDisplayProps = {
  stems: SeparateStemsFromAudioOutput
}

export function StemDisplay({ stems }: StemDisplayProps) {
  return (
    <ChaoticCard>
      <h2 className="font-headline text-3xl mb-4">2. OUTPUT STEMS - FRESHLY SLICED!</h2>
      <p className="mb-6 text-sm text-foreground/80">
        Behold the glorious goo! Grab yer separated stems for maximum remix madness.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vocals */}
        <div className="border border-foreground/30 rounded-lg p-4 bg-background/50 space-y-3">
          <div className="flex items-center gap-3">
            <VocalIcon className="w-8 h-8 text-primary" />
            <h3 className="font-headline text-2xl text-primary">VOCAL GOO</h3>
          </div>
          <audio controls src={stems.vocals} className="w-full">
            Your browser does not support the audio element.
          </audio>
          <Button asChild variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
            <a href={stems.vocals} download="vocals.mp3">
              <DownloadIcon className="mr-2" />
              Download Vocals
            </a>
          </Button>
        </div>
        {/* Instrumentals */}
        <div className="border border-foreground/30 rounded-lg p-4 bg-background/50 space-y-3">
          <div className="flex items-center gap-3">
            <InstrumentalIcon className="w-8 h-8 text-primary" />
            <h3 className="font-headline text-2xl text-primary">INSTRUMENTAL MUSH</h3>
          </div>
          <audio controls src={stems.instrumental} className="w-full">
            Your browser does not support the audio element.
          </audio>
          <Button asChild variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
            <a href={stems.instrumental} download="instrumental.mp3">
              <DownloadIcon className="mr-2" />
              Download Instrumental
            </a>
          </Button>
        </div>
      </div>
    </ChaoticCard>
  )
}
