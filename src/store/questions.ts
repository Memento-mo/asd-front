import { VuexControl } from "@/types/common_types";
import { Question } from "@/types/questions";

interface State {
  questions: Array<Question>;
  numberQuestion: number;
}

export default {
  namespaced: true,
  state: {
    questions: [],
    numberQuestion: 0,
  },
  mutations: {
    SET_QUESTIONS: (state: State, questions: Array<Question>): void => {
      state.questions = questions;
    },
    SET_NUMBER: (state: State, newNumber: number): void => {
      state.numberQuestion = newNumber;
    },
  },
  getters: {
    questions: (state: State): Array<Question> => state.questions,
    numberQuestion: (state: State): number => state.numberQuestion,
  },
  actions: {
    fetchQuestions: ({ commit }: VuexControl<State>): Promise<void> => {
      return new Promise((resolve, reject) => {
        // получить вопросы
        const questions: Array<Question> = [
          { id: 1, text: "Кто самый веселый человек?" },
          { id: 2, text: "Сфоткай человека кто не съел утренний рулет?" },
          { id: 3, text: "Кто умеет играть на гитаре?" },
        ];

        commit("SET_QUESTIONS", questions);

        resolve();
      });
    },
    setNumber: ({ commit }: VuexControl<State>, newNumber: number): void => {
      commit("SET_NUMBER", newNumber);
    },
  },
};
