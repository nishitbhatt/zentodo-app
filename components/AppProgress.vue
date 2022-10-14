<script>
export default {
  props: {
    show: Boolean
  }
}
</script>

<template>
  <v-progress-linear class="app-progress" background-color="grey lighten-2" color="black" absolute top :active="show" indeterminate></v-progress-linear>
</template>
<style scoped>
.app-progress{
  z-index: 4;
  max-height: 3px !important;
}
</style>
