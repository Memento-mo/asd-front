<template>
  <div :class="$style.container">
    <h1>Анкеты</h1>

    <div :class="$style['container-cards']">
      <Card
        :key="index"
        :userId="account.email"
        v-for="(account, index) in accounts"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import Card from "../components/Statistic/Card.vue";

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const store = useStore();

    function fetchAccounts() {
      return store.dispatch("accounts/fetchAccounts");
    }

    async function init() {
      await fetchAccounts();
    }

    onMounted(() => {
      init();
    });
    return {
      accounts: computed(() => store.getters["accounts/accounts"]),
    };
  },
});
</script>

<style lang="stylus" module>
.container {
  padding 2rem
  color var(--text)

  h1 {
    font-size 3rem
  }

  &-cards {
    margin-top 10px
    display grid
    grid-template-columns: repeat(auto-fit, minmax(240px, 350px));
    grid-column-gap 2rem
    grid-row-gap 2rem
  }
}
</style>
