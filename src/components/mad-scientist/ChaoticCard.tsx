import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type ChaoticCardProps = {
  children: React.ReactNode
  className?: string
  rotation?: 'rotate-1' | '-rotate-1' | 'rotate-2' | '-rotate-2'
}

export function ChaoticCard({ children, className, rotation = '' }: ChaoticCardProps) {
  return (
    <Card className={cn(
      "bg-card/80 backdrop-blur-sm border-2 border-foreground/20 shadow-lg transition-transform duration-300 hover:scale-105",
      rotation,
      className
    )}>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  )
}
