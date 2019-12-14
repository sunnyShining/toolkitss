import { toRawType, uuid, augment, isFunction, getSearchParam } from '../index'

describe('toRawType', () => {
  it('[1, 2, 3] is Array', () => {
    expect(toRawType([1, 2, 3])).toBe('Array')
  })
  it('2 is Number', () => {
    expect(toRawType(2)).toBe('Number')
  })
  it('undefined is Undefined', () => {
    expect(toRawType(undefined)).toBe('Undefined')
  })
})

test('function a() {} is function ', () => {
  expect(
    isFunction(function a() {
      /** pass */
    })
  ).toBe(true)
})

test('uuid is not eq', () => {
  expect(uuid() === uuid()).toBe(false)
})

test('https://www.baidu.com?name=sunny&age=18', () => {
  const url = 'https://www.baidu.com?name=sunny&age=18'
  expect(getSearchParam('name', url)).toEqual('sunny')
})

describe('augment function', () => {
  it('function a add a function', () => {
    function a() {
      /** pass */
    }
    const b = {
      a: 1
    }
    augment(a, b)
    // @ts-ignore
    expect(a.prototype.a).toBe(1)
  })
})
