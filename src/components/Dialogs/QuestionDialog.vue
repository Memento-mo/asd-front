<template>
  <ElDialog
    :title="question.text"
    width="50%"
    :model-value="isVisible"
    :before-close="handlerCloseDialog"
  >
    <div>{{ question.text }}</div>
  </ElDialog>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { ElDialog } from "element-plus";

export default defineComponent({
  components: {
    ElDialog,
  },
  props: {
    question: Object,
    isVisible: Boolean,
  },
  setup(props, { emit }) {
    function handlerCloseDialog() {
      emit("update:isVisible", false);
    }
    return {
      handlerCloseDialog,
    };
  },
});
</script>
