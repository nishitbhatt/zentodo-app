<script>
export default {
  props: {
    message: String,
    show: Boolean
  },
  data: () => ({
    slideUp: false
  }),
  mounted () {
    document.querySelector('.app-tooltip')?.remove()
    setTimeout(() => {
      this.slideUp = true
    }, 10)
    setTimeout(() => {
      this.slideUp = false
      setTimeout(() => {
        this.$el.remove()
      }, 50)
    }, 3000)
  }
}

</script>

<template v-show="show">
  <div :class="{ 'app-tooltip v-tooltip__content menuable__content__active': !0, 'slideUp': slideUp }">
    {{ message }}
  </div>
</template>

<style scoped>
  div.slideUp {
    bottom: 50px;
  }

  div {
    font-family: Roboto;
    position: fixed;
    bottom: -100px;
    left: 50%;
    transform: translateX(-50%);
    transition: all .1s ease-in-out;
    z-index: 1111;
  }
</style>
