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
  },
  async addVoteGoodies(vote, email, accessories) {
    return await supabase
      .from('votegoodies')
      .insert(
        [{
          vote: vote,
          email: email,
          accessories: accessories
        }],
        { returning: "minimal" }
      );
  },
}