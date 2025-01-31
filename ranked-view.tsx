import { Clock, MapPin, Users, PenIcon as Gun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { GameCard } from "./types"

interface RankedViewProps {
  filter: string
}

const games: GameCard[] = [
  {
    id: 1,
    image: "/placeholder.svg?height=200&width=400",
    weaponType: "Rifles",
    mode: "ARENA FUZIL",
    location: "INDÚSTRIA",
    players: "61",
    time: "08:58",
  },
  {
    id: 2,
    weaponType: "Pistolas",
    image: "/placeholder.svg?height=200&width=400",
    mode: "ARENA PISTOLA",
    location: "PREFEITURA",
    players: "41",
    time: "07:00",
  },
  {
    id: 3,
    weaponType: "Diversos",
    image: "/placeholder.svg?height=200&width=400",
    mode: "BATTLE ROYALE",
    location: "LOS SANTOS",
    players: "16",
    time: "20:21",
    gameType: "SOLO / DUO",
  },
  {
    id: 4,
    weaponType: "Diversos",
    image: "/placeholder.svg?height=200&width=400",
    mode: "CORRIDA ARMADA",
    location: "CAMPO DE GOLF",
    players: "14",
    time: "20:21",
  },
  {
    id: 5,
    weaponType: "Diversos",
    image: "/placeholder.svg?height=200&width=400",
    mode: "DESCE E QUEBRA",
    location: "LEGION SQUARE",
    players: "14",
    time: "11:23",
  },
]

export function RankedView({ filter }: RankedViewProps) {
  const filteredGames = games.filter((game) => {
    if (filter === "todos") return true
    return game.weaponType.toLowerCase() === filter.toLowerCase()
  })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredGames.map((game) => (
        <div key={game.id} className="relative group">
          <div className="relative h-[200px] rounded-lg overflow-hidden">
            <img src={game.image || "/placeholder.svg"} alt={game.mode} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <Badge
              className={`absolute top-2 left-2 ${
                game.weaponType === "Rifles"
                  ? "bg-blue-600"
                  : game.weaponType === "Pistolas"
                    ? "bg-orange-600"
                    : "bg-green-600"
              } text-white`}
            >
              {game.weaponType}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-200">
                <Gun className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>MODO: {game.mode}</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-200">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>LOCAL: {game.location}</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-200">
                <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>JOGADORES: {game.players}</span>
              </div>

              {game.gameType && (
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-200">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>MODO: {game.gameType}</span>
                </div>
              )}

              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-zinc-200">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>TEMPO: {game.time}</span>
              </div>
            </div>

            <Button
              className="w-full mt-2 sm:mt-4 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm py-1 sm:py-2"
              onClick={() => {
                console.log(`Clicked 'JOGAR AGORA' for ${game.mode} in Ranked view`)
              }}
            >
              JOGAR AGORA
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

