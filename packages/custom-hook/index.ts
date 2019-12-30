import { useState, useCallback } from 'react'
import { uuid } from '@toolkitss/helper'

/** 类似class component forceUpdate */
export const useUpdate = () => {
  const [, setUpdate] = useState<string>('')
  const update = useCallback((id?: string) => {
    setUpdate(id || uuid())
  }, [])
  return update
}

/**
 * 随机生成key，便于销毁整个应用
 * @param id 初始化的key值
 */
export const useUpdateKey = (id?: string): [string, (id?: string) => void] => {
  const [key, setUpdateKey] = useState(id || uuid())
  const updateKey = useCallback((id?: string) => {
    setUpdateKey(id || uuid())
  }, [])
  return [key, updateKey]
}
