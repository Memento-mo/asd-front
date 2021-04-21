<template>
  <div :class="$style.container" v-loading="isLoading">
    <h1>Анкеты</h1>

    <div :class="$style['container-cards']">
      <Card
        :key="index"
        :userId="account.email"
        :account="account"
        v-for="(account, index) in accounts"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "@vue/runtime-core";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import Card from "../components/Statistic/Card.vue";

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const store = useStore();
    const isLoading = ref(false);

    const accounts = computed(() => store.getters["accounts/accounts"]);

    watch(
      () => accounts.value,
      () => {
        loading();
      }
    );

    function loading() {
      if (accounts.value.length) {
        isLoading.value = false;
      } else {
        isLoading.value = true;
      }
    }

    onMounted(() => {
      loading();
    });

    return {
      accounts,
      isLoading,
    };
  },
});
</script>

<style lang="stylus" module>
.container {
  padding 2rem
  color var(--text)
  min-height 50rem

  h1 {
    font-size 3rem
  }

  &-cards {
    margin-top 10px
    display grid
    grid-template-columns repeat(auto-fit, minmax(240px, 350px))
    grid-column-gap 2rem
    grid-row-gap 2rem

    justify-content center
  }
}
</style>
