import Api from "./Api";

export default {
  getGroups(
    userId
  ) {
    return Api.get(`/group/user/${userId}`).then(res => res.data);
  },

  getUsers(
    groupId
  ) {
    return Api.get(`/group/${groupId}/users`).then(res => res.data);
  },

  createGroup(
    name,
    password,
    userId
  ) {
    const params = {
      name: name,
      password: password,
      userId: userId
    };
    return Api.post(`/group`, params).then(res => res.data);
  },

  updateGroup(
    name,
    groupId,
    userId
  ) {
    const params = {
      name: name,
      userId: userId
    };
    return Api.put(`/group/${groupId}`, params).then(res => res.data);
  },

  joinGroup(
    groupId,
    password,
    userId
  ) {
    const params = {
      groupId: groupId,
      password: password,
      userId: userId
    };
    return Api.post(`/group/join`, params).then(res => res.data);
  },

  deleteGroup(
    groupId,
    userId
  ) {
    const params = {
      userId: userId,
    };
    return Api.delete(`/group/${groupId}`, { data: params }).then(res => res.data);
  }
};
