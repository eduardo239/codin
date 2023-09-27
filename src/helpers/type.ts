import { Timestamp } from "firebase/firestore";

export type TUser = {
  email: string;
  password: string;
};

export type IQuestion = {
  id: string;
  difficulty: number;
  code: string;
  title: string;
  language: string;
  alternatives: string;
};

export type TMessage = {
  message: string;
  type: "error" | "warning" | "info" | "success";
};

export type TChallenge = {
  title: string;
  language: string;
  code: string;
  difficulty: number;
  timer: string;
  correct: string;
  timestamp: Timestamp;
};

export type TUserAnswer = {
  isCorrect: boolean;
  userId: string;
  selectedAlternative: string;
  questionId: string;
  timeLeft: number;
  challengeTime: string;
  timestamp: Timestamp;
};

export type TUserAnswers = {
  id: string;
  timestamp: unknown;
  isCorrect: boolean;
  userId: string;
  questionId: string;
  selectedAlternative: number;
  timeLeft?: number;
  challengeTime?: number;
};

export type TLanguageList = {
  id: number;
  name: string;
  order: number;
};
