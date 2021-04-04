<template>
  <Main />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Main from "../components/Login/LoginMain.vue";

export default defineComponent({
  components: {
    Main,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" module>
.title-card {
  color #333
  font-size 1.4rem
  line-height 1.6rem
  font-weight 500
}
</style>
