export interface Answer {
  /**
   * @description id вопроса
   */
  id: string;
  answer: string;
}

export interface Account {
  id: string;
  email: string;
  full_name: string;
  answers: Array<Answer>;
}
