<script setup>
import { UpdateTask, DeleteTask, MarkTaskToggleMeta } from '~/services'
import { useTaskStore } from '~/store';
</script>
<script>

const { AllSectionList, FindTaskInList } = useTaskStore()
export default {
    name: "TaskPage",
    layout: "default",
    data: () => ({
        TaskId: null,
        TaskTitle: "",
        TaskDescription: "",
        TaskSection: -1,
        TaskDueDate: "",
        TaskPriority: 0,
        TaskCompleted: false,
        EditTaskPageOpen: true,
        TaskDueDateDialog: false,
        isTaskSectionDialogOpen: false,
        isOptionSheetOpen: false,
        isPriorityDialogOpen: false
    }),
    computed: {
        FormattedDueDate() {
            return this.TaskDueDate ? new Date(this.TaskDueDate).toDateString() : 'Due Date'
        },
        TaskDueDatePickerValue() {
            return this.TaskDueDate ? new Date(this.TaskDueDate).toISOString().substr(0, 10) : 'Due Date'
        },
        TaskSectionTitle() {
            return AllSectionList.value[this.TaskSection]?.name || "No Section "
        },
        TaskSectionId() {
            return AllSectionList.value[this.TaskSection]?._id || '0'
        },
        TaskPriorityColor() {
            if (this.TaskPriority === 1)
                return 'yellow darken-1'
            if (this.TaskPriority === 2)
                return 'blue'
            if (this.TaskPriority === 3)
                return 'red'
            return 'blue-grey'
        }
    },
    mounted() {

        const { taskid } = this.$route.params
        this.TaskId = taskid

        const taskObj = FindTaskInList(taskid)[0]

        this.TaskTitle = taskObj.title
        this.TaskDescription = taskObj.description
        this.TaskDueDate = taskObj.duedate
        this.TaskCompleted = taskObj.completed
        this.TaskPriority = taskObj.priority || 0
        if (taskObj.sectionid === '0') {
            this.TaskSection = -1
        } else {
            // const { _id, name } = FindSectionInList(taskObj.sectionid)[0]
            this.TaskSection = AllSectionList.value.findIndex(section => taskObj.sectionid === section._id)
        }


        // if (taskObj.sectionid === '0') {
        //     this.TaskSection = {
        //         _id: '0',
        //         name: 'Not Sectioned'
        //     }
        // } else {
        //     const { _id, name } = FindSectionInList(taskObj.sectionid)[0]
        //     this.TaskSection = { _id, name }
        // }
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

            const { TaskId, TaskTitle, TaskDescription, TaskDueDate, TaskCompleted, TaskPriority, } = this
            const _id = this.TaskSectionId || "0"

            if (TaskTitle) {

                await UpdateTask({
                    TaskId,
                    TaskTitle,
                    TaskDescription,
                    TaskDueDate,
                    TaskCompleted,
                    TaskPriority,
                    TaskSectionId: _id
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
                            {{ TaskSectionTitle }}
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
                            <v-icon v-else color="blue-grey">mdi-check-outline</v-icon>
                        </v-btn>

                        <!-- Due Date -->
                        <v-btn class="ml-1" rounded text small @click.stop="TaskDueDateDialog = true">
                            <v-icon left class="mr-1">mdi-calendar-month-outline</v-icon>
                            <span class="subtitle-2 text-capitalize">{{ FormattedDueDate }}</span>
                        </v-btn>

                        <!-- Priority -->
                        <v-btn class="ml-auto" icon raised text tile @click.stop="isPriorityDialogOpen = true">
                            <v-icon :color="TaskPriorityColor">mdi-exclamation</v-icon>
                            <v-icon :color="TaskPriorityColor" class="mx-n4">mdi-exclamation</v-icon>
                            <v-icon :color="TaskPriorityColor">mdi-exclamation</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters dense class="mt-2">
                    <v-col cols="12">

                        <!-- Task Title -->
                        <v-textarea v-model="TaskTitle" placeholder="What do you like to done?" flat solo tile rows="1"
                            hide-details="auto" class="mb-1 d-block pr-0 mx-n2" background-color="transparent" block
                            auto-grow task-title-fld>
                        </v-textarea>
                    </v-col>
                    <v-col cols="12">

                        <!-- Task Description -->
                        <v-textarea v-model="TaskDescription" placeholder="Description" flat solo tile
                            hide-details="auto" background-color="transparent" class="mb-0 d-block pr-0 mx-n2 mt-0"
                            block auto-grow task-description-fld>
                        </v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- Add Task To Section Dialog -->
        <v-dialog v-model="isTaskSectionDialogOpen" scrollable max-width="290">
            <v-card>
                <v-card-title class="px-4 caption text-uppercase font-weight-regular">Add To Section</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 220px;" class="px-0">
                    <v-list dense nav>
                        <v-list-item-group v-model="TaskSection" color="blue-grey">
                            <v-list-item v-for="[index, item] of AllSectionList.entries()" :key="item._id">
                                <v-list-item-content>
                                    <v-list-item-title class="body-2" v-text="item.name"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-icon v-if="TaskSection === index">
                                    <v-icon>mdi-check</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="ml-auto" :disabled="TaskSection === -1" text @click="TaskSection = -1">
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
                <v-btn text :disabled="TaskDueDate === ''" class="ml-auto" @click="TaskDueDate = ''">
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

        <!-- Edit Task Priority Dialog -->
        <v-dialog v-model="isPriorityDialogOpen" scrollable max-width="290" :retain-focus="false">
            <v-card>
                <v-card-title class="px-4 caption text-uppercase">Add Priority</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-0" style="height: 208px;">
                    <v-list nav dense>
                        <v-list-item-group v-model="TaskPriority" mandatory color="blue-grey">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-row dense no-gutters>
                                        <v-col cols="3">
                                            <v-icon>mdi-exclamation</v-icon>
                                            <v-icon class="mx-n5">mdi-exclamation</v-icon>
                                            <v-icon>mdi-exclamation</v-icon>
                                        </v-col>
                                        <v-col class="pt-1">
                                            <v-list-item-title class="body-1 font-weight-regular">No Priority
                                            </v-list-item-title>
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
                                            <v-list-item-title class="body-1 font-weight-regular">Low
                                            </v-list-item-title>
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
                                            <v-list-item-title class="body-1 font-weight-regular">Medium
                                            </v-list-item-title>
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
                                            <v-list-item-title class="body-1 font-weight-regular">High
                                            </v-list-item-title>
                                        </v-col>
                                    </v-row>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                    <v-btn class="ml-auto" text :disabled="TaskPriority === 0" @click="TaskPriority = 0">
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
    