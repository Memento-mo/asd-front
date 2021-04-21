<template>
  <QuestionsComponentCard />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import QuestionsComponentCard from "../components/Questions/QuestionsComponentCard.vue";

export default defineComponent({
  components: {
    QuestionsComponentCard,
  },
});
</script>
