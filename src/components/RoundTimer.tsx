import { useEffect, useMemo, useState } from "react";
import { Button } from "./Button";

type RoundTimerProps = {
  initialSeconds?: number;
};

const defaultInitialSeconds = 120;

export function RoundTimer({ initialSeconds }: RoundTimerProps) {
  const safeInitialSeconds = normalizeInitialSeconds(initialSeconds);
  const [secondsLeft, setSecondsLeft] = useState(safeInitialSeconds);
  const [isRunning, setIsRunning] = useState(true);
  const progressWidth = getProgressWidth(secondsLeft, safeInitialSeconds);
  const isFinished = secondsLeft === 0;
  const formattedTime = useMemo(() => formatTime(secondsLeft), [secondsLeft]);

  useEffect(() => {
    setSecondsLeft(safeInitialSeconds);
    setIsRunning(true);
  }, [safeInitialSeconds]);

  useEffect(() => {
    if (!isRunning || isFinished) {
      return;
    }

    const timerId = window.setInterval(() => {
      setSecondsLeft((currentSeconds) => Math.max(0, currentSeconds - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [isFinished, isRunning]);

  function resetTimer() {
    setSecondsLeft(safeInitialSeconds);
    setIsRunning(true);
  }

  return (
    <div className="mt-6 rounded-lg border border-emerald-300/25 bg-emerald-400/10 p-4 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-100/80">Discussion timer</p>
      <p className="mt-2 text-5xl font-black tabular-nums text-white">{formattedTime}</p>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-300 transition-all duration-500"
          style={{ width: progressWidth }}
        />
      </div>

      <p className="mt-3 text-sm text-slate-300">
        {isFinished ? "Time is up. Make your final accusations." : "Use the time to ask questions and give clues."}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button onClick={() => setIsRunning((running) => !running)} type="button" variant="secondary">
          {isRunning ? "Pause" : "Resume"}
        </Button>
        <Button onClick={resetTimer} type="button" variant="secondary">
          Reset
        </Button>
      </div>
    </div>
  );
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function normalizeInitialSeconds(initialSeconds: number | undefined) {
  if (!initialSeconds || initialSeconds <= 0 || !Number.isFinite(initialSeconds)) {
    return defaultInitialSeconds;
  }

  return initialSeconds;
}

function getProgressWidth(secondsLeft: number, durationSeconds: number) {
  const safeDurationSeconds = normalizeInitialSeconds(durationSeconds);
  const safeSecondsLeft = Number.isFinite(secondsLeft) ? secondsLeft : 0;
  const progress = Math.min(1, Math.max(0, safeSecondsLeft / safeDurationSeconds));
  return `${progress * 100}%`;
}
