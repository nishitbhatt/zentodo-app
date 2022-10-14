<script setup>
import { useTaskStore, useTaskOptionStore } from '~/store'
</script>

<script>
const { AllTaskCount } = useTaskStore()
const { setOptionSheet } = useTaskOptionStore()
</script>
<template>
  <v-app-bar color="white" elevation="0" v-if="AllTaskCount" absolute hide-on-scroll scroll-target="#main-task-content" scroll-threshold="10">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <!-- <v-icon class="mr-0 mt-0">mdi-checkbox-multiple-marked-circle-outline mdi-36px</v-icon> -->
    <!-- <div class="d-flex text-center mt-1 ml-n2">
      <div style="display: flex; flex-direction: column;position: relative;">
        <v-icon class="mr-2 mt-0">mdi-checkbox-multiple-marked-circle-outline mdi-36px</v-icon>
        <span class="blue-grey--text"
          style="font-size: 7px;position: absolute;bottom: -3px;left: 19px;transform: translateX(-50%);line-height: 1;font-weight: bold;">TODO</span>
      </div>
      <v-toolbar-title class="text-uppercase h1 d-inline font-weight-medium">TASKS</v-toolbar-title>
    </div> -->

    <v-toolbar-title class="text-uppercase h1 font-weight-medium pl-0">Tasks</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-btn icon to="tasks/create">
      <v-icon>mdi-checkbox-marked-circle-plus-outline</v-icon>
    </v-btn> -->

    <v-btn icon @click="setOptionSheet(true)">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>

  </v-app-bar>
</template>
