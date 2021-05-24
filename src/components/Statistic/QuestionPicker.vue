<template>
  <div
    :class="[
      $style['picker'],
      $style[isDisabled ? 'disabled' : ''],
      $style[isSkiped ? 'skip' : ''],
    ]"
    @click="handlerOpenQuestion"
  >
    {{ questionNumber }}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  props: {
    question: {
      type: Object,
      required: true,
    },
    questionNumber: {
      type: Number,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      required: true,
    },
    isSkiped: {
      type: Boolean,
      required: true,
    }
  },
  setup(props, { emit }) {
    function handlerOpenQuestion() {
      if (props.isDisabled) return;
      emit("handler-set-question", props.question.id);
    }

    return {
      handlerOpenQuestion,
    };
  },
});
</script>

<style lang="stylus" module>
.picker {
  width 3.6rem
  height 3.6rem
  border-radius 12px
  display flex
  align-items center
  justify-content center
  font-size 1.4rem
  color var(--text)
  cursor pointer
  transition all .25s ease
  background rgba(240, 243, 244, 1)

  &:hover {
    background rgba(230, 233, 234, 1)
  }
}

.disabled {
  opacity .5

  &:hover {
    cursor default
    background-color rgba(240, 243, 244, 1)
  }
}

.skip {
  background rgba(244,67,54, .5)
  color #fff

  &:hover {
    background rgba(244,67,54, .5)
  }
}
</style>
