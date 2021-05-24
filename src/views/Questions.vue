<template>
  <QuestionCard />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import QuestionCard from "../components/Questions/QuestionCard.vue";

export default defineComponent({
  components: {
    QuestionCard,
  },
});
</script>
