import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import type { Player } from "../../types/game";

type VotingScreenProps = {
  players: Player[];
  selectedPlayerId: string | null;
  onSelectPlayer: (playerId: string) => void;
  onRevealResult: () => void;
};

export function VotingScreen({ players, selectedPlayerId, onSelectPlayer, onRevealResult }: VotingScreenProps) {
  return (
    <Card>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-200">Final whistle</p>
      <h1 className="mt-2 text-3xl font-black">Who has the wrong word?</h1>

      <div className="mt-6 grid gap-3">
        {players.map((player) => {
          const selected = selectedPlayerId === player.id;

          return (
            <button
              className={`min-h-16 rounded-lg px-4 text-left text-lg font-black ring-1 transition ${
                selected
                  ? "bg-yellow-300 text-slate-950 ring-yellow-100"
                  : "bg-white/8 text-white ring-white/10 hover:bg-white/15"
              }`}
              key={player.id}
              onClick={() => onSelectPlayer(player.id)}
              type="button"
            >
              {player.name}
            </button>
          );
        })}
      </div>

      <Button className="mt-7" disabled={!selectedPlayerId} onClick={onRevealResult}>
        Reveal Result
      </Button>
    </Card>
  );
}
