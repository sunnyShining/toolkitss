const prefix = 'Invariant failed'
/**
 * 校验，错误则中断并打印错误信息
 * @param condition 条件
 * @param msg 打印错误信息
 */
export function invariant(condition: boolean, message: string): void
export function invariant(condition, message) {
  if (condition) return
  // Condition not passed
  // @ts-ignore
  if (process.env.NODE_ENV === 'development') {
    // When not in production we allow the message to pass through
    throw new Error(`${prefix}: ${message || ''}`)
  }
  // In production we strip the message but still throw
  throw new Error(prefix)
}

/**
 * 校验，错误打印警告信息
 * @param condition 条件
 * @param msg 打印错误信息
 */
export function warning(condition: boolean, message: string): void
export function warning(condition, message) {
  // @ts-ignore
  if (process.env.NODE_ENV === 'production') return
  if (condition) return
  // Condition not passed
  const text = `Warning: ${message}`

  // check console for IE9 support which provides console
  // only with open devtools
  if (typeof console !== 'undefined') {
    console.warn(text)
  }
  // Throwing an error and catching it immediately
  try {
    throw Error(text)
  } catch (x) {}
}
