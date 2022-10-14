import { useTaskStore } from "~/store"
import { useGetFetch, usePostFetch } from "~/utils/Fetch"

const { SetSectionList } = useTaskStore()

export const FetchAllTaskSections = async () => {
    const { response } = await useGetFetch(`/api/section/all`)
    if (response.status === 200) {
        SetSectionList(response.data)
    }
}
export const CreateSection = async (section = "") => {
    if (section) {
        const { response } = await usePostFetch(`/api/section/create`, { NewSection: section })
        if (response.status === 200) {
            return response
        }
    }
}

export const DeleteSection = async (sectionid = null) => {
    if (sectionid) {
        const { response } = await useGetFetch(`/api/section/${sectionid}/delete`);
        if (response.status === 200) {
            return response
        }
    }
}


export const UpdateSection = async (section = {}) => {
    if (section !== {}) {
        const { response, error } = await usePostFetch(`/api/section/update`, section)
        console.log({ response, error })
        if (response.status === 200) {
            return response
        }
    }
}