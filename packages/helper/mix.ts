import { isFunction } from './is'
import { toArray } from './utils'

/**
 * 混合
 * @param dist 需要添加方法的对象
 * @param obj 添加的方法
 */
function mix(dist, obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
      dist[key] = obj[key]
    }
  }
  return dist
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const augment = function(c, o) {
  // eslint-disable-next-line prefer-rest-params
  const args = toArray(arguments)
  for (let i = 1; i < args.length; i++) {
    let obj = args[i]
    if (isFunction(obj)) {
      obj = obj.prototype
    }
    mix(c.prototype, obj)
  }
}
