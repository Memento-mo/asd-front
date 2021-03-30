import { Commit, Dispatch, Getter } from "vuex";

export interface VuexControl<T> {
  commit: Commit;
  dispatch: Dispatch;
  getters: Getter<T, T>;
}
