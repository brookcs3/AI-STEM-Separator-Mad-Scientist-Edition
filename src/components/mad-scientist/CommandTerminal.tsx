"use client"

import { useState, useRef, useEffect } from 'react'
import { ChaoticCard } from './ChaoticCard'
import { TerminalIcon } from './icons'
import { cn } from '@/lib/utils'

type CommandTerminalProps = {
  onSeparate: () => void
  audioFileName?: string
}

type LogEntry = {
  id: number
  type: 'command' | 'response' | 'error'
  text: string
}

export function CommandTerminal({ onSeparate, audioFileName }: CommandTerminalProps) {
  const [input, setInput] = useState('')
  const [log, setLog] = useState<LogEntry[]>([
    { id: 0, type: 'response', text: 'CLI: Command-Line Chaos Initialized.' },
    { id: 1, type: 'response', text: 'Type `help` for commands... or don\'t. I\'m not your dad.' },
  ])
  const endOfLogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endOfLogRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log])

  const addLog = (entry: Omit<LogEntry, 'id'>) => {
    setLog(prev => [...prev, { ...entry, id: prev.length }])
  }

  const handleCommand = () => {
    addLog({ type: 'command', text: input })
    const command = input.toLowerCase().trim()

    switch (command) {
      case 'help':
        addLog({ type: 'response', text: 'Available commands: `separate`, `help`, `clear`, `dread`' })
        break
      case 'separate':
        if (audioFileName) {
          addLog({ type: 'response', text: `Attempting to splatterize '${audioFileName}'... Stand back.` })
          onSeparate()
        } else {
          addLog({ type: 'error', text: 'Error: No file loaded. The void cannot be separated.' })
        }
        break
      case 'clear':
        setLog([])
        break
      case 'dread':
        addLog({ type: 'error', text: 'The universe is a chaotic soup of random events with no inherent meaning. Your audio file is just a temporary arrangement of bits in the face of cosmic entropy. Enjoy your mix.' })
        break
      default:
        addLog({ type: 'error', text: `Error: Command not found: '${command}'. Did you even try?` })
        break
    }

    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand()
    }
  }

  return (
    <ChaoticCard className="font-code text-sm">
      <div className="flex items-center gap-2 mb-2">
        <TerminalIcon className="w-5 h-5 text-accent" />
        <h2 className="font-headline text-lg text-accent">COMMAND-LINE CHAOS</h2>
      </div>
      <div className="h-64 bg-black/80 rounded p-2 overflow-y-auto">
        {log.map(entry => (
          <div key={entry.id} className={cn(
            'flex',
            entry.type === 'command' && 'text-gray-400',
            entry.type === 'response' && 'text-green-400',
            entry.type === 'error' && 'text-red-500',
          )}>
            {entry.type === 'command' && <span className="text-gray-500 mr-2">&gt;</span>}
            <p className="whitespace-pre-wrap break-words">{entry.text}</p>
          </div>
        ))}
        <div ref={endOfLogRef} />
      </div>
      <div className="flex items-center mt-2 bg-black/80 rounded p-1">
        <span className="text-green-400 pl-1">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent w-full text-green-400 focus:outline-none pl-2"
          placeholder="Enter command..."
          aria-label="Terminal input"
        />
      </div>
    </ChaoticCard>
  )
}
