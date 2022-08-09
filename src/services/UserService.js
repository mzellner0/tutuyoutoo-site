import Api from "./Api";

export default {
  getUser(
    userId
  ) {
    return Api.get(`/user/${userId}`).then(res => res.data);
  },

  createTempUsers(
    users,
    groupId,
    userId
  ) {
    const params = {
      users: users,
      groupId: groupId,
      userId: userId
    };
    return Api.post(`/user`, params).then(res => res.data);
  },

  updateUser(
    firstname,
    lastname,
    email,
    birthday,
    phraseDescription,
    groupActif,
    userId
  ) {
    const params = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      birthday: birthday,
      phraseDescription: phraseDescription,
      groupActif: groupActif
    };
    return Api.put(`/user/${userId}`, params).then(res => res.data);
  },

  updateAUserInAGroup(
    oldUserId,
    userId,
    groupId,
    inverse
  ) {
    let newUserId;
    let newOldUserId;
    if (inverse) {
      newOldUserId = userId;
      newUserId = oldUserId;
    } else {
      newOldUserId = oldUserId;
      newUserId = userId;
    }

    const params = {
      userId: newUserId,
      groupId: groupId
    };
    return Api.put(`/user/temp/${newOldUserId}`, params).then(res => res.data);
  },

  updateUserImage(
    image,
    userId
  ) {
    const formData = new FormData();
    formData.append('image', image);

    return Api.put(`/user/${userId}/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => res.data);
  },

  updateUserPassword(
    newPassword,
    oldPassword,
    userId
  ) {
    const params = {
      password: newPassword,
      oldPassword: oldPassword
    };
    return Api.put(`/user/${userId}/password`, params).then(res => res.data);
  },

  deleteUser(
    userId
  ) {
    return Api.delete(`/user/${userId}`).then(res => res.data);
  },

  deleteUserTemp(
    userIdTemp,
    userId
  ) {
    const params = {
      userId: userId,
    };
    return Api.delete(`/user/temp/${userIdTemp}`, { data: params }).then(res => res.data);
  }
};
