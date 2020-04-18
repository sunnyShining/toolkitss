import { useState, useCallback } from 'react'
import { uuid } from '@toolkitss/helper'

/**
 * 类似class component forceUpdate
 * @param id 初始化的key值
 */
export const useForceUpdate = (id?: string): [string, (id?: string) => void] => {
  const [updateId, setUpdateId] = useState(id || uuid())
  const forceUpdate = useCallback((id?: string) => {
    setUpdateId(id || uuid())
  }, [])
  return [updateId, forceUpdate]
}
