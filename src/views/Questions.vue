<template>
  <div>
    <Main />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Main from "../components/Questions/Main.vue";

export default defineComponent({
  components: {
    Main,
  },
});
</script>
