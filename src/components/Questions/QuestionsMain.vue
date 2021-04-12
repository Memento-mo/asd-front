<template>
  <Card>
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

        <ElUpload action="" class="avatar-uploader">
          <img class="avatar" :src="imageUrl" v-if="imageUrl" />
          <PhotoIcon class="avatar-uploader-icon" />
        </ElUpload>
      </ElFormItem>

      <ElButton type="success" class="auth-button" @click="handlerSendAnswer">
        Отправить
      </ElButton>

      <div :class="$style.logout">
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
  ref,
  watch,
} from "vue";
import { ElForm, ElFormItem, ElInput } from "element-plus";
import { useStore } from "vuex";

import Card from "../Card/Card.vue";

import PhotoIcon from "../../icons/PhotoIcon.vue";
import { useRouter } from "vue-router";

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

    const imageUrl = ref("");

    const numberQuestion = ref(0);

    const questions = computed(() => store.getters["questions/questions"]);

    const currentQuestion = ref({});

    watch(
      () => [numberQuestion.value],
      () => {
        setQuestion();
      }
    );

    function handlerSendAnswer() {
      form.answer = "";

      if (numberQuestion.value === questions.value.length - 1) return;

      numberQuestion.value++;

      setNumber();
    }

    function setNumber() {
      store.dispatch("questions/setNumber", numberQuestion.value);
    }

    function fetchQuestions() {
      return store.dispatch("questions/fetchQuestions");
    }

    function setQuestion() {
      currentQuestion.value = questions.value[numberQuestion.value];
    }

    function fetchLogout() {
      return store.dispatch("accounts/fetchLogout");
    }

    function logout(e: Event) {
      e.preventDefault();

      fetchLogout();

      router.replace({ name: "login" });
    }

    async function init() {
      await fetchQuestions();

      setQuestion();
      setNumber();
    }

    onMounted(() => {
      init();
    });

    return {
      form,
      handlerSendAnswer,
      currentQuestion,
      imageUrl,
      logout,
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

.logout {
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
}
</style>
