export interface GameData {
    activePlayer?: {
    summonerName: string
        championStats: {
            name: string
            level: number
            currentHealth: number
            maxHealth: number
            abilityPower: number
            attackDamage: number
            armor: number
            magicResist: number
            attackSpeed: number
            movementSpeed: number
        }
    }
    gameData?: {
        gameMode: string
        gameTime: number
    }
}