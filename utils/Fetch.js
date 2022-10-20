import { reactive, unref } from "vue"

export const useAsyncFetch = async (url, options = {}) => {
    const fetchState = reactive({
        response: null,
        error: null,
    })
    try {
        const resp = await fetch(url, options)
        const json = await resp.json()
        fetchState.response = json

    } catch (err) {
        fetchState.error = err
    }
    return unref(fetchState)
}

export const useGetFetch = (url = '') => {
    return useAsyncFetch(url, {
        method: 'GET',
        mode: 'cors',
    });
}

export const usePostFetch = (url = '', payload = {}) => {
    return useAsyncFetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(payload)
    });
}
