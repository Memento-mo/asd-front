<template>
  <Main />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import Main from "../components/Auth/AuthMain.vue";

export default defineComponent({
  components: {
    Main,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" module></style>
