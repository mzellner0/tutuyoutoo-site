import Api from "./Api";

export default {
  importImagePost(
    files,
    groupId,
    userId
  ) {
    const formData = new FormData();
    files.map(file => formData.append('images', file));

    return Api.post(
      `/stock-photos/${groupId}/${userId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => res.data);
  },

  getSize(userId) {
    return Api.get(
      `/stock-photos/no-verif/size-used/${userId}`,
    ).then(res => res.data);
  }
}