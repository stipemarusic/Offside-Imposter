import { wordItems } from "../data/words";
import type { Category, Difficulty, GameSettings, Player, Round, WordItem, WordType } from "../types/game";

export function createRound(players: Player[], settings: GameSettings): Round {
  const pool = getWordPool(settings);
  const correctWord = pickRandom(pool);
  const imposterWord = chooseImposterWord(correctWord, pool, settings.difficulty);
  const imposterPlayer = pickRandom(players);

  const assignments = players.reduce<Record<string, string>>((acc, player) => {
    acc[player.id] = player.id === imposterPlayer.id ? imposterWord.name : correctWord.name;
    return acc;
  }, {});

  return {
    correctWord,
    imposterWord,
    imposterPlayerId: imposterPlayer.id,
    assignments,
  };
}

function getWordPool(settings: GameSettings): WordItem[] {
  const wantedType = categoryToType(settings.category);

  return wordItems.filter((item) => (wantedType ? item.type === wantedType : true));
}

function chooseImposterWord(correctWord: WordItem, pool: WordItem[], difficulty: Difficulty): WordItem {
  const allScored = pool
    .filter((item) => item.id !== correctWord.id)
    .map((item) => scoreSimilarity(correctWord, item))
    .sort((a, b) => a.score - b.score);

  const scored = difficulty === "easy" ? allScored : allScored.filter((candidate) => candidate.strongMatches > 0);
  const candidatesForDifficulty = scored.length > 0 ? scored : allScored;

  if (candidatesForDifficulty.length === 0) {
    return correctWord;
  }

  const tierSize = Math.max(1, Math.ceil(candidatesForDifficulty.length / 3));
  const startByDifficulty: Record<Difficulty, number> = {
    easy: 0,
    medium: Math.max(0, Math.floor((candidatesForDifficulty.length - tierSize) / 2)),
    hard: Math.max(0, candidatesForDifficulty.length - tierSize),
  };

  const start = startByDifficulty[difficulty];
  const candidates = candidatesForDifficulty.slice(start, start + tierSize);
  return pickRandom(candidates.length > 0 ? candidates : candidatesForDifficulty).item;
}

const weakSimilarityTags = new Set([
  "attackers",
  "big-club",
  "big-spending",
  "box-to-box",
  "captain",
  "creative",
  "defenders",
  "defensive-midfielder",
  "dribbler",
  "experienced",
  "fans",
  "galacticos",
  "goalscorer",
  "goat",
  "organized",
  "passing",
  "passion",
  "physical",
  "playmaker",
  "possession",
  "pressing",
  "shot-stopper",
  "skill",
  "speed",
  "strikers",
  "sweeper-keeper",
  "tall",
  "technical",
  "wide-player",
  "wingers",
  "young",
]);

function scoreSimilarity(correctWord: WordItem, candidate: WordItem) {
  const candidateTags = new Set(candidate.tags);
  const sharedTags = correctWord.tags.filter((tag) => candidateTags.has(tag));
  const strongMatches = sharedTags.filter((tag) => !weakSimilarityTags.has(tag)).length;
  const weakMatches = sharedTags.length - strongMatches;

  return {
    item: candidate,
    score: strongMatches * 3 + weakMatches,
    strongMatches,
  };
}

function categoryToType(category: Category): WordType | null {
  if (category === "footballers") return "footballer";
  if (category === "clubs") return "club";
  return null;
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
