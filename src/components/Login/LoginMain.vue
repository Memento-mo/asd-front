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

      <ElButton type="success" class="auth-button" @click="handlerAuth">
        Войти
      </ElButton>

      <div class="signIn">
        <router-link to="/auth">Регистрация</router-link>
      </div>
    </ElForm>
  </Card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import Card from "../Card/Card.vue";

import Container from "../ui/Container.vue";

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElNotification,
} from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

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
    const router = useRouter();
    const store = useStore();

    const form = reactive({
      email: "",
    });

    function fetchLogin() {
      return store.dispatch("accounts/fetchLogin", form.email);
    }

    function handlerAuth() {
      fetchLogin()
        .then(() => {
          router.replace({ name: "questions" });
        })
        .catch(() => {
          ElNotification({
            type: "error",
            title: "Аккаунт не найден",
            message: "Неправильная почта",
          });
        });
    }

    return {
      form,
      handlerAuth,
    };
  },
});
</script>
