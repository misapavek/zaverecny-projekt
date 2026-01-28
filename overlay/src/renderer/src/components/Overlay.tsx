import { GameData } from "@renderer/types/Ileague"
import { GameStatus } from "./GameStatus"
import './Overlay.css'

interface OverlayProps {
    isInGame: boolean
    gameData: GameData | null
}

export const Overlay = ({ isInGame, gameData }: OverlayProps) => {
    return (
            <div className="overlay">
      <div className="overlay-header">
        <h1>LoL Overlay</h1>
      </div>

      <div className="overlay-content">
        <GameStatus isInGame={isInGame} />

        {isInGame && gameData?.activePlayer && (
          <div className="game-info">
            <h2>Game Info</h2>
            <p>{gameData.activePlayer.summonerName}</p>
            <p>{gameData.activePlayer.championStats.name}</p>
            <p>HP: {Math.floor(gameData.activePlayer.championStats.currentHealth)}</p>
          </div>
        )}

        {!isInGame && (
          <div className="waiting-message">
            <p>Start a League game to see stats!</p>
          </div>
        )}
      </div>
    </div>
    )
}