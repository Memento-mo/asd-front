<template>
  <Card :class="$style.main">
    <template v-slot:header>
      <div class="card-title">Зарегистрируйся и участвуй в викторине!</div>
    </template>
    <ElForm :class="$style.form">
      <ElFormItem>
        <ElInput
          placeholder="Введите имя и фамилию"
          suffix-icon="el-icon-user-solid"
          v-model="form.fullName"
        />
      </ElFormItem>

      <ElFormItem>
        <ElInput
          placeholder="Введите email"
          type="email"
          suffix-icon="el-icon-message"
          v-model="form.email"
        />
      </ElFormItem>
      <div :class="$style.line" />
      <ElFormItem :class="$style.upload">
        <h3>Добавь свою фотографию</h3>

        <ElUpload action="" class="avatar-uploader">
          <img class="avatar" :src="imageUrl" v-if="imageUrl" />
          <PhotoIcon class="avatar-uploader-icon" />
        </ElUpload>
      </ElFormItem>

      <ElFormItem :class="$style.secret">
        <ElCheckbox v-model="form.secret">
          Соглашаюсь
          <span :class="$style['secret-text']">
            с политикой конфиденциальности
          </span>
        </ElCheckbox>
      </ElFormItem>

      <ElButton type="success" class="auth-button"> Регистрация </ElButton>
      <div class="signIn">
        <router-link to="/login">Войти</router-link>
      </div>
    </ElForm>
  </Card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElUpload,
  ElCheckbox,
} from "element-plus";

import PhotoIcon from "../../icons/PhotoIcon.vue";

import Card from "../Card/Card.vue";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElUpload,
    ElCheckbox,
    PhotoIcon,
    Card,
  },
  setup() {
    const form = reactive({
      email: "",
      fullName: "",
      secret: false,
    });

    const imageUrl = "";

    return {
      form,
      imageUrl,
    };
  },
});
</script>

<style lang="stylus" module>
.main {
  :global(.el-form-item) {
    &:nth-child(2) {
      margin-bottom 0.5rem
    }
  }

  .form {
    :global(.el-form-item) {
      padding 0 2rem
    }
  }

  .upload {
    h3 {
      font-weight 500
      color #333
      font-size 1.4rem
      margin-bottom 1.5rem
      line-height 1.6rem
    }
  }

  .secret {
    &-text {
      color var(--secondary)
    }

    :global(.el-checkbox) {
      align-items center
      display flex
      width 16rem
      margin 0 auto
    }

    :global(.el-checkbox__label) {
      max-width 20rem
      white-space normal
      text-align left
      font-size 1.1rem
      font-weight 400
      line-height 1.4rem
    }
  }

  :global(.el-card__body) {
    padding 0
    padding-bottom 2rem
    padding-top 2rem
  }

  .line {
    width 100%
    height 0.1rem
    background-color #EBEEF5
    margin 2rem 0
  }
}
</style>
