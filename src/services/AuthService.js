import Api from "./Api";
import app from "@/main";

export default {
  signup(
    firstname,
    lastname,
    email,
    password,
    birthday
  ) {
    const params = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      birthday: birthday
    };
    return Api.post(`/auth/signup`, params).then(res => res.data);
  },

  login(
    email,
    password
  ) {
    const params = {
      email: email,
      password: password,
    };
    return Api.post(`/auth/login`, params).then(res => res.data);
  },

  getNewToken(refreshToken) {
    const params = {
      refreshToken: refreshToken
    };
    return Api.post('/auth/token', params).then(res => res.data);
  },

  logout(refreshToken) {
    const params = {
      refreshToken: refreshToken
    };
    return Api.post('/auth/logout', params).then(res => res.data);
  }
};
