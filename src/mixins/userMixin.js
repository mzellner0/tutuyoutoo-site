import { mapActions, mapState, mapGetters } from 'vuex';
import UserService from "@/services/UserService";
import AuthService from "@/services/AuthService";

export default {
  computed: {
    ...mapState('user', {
      user: state => state.user
    }),
    ...mapGetters('user', [
      'userId'
    ]),
    ...mapGetters('tokens', [
      'refreshToken'
    ])
  },
  methods: {
    ...mapActions('tokens', [
      'updateToken',
      'updateRefreshToken'
    ]),
    ...mapActions('user', [
      'updateUser'
    ]),
    ...mapActions('loader', [
      'updateLoadingCircleUser'
    ]),
    ...mapActions('modal', [
      'updateOpen'
    ]),
    getUserFirstLoad() {
      if (!this.user.firstname && this.userId) {
        UserService.getUser(this.userId).then(res => {
          localStorage.setItem('groupId', res.groupActif);
          this.updateUser({
            id: res.userId,
            firstname: res.firstname,
            lastname: res.lastname,
            email: res.email,
            phraseDescription: res.phrase_description,
            birthday: res.birthday,
            imageUrl: res.imageUrl,
            groupActif: res.groupActif
          });
          this.updateLoadingCircleUser(false);
        });
      } else {
        this.updateLoadingCircleUser(false);
      }
    },
    callApiUpdatePhotoUser(image) {
      UserService.updateUserImage(image, this.userId)
      .then(res => {
        this.updateUser({...this.user,
          imageUrl: res.newUrl
        });
      });
    },
    callApiUpdateUser() {
      localStorage.setItem('groupId', this.user.groupActif);

      return UserService.updateUser(
        this.user.firstname,
        this.user.lastname,
        this.user.email,
        this.user.birthday,
        this.user.phraseDescription,
        this.user.groupActif,
        this.userId
      );
    },
    callApiUpdatePasswordUser(newPassword, oldPassword) {
      return UserService.updateUserPassword(
        newPassword,
        oldPassword,
        this.userId
      );
    },
    logout() {
      AuthService.logout(this.refreshToken)
      .then(() => {
        this.afterLogout();
      });
    },
    deleteAccount() {
      UserService.deleteUser(this.userId)
      .then(() => {
        this.updateOpen({ open: false });
        this.afterLogout();
      });
    },
    afterLogout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('groupId');
      localStorage.removeItem('jwt');
      localStorage.removeItem('jwtRefresh');
      this.$router.push({ name: "Login" });
    },
    afterSign(res) {
      localStorage.setItem('userId', res.userId);
      this.updateToken(res.token);
      this.updateRefreshToken(res.refreshToken);

      this.updateUser({});
      this.updateUser({...this.user,
        id: res.userId
      });
      this.getUserFirstLoad();
      this.$router.push({ name: "Groups" });
    }
  },
};