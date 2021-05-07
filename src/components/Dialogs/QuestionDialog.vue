<template>
  <ElDialog
    :title="question.text"
    width="50%"
    :model-value="isVisible"
    :before-close="handlerCloseDialog"
  >
    <main :class="$style.main">
      <div :class="$style['main-answer__text']" class="row align-items-center">
        <div :class="$style.title">Ответ:</div>
        <div>
          {{ textAnswer }}
        </div>
      </div>

      <div
        :class="$style['main-answer__img']"
        class="row flex-direction-column"
      >
        <div :class="$style.title">Изображение:</div>
        <div>
          <div class="card-loading" v-if="!imageAnswer" v-loading="true" />

          <img :src="imageAnswer" v-else />
        </div>
      </div>
    </main>
  </ElDialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { ElDialog } from "element-plus";
import { useStore } from "vuex";

import { linkImg } from "@/utils/base";
import { Answer } from "@/types/answer";

export default defineComponent({
  components: {
    ElDialog,
  },
  props: {
    question: {
      required: true,
      type: Object,
    },
    isVisible: Boolean,
  },
  setup(props, { emit }) {
    const store = useStore();

    const userAnswer = ref({ text: "Загрузка...", image: "" });

    const textAnswer = computed(() => userAnswer.value.text);
    const imageAnswer = computed(() => userAnswer.value.image);

    function handlerCloseDialog() {
      emit("update:isVisible", false);
    }

    async function setAnswer() {
      const answer: Answer = store.getters["answers/userAnswerById"](
        props.question.id
      );

      const image = await getLinkImg(answer.image);

      const updatedAnswer = { text: answer.text, image };

      userAnswer.value = updatedAnswer;
    }

    async function getLinkImg(url: string) {
      const src = await linkImg(url);

      return src;
    }

    function clearForm() {
      userAnswer.value.image = "";
      userAnswer.value.text = "Загрузка...";
    }

    watch(
      () => props.question,
      () => {
        clearForm();
        setAnswer();
      }
    );
    return {
      handlerCloseDialog,
      textAnswer,
      imageAnswer,
      linkImg,
    };
  },
});
</script>

<style lang="stylus" module>
:global(.el-dialog__title) {
  font-size 20px!important
  font-weight 500!important
}

@media screen and (max-width 620px) {
  :global(.el-dialog) {
    width 92%!important
  }
}

.main {
    &-answer {
      &__text {
        div {
          color var(--text)

          &:last-child {
            font-size: 1.6rem
            font-weight 400
          }
        }
      }
      &__img {
        margin-top .8rem
        border-radius 20px
        display inline-block

        img {
          margin-top .6rem
          border-radius 20px
          max-width 60%
          height auto
          box-shadow 0 5px 20px 0 rgba(0,0,0, .2);
        }
      }
    }
  }

.title {
  font-size 1.8rem
  font-weight 500
  margin-right .4rem
  color var(--text)
}
</style>
