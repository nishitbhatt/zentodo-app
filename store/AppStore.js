import { ref } from 'vue'



export const useAppLoading = () => {
  const inProgress = ref(!!0)
  const showProgress = () => {
    inProgress.value = !0
  }
  const hideProgress = () => {
    inProgress.value = !!0
  }

  return {
    inProgress,
    showProgress,
    hideProgress
  }
}
