/**
 * 557. 反转字符串中的单词 III
 * @param {string} s
 * @return {string}
 */
export const reverseWords = (s: string) => {
  return s.split(/\s/).map(a => {
    return a.split('').reverse().join('')
  }).join(' ')
}

/**
 * 696. 计数二进制子串
 * @param {string} s
 * @return {number}
 */

export const countBinarySubstrings = (s: string) => {
  const arr = []
  /** 计算match */
  const match = (str) => {
    const j = str.match(/^(0+|1+)/)[0]
    const o = (j[0] ^ 1).toString().repeat(j.length)
    const reg = new RegExp(`^(${j}${o})`)
    if (reg.test(str)) {
      return RegExp.$1
    }
    return false
  }
  for (let i =0, len = s.length; i < len; i++) {
    const legacyStr = s.slice(i)
    const matched = match(legacyStr)
    if (matched) {
      arr.push(matched)
    }
  }
  return arr // arr.length
}
