import { toRawType } from './utils'

/**
 * 判断值是否是function
 * @param value 需要判断的变量
 */
export const isFunction = value => toRawType(value) === 'Function'
