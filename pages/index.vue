<template>
  <AppFullHeight>
    <AppFlexCenter>
      <v-progress-circular indeterminate color="blue-grey" :size="50" />
    </AppFlexCenter>
  </AppFullHeight>
</template>
<script setup>

import AppFullHeight from "../components/AppFullHeight.vue"
import AppFlexCenter from "../components/AppFlexCenter.vue"


</script>
<script>
export default {
  name: "IndexPage",
  layout: "default",
  data: () => ({
    mountains: []
  }),
  head: {
    title: 'Loading App'
  },
  mounted() {
    const isPresent = !!localStorage.getItem("TodoApp.User");
    setTimeout(() => {
      this.$router.push({ path: (isPresent ? '/11100543123/tasks' : '/login') });
    }, 1000);

  },
}
</script>
