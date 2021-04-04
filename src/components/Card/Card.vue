<template>
  <ElCard class="card">
    <template v-slot:header class="clearfix">
      <slot name="header" />
    </template>

    <slot name="default" />
  </ElCard>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { ElCard } from "element-plus";

export default defineComponent({
  components: {
    ElCard,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="stylus">
.card {
  margin-top 1rem

  &:hover {
    transform translateY(0px)!important
  }

  &-title {
    color #333
    font-size 1.4rem
    line-height 1.6rem
    font-weight 500
  }
}
</style>
