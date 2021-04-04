<template>
  <QuestionsMain />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import QuestionsMain from "../components/Questions/QuestionsMain.vue";

export default defineComponent({
  components: {
    QuestionsMain,
  },
});
</script>
