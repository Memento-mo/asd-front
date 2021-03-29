<template>
  <main :class="$style.main">
    <div>
      <slot name="icon" />
    </div>

    <slot name="default" />
  </main>
</template>

<style lang="stylus" module>
.main {
  margin-top 1.4rem
}
</style>
