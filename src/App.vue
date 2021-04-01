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

export default defineComponent({
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
      // router.replace({ name: "questions" });
    }

    onMounted(() => {
      setViewPort();
      redirect();
    });
  },
});
</script>
