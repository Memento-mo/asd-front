import { VuexControl } from "@/types/common_types";
import { User } from "@/types/accounts";

import { useAxios } from "@/api/api";

const http = useAxios();
interface State {
  accounts: Array<User>;
  account: User | null;
  token: string | null;
}

export default {
  namespaced: true,
  state: {
    accounts: [],
    account: null,
    token: null,
  },
  mutations: {
    SET_ACCOUNTS: (state: State, accounts: Array<User>): void => {
      state.accounts = accounts;
    },
    SET_ACCOUNT: (state: State, account: User): void => {
      state.account = account;
    },
    SET_TOKEN: (state: State, token: string): void => {
      state.token = token;

      localStorage.setItem("token", token);
    },
    CLEAR_ACCOUNT: (state: State): void => {
      localStorage.removeItem("token");

      state.account = null;
      state.token = null;
    },
    SET_STATE_TOKEN: (state: State, token: string): void => {
      state.token = token;
    },
  },
  getters: {
    accounts: ({ accounts }: State): Array<User> => accounts,
    account: ({ accounts }: State) => (id: string): User | undefined =>
      accounts.find((account) => account.email === id),
    user: ({ account }: State): User | null => account,
    token: ({ token }: State): string | null => token,
  },
  actions: {
    fetchAccounts: ({ commit }: VuexControl<State>): void => {
      http.get("/api/users").then(({ data }) => {
        commit("SET_ACCOUNTS", data.users);
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
    setToken: ({ commit }: VuexControl<State>): boolean => {
      const token = localStorage.getItem("token");
      if (token) {
        commit("SET_STATE_TOKEN", token);

        return true;
      }

      return false;
    },
  },
};
