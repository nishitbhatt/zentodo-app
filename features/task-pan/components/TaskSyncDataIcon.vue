<script>
export default {
    name: "TaskSyncDataIcon",
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: this.loading
        }
    },
    watch: {
        loading() {
            if (!this.loading) {
                setTimeout(() => {
                    this.show = false
                }, 1500)
            }
        }
    },
    mounted() {
        this.show = true
        setTimeout(() => {
            this.show = false
        }, 4000)
    },
}
</script>
<template >
    <div v-if="show" sync-icon-wrapper>
        <v-icon sync-icon size="small"> {{loading ? 'mdi-sync mdi-spin' : ''}}</v-icon>
        <v-icon cloud-icon :color="!loading ? 'green' : ''">{{loading ? 'mdi-cloud' : 'mdi-cloud-check'}}</v-icon>
    </div>
</template>

<style scoped>
[sync-icon-wrapper] {
    position: relative;
}

[sync-icon] {
    position: absolute !important;
    z-index: 1;
    font-size: 13px !important;
    font-weight: bold !important;
    background-color: white;
    border-radius: 50%;
    bottom: -1px;
    right: -3px;
}
</style>
