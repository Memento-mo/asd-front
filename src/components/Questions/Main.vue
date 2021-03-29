<template>
  <Card>
    <template v-slot:header>
      <div class="card-title">Введите ответ на следующий вопрос</div>
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

      <ElButton type="success" class="auth-button"> Отправить </ElButton>

      <div class="signIn">
        <router-link to="#">Выйти</router-link>
      </div>
    </ElForm>
  </Card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { ElForm, ElFormItem, ElInput } from "element-plus";
import Card from "../Card/Card.vue";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    Card,
  },
  setup() {
    const form = reactive({
      question: "",
    });

    return {
      form,
    };
  },
});
</script>
