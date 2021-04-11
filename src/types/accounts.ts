export interface Answer {
  /**
   * @description id вопроса
   */
  id: string;
  answer: string;
  img: string;
}

export interface Account {
  id: string;
  email: string;
  full_name: string;
  answers: Array<Answer>;
}

export interface User {
  full_name: string;
  email: string;
  avatar: unknown;
  isAgree: boolean;
}
