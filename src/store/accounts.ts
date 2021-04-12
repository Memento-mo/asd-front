import { VuexControl } from "@/types/common_types";
import { User } from "@/types/accounts";

import { useAxios } from "@/api/api";

const http = useAxios();
interface State {
  accounts: Array<User>;
  account: User | null;
}

export default {
  namespaced: true,
  state: {
    accounts: [],
    account: null,
  },
  mutations: {
    SET_ACCOUNTS: (state: State, accounts: Array<User>): void => {
      state.accounts = accounts;
    },
    SET_ACCOUNT: (state: State, account: User): void => {
      state.account = account;
    },
    SET_TOKEN: (state: State, token: string): void => {
      localStorage.setItem("token", token);
    },
    CLEAR_ACCOUNT: (state: State): void => {
      localStorage.removeItem("token");

      state.account = null;
    },
  },
  getters: {
    accounts: ({ accounts }: State): Array<User> => accounts,
    account: ({ accounts }: State) => (id: string): User | undefined =>
      accounts.find((account) => account.email === id),
    user: ({ account }: State): User | null => account,
  },
  actions: {
    fetchAccounts: ({ commit }: VuexControl<State>): void => {
      http.get("/api/users").then(({ data }) => {
        commit("SET_ACCOUNTS", data.users);
      });
      // const accounts: Array<Account> = [
      //   {
      //     id: "er43r2edwd",
      //     email: "gpologov@gmail.com",
      //     full_name: "Глеб Пологов",
      //     answers: [
      //       { id: "1", answer: "Саша Луговоской", img },
      //       { id: "2", answer: "Андрей Луговской", img },
      //     ],
      //   },
      //   {
      //     id: "dfs34r",
      //     email: "glebpologov@mail.ru",
      //     full_name: "Дима Артемов",
      //     answers: [
      //       { id: "2", answer: "Андрей Луговской", img },
      //       { id: "3", answer: "Миша Барышев", img },
      //     ],
      //   },
      // ];
    },
    fetchCreateUser: (
      { commit }: VuexControl<State>,
      user: User
    ): Promise<void> => {
      return http.post("/api/auth/registration", user).then(({ data }) => {
        commit("SET_TOKEN", data.token);
      });
    },
    fetchLogin: (
      { commit }: VuexControl<State>,
      email: string
    ): Promise<void> => {
      return http.post("/api/auth/login", { email }).then(({ data }) => {
        commit("SET_TOKEN", data.token);
      });
    },
    fetchUser: ({ commit }: VuexControl<State>): Promise<void> | undefined => {
      const token = localStorage.getItem("token");

      if (!token) return;

      return http.get(`/api/user/${token}`).then(({ data }) => {
        commit("SET_ACCOUNT", data.user);
      });
    },
    fetchLogout: ({ commit }: VuexControl<State>): void => {
      commit("CLEAR_ACCOUNT");
    },
  },
};
