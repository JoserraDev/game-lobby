import { Clock, MapPin, Users, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PracticeMode {
  id: number
  image: string
  mode: string
  location: string
  players: number
  time: string
  difficulty: {
    easy: boolean
    medium: boolean
    hard: boolean
  }
}

const practiceModes: PracticeMode[] = [
  {
    id: 1,
    image: "/placeholder.svg?height=200&width=400",
    mode: "BOT GRID",
    location: "ARENA BOTS",
    players: 0,
    time: "01:00",
    difficulty: { easy: true, medium: true, hard: true },
  },
  {
    id: 2,
    image: "/placeholder.svg?height=200&width=400",
    mode: "BOT ROLAMENTO",
    location: "ARENA BOTS",
    players: 0,
    time: "01:00",
    difficulty: { easy: true, medium: true, hard: true },
  },
  {
    id: 3,
    image: "/placeholder.svg?height=200&width=400",
    mode: "GRID SHOT",
    location: "ARENA AIMLABS",
    players: 0,
    time: "01:00",
    difficulty: { easy: true, medium: true, hard: false },
  },
  {
    id: 4,
    image: "/placeholder.svg?height=200&width=400",
    mode: "SPIDER SHOT",
    location: "ARENA AIMLABS",
    players: 0,
    time: "01:00",
    difficulty: { easy: true, medium: true, hard: true },
  },
  {
    id: 5,
    image: "/placeholder.svg?height=200&width=400",
    mode: "TRACKING",
    location: "ARENA AIMLABS",
    players: 0,
    time: "01:00",
    difficulty: { easy: true, medium: true, hard: true },
  },
]

export function PracticeView() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {practiceModes.map((mode) => (
        <div key={mode.id} className="bg-zinc-800/50 rounded-lg overflow-hidden">
          <div className="relative h-[150px] sm:h-[200px]">
            <img src={mode.image || "/placeholder.svg"} alt={mode.mode} className="w-full h-full object-cover" />
          </div>

          <div className="p-2 sm:p-4 space-y-2 sm:space-y-3">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-200">
              <Gamepad2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>MODO: {mode.mode}</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-200">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>LOCAL: {mode.location}</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-200">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>JOGADORES: {mode.players}</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-200">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>TEMPO: {mode.time}</span>
            </div>

            <div className="flex gap-1 sm:gap-2">
              <Button
                variant="ghost"
                className={`flex-1 h-6 sm:h-8 text-xs font-medium ${
                  mode.difficulty.easy
                    ? "bg-green-500/20 text-green-500 hover:bg-green-500/30 hover:text-green-400"
                    : "bg-zinc-700/20 text-zinc-500 cursor-not-allowed"
                }`}
                disabled={!mode.difficulty.easy}
                onClick={() => {
                  if (mode.difficulty.easy) {
                    console.log(`Clicked 'FÁCIL' for ${mode.mode} in Practice view`)
                  }
                }}
              >
                FÁCIL
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 h-6 sm:h-8 text-xs font-medium ${
                  mode.difficulty.medium
                    ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 hover:text-yellow-400"
                    : "bg-zinc-700/20 text-zinc-500 cursor-not-allowed"
                }`}
                disabled={!mode.difficulty.medium}
                onClick={() => {
                  if (mode.difficulty.medium) {
                    console.log(`Clicked 'MÉDIO' for ${mode.mode} in Practice view`)
                  }
                }}
              >
                MÉDIO
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 h-6 sm:h-8 text-xs font-medium ${
                  mode.difficulty.hard
                    ? "bg-red-500/20 text-red-500 hover:bg-red-500/30 hover:text-red-400"
                    : "bg-zinc-700/20 text-zinc-500 cursor-not-allowed"
                }`}
                disabled={!mode.difficulty.hard}
                onClick={() => {
                  if (mode.difficulty.hard) {
                    console.log(`Clicked 'DIFÍCIL' for ${mode.mode} in Practice view`)
                  }
                }}
              >
                DIFÍCIL
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

