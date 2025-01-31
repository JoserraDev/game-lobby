import { useState, useMemo } from "react"
import { Bell, PenIcon as Gun, Lock, Users, MapPin, Plus, RefreshCcw, Search, PenIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { TeamSelectionDialog } from "./team-selection-dialog"
import { CreateMatchDialog } from "./create-match-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface GameLobby {
  id: number
  status: "Aguardando" | "Em Jogo"
  system: string
  score: {
    defenders: number
    attackers: number
  }
  players: {
    defenders: number
    attackers: number
    maxPerTeam: number
  }
  weapon: string
  map: string
  isLocked: boolean
  password?: string
  defenderTeamName: string
  attackerTeamName: string
}

interface MatchmakingContentProps {
  showCreateMatch: boolean
  lobbyType: "matchmaking" | "training"
}

const initialMatchmakingLobbies: GameLobby[] = [
  {
    id: 1,
    status: "Aguardando",
    system: "perereca123",
    score: { defenders: 0, attackers: 0 },
    players: { defenders: 0, attackers: 0, maxPerTeam: 2 },
    weapon: "Pistola",
    map: "Prédio",
    isLocked: true,
    password: "1234",
    defenderTeamName: "Defensores",
    attackerTeamName: "Atacantes",
  },
  {
    id: 2,
    status: "Aguardando",
    system: "Sistema",
    score: { defenders: 0, attackers: 0 },
    players: { defenders: 5, attackers: 5, maxPerTeam: 5 },
    weapon: "Pistola",
    map: "Praça",
    isLocked: false,
    defenderTeamName: "Defensores",
    attackerTeamName: "Atacantes",
  },
  {
    id: 3,
    status: "Aguardando",
    system: "Sistema",
    score: { defenders: 0, attackers: 0 },
    players: { defenders: 1, attackers: 1, maxPerTeam: 4 },
    weapon: "Pistola",
    map: "Fast Food",
    isLocked: false,
    defenderTeamName: "Defensores",
    attackerTeamName: "Atacantes",
  },
  {
    id: 4,
    status: "Aguardando",
    system: "Sistema",
    score: { defenders: 0, attackers: 0 },
    players: { defenders: 2, attackers: 0, maxPerTeam: 3 },
    weapon: "Pistola",
    map: "Prédio",
    isLocked: false,
    defenderTeamName: "Defensores",
    attackerTeamName: "Atacantes",
  },
  {
    id: 5,
    status: "Em Jogo",
    system: "yandejava",
    score: { defenders: 10, attackers: 10 },
    players: { defenders: 3, attackers: 3, maxPerTeam: 3 },
    weapon: "Pistola",
    map: "Prédio",
    isLocked: false,
    defenderTeamName: "Defensores",
    attackerTeamName: "Atacantes",
  },
]

const initialTrainingLobbies: GameLobby[] = [
  {
    id: 1,
    status: "Aguardando",
    system: "Treino Básico",
    score: { defenders: 0, attackers: 0 },
    players: { defenders: 0, attackers: 0, maxPerTeam: 5 },
    weapon: "Pistola",
    map: "Campo de Treinamento",
    isLocked: false,
    defenderTeamName: "Recrutas",
    attackerTeamName: "Bots",
  },
  {
    id: 2,
    status: "Em Jogo",
    system: "Treino Avançado",
    score: { defenders: 5, attackers: 3 },
    players: { defenders: 3, attackers: 3, maxPerTeam: 3 },
    weapon: "Rifle",
    map: "Simulador Tático",
    isLocked: false,
    defenderTeamName: "Operadores",
    attackerTeamName: "IA Tática",
  },
  // Puedes agregar más lobbies de entrenamiento aquí
]

