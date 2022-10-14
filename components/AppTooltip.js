
import Vue from 'vue'
import AppTooltip from './AppTooltip.vue'

export default (tooltipMessage, type = '') => {
  const AppTooltipElement = Vue.extend(AppTooltip)
  const AppTooltipInstance = new AppTooltipElement({
    propsData: {
      show: true,
      message: tooltipMessage
    }
  })
  AppTooltipInstance.$mount()
  document.body.appendChild(AppTooltipInstance.$el)
}
