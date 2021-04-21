export interface Answer {
  /**
   * @description id вопроса
   */
  question_id: string;
  text: string;
  image: string;
}

export type UserAnswers = Array<Answer>;
