<template>
  <div>
    <div :class="$style.icon" @click="handleBack">
      <i class="el-icon-back" />
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const questions = computed(() => store.getters["questions/questions"]);

    function fetchQuestions() {
      return store.dispatch("questions/fetchQuestions");
    }

    function fetchAccounts() {
      return store.dispatch("accounts/fetchAccounts");
    }

    function handleBack() {
      router.go(-1);
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

    return {
      handleBack,
    };
  },
});
</script>

<style lang="stylus" module>
.icon {
  display flex
  justify-content center
  align-items center
  position fixed
  top 1rem
  left 1rem

  height 4rem
  width 4rem
  border-radius .4rem

  cursor pointer

  box-shadow 0 5px 20px 0 rgba(0, 0, 0, .3)
  i {
    font-size 3.4rem
  }
}
</style>
