<template>
  <div :class="$style.box" v-loading="!account">
    <div :class="$style['card-item']" v-if="account">
      <div :class="$style['card-item__title']">
        <h1>{{ account.full_name }}</h1>
      </div>

      <main :class="$style['card-item__main']">
        <div :class="$style['card-item__img']">
          <img :src="linkImg(account.avatar)" />
        </div>

        <div :class="$style['card-item__questions']">
          <h2 :class="$style['card-item__questions-subtitle']">Вопросы</h2>

          <div :class="$style['card-item__questions-numbers']">
            <QuestionPicker
              :key="index"
              :question="question"
              :questionNumber="index + 1"
              :isDisabled="!isExistAnswer(question.id)"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import QuestionPicker from "../components/Statistic/QuestionPicker.vue";
import QuestionDialog from "../components/Dialogs/QuestionDialog.vue";
import { Question } from "@/types/questions";
import { linkImg } from "@/utils/base";
import { User } from "@/types/accounts";
import { UserAnswers } from "@/types/answer";

export default defineComponent({
  components: {
    QuestionPicker,
    QuestionDialog,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const account = computed(
      (): User => store.getters["accounts/account"](route.params.id)
    );
    const questions = computed(() => store.getters["questions/questions"]);
    const userAnswers = computed(
      (): UserAnswers => store.getters["answers/userAnswers"]
    );

    const visibleQuestion = ref({});
    const isVisibleDialog = ref(false);

    function setVisibleQuestion(id: string) {
      const foundQuestion = questions.value.find(
        (question: Question) => question.id === id
      );

      visibleQuestion.value = foundQuestion;

      isVisibleDialog.value = true;
    }

    function isExistAnswer(id: string) {
      const index = userAnswers.value.findIndex(
        (answer) => String(answer.question_id) === String(id)
      );

      return index !== -1;
    }

    function fetchUserAnswers() {
      store.dispatch("answers/fetchUserAnswers", account.value.id);
    }

    watch(
      () => account.value,
      () => {
        if (account.value) {
          fetchUserAnswers();
        }
      }
    );

    onMounted(() => {
      if (account.value) {
        fetchUserAnswers();
      }
    });

    return {
      account,
      questions,
      visibleQuestion,
      setVisibleQuestion,
      isVisibleDialog,
      isExistAnswer,
      linkImg,
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

.box {
  min-height 40rem
}
</style>
