import { VuexControl } from "@/types/common_types";
import { Account, User } from "@/types/accounts";

import img from "../assets/img";

import { useAxios } from "@/api/api";

const http = useAxios();
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
    SET_TOKEN: (state: State, token: string): void => {
      localStorage.setItem("token", token);
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
              { id: "1", answer: "Саша Луговоской", img },
              { id: "2", answer: "Андрей Луговской", img },
            ],
          },
          {
            id: "dfs34r",
            email: "glebpologov@mail.ru",
            full_name: "Дима Артемов",
            answers: [
              { id: "2", answer: "Андрей Луговской", img },
              { id: "3", answer: "Миша Барышев", img },
            ],
          },
        ];

        setTimeout(() => {
          resolve();
          commit("SET_ACCOUNTS", accounts);
        }, 100);
      });
    },
    fetchCreateUser: (
      { commit }: VuexControl<State>,
      user: User
    ): Promise<void> => {
      return http.post("/api/auth/registration", user).then(({ data }) => {
        commit("SET_TOKEN", data.token);
      });
    },
    fetchLogin: ({ commit }: VuexControl<State>, email: string) => {
      return http.post("/api/auth/login", { email }).then(({ data }) => {
        commit("SET_TOKEN", data.token);
      });
    },
  },
};
