import type { GameSettings, Player } from "../types/game";

const storageKeys = {
  players: "offside-imposter:players",
  settings: "offside-imposter:settings",
};

export const defaultSettings: GameSettings = {
  category: "mixed",
  difficulty: "medium",
};

export function loadPlayers(): Player[] {
  return readJson<Player[]>(storageKeys.players, []);
}

export function savePlayers(players: Player[]) {
  localStorage.setItem(storageKeys.players, JSON.stringify(players));
}

export function loadSettings(): GameSettings {
  const saved = readJson<SavedSettings>(storageKeys.settings, {});

  return {
    category: normalizeCategory(saved.category),
    difficulty: saved.difficulty ?? defaultSettings.difficulty,
  };
}

export function saveSettings(settings: GameSettings) {
  localStorage.setItem(storageKeys.settings, JSON.stringify(settings));
}

export function clearSavedData() {
  Object.values(storageKeys).forEach((key) => localStorage.removeItem(key));
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

type SavedSettings = Partial<GameSettings> & {
  category?: GameSettings["category"] | "countries";
};

function normalizeCategory(category: SavedSettings["category"]): GameSettings["category"] {
  if (category === "footballers" || category === "clubs" || category === "mixed") {
    return category;
  }

  if (category === "countries") {
    return "clubs";
  }

  return defaultSettings.category;
}
