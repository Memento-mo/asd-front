<template>
  <AuthCard />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

import AuthCard from "../components/Auth/AuthCard.vue";

export default defineComponent({
  components: {
    AuthCard,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" module></style>
