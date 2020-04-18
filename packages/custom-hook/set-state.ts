import React from 'react'
import { toRawType, invariant, noop } from '@toolkitss/helper'
import { useForceUpdate } from './force-update'

const { useRef, useEffect, useCallback } = React

export function useSetState<S = object>(
  initSate: S,
  initCallback?: Function
): [
    S,
    (
      nextSate: Partial<S> | ((prevState: S) => Partial<S>),
      callback?: Function
    ) => void
  ] {
  // @ts-ignore
  invariant(toRawType(initSate) === 'Object', 'initState should be a object')
  const state = useRef<S>(initSate) // 存放state
  const updated = useRef<Function>(initCallback || noop)
  const [, forceUpdate] = useForceUpdate() // 强制更新
  /** make sure update */
  const setState = useCallback((
    nextState: Partial<S> | ((prevState: S) => Partial<S>),
    callback?: Function
  ) => {
    // @ts-ignore
    invariant(
      toRawType(nextState) === 'Object' || typeof nextState === 'function',
      'update state should be object or function'
    )
    const updateState =
      typeof nextState === 'function' ? nextState(state.current) : nextState
    Object.assign(state.current || {}, updateState) // 合并值
    forceUpdate() // 强制更新props
    if (callback) { // 存储callback
      updated.current = callback
    }
  }, [])
  useEffect(() => {
    if (updated.current !== noop && typeof updated.current === 'function') {
      updated.current(state.current)
    }
    return noop
  }, [updated.current])
  return [state.current, setState]
}


