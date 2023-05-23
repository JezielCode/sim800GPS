import { defineStore } from "pinia";

export const stateLoginStore = defineStore("acl", {
  state: () => ({
    stl: false,
    sru: "user",
  }),
  persist: true,
  getters: {
    getStateLogin: (state) => state.stl,
    getStateRole: (state) => state.sru,
  },
  actions: {
    writeStateLogin(value) {
      this.stl = value;
    },
    writeStateRole(value) {
      this.sru = value;
    },
  },
});
