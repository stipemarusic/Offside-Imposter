import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

type HomeScreenProps = {
  onStart: () => void;
};

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <Card className="text-center">
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border-4 border-emerald-300 bg-emerald-500/15 text-4xl font-black text-emerald-200">
        OI
      </div>
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-yellow-200">Pass the phone</p>
      <h1 className="text-5xl font-black leading-none text-white">Offside Imposter</h1>
      <p className="mx-auto mt-4 max-w-xs text-lg leading-7 text-slate-200">
        A football party game. One player is offside.
      </p>
      <Button className="mt-8" onClick={onStart}>
        Start Game
      </Button>
    </Card>
  );
}