export function MatchmakingContent({ showCreateMatch, lobbyType }: MatchmakingContentProps) {
  const [selectedLobby, setSelectedLobby] = useState<GameLobby | null>(null)
  const [password, setPassword] = useState("")
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false)
  const [isCreateMatchDialogOpen, setIsCreateMatchDialogOpen] = useState(false)
  const [error, setError] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [lobbies, setLobbies] = useState<GameLobby[]>(
    lobbyType === "matchmaking" ? initialMatchmakingLobbies : initialTrainingLobbies,
  )

  const handleEnterClick = (lobby: GameLobby) => {
    console.log(`Attempting to enter lobby: ${lobby.id}`)
    if (lobby.isLocked) {
      console.log(`Lobby ${lobby.id} is locked, opening password dialog`)
      setSelectedLobby(lobby)
      setIsPasswordDialogOpen(true)
      setPassword("")
      setError(false)
    } else {
      console.log(`Lobby ${lobby.id} is unlocked, opening team selection dialog`)
      setSelectedLobby(lobby)
      setIsTeamDialogOpen(true)
    }
  }

  const handlePasswordSubmit = () => {
    console.log(`Attempting to submit password for lobby: ${selectedLobby?.id}`)
    if (selectedLobby && password === selectedLobby.password) {
      console.log(`Password correct for lobby ${selectedLobby.id}, opening team selection dialog`)
      setIsPasswordDialogOpen(false)
      setIsTeamDialogOpen(true)
      setPassword("")
      setError(false)
    } else {
      console.log(`Incorrect password for lobby ${selectedLobby?.id}`)
      setError(true)
    }
  }

  const handleTeamSelect = (team: "defenders" | "attackers" | "spectator") => {
    if (selectedLobby) {
      if (team === "spectator") {
        console.log(`Joining as spectator in lobby ${selectedLobby.id}`)
        // Aquí puedes implementar la lógica para unirse como espectador
        setIsTeamDialogOpen(false)
        setSelectedLobby(null)
      } else {
        const currentPlayers = selectedLobby.players[team]
        const maxPlayers = selectedLobby.players.maxPerTeam

        if (currentPlayers < maxPlayers) {
          console.log(`Joining ${team} team in lobby ${selectedLobby.id}`)
          // Aquí actualizarías el servidor con la nueva adición de jugador
          setIsTeamDialogOpen(false)
          setSelectedLobby(null)
        } else {
          console.log(`${team} team is full in lobby ${selectedLobby.id}`)
          // Opcionalmente, podrías mostrar un mensaje de error al usuario aquí
        }
      }
    }
  }

  const handleCreateMatch = (matchData: any) => {
    console.log("Creating new match:", matchData)
    const newLobby: GameLobby = {
      id: lobbies.length + 1,
      status: "Aguardando",
      system: matchData.system.slice(0, 20),
      score: { defenders: 0, attackers: 0 },
      players: { defenders: 0, attackers: 0, maxPerTeam: Number(matchData.maxPlayers) / 2 },
      weapon: matchData.weapon,
      map: matchData.map,
      isLocked: matchData.isLocked,
      password: matchData.isLocked ? matchData.password : undefined,
      defenderTeamName: matchData.defenderTeamName.slice(0, 15),
      attackerTeamName: matchData.attackerTeamName.slice(0, 15),
    }
    setLobbies((prevLobbies) => [newLobby, ...prevLobbies])
  }

  const filteredLobbies = useMemo(() => {
    if (!searchQuery) return lobbies
    return lobbies.filter((lobby) => lobby.system.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, lobbies])

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 mb-4">
          {showCreateMatch && (
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              onClick={() => setIsCreateMatchDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Criar {lobbyType === "matchmaking" ? "partida" : "treino"}
            </Button>
          )}
          <Button variant="ghost" size="icon" className="w-full sm:w-auto">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
            <Input
              placeholder="PESQUISAR POR NOME"
              className="pl-8 bg-zinc-800 border-zinc-700 text-white w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" size="icon" className="w-full sm:w-auto">
            <Bell className="h-4 w-4" />
          </Button>
        </div>

        {filteredLobbies.map((lobby) => (
          <div
            key={lobby.id}
            className="bg-zinc-800/50 rounded-lg p-2 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Badge variant="secondary" className="bg-blue-600 text-white truncate max-w-[100px]">
                  {lobby.defenderTeamName}
                </Badge>
                <span className="text-lg">{lobby.score.defenders}</span>
                <span className="text-zinc-400">x</span>
                <span className="text-lg">{lobby.score.attackers}</span>
                <Badge variant="secondary" className="bg-orange-600 text-white truncate max-w-[100px]">
                  {lobby.attackerTeamName}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <span
                    className={`h-2 w-2 rounded-full ${lobby.status === "Aguardando" ? "bg-green-500" : "bg-red-500"}`}
                  />
                  <span>{lobby.status}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <PenIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="truncate max-w-[150px]">{lobby.system}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{`${lobby.players.defenders + lobby.players.attackers}/${lobby.players.maxPerTeam * 2}`}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <Gun className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{lobby.weapon}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{lobby.map}</span>
                </div>
              </div>
            </div>
            <Button
              className={`w-full sm:w-auto min-w-[120px] ${
                lobby.status === "Em Jogo"
                  ? "bg-zinc-700 hover:bg-zinc-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => lobby.status === "Aguardando" && handleEnterClick(lobby)}
              disabled={lobby.status === "Em Jogo"}
            >
              {lobby.isLocked && lobby.status === "Aguardando" && <Lock className="mr-2 h-4 w-4" />}
              ENTRAR
            </Button>
          </div>
        ))}
      </div>

      {selectedLobby && (
        <TeamSelectionDialog
          isOpen={isTeamDialogOpen}
          onClose={() => {
            setIsTeamDialogOpen(false)
            setSelectedLobby(null)
          }}
          defenders={selectedLobby.players.defenders}
          attackers={selectedLobby.players.attackers}
          maxPlayers={selectedLobby.players.maxPerTeam}
          onTeamSelect={handleTeamSelect}
          defenderTeamName={selectedLobby.defenderTeamName}
          attackerTeamName={selectedLobby.attackerTeamName}
          lobbyType={lobbyType}
        />
      )}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Lock className="h-5 w-5" />
              CÓDIGO DA PARTIDA
            </DialogTitle>
            <DialogDescription className="text-sm text-zinc-400">
              DIGITE A SENHA PARA PARTICIPAR DA PARTIDA
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`bg-zinc-800 border-zinc-700 text-white ${error ? "border-red-500" : ""}`}
              placeholder="••••"
            />
            {error && <p className="text-sm text-red-500">Senha incorreta. Tente novamente.</p>}
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setIsPasswordDialogOpen(false)}
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                Cancelar
              </Button>
              <Button onClick={handlePasswordSubmit} className="bg-blue-600 hover:bg-blue-700">
                Confirmar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CreateMatchDialog
        isOpen={isCreateMatchDialogOpen}
        onClose={() => setIsCreateMatchDialogOpen(false)}
        onCreateMatch={handleCreateMatch}
        lobbyType={lobbyType}
      />
    </>
  )
}

