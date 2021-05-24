<template>
  <div :class="$style.container" v-loading="isLoading">
    <h1>Анкеты</h1>

    <div :class="$style.center">
      <ElInput
        placeholder="Поиск участника"
        suffix-icon="el-icon-search"
        v-model="search"
      />
    </div>

    <div :class="$style['container-cards']">
      <Card
        :key="index"
        :userId="account.id"
        :account="account"
        v-for="(account, index) in filterAccounts"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "@vue/runtime-core";
import { Ref, ref } from "vue";
import { useStore } from "vuex";

import { ElInput } from "element-plus";

import Card from "../components/Statistic/Card.vue";
import { User } from "@/types/accounts";

export default defineComponent({
  components: {
    Card,
    ElInput,
  },
  setup() {
    const store = useStore();
    const isLoading = ref(false);

    const search = ref("");

    const accounts = computed((): User[] => store.getters["accounts/accounts"]);
    const localAccounts: Ref<User[]> = ref([]);

    watch(
      () => accounts.value,
      () => {
        loading();
        setAccounts();
      }
    );

    const setAccounts = () => {
      if (accounts.value.length) {
        localAccounts.value = JSON.parse(JSON.stringify(accounts.value));
      }
    }

    const filterAccounts = computed(() => {
      return localAccounts.value.filter((account) =>
        account.full_name.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    function loading() {
      if (accounts.value.length) {
        isLoading.value = false;
      } else {
        isLoading.value = true;
      }
    }

    onMounted(() => {
      loading();
      setAccounts();
    });

    return {
      accounts,
      isLoading,
      filterAccounts,
      search,
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

.center {
  min-width 20rem
  width 30%
  margin 0 auto
  margin-top 2rem
  margin-bottom 4rem
}
</style>
