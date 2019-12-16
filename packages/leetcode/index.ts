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
  for (let i = 0, len = s.length; i < len; i++) {
    const legacyStr = s.slice(i)
    const matched = match(legacyStr)
    if (matched) {
      arr.push(matched)
    }
  }
  return arr // arr.length
}

/**
 * 17. 电话号码的字母组合
 * @param {string} digits
 * @return {string[]}
 */
export const letterCombinations = (digits: string) => {
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  const num = digits.split('')
  const code: string[] = num.map(n => {
    return map[n]
  })
  const comb = (arr) => {
    const temp = []
    for (let i = 0, il = arr[0].length; i < il; i++) {
      for (let j = 0, jl = arr[1].length; j < jl; j++) {
        temp.push(arr[0][i] + arr[1][j])
      }
    }
    arr.splice(0, 2, temp)
    if (arr.length > 1) {
      comb(arr)
    }
    return arr[0]
  }
  return comb(code)
}
