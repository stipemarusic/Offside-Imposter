import { FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Field } from "../../components/Field";
import type { Player } from "../../types/game";

type PlayerSetupScreenProps = {
  players: Player[];
  onPlayersChange: (players: Player[]) => void;
  onNext: () => void;
  onClearSavedData: () => void;
};

export function PlayerSetupScreen({ players, onPlayersChange, onNext, onClearSavedData }: PlayerSetupScreenProps) {
  const [name, setName] = useState("");
  const canContinue = players.length >= 3;

  function addPlayer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) return;

    onPlayersChange([...players, { id: crypto.randomUUID(), name: trimmed }]);
    setName("");
  }

  function removePlayer(playerId: string) {
    onPlayersChange(players.filter((player) => player.id !== playerId));
  }

  return (
    <Card>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-200">Players</p>
      <h1 className="mt-2 text-3xl font-black">Who is playing?</h1>
      <p className="mt-2 text-slate-300">Add at least 3 players, then pass the phone when the round starts.</p>

      <form className="mt-6 space-y-3" onSubmit={addPlayer}>
        <Field label="Player name">
          <input
            className="min-h-12 w-full rounded-lg border border-white/10 bg-white/10 px-4 text-white placeholder:text-slate-400"
            placeholder="e.g. Luka"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Field>
        <Button type="submit" variant="secondary">
          Add Player
        </Button>
      </form>

      <div className="mt-6 space-y-2">
        {players.length === 0 ? (
          <p className="rounded-lg border border-dashed border-white/20 px-4 py-5 text-center text-slate-400">
            No players yet.
          </p>
        ) : (
          players.map((player, index) => (
            <div
              className="flex min-h-14 items-center justify-between gap-3 rounded-lg bg-white/8 px-4 ring-1 ring-white/10"
              key={player.id}
            >
              <span className="font-bold">
                {index + 1}. {player.name}
              </span>
              <button
                className="rounded-md px-3 py-2 text-sm font-bold text-red-100 hover:bg-red-500/20"
                onClick={() => removePlayer(player.id)}
                type="button"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 space-y-3">
        <Button disabled={!canContinue} onClick={onNext}>
          Continue
        </Button>
        {!canContinue && <p className="text-center text-sm text-slate-400">Minimum 3 players required.</p>}
        <Button onClick={onClearSavedData} type="button" variant="ghost">
          Clear saved data
        </Button>
      </div>
    </Card>
  );
}
