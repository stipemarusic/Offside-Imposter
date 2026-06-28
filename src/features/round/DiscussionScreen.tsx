import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

type DiscussionScreenProps = {
  onStartVoting: () => void;
};

export function DiscussionScreen({ onStartVoting }: DiscussionScreenProps) {
  return (
    <Card className="text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-200">Discussion</p>
      <h1 className="mt-3 text-3xl font-black">Everyone has seen their word.</h1>
      <div className="mt-6 space-y-3 rounded-lg bg-white/8 px-4 py-5 text-left text-lg leading-7 text-slate-100 ring-1 ring-white/10">
        <p>Take turns giving clues.</p>
        <p>Try to find who is in the offside position.</p>
      </div>
      <Button className="mt-8" onClick={onStartVoting}>
        Start Voting
      </Button>
    </Card>
  );
}
