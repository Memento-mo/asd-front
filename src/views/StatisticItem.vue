<template>
  <div :class="$style['card-item']">
    <div :class="$style['card-item__title']">
      <h1>{{ account.full_name }}</h1>
    </div>

    <main :class="$style['card-item__main']">
      <div :class="$style['card-item__img']">
        <img src="../assets/my-photo.jpg" />
      </div>

      <div :class="$style['card-item__questions']">
        <h2 :class="$style['card-item__questions-subtitle']">Вопросы</h2>

        <div :class="$style['card-item__questions-numbers']">
          <QuestionPicker
            :key="index"
            :question="question"
            :questionNumber="index + 1"
            :isDisabled="isExistAnswer(question.id)"
            v-for="(question, index) in questions"
            @handler-set-question="setVisibleQuestion"
          />
        </div>
      </div>
    </main>
    <QuestionDialog
      :question="visibleQuestion"
      v-model:isVisible="isVisibleDialog"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, Ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import QuestionPicker from "../components/Statistic/QuestionPicker.vue";
import QuestionDialog from "../components/Dialogs/QuestionDialog.vue";
import { Question } from "@/types/questions";
import { Account } from "@/types/accounts";

export default defineComponent({
  components: {
    QuestionPicker,
    QuestionDialog,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const account: Ref<Account> = ref({
      id: "",
      email: "",
      full_name: "",
      answers: [],
    });

    const accounts = computed(() => store.getters["accounts/accounts"]);
    const questions = computed(() => store.getters["questions/questions"]);

    const visibleQuestion = ref({});
    const isVisibleDialog = ref(false);

    function setVisibleQuestion(id: number) {
      const foundQuestion = questions.value.find(
        (question: Question) => question.id === id
      );

      visibleQuestion.value = foundQuestion;

      isVisibleDialog.value = true;
    }

    function isExistAnswer(id: string) {
      const index = account.value.answers.findIndex(
        (answer) => String(answer.id) === String(id)
      );

      return index === -1;
    }

    function setAccount() {
      account.value = store.getters["accounts/account"](route.params.id);
    }

    function fetchAccounts() {
      return store.dispatch("accounts/fetchAccounts");
    }

    async function init() {
      if (!accounts.value.length) {
        await fetchAccounts();

        setAccount();
      } else {
        setAccount();
      }
    }

    onMounted(() => {
      init();
    });

    return {
      account,
      questions,
      visibleQuestion,
      setVisibleQuestion,
      isVisibleDialog,
      isExistAnswer,
    };
  },
});
</script>

<style lang="stylus" module>
.card-item {
  max-width 600px
  margin 0 auto
  padding 10px

  &__title {
    margin-top 2rem
    h1 {
      color var(--text)
    }
  }
  &__main {
    margin-top 2rem
  }
  &__img {
    border-radius 20px
    display inline-block

    img {
      border-radius 20px
      max-width 30rem
      height auto
      box-shadow 0 5px 20px 0 rgba(0,0,0, .2);
    }
  }
  &__questions {
    margin-top 2rem

    &-subtitle {
      font-size 1.8rem
      color var(--text)
    }

    &-numbers {
      margin-top 1.5rem
      display grid
      grid-template-columns repeat(auto-fit, 36px)
      grid-column-gap 1rem
      grid-row-gap 1rem
      justify-content center
    }
  }
}
</style>
