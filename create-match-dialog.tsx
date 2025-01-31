import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check } from "lucide-react"
import type React from "react" // Added import for React

interface CreateMatchDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateMatch: (matchData: any) => void
  lobbyType: "matchmaking" | "training"
}

interface MapOption {
  value: string
  label: string
  image: string
}

const matchmakingMaps: MapOption[] = [
  { value: "Prédio", label: "Prédio", image: "/placeholder.svg?height=100&width=100" },
  { value: "Praça", label: "Praça", image: "/placeholder.svg?height=100&width=100" },
  { value: "Fast Food", label: "Fast Food", image: "/placeholder.svg?height=100&width=100" },
]

const trainingMaps: MapOption[] = [
  { value: "Campo de Treinamento", label: "Campo de Treinamento", image: "/placeholder.svg?height=100&width=100" },
  { value: "Simulador Tático", label: "Simulador Tático", image: "/placeholder.svg?height=100&width=100" },
  { value: "Arena de Tiro", label: "Arena de Tiro", image: "/placeholder.svg?height=100&width=100" },
]

export function CreateMatchDialog({ isOpen, onClose, onCreateMatch, lobbyType }: CreateMatchDialogProps) {
  const [matchData, setMatchData] = useState({
    system: "",
    map: "",
    weapon: "",
    maxPlayers: "",
    isLocked: false,
    password: "",
    defenderTeamName: lobbyType === "matchmaking" ? "Defensores" : "Recrutas",
    attackerTeamName: lobbyType === "matchmaking" ? "Atacantes" : "Bots",
  })

  const [errors, setErrors] = useState({
    map: false,
    weapon: false,
    maxPlayers: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMatchData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setMatchData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: false }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setMatchData((prev) => ({ ...prev, isLocked: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = {
      map: matchData.map === "",
      weapon: matchData.weapon === "",
      maxPlayers: matchData.maxPlayers === "",
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some(Boolean)) {
      return
    }

    onCreateMatch(matchData)
    onClose()
  }

  const mapOptions = lobbyType === "matchmaking" ? matchmakingMaps : trainingMaps

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white w-full max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Criar Novo {lobbyType === "matchmaking" ? "Partida" : "Treino"}</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para criar um novo {lobbyType === "matchmaking" ? "partida" : "treino"}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="system">Nome</Label>
            <Input
              id="system"
              name="system"
              value={matchData.system}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700 text-white w-full"
              required
              placeholder="Digite o nome da partida"
              maxLength={20}
            />
            <p className="text-xs text-zinc-400 mt-1">Máximo de 20 caracteres</p>
          </div>
          <div>
            <Label htmlFor="map" className="block mb-2">
              Mapa
            </Label>
            <RadioGroup
              onValueChange={(value) => handleSelectChange("map", value)}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {mapOptions.map((map) => (
                <div key={map.value} className="relative">
                  <RadioGroupItem value={map.value} id={map.value} className="peer sr-only" />
                  <Label
                    htmlFor={map.value}
                    className="flex flex-col items-center justify-between p-4 h-full text-center rounded-lg border-2 border-zinc-700 bg-zinc-800 cursor-pointer transition-all duration-200 ease-in-out hover:bg-zinc-700 peer-checked:border-blue-500 peer-checked:bg-blue-500/20"
                  >
                    <div className="relative w-full aspect-video mb-2 overflow-hidden rounded-md">
                      <img
                        src={map.image || "/placeholder.svg"}
                        alt={map.label}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 transition-opacity duration-200 peer-checked:opacity-100">
                        <Check className="w-8 h-8 text-blue-500" />
                      </div>
                    </div>
                    <span className="font-medium text-sm">{map.label}</span>
                    {matchData.map === map.value && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.map && <p className="text-xs text-red-500 mt-1">Selecione um mapa</p>}
          </div>
          <div>
            <Label htmlFor="weapon">Arma</Label>
            <Select name="weapon" onValueChange={(value) => handleSelectChange("weapon", value)} required>
              <SelectTrigger
                className={`bg-zinc-800 border-zinc-700 text-white w-full ${errors.weapon ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Selecione a arma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pistola">Pistola</SelectItem>
                <SelectItem value="Rifle">Rifle</SelectItem>
                <SelectItem value="Sniper">Sniper</SelectItem>
              </SelectContent>
            </Select>
            {errors.weapon && <p className="text-xs text-red-500 mt-1">Selecione uma arma</p>}
          </div>
          <div>
            <Label htmlFor="maxPlayers">Número máximo de jogadores</Label>
            <Select name="maxPlayers" onValueChange={(value) => handleSelectChange("maxPlayers", value)} required>
              <SelectTrigger
                className={`bg-zinc-800 border-zinc-700 text-white w-full ${errors.maxPlayers ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Selecione o número máximo de jogadores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="8">8</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
            {errors.maxPlayers && <p className="text-xs text-red-500 mt-1">Selecione o número máximo de jogadores</p>}
          </div>
          <div>
            <Label htmlFor="defenderTeamName">Nome da Equipe Defensora</Label>
            <Input
              id="defenderTeamName"
              name="defenderTeamName"
              value={matchData.defenderTeamName}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700 text-white w-full"
              required
              maxLength={15}
            />
            <p className="text-xs text-zinc-400 mt-1">Máximo de 15 caracteres</p>
          </div>
          <div>
            <Label htmlFor="attackerTeamName">Nome da Equipe Atacante</Label>
            <Input
              id="attackerTeamName"
              name="attackerTeamName"
              value={matchData.attackerTeamName}
              onChange={handleInputChange}
              className="bg-zinc-800 border-zinc-700 text-white w-full"
              required
              maxLength={15}
            />
            <p className="text-xs text-zinc-400 mt-1">Máximo de 15 caracteres</p>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="isLocked" checked={matchData.isLocked} onCheckedChange={handleSwitchChange} />
            <Label htmlFor="isLocked">Partida privada</Label>
          </div>
          {matchData.isLocked && (
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={matchData.password}
                onChange={handleInputChange}
                className="bg-zinc-800 border-zinc-700 text-white w-full"
                required
              />
            </div>
          )}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Criar Partida
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

