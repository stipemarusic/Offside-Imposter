export type Category = "footballers" | "clubs" | "mixed";
export type Difficulty = "easy" | "medium" | "hard";
export type WordType = "footballer" | "club";

export type Player = {
  id: string;
  name: string;
};

export type GameSettings = {
  category: Category;
  difficulty: Difficulty;
};

export type WordItem = {
  id: string;
  name: string;
  type: WordType;
  tags: string[];
};

export type Round = {
  correctWord: WordItem;
  imposterWord: WordItem;
  imposterPlayerId: string;
  assignments: Record<string, string>;
};
