import Api from "./Api";

export default {
  addVotePhotoAlbum(vote) {
    const params = {
      vote: vote,
    };
    return Api.post(`/vote-photo-album`, params).then(res => res.data);
  }
}