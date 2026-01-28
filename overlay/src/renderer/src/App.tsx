import { Overlay } from "./components/Overlay"
import { useLeagueGame } from "./hooks/useLeagueGame"

function App() {

  const {gameData, isInGame} = useLeagueGame()
  return (
    <div className="App">
      <Overlay isInGame={isInGame} gameData={gameData} />
    </div>
  )
}

export default App
