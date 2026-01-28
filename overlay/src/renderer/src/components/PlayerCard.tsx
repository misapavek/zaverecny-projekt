import { Player } from '../types/Ileague'
import './PlayerCard.css'

interface PlayerCardProps {
  player: Player
  isCurrentPlayer?: boolean
}

export const PlayerCard = ({ player, isCurrentPlayer }: PlayerCardProps) => {
  const kda = player.scores.deaths === 0 
    ? 'Perfect' 
    : ((player.scores.kills + player.scores.assists) / player.scores.deaths).toFixed(2)

  return (
    <div className={`player-card ${isCurrentPlayer ? 'current-player' : ''} ${player.team.toLowerCase()}`}>
      <div className="player-header">
        <div className="champion-info">
          <h3>{player.championName}</h3>
          <span className="level">Lvl {player.level}</span>
        </div>
        <div className="summoner-name">{player.summonerName}</div>
      </div>

      <div className="player-stats">
        <div className="stat-group">
          <div className="stat">
            <span className="stat-label">K/D/A</span>
            <span className="stat-value kda">
              {player.scores.kills}/{player.scores.deaths}/{player.scores.assists}
            </span>
            <span className="kda-ratio">{kda}</span>
          </div>

          <div className="stat">
            <span className="stat-label">CS</span>
            <span className="stat-value">{player.scores.creepScore}</span>
          </div>

          <div className="stat">
            <span className="stat-label">Vision</span>
            <span className="stat-value">{player.scores.wardScore}</span>
          </div>
        </div>

        {player.isDead && (
          <div className="death-timer">
            💀 {player.respawnTimer.toFixed(1)}s
          </div>
        )}
      </div>

      <div className="player-items">
        {player.items
          .filter(item => item.itemID !== 0)
          .slice(0, 6)
          .map((item, idx) => (
            <div key={idx} className="item" title={item.displayName}>
              {item.displayName.substring(0, 2)}
            </div>
          ))}
      </div>
    </div>
  )
}