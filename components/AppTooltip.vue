<script>
export default {
  props: {
    message: String,
    show: Boolean
  },
  data: () => ({
    slideUp: false
  }),
  mounted() {
    document.querySelector('.app-tooltip')?.remove()
    setTimeout(() => {
      this.slideUp = true
    }, 50)
    setTimeout(() => {
      this.slideUp = false
      setTimeout(() => {
        this.$el.remove()
      }, 50)
    }, 5000)
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
  visibility: visible;
  -webkit-animation: fadein 0.7s, fadeout 0.5s 6s;
  animation: fadein 0.7s, fadeout 0.5s 6s;
}

div {
  font-family: "Roboto";
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;
  width: auto;
  background-color: #333;
  color: #fff;
  text-align: center;
  position: fixed;
  z-index: 1;
  bottom: 70px;
  font-size: 14px;
  word-spacing: 2px;
  border-radius: 5px;
}


@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 70px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }

  to {
    bottom: 70px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 70px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 70px;
    opacity: 1;
  }

  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
