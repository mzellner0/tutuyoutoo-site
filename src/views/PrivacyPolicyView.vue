<template>
  <div class="privacy-policy container">
    <LangButton link="privacy-policy" />
    <h1>
      {{ $tr[$route.params.lang].privacyPolicyTitle }}
    </h1>
    <div>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle1 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc1 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle2 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc2 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle3 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc3 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle4 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc4 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle5 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc5 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle6 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc6 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle7 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc7 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle8 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc8 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle9 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc9 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle10 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc10 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle11 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc11 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle12 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc12 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle13 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc13 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle14 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc14 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle15 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc15 }}</p>
      <h2>{{ $tr[$route.params.lang].privacyPolicySubTitle16 }}</h2>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc16 }}</p>
      <p>{{ $tr[$route.params.lang].privacyPolicyDesc17 }}</p>
    </div>
  </div>
</template>

<script>
import LangButton from "@/components/elmts/LangButton";

export default {
  name: 'PrivayPolicyView',
  components: {
    LangButton
  }
};
</script>

<style lang="scss" scoped>
  .privacy-policy {
    margin: 100px;
  }

  @include breakpoint(1279) {
    .privacy-policy {
      margin: 10%;
      h1 {
        font-size: 25px;
      }
    }
  }
</style>