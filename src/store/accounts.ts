import { VuexControl } from "@/types/common_types";

interface Answer {
  /**
   * @description id вопроса
   */
  id: string;
  answer: string;
}

interface Account {
  id: string;
  email: string;
  answers: Array<Answer>;
}

interface State {
  accounts: Array<Account>;
}

export default {
  namespaced: true,
  state: {
    accounts: [],
  },
  mutations: {
    SET_ACCOUNTS: (state: State, accounts: Array<Account>): void => {
      state.accounts = accounts;
    },
  },
  getters: {
    accounts: ({ accounts }: State): Array<Account> => accounts,
  },
  actions: {
    fetchAccounts: ({ commit }: VuexControl<State>): void => {
      // запрос пользователей
      const accounts: Array<Account> = [
        {
          id: "er43r2edwd",
          email: "gpologov@gmail.com",
          answers: [
            { id: "1", answer: "Саша Луговоской" },
            { id: "2", answer: "Андрей Луговской" },
          ],
        },
        {
          id: "er43r2edwd",
          email: "glebpologov@mail.ru",
          answers: [
            { id: "1", answer: "Саша Луговоской" },
            { id: "2", answer: "Андрей Луговской" },
            { id: "3", answer: "Миша Барышев" },
          ],
        },
      ];

      commit("SET_ACCOUNTS", accounts);
    },
  },
};
