<template>
  <!-- eslint-disable vue/no-static-inline-styles */ -->
  <Card v-loading="isLoadingQuestions">
    <template v-slot:header>
      <div class="card-title">{{ currentQuestion.text }}</div>
    </template>

    <ElForm v-model="form">
      <ElFormItem>
        <ElInput
          type="email"
          suffix-icon="el-icon-message"
          placeholder="Введите ответ"
          v-model="form.answer"
        />
      </ElFormItem>

      <ElFormItem :class="$style.upload">
        <h3>Сделай селфи с этим человеком</h3>

        <ElUpload
          action="#"
          class="avatar-uploader"
          :http-request="handleAddPhoto"
          :show-file-list="false"
        >
          <PhotoIcon class="avatar-uploader-icon" />
        </ElUpload>

        <div
          :class="$style.form_item_image__block"
          :style="{
            background: `url(${uploadedPhotos[0].url}) no-repeat center`,
            backgroundSize: 'cover',
            height: '200px',
            width: '150px',
            margin: '10px auto',
          }"
          v-if="uploadedPhotos.length === 1"
        >
          <div
            :class="$style.form_item_image__control"
            @click="handleRemovePhoto()"
          >
            <i
              :class="[$style.icon, $style.icon_delete]"
              class="el-icon-delete-solid"
            />
          </div>
        </div>
      </ElFormItem>

      <ElButton
        :loading="isLoading"
        :disabled="!isValid"
        type="success"
        class="auth-button"
        @click="handlerSendAnswer"
      >
        Отправить
      </ElButton>

      <div :class="[$style.button, $style['button-skip']]">
        <button @click="handlerSkipQuestion">Пропустить</button>
      </div>

      <div :class="$style.button">
        <button @click="logout">Выйти</button>
      </div>
    </ElForm>
  </Card>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
  watch,
} from "vue";
import { ElForm, ElFormItem, ElInput, ElNotification } from "element-plus";
import { useStore } from "vuex";

import Card from "../Card/Card.vue";

