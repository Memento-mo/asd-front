import { createStore } from "vuex";
import questions from "./questions";
import accounts from "./accounts";

export default createStore({
  modules: {
    questions,
    accounts,
  },
});
