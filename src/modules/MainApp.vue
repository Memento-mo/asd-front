<template>
  <div>
    <div :class="$style.container">
      <Header />

      <Container>
        <template v-slot:icon>
          <transition name="fade" mode="out-in">
            <router-link key="question" to="/" v-if="isQuestionsPage">
              <QuestionIcon />
            </router-link>
            <router-link key="auth" to="/" v-else-if="isAuthPages">
              <ManIcon />
            </router-link>
          </transition>
        </template>

        <!-- <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view> -->
        <router-view />
      </Container>
    </div>
    <div :class="$style.bg" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { useRoute } from "vue-router";

import Header from "../components/ui/Header.vue";
import Container from "../components/ui/Container.vue";

import ManIcon from "../icons/ManIcon.vue";
import QuestionIcon from "../icons/QuestionIcon.vue";

export default defineComponent({
  components: {
    Header,
    Container,
    ManIcon,
    QuestionIcon,
  },
  setup() {
    const route = useRoute();

    const isQuestionsPage = computed(() => route.name === "questions");

    const isAuthPages = computed(
      () => route.name === "auth" || route.name === "login"
    );

    return {
      isQuestionsPage,
      isAuthPages,
    };
  },
});
</script>

<style lang="stylus" module>
.container {
  padding 40px
  max-width 400px
  margin 0 auto
  position relative
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
