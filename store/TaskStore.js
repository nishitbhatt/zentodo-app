import { computed, ref } from "vue"

// Task Store
const TaskStore = ref({
  AllTaskList: [],
  AllSectionList: [],
  AllSectionExpandList: [{
    _id: '0',
    expanded: true
  }],
  ShowCompletedTask: true,
})

// Task Option Store
export const TaskOptionStore = ref({
  TaskOptionSheetOpen: false,
  TaskExpanded: false,
  isSyncing: false,

})




// Use Task Store
export const useTaskStore = () => {

  // Use Task List & Count
  const AllTaskList = computed(() => TaskStore.value.AllTaskList)
  const AllTaskCount = computed(() => TaskStore.value.AllTaskList.length)

  // Setter
  const SetAllTaskList = (task = {}) => {
    TaskStore.value.AllTaskList = task
  }
  const AddToAllTaskList = (task = {}) => {
    TaskStore.value.AllTaskList.push(task)
  }
  // Edit Single Task In List
  const EditTaskInList = (taskid, task = {}) => {

    const editedTask = TaskStore.value.AllTaskList.map(taskObj => {
      if (taskObj._id === taskid) {
        return task
      }
      return taskObj
    })
    SetAllTaskList(editedTask)
  }
  // Find Task From List
  const FindTaskInList = (taskid) => {
    return TaskStore.value.AllTaskList.filter(taskObj => taskObj._id === taskid)
  }


  // Use All Sections &
  const AllSectionList = computed(() => TaskStore.value.AllSectionList)
  // Set Section 
  const SetSectionList = (section = {}) => {
    TaskStore.value.AllSectionList = section
  }
  // Find Sections From List
  const FindSectionInList = (sectionid) => {
    return TaskStore.value.AllSectionList.filter(sectionObj => sectionObj._id === sectionid)
  }


  // Compute Sectioned Tasks & Not Sectioned Tasks
  const NotSectionedTask = computed(() => {
    let task;
    if (TaskStore.value.ShowCompletedTask) {
      task = TaskStore.value.AllTaskList.filter(task => task.sectionid === '0' || task.sectionid === 0)
    } else {
      task = TaskStore.value.AllTaskList.filter(task => task.sectionid === '0' || task.sectionid === 0).filter(task => task.completed !== true)
    }
    const remain = TaskStore.value.AllTaskList.filter(task => (task.sectionid === '0' || task.sectionid === 0) && task.completed !== true).length
    const total = TaskStore.value.AllTaskList.filter(task => (task.sectionid === '0' || task.sectionid === 0)).length

    return {
      _id: '0',
      task,
      remain,
      total,
    }
  })
  const SectionedTask = computed(() => {
    return TaskStore.value.AllSectionList.map(section => {

      let task
      if (TaskStore.value.ShowCompletedTask) {
        task = TaskStore.value.AllTaskList.filter(task => section._id === task.sectionid)
      } else {
        task = TaskStore.value.AllTaskList.filter(task => section._id === task.sectionid && task.completed !== true)
      }

      const total = TaskStore.value.AllTaskList.filter(task => section._id === task.sectionid).length
      const remain = TaskStore.value.AllTaskList.filter(task => section._id === task.sectionid && task.completed !== true).length
      section.task = task
      section.remain = remain
      section.total = total
      return section
    })
  })



  // Section Expanded List 
  const AllSectionExpandList = computed(() => TaskStore.value.AllSectionExpandList)
  // Set Expand Section
  const SetExpandSection = (sectionid) => {
    const isFound = TaskStore.value.AllSectionExpandList.find(section => section._id === sectionid)
    if (isFound) {
      const expandList = TaskStore.value.AllSectionExpandList.map(section => {
        if (section._id === sectionid) {
          section.expanded = !section.expanded
          return section
        }
        return section
      })
      TaskStore.value.AllSectionExpandList = expandList
    } else {

      TaskStore.value.AllSectionExpandList.push({
        _id: sectionid,
        expanded: false
      })
    }
  }


  // Completed Task
  const showCompletedTask = computed(() => TaskStore.value.ShowCompletedTask)
  // Toggle Completed Task
  const toggleCompletedTask = () => {
    TaskStore.value.ShowCompletedTask = !TaskStore.value.ShowCompletedTask
  }


  return {
    AllSectionExpandList,
    FindTaskInList,

    AllTaskCount,
    NotSectionedTask,
    SectionedTask,
    // 
    AllTaskList,
    SetAllTaskList,
    AddToAllTaskList,
    // 
    AllSectionList,
    SetSectionList,

    // 
    EditTaskInList,
    SetExpandSection,

    // 
    showCompletedTask,
    toggleCompletedTask,
    FindSectionInList
  }
}



// Use Task Option Store
export const useTaskOptionStore = () => {

  // 
  const isOptionSheetOpen = computed(() => TaskOptionStore.value.TaskOptionSheetOpen)
  const setOptionSheet = (value) => {
    TaskOptionStore.value.TaskOptionSheetOpen = value
  }
  const disableOptionSheet = () => {
    TaskOptionStore.value.TaskOptionSheetOpen = false
  }
  const enableOptionSheet = () => {
    TaskOptionStore.value.TaskOptionSheetOpen = true
  }
  // 
  const enableSyncing = (value) => {
    TaskOptionStore.value.isSyncing = !0
  }

  // 
  const isTaskExpanded = computed(() => TaskOptionStore.value.TaskExpanded)
  const toggleTaskExpanded = () => {
    TaskOptionStore.value.TaskExpanded = !TaskOptionStore.value.TaskExpanded
  }

  return {
    // 
    isOptionSheetOpen,
    setOptionSheet,
    disableOptionSheet,
    enableOptionSheet,
    // 
    enableSyncing,
    // 
    isTaskExpanded,
    toggleTaskExpanded
  }
}
