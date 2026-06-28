import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Field } from "../../components/Field";
import type { Category, Difficulty, GameSettings } from "../../types/game";

type SettingsScreenProps = {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  onStartRound: () => void;
  onBack: () => void;
  onClearSavedData: () => void;
};

export function SettingsScreen({
  settings,
  onSettingsChange,
  onStartRound,
  onBack,
  onClearSavedData,
}: SettingsScreenProps) {
  return (
    <Card>
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-200">Match setup</p>
      <h1 className="mt-2 text-3xl font-black">Choose the round</h1>
      <p className="mt-2 text-slate-300">Hard mode makes the wrong word much closer to the real one.</p>

      <div className="mt-6 space-y-4">
        <Field label="Category">
          <select
            className="min-h-12 w-full rounded-lg border border-white/10 bg-slate-900 px-4 text-white"
            value={settings.category}
            onChange={(event) => onSettingsChange({ ...settings, category: event.target.value as Category })}
          >
            <option value="footballers">Footballers</option>
            <option value="clubs">Clubs</option>
            <option value="mixed">Mixed</option>
          </select>
        </Field>

        <Field label="Difficulty">
          <select
            className="min-h-12 w-full rounded-lg border border-white/10 bg-slate-900 px-4 text-white"
            value={settings.difficulty}
            onChange={(event) => onSettingsChange({ ...settings, difficulty: event.target.value as Difficulty })}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </Field>
      </div>

      <div className="mt-7 space-y-3">
        <Button onClick={onStartRound}>Start Round</Button>
        <Button onClick={onBack} variant="secondary">
          Back to Players
        </Button>
        <Button onClick={onClearSavedData} type="button" variant="ghost">
          Clear saved data
        </Button>
      </div>
    </Card>
  );
}
