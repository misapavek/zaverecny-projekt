interface GameStatusProps {
    isInGame: boolean
}

export const GameStatus = ({ isInGame }: GameStatusProps) => {
    return (
        <div>
            {isInGame ? (
                <span style={{ color: 'green' }}>In Game</span>
            ) : (
                <span style={{ color: 'red' }}>Not in Game</span>
            )}
        </div>
    )
}