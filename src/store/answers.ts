import { useAxios } from "@/api/api";
import { Answer } from "@/types/answer";
import { VuexControl } from "@/types/common_types";

const http = useAxios();

interface State {
  userAnswers: Array<Answer>;
}

export default {
  namespaced: true,
  state: {
    userAnswers: [],
  },
  getters: {
    userAnswers: (state: State): Array<Answer> => state.userAnswers,
  },
  mutations: {
    SET_USER_ANSWERS: (state: State, answers: Array<Answer>): void => {
      state.userAnswers = answers;
    },
  },
  actions: {
    fetchSendAnswer: (
      ctx: VuexControl<State>,
      answer: Answer
    ): Promise<void> => {
      return http.post("/api/answers", { answer });
    },
    fetchUserAnswers: ({ commit }: VuexControl<State>): Promise<void> => {
      return http.get("/api/answers").then(({ data }) => {
        commit("SET_USER_ANSWERS", data.answers);
      });
    },
  },
};
