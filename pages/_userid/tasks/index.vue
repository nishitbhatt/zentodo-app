<script setup>
import { TaskPageTopBar } from '~/features/task-pan/'
import AppBottomNavigation from '~/components/AppBottomNavigation.vue'
import TaskRowNSection from '~/features/task-pan/components/TaskRowNSection.vue';

import { FetchAllTask, FetchAllTaskSections } from '~/services';
import TaskOptionSheet from '~/features/task-pan/components/TaskOptionSheet.vue';
import { useAppLoading } from '~/store';

</script>
<script>
const { showProgress, inProgress, hideProgress } = useAppLoading()


export default {
  name: "TaskPage",
  layout: "default",
  async created() {
    showProgress()
    await FetchAllTaskSections()
    await FetchAllTask()
    hideProgress()
  },
}
</script>
<template>
  <div>

    <AppProgress :show="inProgress" />
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