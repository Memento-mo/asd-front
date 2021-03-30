<template>
  <header>
    <div>
      <h1>{{ title }}</h1>
    </div>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";

import { ElButton } from "element-plus";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    ElButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const title = ref("Молодежный отдел цо приветствует тебя!");

    const currentNumber = computed(
      () => store.getters["questions/numberQuestion"]
    );

    watch(
      () => [route.name, currentNumber.value],
      () => {
        changeTitle();
      }
    );

    function changeTitle() {
      if (route.name === "questions") {
        // из стора получить текущий вопрос
        title.value = `Вопрос ${currentNumber.value + 1}`;
      } else {
        title.value = "Молодежный отдел цо приветствует тебя!";
      }
    }

    function init() {
      changeTitle();
    }

    onMounted(() => {
      init();
    });
    return {
      title,
    };
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
