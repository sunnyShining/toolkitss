import { invariant } from './warn'

const _toString = Object.prototype.toString

/**
 * 返回数据类型
 * @param value 数据
 */
export const toRawType = value => _toString.call(value).slice(8, -1)

/** 生成唯一的uid */
export const uuid = () =>
  'uuid-' +
  Date.now().toString(36) +
  Math.random()
    .toString(36)
    .slice(2)

/**
 * 是否是类数组或者数组
 * @param value 需要判断的变量
 */
export const isArrayLike = value =>
  value !== null && typeof value !== 'function' && isFinite(value.length)

/**
 * 处理数组和类数组
 * @param arr 需要处理的变量
 */
export const toArray = arr =>
  isArrayLike(arr) ? Array.prototype.slice.call(arr) : []

/**
 * 获取url search对应的值
 * @param key 获取值的key
 */
export const getSearchParam = (key: string, url?: string) => {
  invariant(typeof key === 'string', 'key should be string')
  const reg = RegExp(`[&?]${key}=([^&]+)`)
  const search = url ? new URL(url).search : location.search
  if (reg.test(search)) {
    return RegExp.$1
  }
  return undefined
}
