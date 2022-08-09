<template>
  <div class="poll container">
    <ul v-if="(listAnswers && listAnswers.length > 0) || (listEmails && listEmails.length > 0)">
      <div v-if="listAnswers && listAnswers.length > 0">
        <li
          v-for="answer in listAnswers"
          :key="answer.id"
        >
          <p>nom: {{ answer.firstname }}</p>
          <p>email: {{ answer.email }}</p>
          <p>réponse: {{ answer.content }}</p>
        </li>
        <li>--------------------------</li>
      </div>
      <div v-if="listEmails && listEmails.length > 0">
        <li
          v-for="email in listEmails"
          :key="email.id"
        >
          <p>nom: {{ email.firstname }}</p>
          <p>email: {{ email.email }}</p>
        </li>
        <li>--------------------------</li>
      </div>
      <div v-if="listAmbassadorVotesWithEmail && listAmbassadorVotesWithEmail.length > 0">
        <li
          v-for="ambassadorVote in listAmbassadorVotesWithEmail"
          :key="ambassadorVote.id"
        >
          <p>vote: {{ ambassadorVote.ambassador }}</p>
          <p>email: {{ ambassadorVote.email }}</p>
        </li>
      </div>
    </ul>
    <p v-else>
      Pas de participations !
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'PollResultView',
  computed: {
    ...mapState('poll', {
      listAnswers: state => state.listAnswers
    }),
    ...mapState('collectEmails', {
      listEmails: state => state.listEmails
    }),
    ...mapState('ambassadorVote', {
      listAmbassadorVotesWithEmail: state => state.listAmbassadorVotesWithEmail
    })
  },
  mounted() {
    this.updateListAnswers().then(() => {
      this.updateListEmails().then(() => {
        this.updateListAmbassadorVotesWithEmail();
      });
    });
  },
  methods: {
    ...mapActions('poll', [
      'updateListAnswers'
    ]),
    ...mapActions('collectEmails', [
      'updateListEmails'
    ]),
    ...mapActions('ambassadorVote', [
      'updateListAmbassadorVotesWithEmail'
    ])
  }
};
</script>

<style lang="scss" scoped>
.poll {
  width: 100%;
  ul {
    width: 80%;
    padding: 0;
  }
  li {
    margin: 15px 0px;
    color: $color-gradient-1;
    &:nth-child(2n) {
      color: $color-gradient-2;
    }
  }
  p {
    margin: 5px 0px;
  }
}
@include breakpoint(1280) {
  .poll {
    padding: 60px 0px;
    ul {
      width: 80%;
    }
  }
}
@include breakpoint(800) {
  .poll {
    padding: 60px 0px;
    ul {
      width: calc(80% - 20px);
    }
  }
}
</style>
