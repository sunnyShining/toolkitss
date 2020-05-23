import { useReducer, useRef, useEffect, useCallback  } from 'react'
import { toRawType, invariant } from '@toolkitss/helper'

function setStateReducer<S>(
  state: S,
  action: {
    type: 'update'
    nextState: Partial<S>
  }
) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        ...action.nextState
      }
    default:
      return state
  }
}
const logger = (reducer) => {
  // @ts-ignore
  if (process.env.NODE_ENV === 'development') {
    return (state, action) => {
      console.log('%cPrevious State:', 'color: #9E9E9E; font-weight: 700;', state)
      console.log('%cAction:', 'color: #00A7F7; font-weight: 700;', action)
      const result = reducer(state,action)
      console.log('%cNext State:', 'color: #47B04B; font-weight: 700;', result)
      return result
    }
  }
  return reducer
}
// can use useReducer do it
export function useSetState<S = object>(
  initSate: S,
  initCallback?: (state: S) => any
): [
    S,
    (
      nextSate: Partial<S> | ((prevState: S) => Partial<S>),
      callback?: (state: S) => any
    ) => void
  ] {
  // @ts-ignore
  invariant(toRawType(initSate) === 'Object', 'initState should be a object')
  const [state, dispatch] = useReducer<(state: S, action: {type: 'update'; nextState: Partial<S>;}) => S>(logger(setStateReducer), initSate)
  const updated = useRef<((state: S) => any) | undefined>(initCallback)
  /** make sure update */
  const setState = useCallback((
    nextState: Partial<S> | ((prevState: S) => Partial<S>),
    callback?: (state: S) => any
  ) => {
    // @ts-ignore
    invariant(
      toRawType(nextState) === 'Object' || typeof nextState === 'function',
      'update state should be object or function'
    )
    const updateState = typeof nextState === 'function' ? nextState(state) : nextState
    dispatch({
      type: 'update',
      nextState: updateState
    })
    if (callback) { // 存储callback
      updated.current = callback
    }
  }, [])
  useEffect(() => {
    if (typeof updated.current === 'function') {
      updated.current(state)
    }
  }, [updated.current])
  return [state, setState]
}

// can use useReducer do it
// export function useSetState<S = object>(
//   initSate: S,
//   initCallback?: Function
// ): [
//     S,
//     (
//       nextSate: Partial<S> | ((prevState: S) => Partial<S>),
//       callback?: Function
//     ) => void
//   ] {
//   // @ts-ignore
//   invariant(toRawType(initSate) === 'Object', 'initState should be a object')
//   const state = useRef<S>(initSate) // 存放state
//   const updated = useRef<Function>(initCallback || noop)
//   const [, forceUpdate] = useForceUpdate() // 强制更新
//   /** make sure update */
//   const setState = useCallback((
//     nextState: Partial<S> | ((prevState: S) => Partial<S>),
//     callback?: Function
//   ) => {
//     // @ts-ignore
//     invariant(
//       toRawType(nextState) === 'Object' || typeof nextState === 'function',
//       'update state should be object or function'
//     )
//     const updateState =
//       typeof nextState === 'function' ? nextState(state.current) : nextState
//     Object.assign(state.current || {}, updateState) // 合并值
//     forceUpdate() // 强制更新props
//     if (callback) { // 存储callback
//       updated.current = callback
//     }
//   }, [])
//   useEffect(() => {
//     if (updated.current !== noop && typeof updated.current === 'function') {
//       updated.current(state.current)
//     }
//     return noop
//   }, [updated.current])
//   return [state.current, setState]
// }
