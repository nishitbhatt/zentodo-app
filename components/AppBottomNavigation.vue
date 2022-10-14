<script>
export default {
    data: () => ({
        AppBottomDrawerValue: 'tasks'
    })
}
</script>
<template>
    <!-- App Bottom Bar -->
    <v-card class="mx-auto position-fixed" tile app-bottom-bar elevation="0">
        <v-bottom-navigation :value="AppBottomDrawerValue" color="blue-grey darken-2" mandatory>
            <v-btn value="red">
                <v-icon color="blue-grey lighten-4">mdi-text</v-icon>
            </v-btn>

            <v-btn value="tasks" color="grey lighten-3">
                <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>

            <v-btn value="stories">
                <v-icon color="blue-grey lighten-4">mdi-bookshelf</v-icon>
            </v-btn>

            <v-btn value="calendar">
                <v-icon color="blue-grey lighten-4">mdi-calendar-month </v-icon>
            </v-btn>

            <v-btn value="notes">
                <v-icon color="blue-grey lighten-4">mdi-note</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-card>
</template>

<style>
[app-bottom-bar] {
    position: fixed;
    width: 100%;
    bottom: 0;
}
</style>