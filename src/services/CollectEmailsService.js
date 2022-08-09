import Api from "./Api";

export default {
  addEmail(
    firstname,
    email
  ) {
    const params = {
      firstname: firstname,
      email: email
    };
    return Api.post(`/collect-emails`, params).then(res => res.data);
  },

  getEmailsList(
    userId
  ) {
    return Api.get(`/collect-emails/${userId}`).then(res => res.data);
  }
};
