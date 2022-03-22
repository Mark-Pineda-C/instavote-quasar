import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useStore = defineStore("userSession", {
  state: () => {
    var userCode = LocalStorage.getItem("userId");
    var userRole = LocalStorage.getItem("userRole");
    var token = LocalStorage.getItem("accessToken");
    return {
      userCode,
      userRole,
      token,
    };
  },
  getters: {
    getToken: (state) => state.token,
    getCode: (state) => state.userCode,
    getRole: (state) => state.userRole,
  },
  actions: {
    setToken(token) {
      localStorage.setItem("accessToken", token);
      this.token = token;
    },
    setData(code, role) {
      localStorage.setItem("userId", code);
      localStorage.setItem("userRole", role);
      this.userCode = code;
      this.userRole = role;
    },
  },
});
