export interface GameCard {
  id: number
  image: string
  weaponType: "Rifles" | "Pistolas" | "Diversos"
  mode: string
  location: string
  players: string
  time: string
  gameType?: string
}

