<script setup>
import { useTaskStore } from '~/store';
</script>
<script>
const { SetExpandSection, AllSectionExpandList } = useTaskStore()

export default {
  name: "TaskListSheet",
  props: {
    id: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    count: {
      type: Number,
      default: -1
    },
    expanded: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isExpanded() {
      return AllSectionExpandList.value.filter(section => section._id === this.id)[0]?.expanded === undefined ?
        true :
        AllSectionExpandList.value.filter(section => section._id === this.id)[0]?.expanded
    }
  },
  methods: {
    handleExpandSection() {
      SetExpandSection(this.id)
    }
  }
}
</script>
<template>
  <div>
    <!-- Section Button -->
    <v-btn small block tile text raised plain depressed class="grey lighten-4 d-flex justify-start px-0"
      @click="handleExpandSection">
      <v-icon small>mdi-chevron-right {{ isExpanded && 'mdi-rotate-90'}}
      </v-icon>{{ name }}
      <v-spacer></v-spacer>
      <span v-if="count" class="blue-grey--text pr-2">{{ count }}</span>
    </v-btn>
    <!-- Task Of The Section -->
    <v-card v-if="isExpanded" elevation="0">
      <slot></slot>
    </v-card>
  </div>
</template>
