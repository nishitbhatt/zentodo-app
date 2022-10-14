

<script setup>
import { TaskOptionStore, useTaskStore, useTaskOptionStore } from '~/store';
</script>

<script>
const { showCompletedTask, setToggleCompletedTask } = useTaskStore()
const { disableOptionSheet } = useTaskOptionStore()
export default {
    name: "TaskOptionSheet",
    methods: {
        handleToggleCompletedTask() {
            setToggleCompletedTask()
            disableOptionSheet()
        }
    }
}
</script>
<template>
    <v-bottom-sheet v-model="TaskOptionStore.TaskOptionSheetOpen">
        <v-sheet style="height: 100%; max-height: calc(100% - 200px)" class="overflow-y-auto">
            <v-subheader>
                Task
            </v-subheader>
            <v-list class="py-0" flat>
                <v-list-item-group multiple>
                    <v-list-item btn @click="handleToggleCompletedTask">
                        <v-list-item-icon>
                            <v-icon v-if="showCompletedTask">mdi-eye-off </v-icon>
                            <v-icon v-else>mdi-eye-check </v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title> {{showCompletedTask ? 'Hide' : 'Show'}} Completed</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-divider></v-divider>
            <v-subheader dense height="20">Section</v-subheader>
            <v-list class="py-0" flat>
                <v-list-item-group multiple>
                    <v-list-item to="tasks/sections">
                        <v-list-item-icon>
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Manage Section</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-list class="py-0" flat>
                <v-list-item-group multiple>
                    <v-list-item to="/login">
                        <v-list-item-icon>
                            <v-icon>mdi-location-exit</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-sheet>
    </v-bottom-sheet>
</template>