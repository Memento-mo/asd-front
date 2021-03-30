import { VuexControl } from "@/types/common_types";

interface Question {
  id: number;
  text: string;
}

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
    fetchQuestions: ({ commit }: VuexControl<State>): void => {
      // получить вопросы
      const questions: Array<Question> = [
        { id: 1, text: "Сколько людей младше 25 лет?" },
        { id: 2, text: "Как зовут человека кто не съел утренний рулет?" },
        { id: 3, text: "Кто умеет играть на гитаре?" },
      ];

      commit("SET_QUESTIONS", questions);
    },
    setNumber: ({ commit }: VuexControl<State>, newNumber: number): void => {
      commit("SET_NUMBER", newNumber);
    },
  },
};