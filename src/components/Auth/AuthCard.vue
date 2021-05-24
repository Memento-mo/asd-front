<template>
  <!-- eslint-disable vue/no-static-inline-styles */ -->
  <Card :class="$style.main">
    <template v-slot:header>
      <div class="card-title">Зарегистрируйся и участвуй в викторине!</div>
    </template>
    <ElForm ref="formRef" :class="$style.form" :rules="rules" :model="form">
      <ElFormItem prop="fullName">
        <ElInput
          placeholder="Введите имя и фамилию"
          suffix-icon="el-icon-user-solid"
          v-model="form.fullName"
        />
      </ElFormItem>

      <ElFormItem prop="email">
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

      <ElFormItem :class="$style.secret" prop="isAgree">
        <ElCheckboxGroup v-model="form.isAgree">
          <ElCheckbox name="isAgree">
            Соглашаюсь
            <span :class="$style['secret-text']">
              с политикой конфиденциальности
            </span>
          </ElCheckbox>
        </ElCheckboxGroup>
      </ElFormItem>

      <ElButton
        :loading="isLoading"
        type="success"
        class="auth-button"
        @click="createUser"
      >
        Регистрация
      </ElButton>
      <div class="signIn">
        <router-link to="/login">Войти</router-link>
      </div>
    </ElForm>
  </Card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/runtime-core";

import {
  ElForm,
  ElFormItem,
  ElInput,
  ElUpload,
  ElCheckbox,
  ElCheckboxGroup,
  ElNotification,
} from "element-plus";
import { Ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import PhotoIcon from "../../icons/PhotoIcon.vue";

import Card from "../Card/Card.vue";

import { toBase64 } from "@/utils/base";
import { User } from "@/types/accounts";

export default defineComponent({
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElUpload,
    ElCheckbox,
    ElCheckboxGroup,
    PhotoIcon,
    Card,
  },
  setup(_) {
    const router = useRouter();
    const store = useStore();
    const formRef = ref(null);

    const isLoading = ref(false);

    const form = reactive({
      email: "",
      fullName: "",
      isAgree: [],
    });

    const uploadedPhotos: Ref<Array<{ url: string; dataUrl: File }>> = ref([]);

    const rules = {
      fullName: [
        {
          required: true,
          message: "Длина имени должна быть не менее 1 символа",
          trigger: "blur",
        },
      ],
      email: [
        {
          required: true,
          message: "Длина должна быть не менее 1 символа",
          trigger: "blur",
        },
      ],
      isAgree: [
        {
          type: "array",
          required: true,
          message: "Соглашение обязательно",
          trigger: "change",
        },
      ],
    };

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

    function handlerAuth() {
      router.replace({ name: "questions" });
    }

    function fetchCreateUser(user: User) {
      return store.dispatch("accounts/fetchCreateUser", user);
    }

    function fetchUser() {
      return store.dispatch("accounts/fetchUser");
    }

    function handleRemovePhoto() {
      uploadedPhotos.value = [];
    }

    function createUser() {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (formRef.value! as {
        validate: (fn: (isValid: boolean) => void) => void;
      }).validate(async (isValid: boolean) => {
        if (!isValid) return;

        if (uploadedPhotos.value.length === 0) {
          ElNotification({
            title: "Выберите изображение",
            type: "error",
          });
          return;
        }
        isLoading.value = true;

        const fileBase64: any = await toBase64(uploadedPhotos.value[0].dataUrl);

        fetchCreateUser({
          full_name: form.fullName,
          email: form.email,
          isAgree: form.isAgree.length > 0,
          avatar: fileBase64,
          timeout: {
            id: "0",
            time: new Date().getTime()
          }
        })
          .then(async () => {
            await fetchUser();

            router.push({ name: "questions" });
          })
          .catch((error) => {
            if (error.response.status === 400) {
              ElNotification({
                title: "Пользователь существует",
                message: "Пользователь с данной почтой уже зарегистрирован",
                type: "error",
              });
            }
          })
          .finally(() => {
            isLoading.value = false;
          });
      });
    }

    return {
      form,
      handlerAuth,
      createUser,
      rules,
      formRef,
      handleAddPhoto,
      uploadedPhotos,
      isLoading,
      handleRemovePhoto,
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
    display flex
    justify-content center

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
