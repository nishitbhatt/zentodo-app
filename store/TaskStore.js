import { computed, ref } from "vue"

// Task Store
const TaskStore = ref({
  AllTaskList: [],
  AllSectionList: [],
  AllSectionExpandList: [{
    _id: '0',
    expanded: true
  }],
  ShowCompletedTask: true
})




// Task Option Store
export const TaskOptionStore = ref({
  TaskOptionSheetOpen: false,
})


// Use Task Store
export const useTaskStore = () => {

  // Setter
  const SetAllTaskList = (task = {}) => {
    TaskStore.value.AllTaskList = task
  }
  const SetSectionList = (section = {}) => {
    TaskStore.value.AllSectionList = section
  }


  // Use Task List & Count
  const AllTaskList = computed(() => TaskStore.value.AllTaskList)

  // Use Task Sections
  const AllSectionList = computed(() => TaskStore.value.AllSectionList)

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


  // Compute Not Sectioned Tasks
  const NotSectionedTask = computed(() => {
    let task;
    if (TaskStore.value.ShowCompletedTask) {
      task = TaskStore.value.AllTaskList.filter(task => task.sectionid === '0' || task.sectionid === 0)
    } else {
      task = TaskStore.value.AllTaskList.filter(task => task.sectionid === '0' || task.sectionid === 0).filter(task => task.completed !== true)
    }

    return {
      _id: '0',
      task,
      remain: TaskStore.value.AllTaskList.filter(task => (task.sectionid === '0' || task.sectionid === 0) && task.completed !== true).length,
      total: TaskStore.value.AllTaskList.filter(task => (task.sectionid === '0' || task.sectionid === 0)).length,
    }
  })

  // Compute Sectioned Tasks
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

  // Computed All Task Count
  const AllTaskCount = computed(() => {
    return TaskStore.value.AllTaskList.length
  })

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

  const AllSectionExpandList = computed(() => TaskStore.value.AllSectionExpandList)


  // 
  const showCompletedTask = computed(() => TaskStore.value.ShowCompletedTask)
  const setShowCompletedTask = () => {
    TaskStore.value.ShowCompletedTask = true
  }
  const setHideCompletedTask = () => {
    TaskStore.value.ShowCompletedTask = false
  }
  const setToggleCompletedTask = () => {
    TaskStore.value.ShowCompletedTask = !TaskStore.value.ShowCompletedTask
  }

  return {
    AllSectionExpandList,

    AllTaskCount,
    NotSectionedTask,
    SectionedTask,
    // 
    AllTaskList,
    SetAllTaskList,
    // 
    AllSectionList,
    SetSectionList,
    // 
    EditTaskInList,
    SetExpandSection,


    // 
    showCompletedTask,
    setShowCompletedTask,
    setHideCompletedTask,
    setToggleCompletedTask
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




  return {
    // 
    isOptionSheetOpen,
    setOptionSheet,
    disableOptionSheet
  }
}
