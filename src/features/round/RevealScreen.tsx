import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import type { Player, Round } from "../../types/game";

type RevealScreenProps = {
  players: Player[];
  round: Round;
  onComplete: () => void;
};

export function RevealScreen({ players, round, onComplete }: RevealScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const currentPlayer = players[currentIndex];
  const word = round.assignments[currentPlayer.id];
  const isLastPlayer = currentIndex === players.length - 1;

  function hideAndPass() {
    if (isLastPlayer) {
      onComplete();
      return;
    }

    setIsRevealed(false);
    setCurrentIndex((index) => index + 1);
  }

  return (
    <Card className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-200">
        Player {currentIndex + 1} of {players.length}
      </p>

      {!isRevealed ? (
        <>
          <h1 className="mt-5 text-3xl font-black">{currentPlayer.name}, tap to reveal</h1>
          <p className="mx-auto mt-3 max-w-xs text-slate-300">Keep the screen private before you press the button.</p>
          <Button className="mt-8" onClick={() => setIsRevealed(true)}>
            Reveal
          </Button>
        </>
      ) : (
        <>
          <p className="mt-5 text-slate-300">Your word is:</p>
          <div className="mt-4 rounded-lg border border-emerald-300/40 bg-emerald-400/10 px-4 py-8">
            <h1 className="text-4xl font-black text-emerald-100">{word}</h1>
          </div>
          <Button className="mt-8" onClick={hideAndPass}>
            Hide & pass phone
          </Button>
        </>
      )}
    </Card>
  );
}
