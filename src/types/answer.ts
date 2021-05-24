export interface Answer {
  /**
   * @description id вопроса
   */
  question_id: string;
  text: string | null;
  image: string | null;
}

export type UserAnswers = Array<Answer>;
