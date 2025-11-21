interface WinMessageProps {
  moves: number;
}

export const WinMessage = ({ moves }: WinMessageProps) => {
  return(
    <div className="win-message">
      <h2>Congratulations!</h2>
      <p>You completed the game in {moves} moves!</p>
    </div>
  )
}