<template>
  <main :class="$style.main">
    <div>
      <ManIcon />
    </div>

    <ElCard :class="$style.card">
      <template v-slot:header class="clearfix">
        <div :class="$style['main-description']">
          Зарегистрируйся и участвуй в викторине!
        </div>
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
            Соглашаюсь <span>с политикой конфиденциальности</span>
          </ElCheckbox>
        </ElFormItem>

        <ElButton type="success" :class="$style['auth-button']">
          Регистрация
        </ElButton>
        <div :class="$style.signIn">Войти</div>
      </ElForm>
    </ElCard>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@vue/runtime-core";

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElCard,
  ElUpload,
  ElCheckbox,
} from "element-plus";

import ManIcon from "../../icons/ManIcon.vue";
import PhotoIcon from "../../icons/PhotoIcon.vue";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElUpload,
    ElCheckbox,
    ElCard,
    ManIcon,
    PhotoIcon,
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
  margin-top 1.4rem

  &-description {
    color #333
    font-size 1.4rem
    line-height 1.6rem
    font-weight 500
  }

  :global(.el-form-item) {
    &:nth-child(2) {
      margin-bottom 0.5rem
    }
  }

  .card {
    margin-top 1rem
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

  .auth-button {
    text-transform uppercase
    font-weight 400
    font-size 1.3rem

    padding: 1.2rem 3.7rem

    background-color var(--primary)
    border-color var(--primary)

    transition var(--transition)

    &:hover {
      opacity 0.8
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

  .signIn {
    color var(--secondary)
    font-size 14px
    font-weight 500
    width 10rem
    margin 0 auto
    border-radius 0.4rem
    margin-top 1rem
    padding 1rem
    cursor pointer
    transition var(--transition)

    &:hover {
      opacity 0.7
    }
  }
}
</style>
