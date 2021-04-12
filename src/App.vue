<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";

import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();

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

    function fetchUser() {
      return store.dispatch("accounts/fetchUser");
    }

    function redirect() {
      // router.replace({ name: "questions" });
    }

    function init() {
      setViewPort();
      fetchUser();
      redirect();
    }

    onMounted(() => {
      init();
    });
  },
});
</script>
