<template>
  <header>
    <div>
      <h1>Молодежный отдел цо приветствует тебя!</h1>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ElButton } from "element-plus";

export default defineComponent({
  components: {
    ElButton,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus" module>
header {
  h1 {
    font-weight 700
    font-size 1.6rem
    text-transform uppercase
    text-align center
    line-height 22px
    color #fff
  }
}
</style>
