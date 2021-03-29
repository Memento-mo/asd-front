<template>
  <Card>
    <template v-slot:header>
      <div class="card-title">
        Уже регистрировались? Войдите чтобы продолжить!
      </div>
    </template>

    <ElForm v-model="form">
      <ElFormItem>
        <ElInput
          type="email"
          suffix-icon="el-icon-message"
          placeholder="Введите email"
          v-model="form.email"
        />
      </ElFormItem>

      <ElButton type="success" class="auth-button"> Войти </ElButton>

      <div class="signIn">
        <router-link to="/auth">Регистрация</router-link>
      </div>
    </ElForm>
  </Card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Card from "../Card/Card.vue";

import Container from "../Container.vue";

import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";

export default defineComponent({
  components: {
    Card,
    Container,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
  },
  setup() {
    const form = reactive({
      email: "",
    });

    return {
      form,
    };
  },
});
</script>
