import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  AboutText: () => import('../../components/AboutText.vue' /* webpackChunkName: "components/about-text" */).then(c => wrapFunctional(c.default || c)),
  BigText: () => import('../../components/BigText.vue' /* webpackChunkName: "components/big-text" */).then(c => wrapFunctional(c.default || c)),
  ContactText: () => import('../../components/ContactText.vue' /* webpackChunkName: "components/contact-text" */).then(c => wrapFunctional(c.default || c)),
  IconList: () => import('../../components/IconList.vue' /* webpackChunkName: "components/icon-list" */).then(c => wrapFunctional(c.default || c)),
  MyWork: () => import('../../components/MyWork.vue' /* webpackChunkName: "components/my-work" */).then(c => wrapFunctional(c.default || c)),
  MyWorkItem: () => import('../../components/MyWorkItem.vue' /* webpackChunkName: "components/my-work-item" */).then(c => wrapFunctional(c.default || c)),
  NiceImg: () => import('../../components/NiceImg.vue' /* webpackChunkName: "components/nice-img" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
