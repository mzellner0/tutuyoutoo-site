<template>
  <div>
    <div class="menu">
      <div class="menu__gradient-hide" />
      <div :class="['menu__links', { 'menu__links--mobile': !isOnDesktop }]">
        <router-link
          :class="[
            'menu__links__group-actif',
            { 'menu__links__group-actif--blue': isWarningBlue }
          ]"
          to="/groupes"
        >
          {{ getNameGroupActif }}
        </router-link>
        <router-link
          v-for="(link, index) in listLinks"
          :key="index"
          :to="link.to"
          :style="{ width: link.width }"
        >
          {{ link.name }}
        </router-link>
        <router-link
          v-if="userId == 1"
          to="/poll-result"
          :style="{ width: '45px' }"
        >
          Poll
        </router-link>
        <router-link
          to="/user"
        >
          <img
            v-if="user.imageUrl"
            :src="user.imageUrl"
            class="user-picture"
            alt="photo de profil"
          >
        </router-link>
      </div>
    </div>
    <div
      v-if="!isOnDesktop"
      :class="['menu-mobile']"
    >
      <router-link
        v-for="(link, index) in listLinks"
        :key="index"
        :to="link.to"
      >
        <img
          :src="getIcon(link.name)"
          :alt="link.name"
        >
      </router-link>
      <router-link
        v-if="userId == 1"
        to="/poll-result"
      >
        <img
          :src="require('../assets/images/home/vote.svg')"
          :alt="vote"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import responsiveMixin from "@/mixins/responsiveMixin";
import GroupsService from "@/services/GroupsService";

export default {
  name: "Menu",
  mixins: [responsiveMixin],
  data() {
    return {
      listLinks: [
        { name: "Mes groupes", to: "/groupes", width: "113px" },
        { name: "Propositions et votes", to: "/posts", width: "206px" },
        { name: "Tirage au sort", to: "/tirage-au-sort", width: "136px" },
        { name: "Contacts", to: "/contacts", width: "83px" },
        { name: "Comptes", to: "/comptes", width: "75px" }
      ],
      isWarningBlue: false
    };
  },
  computed: {
    ...mapState('user', {
      user: state => state.user
    }),
    ...mapState('groups', {
      groups: state => state.groups
    }),
    ...mapGetters('user', [
      'userId'
    ]),
    getNameGroupActif() {
      const getNameGroup = this.groups.filter(group => group.id === this.user.groupActif);
      if (getNameGroup.length > 0) {
        this.isWarningBlue = false;
        return getNameGroup[0].name;
      } else {
        this.isWarningBlue = true;
        return "Aucun groupe actif";
      }
    }
  },
  mounted() {
    this.loadGroups();
  },
  methods: {
    ...mapActions('groups', [
      'updateGroups'
    ]),
    getIcon(name) {
      switch (name) {
        case 'Mes groupes':
          return require("../assets/images/icons-menu/group-icon.svg");
        case 'Propositions et votes':
          return require("../assets/images/icons-menu/post-icon.svg");
        case 'Tirage au sort':
          return require("../assets/images/icons-menu/random-icon.svg");
        case 'Contacts':
          return require("../assets/images/icons-menu/contact-icon.svg");
        case 'Comptes':
          return require("../assets/images/icons-menu/euro-icon.svg");
      }
    },
    loadGroups() {
      GroupsService.getGroups(this.userId).then(response => {
        this.updateGroups(response);
      })
      .catch(() => {
        this.updateGroups([]);
      });
    },
    getNameGroupActif() {
      const getNameGroup = this.groups.filter(group => group.id === this.user.groupActif);
      if (getNameGroup.length > 0) {
        this.isWarningBlue = false;
        return getNameGroup[0].name;
      } else {
        this.isWarningBlue = true;
        return "Aucun groupe actif";
      }
    }
  },
};
</script>

<style lang="scss" scoped>
  .router-link-active {
      font-weight: bold;
      text-decoration: underline;
      img {
        filter: brightness(4) saturate(0);
      }
      .user-picture {
        filter: none;
      }
      &::after {
        content: none !important;
      }
  }
  .menu {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    background-image: $gradient-main;
    padding: 30px 40px;
    padding-right: 140px;
    width: calc(100% - 180px);
    &__gradient-hide {
      position: fixed;
      z-index: -1;
      background-color: $color-bg-light;
      width: 100%;
      height: 77px;
      top: 0;
      left: 0;
    }
    &__links {
      height: 19px;
      @include flex(row, center, flex-end);
      &__group-actif {
        margin: 0;
        height: 48px;
        @include flex(column, flex-start, center);
        display: flex !important;
        position: absolute !important;
        top: 15px;
        left: 40px;
        padding-left: 0 !important;
        color: $color-gradient-1;
        text-decoration: underline;
        &--blue {
          color: $color-gradient-2;
        }
        @include breakpoint(1279) {
          left: 25px;
        }
        @include breakpoint(500) {
          font-size: 13px;
          max-width: 145px;
        }
      }
      a {
        text-transform: uppercase;
        padding-left: 40px;
        position: relative;
        &::after {
          transition: 200ms;
          content: '';
          transform-origin: left;
          position: absolute;
          top: 20px;
          right: 0;
          height: 2px;
          width: inherit;
          background-color: $color-police-main;
          transform: scale(0);
        }
        &:last-of-type::after {
          content: none;
        }
        &:hover {
          &::after {
            transform: scale(1);
          }
        }
      }
      img {
        position: fixed;
        top: 20px;
        right: 30px;
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 100%;
        border: $color-gradient-1 4px solid;
        transition: 200ms;
        &:hover {
          transform: scale(1.04);
        }
      }
      &--mobile {
        a {
          display: none;
          &:last-of-type {
            display: block;
          }
        }
        img {
          top: 11px;
          width: 50px;
          height: 50px;
          border-width: 3px;
          right: 20px;
        }
      }
    }
  }
  .menu-mobile {
    z-index: 2;
    position: fixed;
    width: calc(100% - 30px);
    @include flex(row, center, flex-start);
    top: 78px;
    padding: 5px 15px;
    padding-bottom: 0;
    background-color: $color-bg-light;
    transition: 200ms;
    img {
      width: 30px;
      height: 30px;
      margin: 5px 20px;
      cursor: pointer;
    }
    a {
      margin: 5px 0px;
      text-transform: uppercase;
      max-width: 120px;
      &:first-of-type {
        img {
          margin-left: 5px;
        }
      }
    }
    @include breakpoint(500) {
      @include flex(row, center, space-between);
      img {
        margin: 5px 10px;
      }
    }
  }
</style>