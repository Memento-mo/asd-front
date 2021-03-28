<template>
  <Header />

  <Main />

  <Footer />

  <div :class="$style.bg" />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import Header from "../components/Auth/Header.vue";
import Main from "../components/Auth/Main.vue";
import Footer from "../components/Auth/Footer.vue";

export default defineComponent({
  components: {
    Header,
    Main,
    Footer,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" module>
.bg {
  position absolute
  background-color #6B1DFF
  height 100vh
  width 200%
  clip-path polygon(50% 0, 0 38%, 100% 100%)
  z-index -1
  margin 0 auto
  top -13rem
  right -60%

  @media screen and (max-width: 800px) {
    top -14rem
    // height 800px
  }

  @media screen and (max-width: 380px) {
    top -8rem
    // height 500px
  }

}
</style>
