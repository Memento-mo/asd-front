import { VuexControl } from "@/types/common_types";
import { Question } from "@/types/questions";

import { useAxios } from "@/api/api";

const http = useAxios();

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
      return http.get("/api/questions").then(({ data }) => {
        commit("SET_QUESTIONS", data.questions);
      });
    },
    setNumber: ({ commit }: VuexControl<State>, newNumber: number): void => {
      commit("SET_NUMBER", newNumber);
    },
  },
};
