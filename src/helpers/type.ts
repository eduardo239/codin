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
