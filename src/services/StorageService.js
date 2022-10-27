import Api from "./Api";

export default {
  importImagePost(
    files,
    thumbnails,
    groupId,
    userId
  ) {
    const formData = new FormData();
    formData.append('isComingFromWeb', "true")
    files.map(file => formData.append('images', file.file, file.name));
    thumbnails.map(thumbnail => formData.append('thumbnails', thumbnail.file, thumbnail.name));

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