import PhotoIcon from "../../icons/PhotoIcon.vue";
import { useRouter } from "vue-router";
import { Question } from "@/types/questions";
import { Answer } from "@/types/answer";
import { toBase64 } from "@/utils/base";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    Card,
    PhotoIcon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const form = reactive({
      answer: "",
    });

    const isLoading = ref(false);
    const isLoadingQuestions = ref(false);

    const uploadedPhotos: Ref<Array<{ url: string; dataUrl: File }>> = ref([]);

    const numberQuestion = ref(0);

    const questions = computed(
      (): Array<Question> => store.getters["questions/questions"]
    );
    const userAnswers = computed(
      (): Array<Answer> => store.getters["answers/userAnswers"]
    );

    const currentQuestion: Ref<Question> = ref({ id: "", text: "" });

    const user = computed(() => store.getters["accounts/user"]);

    const isValid = computed(() => {
      return uploadedPhotos.value.length > 0 && form.answer.length > 0;
    });

    watch(
      () => [numberQuestion.value],
      () => {
        setQuestion();
      }
    );

    async function fetchSendAnswer(
      question: Question,
      answer: string,
      isSkip?: boolean
    ) {
      if (!isSkip) {
        if (uploadedPhotos.value.length === 0) {
          ElNotification({
            title: "Нельзя",
            type: "error",
            message: "Фото обязательно",
          });

          throw new Error();
        }
        const fileBase64 = await toBase64(uploadedPhotos.value[0].dataUrl);

        return store.dispatch("answers/fetchSendAnswer", {
          question_id: question.id,
          text: answer,
          image: fileBase64,
        } as Answer);
      } else {
        return store.dispatch("answers/fetchSendAnswer", {
          question_id: question.id,
          text: null,
          image: null,
        } as Answer);
      }
    }

    function handleRemovePhoto() {
      uploadedPhotos.value = [];
    }

    function clearForm() {
      form.answer = "";
      uploadedPhotos.value = [];
    }

    function handlerSendAnswer() {
      isLoading.value = true;

      const answer: string = form.answer;

      fetchSendAnswer(currentQuestion.value, answer)
        .then(async () => {
          numberQuestion.value++;
          setNumber();

          if (numberQuestion.value === questions.value.length - 1) return;

          await fetchUserAnswers();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            ElNotification({
              type: "error",
              title: "Ответить дважды нельзя",
              message: "Вы уже отвечали на этот вопрос",
            });
          } else {
            ElNotification({
              type: "error",
              title: "Ошибка ответа",
              message: "Ответ сохранить не удалось",
            });
          }
        })
        .finally(() => {
          clearForm();
          isLoading.value = false;
        });
    }

    function setNumber() {
      store.dispatch("questions/setNumber", numberQuestion.value);
    }

    function fetchQuestions() {
      return store.dispatch("questions/fetchQuestions");
    }

    function fetchUserAnswers() {
      return store.dispatch("answers/fetchUserAnswers");
    }

    function setQuestion() {
      const question = questions.value[numberQuestion.value];

      if (!question) {
        return router.push({ name: "main" });
      }

      const index = userAnswers.value.findIndex(
        (answer) => answer.question_id === question.id
      );

      if (index > -1) {
        numberQuestion.value++;
      } else {
        fetchUpdateUserTime(question.id);
        currentQuestion.value = question;
      }
    }

    function fetchUpdateUserTime(id: string) {
      store.dispatch("accounts/fetchUpdateUserTime", id);
    }

    function fetchLogout() {
      return store.dispatch("accounts/fetchLogout");
    }

    function logout(e: Event) {
      e.preventDefault();

      fetchLogout();

      router.replace({ name: "login" });
    }

    function handleAddPhoto({ file }: { file: File }) {
      if (uploadedPhotos.value.length === 1) {
        uploadedPhotos.value = [];
      }

      let reader = new FileReader();
      let name = file.name;
      let ext = name.slice(name.lastIndexOf(".") + 1);
      let data: string | ArrayBuffer | null = "";

      if (ext === "jpeg" || ext === "png" || ext === "jpg") {
        reader.onload = () => {
          data = reader.result;

          uploadedPhotos.value.push({
            url: URL.createObjectURL(file),
            dataUrl: file,
          });
        };
        reader.readAsDataURL(file);
      } else {
        ElNotification({
          type: "error",
          title: "Это не фото",
          message: "Поддерживаются форматы jpeg, png, jpg",
        });
      }
    }

    function handlerSkipQuestion(e: Event) {
      e.preventDefault();
      checkIsDisabled();
    }

    function fetchUserTime() {
      return store.dispatch("accounts/fetchUserTime");
    }

    async function checkIsDisabled() {
      const time = new Date().getTime();
      const { data }: { data: { time: number } } = await fetchUserTime();

      const isSkip = data.time + 15 * 60000 < time;

      if (!isSkip) {
        ElNotification({
          type: "error",
          title: "Пропустить пока нельзя",
          message: "Попробуй ответить",
        });
      } else {
        isLoadingQuestions.value = true;

        fetchSendAnswer(currentQuestion.value, "", true).then(async () => {
          numberQuestion.value++;
          setNumber();

          isLoadingQuestions.value = false;

          if (numberQuestion.value === questions.value.length - 1) return;

          await fetchUserAnswers();

          ElNotification({
            type: "success",
            title: "Пропущено",
            message: "Ты пропустил вопрос, постарайся в следующий раз ответить",
          });
        });
      }
    }

    async function init() {
      isLoadingQuestions.value = true;
      await fetchUserAnswers();
      await fetchQuestions();

      setQuestion();
      setNumber();
      isLoadingQuestions.value = false;
    }

    onMounted(() => {
      init();
    });

    return {
      form,
      handlerSendAnswer,
      handleRemovePhoto,
      handlerSkipQuestion,
      currentQuestion,
      uploadedPhotos,
      logout,
      handleAddPhoto,
      isValid,
      isLoading,
      isLoadingQuestions,
    };
  },
});
</script>

<style lang="stylus" module>
.upload {
  h3 {
    font-weight 500
    color #333
    font-size 1.4rem
    margin-bottom 1.5rem
    line-height 1.6rem
  }
}

.button {
  button {
    color var(--secondary)
    background #fff
    border none
    margin-top 1rem
    cursor pointer
    font-weight 500
    font-size 1.4rem
    outline none
    transition var(--transition)

    &:hover {
      opacity 0.7
    }
  }

  &-skip {
    button {
      margin-bottom 10px
      color var(--primary)
    }
  }
}
.form_item {
  &_image__block {
    position relative
    box-shadow 0 5px 20px 0 rgba(0, 0, 0, 0.5)
    border-radius 4px
  }
  &_image__control {
    position absolute
    top 0
    height 100%
    width 100%
    background rgba(0, 0, 0, .6)
    opacity 0

    display flex
    justify-content center
    align-items center

    visibility hidden
    transition 0.2s ease
    border-radius 4px
  }

  &_image__block:hover &_image__control {
    opacity 1
    visibility visible
  }
}

.icon {
  color #fff
}
</style>
