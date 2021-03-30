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

      <ElButton type="success" class="auth-button" @click="handlerSendAnswer">
        Отправить
      </ElButton>

      <div class="signIn">
        <router-link to="/login">Выйти</router-link>
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

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    Card,
  },
  setup() {
    const store = useStore();

    const form = reactive({
      answer: "",
    });

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
    };
  },
});
</script>
