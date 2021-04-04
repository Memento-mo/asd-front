import { VuexControl } from "@/types/common_types";
import { Account } from "@/types/accounts";

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
    account: ({ accounts }: State) => (id: string): Account | undefined =>
      accounts.find((account) => account.email === id),
  },
  actions: {
    fetchAccounts: ({ commit }: VuexControl<State>): Promise<void> => {
      return new Promise((resolve, reject): void => {
        // запрос пользователей
        const accounts: Array<Account> = [
          {
            id: "er43r2edwd",
            email: "gpologov@gmail.com",
            full_name: "Глеб Пологов",
            answers: [
              { id: "1", answer: "Саша Луговоской" },
              { id: "2", answer: "Андрей Луговской" },
            ],
          },
          {
            id: "dfs34r",
            email: "glebpologov@mail.ru",
            full_name: "Андрей Луговской",
            answers: [
              { id: "2", answer: "Андрей Луговской" },
              { id: "3", answer: "Миша Барышев" },
            ],
          },
        ];

        setTimeout(() => {
          resolve();
          commit("SET_ACCOUNTS", accounts);
        }, 100);
      });
    },
  },
};
