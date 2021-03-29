<template>
  <div :class="$style.container">
    <Header />

    <Container>
      <template v-slot:icon>
        <ManIcon />
      </template>

      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </Container>
  </div>
  <div :class="$style.bg" />
</template>

<script>
import { defineComponent, onMounted } from "vue";

import { useRouter } from "vue-router";

import Header from "./components/Header.vue";
import Container from "./components/Container.vue";
import ManIcon from "./icons/ManIcon.vue";

export default defineComponent({
  components: {
    Header,
    Container,
    ManIcon,
  },
  setup() {
    const router = useRouter();

    function setViewPort() {
      let viewheight = window.innerHeight;
      let viewwidth = window.innerWidth;

      let viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute(
        "content",
        "height=" +
          viewheight +
          "px, width=" +
          viewwidth +
          "px, initial-scale=1.0"
      );
    }

    function redirect() {
      router.replace({ name: "auth" });
    }

    onMounted(() => {
      setViewPort();
      redirect();
    });

    return {};
  },
});
</script>

<style lang="stylus" module>
html {
  font-size 10px
}

* {
  box-sizing border-box
  margin 0
  padding 0
}

.container {
  padding 40px
  max-width 400px
  margin 0 auto
}

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
