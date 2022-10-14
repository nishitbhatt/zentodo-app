<script setup>
import { useTaskStore } from '~/store';
import { CreateTask, FetchAllTaskSections } from '~/services';
// import { FetchAllTaskSections } from '~/services';
</script>
<script>

const { AllSectionList } = useTaskStore()
// const { CreateTask } = useTaskStore()
export default {
  name: "CreatePage",
  data: () => ({
    NewTaskTitle: "",
    NewTaskDescription: "",
    NewTaskDueDate: "",
    NewTaskSection: 0,
    isNewTaskSectionDialogOpen: false,
    isNewTaskCompleted: false,
    isNewTaskPageOpen: false,
    isDueDateDialogOpen: false,
    isOptionSheetOpen: false
  }),
  computed: {
    FormattedDueDate() {
      return this.NewTaskDueDate ? new Date(this.NewTaskDueDate).toDateString() : 'Due Date'
    },
  },
  async mounted() {
    this.isNewTaskPageOpen = true
    await FetchAllTaskSections()
  },
  unmounted() {
    this.isNewTaskPageOpen = false
  },
  methods: {
    async handleCreateNewTask() {

      const { NewTaskTitle, NewTaskDescription, NewTaskDueDate, NewTaskCompleted, NewTaskSection } = this
      const { _id } = NewTaskSection || '0'

      if (NewTaskTitle) {
        await CreateTask({
          NewTaskTitle,
          NewTaskDescription,
          NewTaskDueDate,
          NewTaskCompleted,
          NewTaskSection: _id || '0'
        })

        this.isNewTaskPageOpen = false
      }
      this.$router.back()
    }
  }
}
</script>
<template>
  <v-dialog v-model="isNewTaskPageOpen" fullscreen hide-overlay transition="slide-x-transition"
    :retain-focus="false">
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
              {{ NewTaskSection.name || "No Section " }}
            </span>
            <v-icon dark right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </v-toolbar-title>

        <!-- Task Option Sheet -->
        <v-btn icon class="ml-auto" @click.stop="isOptionSheetOpen = true">
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
              <v-icon color="blue-grey" v-else>mdi-check-outline</v-icon>
            </v-btn>

            <!-- Due Date -->
            <v-btn class="ml-1" rounded text small @click.stop="isDueDateDialogOpen = true">
              <v-icon left class="mr-1">mdi-calendar-month-outline</v-icon>
              <span class="subtitle-2 text-capitalize">{{ FormattedDueDate }}</span>
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
        <v-card-title class="px-4 body-2 text-uppercase">Add To Section</v-card-title>
        <v-card-text style="height: 220px;" class="px-3">

          <v-radio-group v-model="NewTaskSection" column>
            <v-radio v-for="item in AllSectionList" :key="item._id" color="blue-grey" class="mb-3" :value="item">
              <template v-slot:label>
                {{item.name}}
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ml-auto" :disabled="!NewTaskSection" text @click="NewTaskSection = 0">
            Clear
          </v-btn>
          <v-btn color="blue-grey" text @click="isNewTaskSectionDialogOpen = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Task Due Date Dialog -->
    <v-dialog ref="DueDateDialog" v-model="isDueDateDialogOpen" persistent width="290px" :retain-focus="false">
      <v-date-picker v-model="NewTaskDueDate" color="blue-grey" scrollable>
        <v-btn text class="ml-auto" @click="NewTaskDueDate = ''" :disabled="NewTaskDueDate === ''">
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
            <v-list-item>
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
  