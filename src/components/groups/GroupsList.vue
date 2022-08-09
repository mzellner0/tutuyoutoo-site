<template>
  <div class="groups-list">
    <h3>Mes groupes de voyage :</h3>
    <ul v-if="groups.length > 0">
      <li 
        v-for="(group, index) in groups"
        :key="index"
      >
        <div
          class="groups-list__text"
          @click="switchGroup(group.id)"
        >
          <p :class="[{ 'groups-list__group-actif': group.id == user.groupActif }]">
            {{ group.name }}
          </p>
          <p v-if="group.id == user.groupActif">
            (groupe actif)
          </p>
          <span>(id: {{ group.id }})</span>
        </div>
        <div class="groups-list__icones">
          <!-- <img
            v-if="group.userId != userId"
            src="@/assets/images/leave.svg"
            alt="quitter le groupe"
            @click="tryToDelete(group)"
          > -->
          <img
            v-if="group.userId == userId"
            src="@/assets/images/edit.svg"
            alt="modifiter le groupe"
            @click="editGroup(group)"
          >
          <img
            v-if="group.userId == userId"
            src="@/assets/images/trash.svg"
            alt="quitter le groupe"
            @click="tryToDelete(group)"
          >
        </div>
      </li>
    </ul>
    <p
      v-else
      class="groups-list__no-group"
    >
      Vous n'avez pas encore de groupes de voyage.
    </p>
    <ModalWarning
      v-if="modal.type === 'warning'"
      :warning="getTextWarning"
      @continue="leftGroup"
    />
    <ModalCreateUpdateGroup
      v-if="modal.type === 'update-group'"
      :old-group="groupActifObject"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import userMixin from "@/mixins/userMixin";
import GroupsService from "@/services/GroupsService";
import ModalWarning from "@/components/modal/ModalWarning";
import ModalCreateUpdateGroup from "@/components/modal/ModalCreateUpdateGroup";

export default {
  name: "GroupsList",
  components: {
    ModalWarning,
    ModalCreateUpdateGroup
  },
  mixins: [userMixin],
  data() {
    return {
      groupActifUserId: null,
      groupActif: null,
      groupActifObject: null
    };
  },
  computed: {
    ...mapState('groups', {
      groups: state => state.groups
    }),
    ...mapState('modal', {
      modal: state => state.modal
    }),
    ...mapGetters('user', [
      'groupId'
    ]),
    getTextWarning() {
      if (this.groupActifUserId == this.userId) {
        return 'Voulez vous vraiment supprimer le groupe ? Comme vous en êtes son administrateur, il sera supprimé pour tout le monde.';
      } else {
        return 'Voulez vous vraiment quitter le groupe ?';
      }
    }
  },
  methods: {
    ...mapActions('groups', [
      'updateGroups'
    ]),
    ...mapActions('modal', [
      'updateOpen'
    ]),
    ...mapActions('categories', [
      'updateCategoryPost'
    ]),
    leftGroup(payload) {
      let isGroupActif = false;
      if (this.user.groupActif === this.groupId) {
        isGroupActif = true;
      }
      if (payload === true) {
        GroupsService.deleteGroup(this.groupActif, this.userId).then(response => {
            GroupsService.getGroups(this.userId).then(response => {
              this.updateGroups(response);
              if (isGroupActif) {
                this.updateUser({...this.user,
                  groupActif: null
                });
                this.callApiUpdateUser();
              }
              this.updateOpen({ open: false });
            })
            .catch((error) => {
              this.updateGroups(response);
              this.updateOpen({ open: false });
            });
        });
      }
    },
    editGroup(group) {
      this.groupActifObject = group;
      this.updateOpen({ open: true, type: "update-group" });
    },
    tryToDelete(group) {
      this.groupActif = group.id;
      this.groupActifUserId = group.userId;
      this.updateOpen({ open: true, type: "warning" });
    },
    switchGroup(groudId) {
      this.updateCategoryPost({ index: -1, name: "Tout" });
      this.updateUser({...this.user,
        groupActif: groudId
      });
      this.callApiUpdateUser();
    }
  }
};
</script>

<style lang="scss" scoped>
  .groups-list {
    width: 100%;
    margin-top: 30px;
    p {
      text-align: left;
      margin: 0;
    }
    h3 {
      background-color: $color-bg-line-2;
      border-radius: 10px 10px 0px 0px;
      padding: 15px 20px;
    }
    ul {
      margin: 0;
      list-style: none;
      padding-left: 0px;
    }
    img {
      margin: 0 5px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      object-fit: contain;
    }
    li {
      @include flex(row, center, space-between);
      padding: 15px 20px;
      padding-left: 40px;
      color: $color-gradient-1;
      background-color: $color-bg-line-1;
      font-size: 18px;
      &:last-of-type {
        border-radius: 0px 0px 10px 10px;
      }
      &:nth-of-type(2n) {
        color: $color-gradient-2;
        background-color: $color-bg-line-2;
      }
      p {
        margin-right: 10px;
      }
    }
    &__text {
      cursor: pointer;
      @include flex(row, center, flex-start);
      span {
        font-size: 13px;
        color: $color-police-main;
      }
    }
    &__group-actif {
      font-weight: bold;
      text-decoration: underline;
    }
    &__no-group {
      padding: 15px 20px;
      color: $color-gradient-1;
      background-color: $color-bg-line-1;
      border-radius: 0px 0px 10px 10px;
    }
    &__icones {
      @include flex(row, center, center);
      img {
        width: 30px;
        height: 30px;
        object-fit: contain;
        &:first-of-type {
          width: 33px;
          height: 33px;
        }
      }
    }
  }
  @include breakpoint(600) {
    .groups-list {
      h3 {
        background-color: $color-bg-line-2;
        border-radius: 10px 10px 0px 0px;
        padding: 15px 20px;
        font-size: 18px;
      }
      img {
        width: 25px;
        height: 25px;
      }
      li {
        padding: 15px 8px;
        padding-left: 18px;
        font-size: 16px;
      }
      &__text {
        @include flex(column, flex-start, center);
      }
      &__icones {
        margin-right: 5px;
        img {
          width: 25px;
          height: 25px;
          margin: 0px 2px;
          &:first-of-type {
            width: 28px;
            height: 28px;
          }
        }
      }
      &__group-actif {
        font-size: 18px;
      }
    }
  }
</style>