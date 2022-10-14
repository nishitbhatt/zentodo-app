import { useTaskStore } from "~/store"
import { useGetFetch, usePostFetch } from "~/utils/Fetch"

const { SetAllTaskList, EditTaskInList } = useTaskStore()

// Task Services
export const CreateTask = async (task = {}) => {
    if (task) {
        const { response } = await usePostFetch(`/api/tasks/create`, task)
        if (response.status === 200) {
            return response
        }
    }
}
export const UpdateTask = async (task = {}) => {
    if (task) {
        const { response } = await usePostFetch(`/api/tasks/update`, task)
        if (response.status === 200) {
            return response
        }
    }
}
export const FetchAllTask = async () => {
    const { response } = await useGetFetch(`/api/tasks/all`)
    if (response.status === 200) {
        SetAllTaskList(response.data)
        return response.data
    }
}
export const FetchOneTask = async (taskid) => {
    if (taskid) {
        const { response } = await useGetFetch(`/api/tasks/${taskid}`)
        if (response.status === 200) {
            return response.data
        }
    }
}


export const MarkTaskComplete = async (taskid = null) => {
    if (taskid) {
        const { response } = await useGetFetch(`/api/tasks/${taskid}/complete`);

        if (response.status === 200) {
            return response
        }
    }
}
export const MarkTaskUncomplete = async (taskid = null) => {
    if (taskid) {
        const { response } = await useGetFetch(`/api/tasks/${taskid}/uncomplete`);
        if (response.status === 200) {
            return response
        }
    }
}
export const MarkTaskToggleMeta = async (taskid = null, taskStatus) => {

    if (taskStatus) {
        await MarkTaskUncomplete(taskid)
    } else {
        await MarkTaskComplete(taskid)
    }

    // Update State
    const updateTask = await FetchOneTask(taskid)
    EditTaskInList(taskid, updateTask)
}



export const DeleteTask = async (taskid = null) => {
    if (taskid) {
        const { response } = await useGetFetch(`/api/tasks/${taskid}/delete`);
        if (response.status === 200) {
            return response
        }
    }
}