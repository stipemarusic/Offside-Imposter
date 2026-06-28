import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import type { Player, Round } from "../../types/game";

type ResultScreenProps = {
  players: Player[];
  round: Round;
  votedPlayerId: string | null;
  onPlayAgain: () => void;
  onNewGame: () => void;
};

export function ResultScreen({ players, round, votedPlayerId, onPlayAgain, onNewGame }: ResultScreenProps) {
  const imposter = players.find((player) => player.id === round.imposterPlayerId);
  const playersWon = votedPlayerId === round.imposterPlayerId;

  return (
    <Card className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-200">Result</p>
      <h1 className="mt-3 text-4xl font-black">{playersWon ? "Players won" : "Imposter survived"}</h1>

      <div className="mt-6 space-y-3 text-left">
        <ResultLine label="The imposter was" value={imposter?.name ?? "Unknown"} />
        <ResultLine label="Correct word" value={round.correctWord.name} />
        <ResultLine label="Imposter word" value={round.imposterWord.name} />
      </div>

      <div className="mt-8 space-y-3">
        <Button onClick={onPlayAgain}>Play Again</Button>
        <Button onClick={onNewGame} variant="secondary">
          New Game
        </Button>
      </div>
    </Card>
  );
}

type ResultLineProps = {
  label: string;
  value: string;
};

function ResultLine({ label, value }: ResultLineProps) {
  return (
    <div className="rounded-lg bg-white/8 px-4 py-4 ring-1 ring-white/10">
      <p className="text-sm font-bold uppercase tracking-wide text-emerald-100/75">{label}</p>
      <p className="mt-1 text-xl font-black text-white">{value}</p>
    </div>
  );
}
