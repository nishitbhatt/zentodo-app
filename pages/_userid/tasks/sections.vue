<script setup>
import { FetchAllTaskSections, CreateSection, DeleteSection, UpdateSection } from '~/services';
import { useTaskOptionStore, useTaskStore } from '~/store';

</script>
<script>
const { setOptionSheet } = useTaskOptionStore()
const { AllSectionList } = useTaskStore()
export default {
  name: "SectionsPage",
  data: () => ({
    AllSectionList,
    SectionDialogOpen: false,
    NewSectionName: "",
    SectionId: -1,
  }),
  async mounted() {
    await FetchAllTaskSections()
  },
  methods: {
    backToTask() {
      setOptionSheet(false)
      this.$router.back()
    },
    async handleSaveSection() {

      if (this.SectionId === -1) {
        await CreateSection(this.NewSectionName)
        await FetchAllTaskSections()
        this.NewSectionName = ""
        this.SectionDialogOpen = false
        this.SectionId = -1
      } else {

        await UpdateSection({
          SectionId: this.SectionId,
          SectionName: this.NewSectionName,
        })
      }

      await FetchAllTaskSections()
      this.SectionDialogOpen = false
      this.NewSectionName = ""
      this.SectionId = -1
    },
    handleEditSectionDialogOpen(sectionid, sectionName) {
      this.SectionId = sectionid
      this.NewSectionName = sectionName
      this.SectionDialogOpen = true
      document.querySelector('[section-title-fld] textarea')?.focus()
    },
    async handleDeleteSection() {

      if (this.SectionId) {
        const { status } = await DeleteSection(this.SectionId)
        if (status === 200) {
          await FetchAllTaskSections()
          this.SectionDialogOpen = false
          this.NewSectionName = ""
          this.SectionId = -1
        }
      }
    }
  }
}
</script>
<template>
  <!-- Manage Section Page -->
  <v-card flat tile>

    <!-- Header -->
    <v-toolbar elevation="0" class="transparent">

      <v-btn icon @click="backToTask" class="mr-1">
        <v-icon large>mdi-chevron-left</v-icon>
      </v-btn>

      <v-toolbar-title class="pl-0 text-subtitle-1 text-h6">
        Manage Sections
      </v-toolbar-title>
    </v-toolbar>

    <!-- Message -->
    <div class="text-body-2 px-3 mt-5 mb-8 blue-grey--text">
      You can create sections to manage tasks based on your needs. The created section will only be shown when sorting
      methods is custome.
    </div>

    <!-- Section List -->
    <v-slide-y-transition group class="py-0" flat tag="v-list">
      <!-- <transition-group> -->
      <template v-for="(section, index) in AllSectionList">
        <v-divider v-if="index !== 0" :key="`${index}-divider`" />
        <v-list-item v-if="true" :key="`Section${section._id}`"
          @click="handleEditSectionDialogOpen(section._id, section.name)">
          <v-list-item-content>
            <v-list-item-title v-text="section.name" />
          </v-list-item-content>
        </v-list-item>
      </template>
      <!-- </transition-group> -->
    </v-slide-y-transition>
    <!-- Add Section Button -->
    <v-divider />
    <v-list class="py-0" flat>
      <v-list-item @click="SectionId=-1;NewSectionName='';SectionDialogOpen = true">
        <v-list-item-icon class="mr-3">
          <v-icon>mdi-plus</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text--h6">Add Section</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- Section Dialog -->
    <v-dialog v-model="SectionDialogOpen" scrollable>
      <v-card>
        <v-card-text class="px-1 py-2">
          <v-textarea v-model="NewSectionName" placeholder="Enter section name" hide-details="auto" rows="2" flat solo
            tile section-title-fld autofocus auto-grow></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="SectionDialogOpen = false">
            Close
          </v-btn>
          <v-btn v-if="SectionId !== -1" class="ml-auto" color="blue-grey" text @click="handleDeleteSection">
            Delete
          </v-btn>
          <v-btn :disabled="NewSectionName == ''" class="ml-auto" color="blue-grey" text @click="handleSaveSection">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>

</template>

<style>
[section-title-fld] {
  font-weight: Medium;
}
</style>
  