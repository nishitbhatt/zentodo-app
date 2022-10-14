<script setup>
import { TaskPageTopBar } from '~/features/task-pan/'
import AppBottomNavigation from '~/components/AppBottomNavigation.vue'
import TaskRowNSection from '~/features/task-pan/components/TaskRowNSection.vue';

import { FetchAllTask, FetchAllTaskSections } from '~/services';
import TaskOptionSheet from '~/features/task-pan/components/TaskOptionSheet.vue';

</script>
<script>
export default {
  name: "TaskPage",
  async fetch() {
    await FetchAllTaskSections()
    await FetchAllTask()
  },
}
</script>
<template>
  <div>
    <!-- Task Page Top Bar -->
    <TaskPageTopBar />
    <!-- Task Pan -->
    <TaskRowNSection />
    <!-- Task Bottom Option Sheet -->
    <TaskOptionSheet />


    <!-- App Bottom Bar -->
    <AppBottomNavigation />
  </div>
</template>

<style>

</style>