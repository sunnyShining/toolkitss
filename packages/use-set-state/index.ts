import React from 'react'
import { toRawType, invariant, noop } from '@toolkitss/helper'
import { useUpdate } from '@toolkitss/custom-hook'

const { useRef, useEffect } = React

export default function useSetState<S = object>(
  initSate: S,
  initCallback?: Function
): [
    S,
    (
      nextSate: Partial<S> | ((prevState: S) => Partial<S>),
      callback?: Function
    ) => void
  ] {
  invariant(toRawType(initSate) === 'Object', 'initState should be a object')
  const state = useRef<S>(initSate)
  const updated = useRef<Function>(initCallback || noop)
  const update = useUpdate()
  /** make sure update */
  const setState = (
    nextState: Partial<S> | ((prevState: S) => Partial<S>),
    callback?: Function
  ) => {
    invariant(
      toRawType(nextState) === 'Object' || typeof nextState === 'function',
      'update state should be object or function'
    )
    const updateState =
      typeof nextState === 'function' ? nextState(state.current) : nextState
    Object.assign(state.current || {}, updateState)
    update()
    if (callback) {
      updated.current = callback
    }
  }
  useEffect(() => {
    if (updated.current !== noop && typeof updated.current === 'function') {
      updated.current(state)
    }
    return () => {
      /** pass */
    }
  }, [updated.current])
  return [state.current, setState]
}
