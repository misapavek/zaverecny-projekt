import { GameData } from "@renderer/types/Ileague"
import { useEffect, useState } from "react"

declare global {
    interface Window {
        leagueAPI: {
            getGameData: () => Promise<GameData>
            notifyGameStateChanged: (isInGame: boolean) => void
        }
    }
}

export const useLeagueGame = () => {
    const [gameData, setGameData] = useState<GameData | null>(null)
    const [isInGame, setIsInGame] = useState(false)
    useEffect(() => {
        let previousGameState = false
        const checkGame = setInterval(async () => {
            try {
                const data = await window.leagueAPI.getGameData()
                setGameData(data)
                setIsInGame(true)

                if(!previousGameState){
                    window.leagueAPI.notifyGameStateChanged(true)
                    previousGameState = true
                }
            } catch (error) {
                setIsInGame(false)
                setGameData(null)

                if (previousGameState){
                    window.leagueAPI.notifyGameStateChanged(false)
                    previousGameState = false
                }
            }
        }, 5000)

    const checkNow = async () => {
        try {
            const data = await window.leagueAPI.getGameData()
            setGameData(data)
            setIsInGame(true)
            window.leagueAPI.notifyGameStateChanged(true)
            previousGameState = true
        } catch (error) {
            setIsInGame(false)
            window.leagueAPI.notifyGameStateChanged(false)
            previousGameState = false
        }
    }
    
    checkNow()

    return () => clearInterval(checkGame)
    }, [])

    return { gameData, isInGame }

}