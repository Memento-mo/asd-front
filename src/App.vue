<template>
  <div :class="$style.container">
    <router-view />
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup () {

    function setViewPort () {
      let viewheight = window.innerHeight
      let viewwidth = window.innerWidth
      console.log(viewwidth)
      let viewport = document.querySelector("meta[name=viewport]")
      viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0")
    }

    onMounted(() => {
      setViewPort()
    })
    return {

    }
  }
})
</script>

<style lang="stylus" module>
html {
  font-size 10px
}

* {
  box-sizing border-box
  margin 0
  padding 0
}

.container {
  padding 40px
  max-width 400px
  margin 0 auto
}
</style>
