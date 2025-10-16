"use client"

import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { separateStemsFromAudio } from '@/ai/flows/separate-stems-from-audio'
import type { SeparateStemsFromAudioOutput } from '@/ai/flows/separate-stems-from-audio'
import { suggestStemManipulations } from '@/ai/flows/suggest-stem-manipulations'
import { useToast } from "@/hooks/use-toast"

import { Header } from '@/components/mad-scientist/Header'
import { MatrixRain } from '@/components/mad-scientist/MatrixRain'
import { AudioUploader } from '@/components/mad-scientist/AudioUploader'
import { StemDisplay } from '@/components/mad-scientist/StemDisplay'
import { AiOverlord } from '@/components/mad-scientist/AiOverlord'
import { CommandTerminal } from '@/components/mad-scientist/CommandTerminal'
import { ChaoticCard } from '@/components/mad-scientist/ChaoticCard'

export default function MadScientistPage() {
  const [showMatrix, setShowMatrix] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [stems, setStems] = useState<SeparateStemsFromAudioOutput | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      setStems(null)
      setSuggestions([])
    }
  }

  const getFileAsDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const handleSeparateStems = async () => {
    if (!audioFile) {
      toast({ variant: 'destructive', title: 'Error', description: 'No file selected, you numpty!' })
      return
    }
    
    setIsProcessing(true)
    setStems(null)
    setSuggestions([])

    try {
      const audioDataUri = await getFileAsDataUri(audioFile)
      const result = await separateStemsFromAudio({ audioDataUri })
      setStems(result)
      toast({ title: 'Success!', description: 'Stem splatter process complete!' })
    } catch (e) {
      console.error(e)
      toast({ variant: 'destructive', title: 'Machine Angry!', description: 'The stem separation failed. Try another file?' })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleGetSuggestions = async (description: string) => {
    if (!stems) {
      toast({ variant: 'destructive', title: 'Error', description: 'Separate some stems first, bonehead!' })
      return
    }

    setIsProcessing(true)
    try {
      const result = await suggestStemManipulations({
        separatedStems: [stems.vocals, stems.instrumental],
        originalAudioDescription: description,
      })
      setSuggestions(result.suggestedManipulations)
      toast({ title: 'Wisdom Received!', description: 'The AI Overlord has spoken.' })
    } catch (e) {
      console.error(e)
      toast({ variant: 'destructive', title: 'Overlord Displeased!', description: 'The AI refused to answer. Your description was probably boring.' })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="relative isolate overflow-hidden min-h-screen">
      {showMatrix && <MatrixRain />}
      <Header showMatrix={showMatrix} onToggleMatrix={() => setShowMatrix(!showMatrix)} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <AudioUploader
              isProcessing={isProcessing}
              audioFile={audioFile}
              onFileChange={handleFileChange}
              onSeparate={handleSeparateStems}
            />
            {stems && (
              <StemDisplay stems={stems} />
            )}
          </div>
          <div className="lg:col-span-2 space-y-8">
            <CommandTerminal onSeparate={handleSeparateStems} audioFileName={audioFile?.name} />
            {stems && (
               <AiOverlord isProcessing={isProcessing} onGetSuggestions={handleGetSuggestions} />
            )}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 mt-8 font-code text-xs text-foreground/50">
        <p>WARNING: May induce existential dread or spontaneous remixing. Proceed with chaos.</p>
      </footer>
    </div>
  )
}
