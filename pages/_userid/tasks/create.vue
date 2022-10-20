<script setup>
import { useTaskStore, useTaskOptionStore } from '~/store';
import { CreateTask } from '~/services';
</script>
<script>

const { AllSectionList } = useTaskStore()
const { disableOptionSheet, enableOptionSheet, isOptionSheetOpen } = useTaskOptionStore()
// const { CreateTask } = useTaskStore()
export default {
  name: "CreatePage",
  data: () => ({
    NewTaskTitle: "",
    NewTaskDescription: "",
    NewTaskDueDate: "",
    NewTaskSection: -1,
    NewTaskPriority: 0,
    isNewTaskSectionDialogOpen: false,
    isNewTaskCompleted: false,
    isNewTaskPageOpen: false,
    isDueDateDialogOpen: false,
    isOptionSheetOpen,
    isPriorityDialogOpen: false
  }),
  computed: {
    FormattedDueDate() {
      return this.NewTaskDueDate ? new Date(this.NewTaskDueDate).toDateString() : 'Due Date'
    },
    NewTaskSectionTitle() {
      return AllSectionList.value[this.NewTaskSection]?.name || "No Section "
    },
    NewTaskSectionId() {
      return AllSectionList.value[this.NewTaskSection]?._id || '0'
    },
    NewTaskPriorityColor() {
      if (this.NewTaskPriority === 1)
        return 'yellow darken-1'
      if (this.NewTaskPriority === 2)
        return 'blue'
      if (this.NewTaskPriority === 3)
        return 'red'
      return 'blue-grey'
    }
  },
  mounted() {
    this.isNewTaskPageOpen = true
  },
  unmounted() {
    this.isNewTaskPageOpen = false
  },
  methods: {
    async handleCreateNewTask() {

      const { NewTaskTitle, NewTaskDescription, NewTaskDueDate, NewTaskCompleted, NewTaskPriority } = this
      const _id = this.NewTaskSectionId

      if (NewTaskTitle) {
        await CreateTask({
          NewTaskTitle,
          NewTaskDescription,
          NewTaskDueDate,
          NewTaskCompleted,
          NewTaskPriority,
          NewTaskSection: _id || '0'
        })
        this.isNewTaskPageOpen = false
      }
      this.$router.back()
    },
    async handleSaveNNew() {

      const { NewTaskTitle, NewTaskDescription, NewTaskDueDate, NewTaskCompleted, NewTaskPriority } = this
      const _id = this.NewTaskSectionId

      if (NewTaskTitle) {
        await CreateTask({
          NewTaskTitle,
          NewTaskDescription,
          NewTaskDueDate,
          NewTaskCompleted,
          NewTaskPriority,
          NewTaskSection: _id || '0'
        })

        // Reset Current Page
        disableOptionSheet()
        this.NewTaskTitle = ""
        this.NewTaskDescription = ""
        this.NewTaskDueDate = ""
        this.NewTaskSection = -1
      }
    }
  }
}
</script>
<template>
  <v-dialog v-model="isNewTaskPageOpen" fullscreen hide-overlay transition="slide-x-transition" :retain-focus="false">
    <!-- New Task -->
    <v-card flat tile :class="{ 'blue-grey lighten-5': isNewTaskCompleted }">
      <v-toolbar elevation="0" class="transparent">

        <!-- Back Button -->
        <v-btn icon @click="handleCreateNewTask">
          <v-icon large>mdi-chevron-left</v-icon>
        </v-btn>

        <v-toolbar-title class="pl-0">
          <v-btn rounded block small text class="justify-start" @click="isNewTaskSectionDialogOpen = true">
            <span class="d-inline-block text-truncate" style="max-width: 225px;">
              {{NewTaskSectionTitle}}
            </span>
            <v-icon dark right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </v-toolbar-title>

        <!-- Task Option Sheet -->
        <v-btn icon class="ml-auto" @click.stop="enableOptionSheet">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="px-3 pt-0 mt-0 pb-0 align-center">
        <v-row no-gutters dense>
          <v-col cols="12" class="d-flex align-center">

            <!-- Complete Task Button -->
            <v-btn :class="{ 'blue-grey lighten-4': isNewTaskCompleted }"
              :color="isNewTaskCompleted ? 'blue-grey' : 'blue-grey darken-5'" :outlined="!isNewTaskCompleted" large
              icon raised @click.stop="isNewTaskCompleted = !isNewTaskCompleted">
              <v-icon v-if="isNewTaskCompleted" color="blue-grey">mdi-check-bold</v-icon>
              <v-icon v-else color="blue-grey">mdi-check-outline</v-icon>
            </v-btn>

            <!-- Due Date -->
            <v-btn class="ml-1" rounded text small @click.stop="isDueDateDialogOpen = true">
              <v-icon left class="mr-1">mdi-calendar-month-outline</v-icon>
              <span class="subtitle-2 text-capitalize">{{ FormattedDueDate }}</span>
            </v-btn>

            <!-- Priority -->
            <v-btn class="ml-auto" icon raised text tile @click.stop="isPriorityDialogOpen = true">
              <v-icon :color="NewTaskPriorityColor">mdi-exclamation</v-icon>
              <v-icon :color="NewTaskPriorityColor" class="mx-n4">mdi-exclamation</v-icon>
              <v-icon :color="NewTaskPriorityColor">mdi-exclamation</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row no-gutters dense class="mt-2">
          <v-col cols="12">

            <!-- Task Title -->
            <v-textarea v-model="NewTaskTitle" placeholder="What do you like to done?" flat solo tile rows="1"
              hide-details="auto" class="d-block pr-0 mx-n2 mb-1" background-color="transparent" block autofocus
              auto-grow task-title-fld>
            </v-textarea>
          </v-col>
          <v-col cols="12">

            <!-- Task Description -->
            <v-textarea v-model="NewTaskDescription" placeholder="Description" flat solo tile hide-details="auto"
              background-color="transparent" class="mb-0 d-block pr-0 mx-n2" block auto-grow task-description-fld>
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Add Task To Section Dialog -->
    <v-dialog v-model="isNewTaskSectionDialogOpen" scrollable max-width="290">
      <v-card>
        <v-card-title class="px-4 caption text-uppercase">Add To Section</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 220px;" class="px-0">
          <v-list dense nav>
            <v-list-item-group v-model="NewTaskSection" color="blue-grey">
              <v-list-item v-for="[index, item] of AllSectionList.entries()" :key="item._id">
                <v-list-item-content>
                  <v-list-item-title class="body-2" v-text="item.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon v-if="NewTaskSection === index">
                  <v-icon>mdi-check</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ml-auto" :disabled="NewTaskSection === -1" text @click="NewTaskSection = -1">
            Clear
          </v-btn>
          <v-btn color="blue-grey" text @click="isNewTaskSectionDialogOpen = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Task Due Date Dialog -->
    <v-dialog ref="DueDateDialog" v-model="isDueDateDialogOpen" max-width="290" :retain-focus="false">
      <v-date-picker v-model="NewTaskDueDate" color="blue-grey" scrollable>
        <v-btn text class="ml-auto" :disabled="NewTaskDueDate === ''" @click="NewTaskDueDate = ''">
          Clear
        </v-btn>
        <v-btn text color="blue-grey" @click="isDueDateDialogOpen = !!0;$refs.DueDateDialog.save(NewTaskDueDate)">
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>

    <!-- Task Bottom Option Sheet -->
    <v-bottom-sheet v-model="isOptionSheetOpen">
      <v-sheet>
        <v-list class="py-0" flat>
          <v-list-item-group>
            <v-list-item @click="handleSaveNNew">
              <v-list-item-icon>
                <v-icon>mdi-content-save-plus-outline </v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Save & New</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-content-duplicate</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Duplicate</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>

    <!-- Add Task Priority Dialog -->
    <v-dialog v-model="isPriorityDialogOpen" scrollable max-width="290" :retain-focus="false">
      <v-card>
        <v-card-title class="px-4 caption text-uppercase">Add Priority</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-0" style="height: 208px;">
          <v-list nav dense>
            <v-list-item-group v-model="NewTaskPriority" mandatory color="blue-grey">
              <v-list-item>
                <v-list-item-content>
                  <v-row dense no-gutters>
                    <v-col cols="3">
                      <v-icon>mdi-exclamation</v-icon>
                      <v-icon class="mx-n5">mdi-exclamation</v-icon>
                      <v-icon>mdi-exclamation</v-icon>
                    </v-col>
                    <v-col class="pt-1">
                      <v-list-item-title class="body-1 font-weight-regular">No Priority</v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-row dense no-gutters>
                    <v-col cols="3">
                      <v-icon color="yellow darken-1">mdi-exclamation</v-icon>
                    </v-col>
                    <v-col class="pt-1">
                      <v-list-item-title class="body-1 font-weight-regular">Low</v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-row dense no-gutters>
                    <v-col cols="3">
                      <v-icon color="blue">mdi-exclamation</v-icon>
                      <v-icon color="blue" class="mx-n5">mdi-exclamation</v-icon>
                    </v-col>
                    <v-col class="pt-1">
                      <v-list-item-title class="body-1 font-weight-regular">Medium</v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-row dense no-gutters>
                    <v-col cols="3">
                      <v-icon color="red">mdi-exclamation</v-icon>
                      <v-icon color="red" class="mx-n5">mdi-exclamation</v-icon>
                      <v-icon color="red">mdi-exclamation</v-icon>
                    </v-col>
                    <v-col class="pt-1">
                      <v-list-item-title class="body-1 font-weight-regular">High</v-list-item-title>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ml-auto" text :disabled="NewTaskPriority === 0" @click="NewTaskPriority = 0">
            Clear
          </v-btn>
          <v-btn color="blue-grey" text @click="isPriorityDialogOpen = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<style>
[task-title-fld] {
  padding: 0;
  font-size: 22px;
  font-weight: bold;
}

[task-title-fld] {
  font-weight: bold;
}

body [task-description-fld] {
  margin-top: 0 !important
}
</style>
  