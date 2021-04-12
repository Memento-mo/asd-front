<template>
  <Card>
    <template v-slot:header>
      <div class="card-title">
        Уже регистрировались? Войдите чтобы продолжить!
      </div>
    </template>

    <ElForm @submit.prevent="handlerAuth" v-model="form">
      <ElFormItem>
        <ElInput
          type="email"
          suffix-icon="el-icon-message"
          placeholder="Введите email"
          v-model="form.email"
        />
      </ElFormItem>

      <ElButton
        type="success"
        class="auth-button"
        :loading="isLoading"
        @click.prevent="handlerAuth"
      >
        Войти
      </ElButton>

      <div class="signIn">
        <router-link to="/auth">Регистрация</router-link>
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
    const isLoading = ref(false);

    const form = reactive({
      email: "",
    });

    const user = computed(() => store.getters["accounts/user"]);

    function fetchLogin() {
      return store.dispatch("accounts/fetchLogin", form.email);
    }

    function fetchUser() {
      return store.dispatch("accounts/fetchUser");
    }

    watch(
      () => user.value,
      () => {
        redirectUser();
      }
    );

    function redirectUser() {
      if (user.value) {
        router.replace({ name: "questions" });
      }
    }

    function handlerAuth() {
      isLoading.value = true;

      fetchLogin()
        .then(async () => {
          await fetchUser();
        })
        .catch(() => {
          ElNotification({
            type: "error",
            title: "Аккаунт не найден",
            message: "Неправильная почта",
          });
        })
        .finally(() => {
          isLoading.value = false;
        });
    }

    onMounted(() => {
      redirectUser();
    });

    return {
      form,
      handlerAuth,
      isLoading,
    };
  },
});
</script>
