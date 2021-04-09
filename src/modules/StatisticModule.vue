<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();

    const questions = computed(() => store.getters["questions/questions"]);

    function fetchQuestions() {
      return store.dispatch("questions/fetchQuestions");
    }

    function fetchAccounts() {
      return store.dispatch("accounts/fetchAccounts");
    }

    async function init() {
      await fetchAccounts();

      if (!questions.value.length) {
        await fetchQuestions();
      }
    }

    onMounted(() => {
      init();
    });
  },
});
</script>
