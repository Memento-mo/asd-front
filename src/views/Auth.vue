<template>
  <AuthComponentCard />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import AuthComponentCard from "../components/Auth/AuthComponentCard.vue";

export default defineComponent({
  components: {
    AuthComponentCard,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" module></style>
