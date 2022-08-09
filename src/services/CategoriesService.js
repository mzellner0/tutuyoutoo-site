import Api from "./Api";

export default {
  getCategoriesPosts(
    groupId
  ) {
    return Api.get(`/categories/${groupId}/post/`).then(res => res.data);
  },

  getCategoriesContact(
    groupId
  ) {
    return Api.get(`/categories/${groupId}/contact/`).then(res => res.data);
  },

  createCategory(
    name,
    type,
    groupId,
    userId
  ) {
    const params = {
      name: name,
      type: type,
      userId: userId
    };
    return Api.post(`/categories/${groupId}`, params).then(res => res.data);
  },

  deleteCategories(
    userId,
    categoriesId
  ) {
    const params = {
      userId: userId
    };
    return Api.delete(`/categories/${categoriesId}`, { data: params }).then(res => res.data);
  }
};
