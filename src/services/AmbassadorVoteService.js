import Api from "./Api";

export default {
  addVote(
    ambassador,
    email
  ) {
    const params = {
      ambassador: ambassador,
      email: email
    };
    return Api.post(`/ambassador-vote`, params).then(res => res.data);
  },

  getAmbassadorVotes() {
    return Api.get(`/ambassador-vote`).then(res => res.data);
  },

  getAmbassadorVotesWithEmail(
    userId
  ) {
    return Api.get(`/ambassador-vote/${userId}`).then(res => res.data);
  }
};
