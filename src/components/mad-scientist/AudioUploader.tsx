"use client"

import type { ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { ChaoticCard } from './ChaoticCard'
import { UploadIcon, SparkleIcon } from './icons'

type AudioUploaderProps = {
  isProcessing: boolean
  audioFile: File | null
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSeparate: () => void
}

export function AudioUploader({ isProcessing, audioFile, onFileChange, onSeparate }: AudioUploaderProps) {
  const fileInputId = "audio-upload"

  return (
    <ChaoticCard rotation="-rotate-1">
      <h2 className="font-headline text-3xl mb-4 text-primary-foreground/90">1. CRAM IN YER AUDIO</h2>
      <p className="mb-6 text-sm text-foreground/80">
        MP3s, FLACs, WAVs... We'll gobble 'em up, no matter how weirdly encoded. The U-Net Brain Fryer awaits its snack.
      </p>

      {isProcessing ? (
        <div className="text-center p-8 border-2 border-dashed border-accent rounded-lg bg-background/30 h-40 flex flex-col justify-center items-center overflow-hidden">
          <div className="relative">
            <SparkleIcon className="w-8 h-8 text-accent animate-sparkle absolute -top-4 -left-4" />
            <h3 className="font-headline text-2xl animate-glitch text-accent text-shadow-neon">PROCESSING...</h3>
            <SparkleIcon className="w-6 h-6 text-primary animate-sparkle absolute -bottom-3 -right-3" style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="font-code text-sm mt-2">FRYING THE BRAIN... UNLEASHING SONIC GOO...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <label
            htmlFor={fileInputId}
            className="relative block w-full border-2 border-dashed border-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:border-accent hover:bg-background/30 transition-colors"
          >
            <UploadIcon className="mx-auto h-12 w-12 text-foreground/70" />
            <span className="mt-2 block text-sm font-semibold text-foreground">
              {audioFile ? `Selected: ${audioFile.name}` : "Click or drag file to this area to upload"}
            </span>
            <input
              id={fileInputId}
              name={fileInputId}
              type="file"
              className="sr-only"
              accept=".mp3,.flac,.wav"
              onChange={onFileChange}
              disabled={isProcessing}
            />
          </label>
          <Button
            onClick={onSeparate}
            disabled={!audioFile || isProcessing}
            className="w-full text-lg py-6 font-headline bg-primary/80 text-primary-foreground hover:bg-primary"
          >
            SPLATERIZE STEMS!
          </Button>
        </div>
      )}
    </ChaoticCard>
  )
}
