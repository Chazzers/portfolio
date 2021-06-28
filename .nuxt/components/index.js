import { wrapFunctional } from './utils'

export { default as AboutText } from '../../components/AboutText.vue'
export { default as BigText } from '../../components/BigText.vue'
export { default as ContactText } from '../../components/ContactText.vue'
export { default as IconList } from '../../components/IconList.vue'
export { default as MyWork } from '../../components/MyWork.vue'
export { default as MyWorkItem } from '../../components/MyWorkItem.vue'
export { default as NiceImg } from '../../components/NiceImg.vue'

export const LazyAboutText = import('../../components/AboutText.vue' /* webpackChunkName: "components/about-text" */).then(c => wrapFunctional(c.default || c))
export const LazyBigText = import('../../components/BigText.vue' /* webpackChunkName: "components/big-text" */).then(c => wrapFunctional(c.default || c))
export const LazyContactText = import('../../components/ContactText.vue' /* webpackChunkName: "components/contact-text" */).then(c => wrapFunctional(c.default || c))
export const LazyIconList = import('../../components/IconList.vue' /* webpackChunkName: "components/icon-list" */).then(c => wrapFunctional(c.default || c))
export const LazyMyWork = import('../../components/MyWork.vue' /* webpackChunkName: "components/my-work" */).then(c => wrapFunctional(c.default || c))
export const LazyMyWorkItem = import('../../components/MyWorkItem.vue' /* webpackChunkName: "components/my-work-item" */).then(c => wrapFunctional(c.default || c))
export const LazyNiceImg = import('../../components/NiceImg.vue' /* webpackChunkName: "components/nice-img" */).then(c => wrapFunctional(c.default || c))
