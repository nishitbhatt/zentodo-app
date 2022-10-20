<script setup>
import { MarkTaskToggleMeta } from '~/services';
// import { useTaskOptionStore } from '~/store';
import { getDateTypeColor } from '~/utils/Task'
</script>

<script>
// const { isTaskExpanded } = useTaskOptionStore()

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
      const [date, color] = getDateTypeColor(new Date(this.$props.task.duedate))

      return {
        date,
        color
      }
    },
    TaskPriorityColor() {
      if (this.$props.task.priority === 1)
        return 'yellow darken-1'
      if (this.$props.task.priority === 2)
        return 'blue'
      if (this.$props.task.priority === 3)
        return 'red'
      return 'blue-grey'
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
    <!-- <v-list-item :class="{ 'grey lighten-5': task.completed }" :to="`tasks/${task._id}`">
      <v-list-item-icon class="mr-4 mt-3" @click.prevent="handleToggleTaskComplete(task._id)">
        <v-icon v-if="!task.completed">mdi-checkbox-blank-circle-outline</v-icon>
        <v-icon v-else color="grey lighten-2">mdi-checkbox-marked-circle-outline</v-icon>
      </v-list-item-icon>

      <v-list-item-content :class="{'align-self-start': task.description}">
        <v-list-item-title :class="{ 'grey--text accent-4': task.completed, 'font-weight-bold mb-1': !0}"
          v-text="task.title" />
        <v-list-item-subtitle :class="{ 'grey--text': task.completed}" v-text="task.description" />
      </v-list-item-content>

      <v-list-item-action v-if="task.duedate" class="mt-1">
        <v-list-item-action-text :class="`${FormattedDueDate.color}--text`" v-text="FormattedDueDate.date" />
      </v-list-item-action>
    </v-list-item> -->

    <div v-ripple task-row :class="{ 'grey lighten-5': task.completed, 'py-2': !0 }">
      <v-btn tile text plain depressed elevation="0" class="transprent px-0" task-done-btn
        @click.prevent="handleToggleTaskComplete(task._id)">
        <v-icon v-if="!task.completed" color="blue-grey" btn-icon>mdi-checkbox-blank-circle-outline</v-icon>
        <v-icon v-else color="grey lighten-2" btn-icon>mdi-checkbox-marked-circle-outline</v-icon>
      </v-btn>
      <NuxtLink :to="`tasks/${task._id}`" class="text-truncate" task-details-wrapper>
        <div class="d-flex flex-column align-start" task-details>
          <div :class="{ 'grey--text accent-4': task.completed, 'h6 subtitle-1 font-weight-bold mb-0': !0}" task-title>
            {{task.title}}
          </div>
          <div :class="{ 'body-2': !0,'grey--text': task.completed}">{{task.description}}</div>



          <!-- <v-icon v-if="true" :key="'priority' + ind" small :color="TaskPriorityColor"
                :class="{ 'mx-n4': ind !== 0 }">
                mdi-exclamation </v-icon> -->
          <!-- <v-icon small v-if="task.priority == 2" :key="'priority' + ind"
                :color="TaskPriorityColor" :class="{ 'mx-n4': ind !== 0 }">mdi-exclamation
              </v-icon>
              <v-icon small v-if="task.priority == 3" :key="'priority' + ind" :color="TaskPriorityColor">mdi-exclamation</v-icon> -->
          <!-- </template> -->
          <!-- <template v-if="isTaskExpanded">
          </template>
          <template v-else>
            <div class="d-flex mt-1">
              <v-icon v-if="task.description" small>mdi-note-text</v-icon>
              <div>
                <v-icon small class="ml-2">mdi-tag</v-icon>
                <v-icon small class="ml-2">4</v-icon>
              </div>
            </div>
          </template> -->
        </div>
        <div v-if="task.duedate || task.priority"
          :class="{ 'text-capitalize caption': !0, 'white':  !task.completed, 'grey lighten-5':  task.completed, 'justify-start pt-3': task.priority, 'justify-center': !task.priority  }"
          task-info :white="!task.completed" :grey="task.completed">
          <span :class="`${FormattedDueDate.color}--text`">
            {{FormattedDueDate.date}}
          </span>
          <div v-if="task.priority" class="ml-n1">
            <v-icon small v-for="(count, ind) in task.priority" :key="'priority' + ind" :color="TaskPriorityColor"
              :class="{ 'mx-n3': ind == 1}">mdi-exclamation
            </v-icon>
          </div>
        </div>
      </NuxtLink>
    </div>

  </div>
</template>

<style scoped>
[task-info] {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 15px;
}

[task-info]::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(45deg, black, transparent);
  z-index: -2;
  left: -40px;
}

[task-info][white]::before {
  background: rgb(255, 255, 255);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 100%)
}

[task-info][grey]::before {
  background: rgba(246, 246, 247, 1);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(246, 246, 247, 1) 50%, rgba(250, 250, 250, 1) 100%);
}

[task-details-wrapper] {
  text-decoration: none;
  color: initial;
  display: block;
  width: 100%;
}

[task-row] {
  display: flex;
  align-items: center;
  max-height: 64px;
  min-height: 64px;
  position: relative;
}

.v-btn[task-done-btn] {
  min-width: 56px;
  min-height: 64px;
}

[task-title] {
  line-height: 1.2;
}
</style>
