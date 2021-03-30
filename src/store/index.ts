import { createStore } from "vuex";
import questions from "./questions";

export default createStore({
  modules: {
    questions,
  },
});
