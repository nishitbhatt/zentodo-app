<script setup>
import { MarkTaskToggleMeta } from '~/services';
</script>

<script>
export default {
  name: "TaskRow",
  props: {
    task: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    FormattedDueDate() {
      return new Date(this.$props.task.duedate).toDateString().substr(0, 10)
    }
  },
  methods: {
    async handleToggleTaskComplete(taskid) {
      await MarkTaskToggleMeta(taskid, this.$props.task.completed)
    }
  },
}
</script>
<template>
  <div>
    <v-list-item :class="{ 'grey lighten-5': task.completed }" :to="`tasks/${task._id}`">
      <v-list-item-icon class="mr-4 mt-3" @click.prevent="handleToggleTaskComplete(task._id)">
        <v-icon v-if="!task.completed">mdi-checkbox-blank-circle-outline</v-icon>
        <v-icon v-else color="grey lighten-2">mdi-checkbox-marked-circle-outline</v-icon>
      </v-list-item-icon>

      <v-list-item-content :class="{'align-self-start': task.description}">
        <v-list-item-title :class="{ 'grey--text accent-4': task.completed, 'font-weight-bold mb-1': !0}"
          v-text="task.title" />
        <v-list-item-subtitle :class="{ 'grey--text': task.completed}" v-text="task.description" />
      </v-list-item-content>

      <v-list-item-action v-if="task.duedate" class="mt-0">
        <v-list-item-action-text class="grey--text" v-text="FormattedDueDate"></v-list-item-action-text>
      </v-list-item-action>
    </v-list-item>
  </div>
</template>
