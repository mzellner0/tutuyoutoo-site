import Api from "./Api";

export default {
  getPosts(
    groupId,
    offset
  ) {
    return Api.get(`/post/${groupId}/${offset}`).then(res => res.data);
  },

  getPostsOrderByVotes(
    groupId,
    offset
  ) {
    return Api.get(`/post/${groupId}/${offset}/orderbyvotes`).then(res => res.data);
  },

  getPostsOrderByVotesFromUser(
    groupId,
    userId,
    offset
  ) {
    return Api.get(`/post/${groupId}/${offset}/orderbyvotes/${userId}`).then(res => res.data);
  },

  getResponses(
    postId
  ) {
    return Api.get(`/post/${postId}/responses`).then(res => res.data);
  },

  getLikes(
    postId
  ) {
    return Api.get(`/post/${postId}/likes`).then(res => res.data);
  },

  createPost(
    content,
    userId,
    categoryId,
    groupId
  ) {
    const params = {
      content: content,
      userId: userId,
      categoryId: categoryId
    };
    return Api.post(`/post/${groupId}`, params).then(res => res.data);
  },

  createResponse(
    content,
    userId,
    postId,
    groupId
  ) {
    const params = {
      content: content,
      userId: userId,
      groupId: groupId
    };
    return Api.post(`/post/${postId}/response`, params).then(res => res.data);
  },

  updatePost(
    content,
    userId,
    categoryId,
    postId
  ) {
    const params = {
      content: content,
      userId: userId,
      categoryId: categoryId
    };
    return Api.put(`/post/${postId}`, params).then(res => res.data);
  },

  deletePost(
    userId,
    postId
  ) {
    const params = {
      userId: userId
    };
    return Api.delete(`/post/${postId}`, { data: params }).then(res => res.data);
  },

  deleteResponse(
    userId,
    responseId
  ) {
    const params = {
      userId: userId
    };
    return Api.delete(`/post/${responseId}/response`, { data: params }).then(res => res.data);
  },

  addRemoveLike(
    userId,
    postId,
    like
  ) {
    const params = {
      userId: userId,
      like: like
    };
    return Api.put(`/post/${postId}/like`, params).then(res => res.data);
  },

  importImagePost(
    image,
    groupId
  ) {
    const formData = new FormData();
    formData.append('image', image);

    return Api.post(`/post/${groupId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(res => res.data);
  },
};
