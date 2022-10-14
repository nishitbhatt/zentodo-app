<script setup>
import TaskListSheet from './TaskListSheet.vue';
import TaskRow from './TaskRow.vue';
import NoTaskScreen from './NoTaskScreen.vue';
</script>

<script>
import { useTaskStore } from '~/store'
const { AllTaskCount, NotSectionedTask, SectionedTask } = useTaskStore()
export default {
  name: "TaskRowNSection",
  mounted() {
  }
}
</script>
<template>
  <v-expand-transition>
    <!-- Main Task Page Content -->
    <v-sheet id="main-task-content" class="pt-14 pb-16 overflow-y-auto" max-height="100vh">

      <!-- All Tasks List -->
      <template v-if="AllTaskCount">
        <!-- Not Sectioned Task -->
        <TaskListSheet name="Not Sectioned" :count="NotSectionedTask.remain" :id="'0'">
          <v-slide-y-transition class="py-0" group tag="v-list">
            <TaskRow v-for="task in NotSectionedTask.task" :key="`TaskRow${task._id}`" :task="task" />
          </v-slide-y-transition>
        </TaskListSheet>

        <!-- Sectioned Task -->
        <template v-for="data in SectionedTask">
          <TaskListSheet v-if="data.total" :key="`TaskListSheet${data._id}`" :name="data.name" :count="data.remain"
            :id="data._id">
            <v-slide-y-transition class="py-0" group tag="v-list">
              <TaskRow v-for="task in data.task" :key="`TaskRow${task._id}`" :task="task" />
            </v-slide-y-transition>
          </TaskListSheet>
        </template>

      </template>

      <!-- No Task Screen -->
      <NoTaskScreen v-else />

      <!-- New Task Button -->
      <v-btn elevation="2" to="tasks/create" color="blue-grey lighten-5" fab absolute bottom right class="mb-16"
        add-task-cta>
        <v-icon color="blue-grey lighten-3" large>mdi-plus</v-icon>
      </v-btn>

    </v-sheet>
  </v-expand-transition>
</template>

<style scoped>
[add-task-cta] {
  bottom: 16px !important;
  right: 16px;
  left: auto;
}
</style>
