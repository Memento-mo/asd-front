<template>
  <div class="card" @click="handleTo">
    <div class="card-image">
      <div class="card-loading" v-if="!base64Image" v-loading="true" />

      <img :src="base64Image" v-else />
    </div>

    <div class="card-body">
      <div class="card-body__header">
        <h3>{{ account.full_name }}</h3>
      </div>
      <p class="card-body__text">
        Ответил на {{ account.count }}/{{ questions.length }} вопросов
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { linkImg } from "@/utils/base";

export default defineComponent({
  props: {
    userId: {
      type: String,
      required: true,
    },
    account: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const questions = computed(() => store.getters["questions/questions"]);
    const base64Image = ref("");

    function handleTo() {
      router.push({
        name: "statistic.view",
        params: { id: props.userId },
      });
    }

    async function getLinkImg(url: string) {
      const src = await linkImg(url);

      base64Image.value = src;
    }

    async function init() {
      await getLinkImg(props.account.avatar);
    }

    onMounted(() => {
      init();
    });

    return {
      handleTo,
      questions,
      base64Image,
    };
  },
});
</script>

<style lang="stylus">
.card {
  width 100%
  max-width 35rem
  border-radius 2rem
  box-shadow: 0 5px 20px 0 rgba(0,0,0, .05)
  transition all .25s ease
  cursor pointer

  &:hover {
    box-shadow 0 0 0 0 rgba(0,0,0, .05)
    transform translateY(5px)
  }

  &:hover .card-image img {
    transform: scale(1.15)
  }

  &-image {
    border-radius 2rem
    max-height 250px
    overflow hidden

    img {
      width 100%
      display block
      transition all .25s ease
      border-radius 20px
    }
  }

  &-body {
    font-size .85rem
    padding 0 15px 15px
    color var(--text)
    text-align left

    &__header {
      padding-top 10px
      padding-bottom 5px

      h3 {
        font-size 1.7rem
        font-weight 600
        line-height 1.25
      }
    }

    &__text {
      opacity .8
      font-size 1.36rem
    }
  }

  &-loading {
    height 200px
    width 100%
    display flex
    align-items center
    justify-content center
  }
}
</style>
