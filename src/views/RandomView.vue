<template>
  <LoaderCircle v-if="isUsersLoading" />
  <div
    v-else-if="user.groupActif"
    class="random"
  >
    <div>
      <h3>Bienvenue dans le tirage au sort !</h3>
      <p>
        Séléctionnez les participants, ils apparaitront dans un certain ordre une fois le tirage au sort lancé. Le premier gagne, le second a la seconde place, etc ...
      </p>
      <p>
        Conseil: si vous voulez faire participer un groupe ne séléctionnez qu’une personne du groupe !
      </p>
    </div>
    <SelectUsers
      v-if="listWinnersOrdered.length == 0"
      @get-users-who-participate="getUsersWhoParticipate"
    />
    <Result
      v-else
      :list-winners-ordered="listWinnersOrdered"
      @reset="reset"
    />
  </div>
  <p
    v-else
    class="warning-no-group"
  >
    Vous devez séléctionner un groupe pour accéder à cette section
  </p>
</template>

<script>
import GroupsService from "@/services/GroupsService";
import { mapGetters, mapState, mapActions } from 'vuex';
import Result from "@/components/random/Result";
import SelectUsers from "@/components/random/SelectUsers";
import { getRandomInt } from '@/utils';
import LoaderCircle from "@/components/elmts/LoaderCircle";

export default {
  name: "RandomView",
  components: {
    SelectUsers,
    Result,
    LoaderCircle
  },
  data() {
    return {
      listWinnersOrdered: [],
      isUsersLoading: true
    };
  },
  computed: {
    ...mapGetters('user', [
      'groupId'
    ]),
    ...mapState('groups', [
      'usersInGroup'
    ]),
    ...mapState('user', {
      user: state => state.user
    })
  },
  mounted() {
    if (this.groupId !== "null") {
      GroupsService.getUsers(this.groupId)
      .then(response => {
        this.updateUsersInGroup(response);
        this.isUsersLoading = false;
      })
      .catch(() => {
        this.updateUsersInGroup([]);
        this.isUsersLoading = false;
      });
    } else {
      this.isUsersLoading = false;
    }
  },
  methods: {
    ...mapActions('groups', [
      'updateUsersInGroup'
    ]),
    getUsersWhoParticipate(payload) {
      this.listWinnersOrdered = [];
      const listParticipants = payload;

      while (listParticipants.length > 0) {
        const index = getRandomInt(0, listParticipants.length);
        this.listWinnersOrdered.push(listParticipants[index]);
        listParticipants.splice(index, 1);
      }
    },
    reset() {
      this.listWinnersOrdered = [];
    }
  },
};
</script>

<style lang="scss" scoped>
  .random {
    width: 800px;
    margin: 120px auto;
    @include flex(column, center, center);
    p {
      &:last-of-type {
        color: $color-gradient-1;
      }
    }
  }
  @include breakpoint(1279) {
    .random {
      margin: 160px auto;
      margin-bottom: 70px;
      width: 90%;
    }
  }
</style>