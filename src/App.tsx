import { useEffect, useState } from "react";
import { AppShell } from "./components/AppShell";
import { HomeScreen } from "./features/home/HomeScreen";
import { DiscussionScreen } from "./features/round/DiscussionScreen";
import { ResultScreen } from "./features/round/ResultScreen";
import { RevealScreen } from "./features/round/RevealScreen";
import { VotingScreen } from "./features/round/VotingScreen";
import { PlayerSetupScreen } from "./features/setup/PlayerSetupScreen";
import { SettingsScreen } from "./features/settings/SettingsScreen";
import { createRound } from "./lib/round";
import { clearSavedData, defaultSettings, loadPlayers, loadSettings, savePlayers, saveSettings } from "./lib/storage";
import type { GameSettings, Player, Round } from "./types/game";

type Screen = "home" | "players" | "settings" | "reveal" | "discussion" | "voting" | "result";

export function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [players, setPlayers] = useState<Player[]>(() => loadPlayers());
  const [settings, setSettings] = useState<GameSettings>(() => loadSettings());
  const [round, setRound] = useState<Round | null>(null);
  const [votedPlayerId, setVotedPlayerId] = useState<string | null>(null);

  useEffect(() => {
    savePlayers(players);
  }, [players]);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  function startRound() {
    setRound(createRound(players, settings));
    setVotedPlayerId(null);
    setScreen("reveal");
  }

  function playAgain() {
    startRound();
  }

  function newGame() {
    setRound(null);
    setVotedPlayerId(null);
    setScreen("players");
  }

  function clearData() {
    clearSavedData();
    setPlayers([]);
    setSettings(defaultSettings);
  }

  return (
    <AppShell>
      {screen === "home" && <HomeScreen onStart={() => setScreen("players")} />}

      {screen === "players" && (
        <PlayerSetupScreen
          onClearSavedData={clearData}
          onNext={() => setScreen("settings")}
          onPlayersChange={setPlayers}
          players={players}
        />
      )}

      {screen === "settings" && (
        <SettingsScreen
          onBack={() => setScreen("players")}
          onClearSavedData={clearData}
          onSettingsChange={setSettings}
          onStartRound={startRound}
          settings={settings}
        />
      )}

      {screen === "reveal" && round && (
        <RevealScreen onComplete={() => setScreen("discussion")} players={players} round={round} />
      )}

      {screen === "discussion" && <DiscussionScreen onStartVoting={() => setScreen("voting")} />}

      {screen === "voting" && (
        <VotingScreen
          onRevealResult={() => setScreen("result")}
          onSelectPlayer={setVotedPlayerId}
          players={players}
          selectedPlayerId={votedPlayerId}
        />
      )}

      {screen === "result" && round && (
        <ResultScreen
          onNewGame={newGame}
          onPlayAgain={playAgain}
          players={players}
          round={round}
          votedPlayerId={votedPlayerId}
        />
      )}
    </AppShell>
  );
}
