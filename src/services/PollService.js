import Api from "./Api";

export default {
  createAnswer(
    firstname,
    email,
    content
  ) {
    const params = {
      firstname: firstname,
      email: email,
      content: content
    };
    return Api.post(`/poll`, params).then(res => res.data);
  },

  getPollList(
    userId
  ) {
    return Api.get(`/poll/${userId}`).then(res => res.data);
  }
};
