<template>
  <header>
    <div>
      <h1>{{ title }}</h1>
    </div>

    <transition name="fade" mode="in-out">
      <ElCard :class="$style.card" v-show="isMainPage">
        <div class="row justify-content-center">
          <router-link to="/auth">
            <ElButton type="success"> Регистрация </ElButton>
          </router-link>
          <router-link to="/login">
            <ElButton type="success"> Войти </ElButton>
          </router-link>
        </div>
        <div :class="$style['card-statistic']">
          <router-link to="/statistic">Статистика</router-link>
        </div>
      </ElCard>
    </transition>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";

import { ElButton, ElCard } from "element-plus";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    ElButton,
    ElCard,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const title = ref("Молодежный отдел цо приветствует тебя!");

    const currentNumber = computed(
      () => store.getters["questions/numberQuestion"]
    );

    const isMainPage = computed(() => route.name === "main");

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
      isMainPage,
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

.card {
  margin-top 2rem

  a {
    text-decoration none
    color #fff
    margin-right 1rem
  }

  &-statistic {
    margin-top 1rem
    a {
      font-weight 500
      font-size 1.4rem
      color var(--secondary)
    }
  }
}
</style>
