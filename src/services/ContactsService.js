import Api from "./Api";

export default {
  getContacts(
    groupId
  ) {
    return Api.get(`/contact/${groupId}/`).then(res => res.data);
  },

  createContact(
    firstname,
    lastname,
    email,
    phone,
    categoryId,
    groupId,
    userId
  ) {
    const params = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      categoryId: categoryId,
      userId: userId
    };
    return Api.post(`/contact/${groupId}`, params).then(res => res.data);
  },

  updateContact(
    firstname,
    lastname,
    email,
    phone,
    categoryId,
    userId,
    contactId
  ) {
    const params = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      categoryId: categoryId,
      userId: userId
    };
    return Api.put(`/contact/${contactId}`, params).then(res => res.data);
  },

  deleteContact(
    userId,
    contactId
  ) {
    const params = {
      userId: userId
    };
    return Api.delete(`/contact/${contactId}`, { data: params }).then(res => res.data);
  }
};
