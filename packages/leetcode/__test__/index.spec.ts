import { reverseWords, countBinarySubstrings } from '../index'

test('reverseWords: Let\'s take LeetCode contest => s\'teL ekat edoCteeL tsetnoc', () => {
  expect(reverseWords('Let\'s take LeetCode contest')).toBe('s\'teL ekat edoCteeL tsetnoc')
})

test('countBinarySubstrings: 00110011 => ["0011", "01", "1100", "10", "0011", "01"]', () => {
  expect(countBinarySubstrings('00110011')).toEqual(['0011', '01', '1100', '10', '0011', '01'])
})
