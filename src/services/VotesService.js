import { supabase } from "./supabase";

export default {
  async addVotePhotoAlbum(vote) {
    return await supabase
      .from('votephotoalbum')
      .insert(
        [{
          vote: vote
        }],
        { returning: "minimal" }
      );
  }
}