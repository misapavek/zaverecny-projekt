export interface Player {
  championName: string
  isBot: boolean
  isDead: boolean
  respawnTimer: number
  runes: {
    keystone: {
      displayName: string
      id: number
    }
    primaryRuneTree: {
      displayName: string
      id: number
    }
    secondaryRuneTree: {
      displayName: string
      id: number
    }
  }
  scores: {
    assists: number
    creepScore: number
    deaths: number
    kills: number
    wardScore: number
  }
  skinID: number
  summonerName: string
  summonerSpells: {
    summonerSpellOne: {
      displayName: string
    }
    summonerSpellTwo: {
      displayName: string
    }
  }
  team: 'ORDER' | 'CHAOS'
  level: number
  items: Array<{
    canUse: boolean
    consumable: boolean
    count: number
    displayName: string
    itemID: number
    price: number
    slot: number
  }>
}

export interface ActivePlayer {
  championStats: {
    abilityPower: number
    armor: number
    armorPenetrationFlat: number
    armorPenetrationPercent: number
    attackDamage: number
    attackRange: number
    attackSpeed: number
    bonusArmorPenetrationPercent: number
    bonusMagicPenetrationPercent: number
    cooldownReduction: number
    critChance: number
    critDamage: number
    currentHealth: number
    healthRegenRate: number
    lifeSteal: number
    magicLethality: number
    magicPenetrationFlat: number
    magicPenetrationPercent: number
    magicResist: number
    maxHealth: number
    moveSpeed: number
    physicalLethality: number
    resourceMax: number
    resourceRegenRate: number
    resourceType: string
    resourceValue: number
    spellVamp: number
    tenacity: number
  }
  currentGold: number
  fullRunes: any
  level: number
  summonerName: string
}

export interface GameData {
  activePlayer?: ActivePlayer
  allPlayers?: Player[]
  events?: {
    Events: any[]
  }
  gameData?: {
    gameMode: string
    gameTime: number
    mapName: string
    mapNumber: number
    mapTerrain: string
  }
}