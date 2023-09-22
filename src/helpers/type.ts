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
