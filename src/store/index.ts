import { createStore } from "vuex";
import questions from "./questions";
import accounts from "./accounts";
import answers from "./answers";

export default createStore({
  modules: {
    questions,
    accounts,
    answers,
  },
});
