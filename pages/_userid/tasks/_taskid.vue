<script setup>
// import { useTaskStore } from '~/store';
import { FetchOneTask, UpdateTask, DeleteTask, MarkTaskToggleMeta, FetchAllTaskSections } from '~/services'
import { useTaskStore } from '~/store';
</script>
<script>

const { AllSectionList } = useTaskStore()
export default {
    name: "TaskPage",
    layout: "default",
    data: () => ({
        TaskId: null,
        TaskTitle: "",
        TaskDescription: "",
        TaskSection: 0,
        TaskDueDate: "",
        TaskCompleted: false,
        EditTaskPageOpen: true,
        TaskDueDateDialog: false,
        isTaskSectionDialogOpen: false,
        isOptionSheetOpen: false,
        taskPriority: 0,
        isDone: false,
        selectedTags: [],
        tagsPanDialog: false,
    }),
    computed: {
        FormattedDueDate() {
            return this.TaskDueDate ? new Date(this.TaskDueDate).toDateString() : 'Due Date'
        },
        TaskDueDatePickerValue() {
            return this.TaskDueDate ? new Date(this.TaskDueDate).toISOString().substr(0, 10) : 'Due Date'
        },
    },
    async mounted() {

        await FetchAllTaskSections()

        const { taskid } = this.$route.params
        this.TaskId = taskid

        const taskObj = await FetchOneTask(taskid)
        this.TaskTitle = taskObj.title
        this.TaskDescription = taskObj.description
        this.TaskDueDate = taskObj.duedate
        this.TaskCompleted = taskObj.completed
        if (taskObj.sectionid === '0') {
            this.TaskSection = {
                _id: '0',
                name: 'Not Sectioned'
            }
        } else {
            const { _id, name } = AllSectionList.value.filter(section => section._id === taskObj.sectionid)[0]
            this.TaskSection = { _id, name }
        }
    },
    unmounted() {
        this.EditTaskPageOpen = false
    },
    methods: {
        async handleDeleteTask() {
            const taskid = this.TaskId
            await DeleteTask(taskid)
            this.isOptionSheetOpen = false
            this.$router.back()
        },
        async handleToggleTaskComplete() {
            const { TaskId, TaskCompleted } = this
            await MarkTaskToggleMeta(TaskId, TaskCompleted)
            this.TaskCompleted = !this.TaskCompleted
        },
        async handleTaskUpdate() {

            const { TaskId, TaskTitle, TaskDescription, TaskDueDate, TaskCompleted, TaskSection } = this
            
            if (TaskTitle) {

                await UpdateTask({
                    TaskId,
                    TaskTitle,
                    TaskDescription,
                    TaskDueDate,
                    TaskCompleted,
                    TaskSectionId: TaskSection._id || "0"
                })

                this.EditTaskPageOpen = false
            }
            this.$router.back()
        }
    }
}
</script>
<template>
    <v-dialog v-model="EditTaskPageOpen" fullscreen hide-overlay transition="dialog-bottom-transition">

        <!-- Edit Task -->
        <v-card flat tile :class="{ 'blue-grey lighten-5': TaskCompleted }">
            <v-toolbar elevation="0" class="transparent">

                <!-- Back Button -->
                <v-btn icon @click="handleTaskUpdate">
                    <v-icon large>mdi-chevron-left</v-icon>
                </v-btn>


                <v-toolbar-title class="pl-0">
                    <v-btn block small text class="justify-start" @click="isTaskSectionDialogOpen = true">
                        <span class="d-inline-block text-truncate" style="max-width: 225px;">
                            {{ TaskSection && TaskSection._id !== '0' ? TaskSection.name : "No Section " }}
                        </span>
                        <v-icon dark right>
                            mdi-menu-down
                        </v-icon>
                    </v-btn>
                </v-toolbar-title>

                <!-- Task Option Sheet -->
                <v-btn icon class="ml-auto" color="#000" @click.stop="isOptionSheetOpen = true">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text class="px-3 pt-0 mt-0 pb-0 align-center">
                <v-row no-gutters dense>
                    <v-col cols="12" class="d-flex align-center">

                        <!-- Complete Task -->
                        <v-btn :class="{ 'blue-grey lighten-4': TaskCompleted }"
                            :color="TaskCompleted ? 'blue-grey' : 'blue-grey darken-5'" :outlined="!TaskCompleted" large
                            icon raised @click.stop="handleToggleTaskComplete">
                            <v-icon v-if="TaskCompleted" color="blue-grey">mdi-check-bold</v-icon>
                            <v-icon color="blue-grey" v-else>mdi-check-outline</v-icon>
                        </v-btn>

                        <!-- Due Date -->
                        <v-btn class="ml-1" rounded text small @click.stop="TaskDueDateDialog = true">
                            <v-icon left class="mr-1">mdi-calendar-month-outline</v-icon>
                            <span class="subtitle-2 text-capitalize">{{ FormattedDueDate }}</span>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters dense class="mt-2">
                    <v-col cols="12">

                        <!-- Task Title -->
                        <v-textarea v-model="TaskTitle" placeholder="What do you like to done?" flat solo tile rows="1"
                            hide-details="auto" class="mb-1 d-block pr-0 mx-n2" background-color="transparent" block
                            autofocus auto-grow task-title-fld>
                        </v-textarea>
                    </v-col>
                    <v-col cols="12">

                        <!-- Task Description -->
                        <v-textarea v-model="TaskDescription" placeholder="Description" flat solo tile
                            hide-details="auto" background-color="transparent" class="mb-0 d-block pr-0 mx-n2 mt-0"
                            block autofocus auto-grow task-description-fld>
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>


        <!-- Add Task To Section Dialog -->
        <v-dialog v-model="isTaskSectionDialogOpen" scrollable max-width="290">
            <v-card>
                <v-card-title class="px-4 body-2 text-uppercase">Add To Section</v-card-title>
                <v-card-text style="height: 220px;" class="px-3">

                    <v-radio-group v-model="TaskSection" column>
                        <v-radio v-for="item in AllSectionList" :key="item._id" color="blue-grey" class="mb-3"
                            :value="item">
                            <template v-slot:label>
                                {{item.name}}
                            </template>
                        </v-radio>
                    </v-radio-group>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="ml-auto" :disabled="!TaskSection" text @click="TaskSection = 0">
                        Clear
                    </v-btn>
                    <v-btn color="blue-grey" text @click="isTaskSectionDialogOpen = false">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Edit Task Due Date -->
        <v-dialog ref="DueDateDialog" v-model="TaskDueDateDialog" persistent width="290px" :retain-focus="false"
            :return-value.sync="TaskDueDate">
            <v-date-picker v-model="TaskDueDate" color="blue-grey" scrollable>
                <v-btn text @click="TaskDueDate = ''" :disabled="TaskDueDate === ''" class="ml-auto">
                    Clear
                </v-btn>
                <v-btn text color="blue-grey" @click="TaskDueDateDialog = false;$refs.DueDateDialog.save(TaskDueDate)">
                    OK
                </v-btn>
            </v-date-picker>
        </v-dialog>

        <!-- Edit Task Option Sheet -->
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
                        <v-list-item @click="handleDeleteTask">
                            <v-list-item-icon>
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title class="red--text">Delete</v-list-item-title>
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
    