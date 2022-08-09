<template>
  <LoaderCircle v-if="isGroupsLoading" />
  <div
    v-else
    class="groups container"
  >
    <div class="groups__actions">
      <div class="groups__action">
        <img
          src="@/assets/images/blue-plus.svg"
          alt="plus"
        >
        <p @click="openModal('create')">
          Créer un groupe
        </p>
      </div>
      <div class="groups__action">
        <img
          src="@/assets/images/blue-plus.svg"
          alt="plus"
        >
        <p @click="openModal('join')">
          Rejoindre un groupe
        </p>
      </div>
    </div>
    <GroupsList />
    <ModalCreateUpdateGroup v-if="modal.type === 'create'" />
    <ModalJoinGroup v-if="modal.type === 'join'" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import GroupsService from "@/services/GroupsService";
import GroupsList from "@/components/groups/GroupsList";
import ModalCreateUpdateGroup from "@/components/modal/ModalCreateUpdateGroup";
import ModalJoinGroup from "@/components/modal/ModalJoinGroup";
import LoaderCircle from "@/components/elmts/LoaderCircle";

export default {
  name: "GroupsView",
  components: {
    GroupsList,
    ModalCreateUpdateGroup,
    ModalJoinGroup,
    LoaderCircle
  },
  data() {
    return {
      isGroupsLoading: true
    };
  },
  computed: {
    ...mapState('modal', {
      modal: state => state.modal
    }),
    ...mapGetters('user', [
      'userId'
    ])
  },
  mounted() {
    GroupsService.getGroups(this.userId).then(response => {
      this.updateGroups(response);
      this.isGroupsLoading = false;
    })
    .catch(() => {
      this.updateGroups([]);
      this.isGroupsLoading = false;
    });
  },
  methods: {
    ...mapActions('groups', [
      'updateGroups'
    ]),
    ...mapActions('modal', [
      'updateOpen'
    ]),
    openModal(type) {
      this.updateOpen({ open: true, type: type });
    }
  },
};
</script>

<style lang="scss" scoped>
  .groups {
    width: 800px;
    margin: 120px auto;
    &__actions {
      width: 100%;
    }
    &__action {
      cursor: pointer;
      color: $color-gradient-2;
      @include flex(row, center, flex-start);
      img {
        margin-right: 5px;
      }
      p {
        margin: 8px 0px;
      }
    }
  }
  @include breakpoint(1279) {
    .groups {
      margin: 160px auto;
      margin-bottom: 70px;
      width: 90%;
    }
  }
</style>