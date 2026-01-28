import { GameStatus } from './GameStatus'
import { PlayerCard } from './PlayerCard'
import { GameData } from '../types/Ileague'
import './Overlay.css'

interface OverlayProps {
  isInGame: boolean
  gameData: GameData | null
}

export const Overlay = ({ isInGame, gameData }: OverlayProps) => {
  const yourTeam = gameData?.allPlayers?.filter(
    p => p.team === gameData.allPlayers?.find(pl => pl.summonerName === gameData.activePlayer?.summonerName)?.team
  )
  
  const enemyTeam = gameData?.allPlayers?.filter(
    p => p.team !== gameData.allPlayers?.find(pl => pl.summonerName === gameData.activePlayer?.summonerName)?.team
  )

  return (
    <div className="overlay">
      <div className="overlay-header">
        <h1>LoL Overlay</h1>
        <GameStatus isInGame={isInGame} />
      </div>

      <div className="overlay-content">
        {!isInGame && (
          <div className="waiting-message">
            <p>Start a League game to see stats!</p>
          </div>
        )}

        {isInGame && gameData?.allPlayers && (
          <div className="teams-container">
            <div className="team-section">
              <h2 className="team-title ally">Your Team</h2>
              <div className="players-list">
                {yourTeam?.map((player, idx) => (
                  <PlayerCard 
                    key={idx} 
                    player={player}
                    isCurrentPlayer={player.summonerName === gameData.activePlayer?.summonerName}
                  />
                ))}
              </div>
            </div>

            <div className="team-section">
              <h2 className="team-title enemy">Enemy Team</h2>
              <div className="players-list">
                {enemyTeam?.map((player, idx) => (
                  <PlayerCard key={idx} player={player} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}