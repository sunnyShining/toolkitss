/** 工具类 */
export * from './utils'
/** 判断类型 */
export * from './is'
/** mix */
export * from './mix'
/** 警告 */
export * from './warn'

export function noop() {
  /** pass */
}

/** 空对象避免多次创建无用的空对象 */
export const emptyObj = {}
