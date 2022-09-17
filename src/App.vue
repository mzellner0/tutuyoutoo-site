<template>
  <div>
    <router-view />
    <footer>
      <p>
        {{ getContact }}
        <a href="mailto:contact@tutuyoutoo.fr">contact@tutuyoutoo.fr</a>
      </p>
      <p>
        <a href="https://tutuyoutoo.com/src/policies.pdf" target="_blank">
          {{ getPolicies }}
        </a>
      </p>
    </footer>
  </div>
</template>

<script>

export default {
  name: "App",
  computed: {
    getContact() {
      if (this.$route.params.lang) {
        return this.$tr[this.$route.params.lang].contact;
      }
    },
    getPolicies() {
      if (this.$route.params.lang) {
        return this.$tr[this.$route.params.lang].policies;
      }
    }
  }
};
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
button, a {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
body {
  font-family: $police-1;
  background-color: $color-bg;
  color: $color-police-main;
  margin: 0;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background: $color-bg;
  }

  &::-webkit-scrollbar-thumb {
    background: $color-gradient-1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: $color-gradient-2;
  }
}
h1 {
  text-transform: uppercase;
  font-weight: normal;
  font-size: 40px;
  margin: 0;
}
h3 {
  text-transform: uppercase;
  font-weight: normal;
  font-size: 20px;
  margin: 0;
}
p {
  font-weight: normal;
}
a {
  text-decoration: none;
  color: $color-police-main;
}
input {
  outline: none;
  font-family: $police-1;
  color: $color-police-main;
}
h1, h2, h3, h4, h5, p, a, button, input {
  font-family: $police-1;
}
.container {
  @include flex(column, center, center);
}
.block-button {
  pointer-events: none;
}
.warning-no-group {
  width: 800px;
  margin: 120px auto;
  text-align: center;
  @include breakpoint(1279) {
    margin: 160px auto;
    margin-bottom: 70px;
    width: 90%;
  }
}
footer {
  padding: 40px;
  border-top: 2px solid $color-gradient-2;
  margin: auto;
  width: calc(100% - 80px);
  color: $color-gradient-2;
  text-align: center;
  background-color: #0a0e33;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.171);
  a {
    text-decoration: underline;
  }
}
</style>
