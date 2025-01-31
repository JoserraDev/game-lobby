import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface TeamSelectionProps {
  isOpen: boolean
  onClose: () => void
  defenders: number
  attackers: number
  maxPlayers: number
  onTeamSelect: (team: "defenders" | "attackers" | "spectator") => void
  defenderTeamName: string
  attackerTeamName: string
  lobbyType: "matchmaking" | "training"
}

export function TeamSelectionDialog({
  isOpen,
  onClose,
  defenders,
  attackers,
  maxPlayers,
  onTeamSelect,
  defenderTeamName,
  attackerTeamName,
  lobbyType,
}: TeamSelectionProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Selecione seu time</DialogTitle>
          <DialogDescription className="text-sm text-zinc-400">
            Escolha entre Defensores, Atacantes{lobbyType === "training" ? " ou Espectador" : ""} para entrar na
            partida.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{defenderTeamName.toUpperCase()}</h3>
                <Badge className="bg-blue-600">DEF</Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-zinc-400">
                <Users className="h-4 w-4" />
                <span>
                  {defenders}/{maxPlayers}
                </span>
              </div>
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500"
              onClick={() => onTeamSelect("defenders")}
              disabled={defenders >= maxPlayers}
            >
              {defenders >= maxPlayers ? "EQUIPE CHEIA" : "ENTRAR"}
            </Button>
          </div>

          <div className="bg-zinc-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white">{attackerTeamName.toUpperCase()}</h3>
                <Badge className="bg-orange-600">ATO</Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-zinc-400">
                <Users className="h-4 w-4" />
                <span>
                  {attackers}/{maxPlayers}
                </span>
              </div>
            </div>
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 disabled:text-zinc-500"
              onClick={() => onTeamSelect("attackers")}
              disabled={attackers >= maxPlayers}
            >
              {attackers >= maxPlayers ? "EQUIPE CHEIA" : "ENTRAR"}
            </Button>
          </div>
        </div>

        {lobbyType === "training" && (
          <div className="mt-4">
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">ESPECTADOR</h3>
                  <Badge className="bg-purple-600">ESP</Badge>
                </div>
                <Eye className="h-4 w-4 text-zinc-400" />
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => onTeamSelect("spectator")}>
                ENTRAR COMO ESPECTADOR
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

