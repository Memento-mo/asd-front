<template>
  <LoginComponentCard />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginComponentCard from "../components/Login/LoginComponentCard.vue";

export default defineComponent({
  components: {
    LoginComponentCard,
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
