import { reverseWords, countBinarySubstrings, letterCombinations } from '../index'

test('reverseWords: Let\'s take LeetCode contest => s\'teL ekat edoCteeL tsetnoc', () => {
  expect(reverseWords('Let\'s take LeetCode contest')).toBe('s\'teL ekat edoCteeL tsetnoc')
})

test('countBinarySubstrings: 00110011 => ["0011", "01", "1100", "10", "0011", "01"]', () => {
  expect(countBinarySubstrings('00110011')).toEqual(['0011', '01', '1100', '10', '0011', '01'])
})

describe('letterCombinations', () => {
  it('letterCombinations: 23 => ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]', () => {
    expect(letterCombinations('23')).toEqual(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'])
  })
})
