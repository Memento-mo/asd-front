<template>
  <header>
    <h1>Молодежный отдел цо приветствует тебя!</h1>
  </header>

  <main :class="$style.main">
    <div>
      <Man />
    </div>

    <div :class="$style['main-description']">
      Зарегистрируйся и участвуй в викторине!
    </div>

    <ElForm :class="$style.form">
      <ElFormItem>
        <ElInput placeholder="Введите имя и фамилию" />
      </ElFormItem>

      <ElFormItem>
        <ElInput placeholder="Введите email" />
      </ElFormItem>
    </ElForm>
  </main>


  <footer>

  </footer>

  <div :class="$style.bg"/>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import { ElForm, ElFormItem , ElInput } from 'element-plus'

import Man from '../icons/Man.vue'

export default defineComponent({
  components: {
    Man,
    ElForm,
    ElFormItem,
    ElInput
  },
  setup () {
    return {

    }
  }
})
</script>

<style lang="stylus" module>
header {
  h1 {
    font-weight 700
    font-size 1.6rem
    text-transform uppercase
    text-align center
    line-height 22px
    color #fff
    margin-top 34px
  }
}

.bg {
  position absolute
  background-color #6B1DFF
  height 100vh
  width 200%
  clip-path polygon(50% 0, 0 38%, 100% 100%)
  z-index -1
  margin 0 auto
  top -13rem
  right -60%

  @media screen and (max-width: 800px) {
    top -14rem
    // height 800px
  }

  @media screen and (max-width: 380px) {
    top -8rem
    // height 500px
  }

}

.main {
  margin-top 14px

  &-description {
    color #fff
    font-size 14px
    line-height 16px
    margin-top 20px
  }

  .form {
    margin-top 20px
  }
}
</style>