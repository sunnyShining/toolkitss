# @toolkitss/custom-hook

> some useful custom hook

# Installation

## Using npm:

```zsh
$ npm i -g npm
$ npm i --save @toolkitss/custom-hook
```

## Using yarn:

```zsh
$ yarn add @toolkitss/custom-hook
```

## Usage

```tsx
import React, { useRef } from 'react'
import { useSetState, useForceUpdate, useErrorBoundary } from '@toolkitss/custom-hook'
import { Input, Button } from 'antd'

interface IState {
  age: number
  name: string
}

export const SetState: React.FC = () => {
  /** init setState */
  const [state, setState] = useSetState<IState>({
    name: 'sunny',
    age: 18,
  }, () => {
    console.log('init')
  })
  /** 受控组件 */
  const edit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setState({
      name: val
    }, () => {
      /** 更新结束后回调，可不传 */
      console.log('updated')
    })
  }
  /** 通过函数去更新state */
  const update = () => {
    setState((prevState) => {
      return {
        age: prevState.age + 1
      }
    /** 更新结束后回调 */
    }, () => {
      console.log('updated2222')
    })
  }
  return (
    <div className="setState">
      <Input value={state.name} onChange={edit} />
      <span>{state.name}</span>
      <Button onClick={() => setState({age: state.age + 1})}>add age</Button>
      <span>{state.age}</span>
      <Button onClick={() => setState({
        name: 'sunny1',
        age: 30
      })}>update all</Button>
      <Button onClick={update}>function update</Button>
    </div>
  )
}

export const ForceUpdate: React.FC = () => {
  const number = useRef<number>(18)
  const [, forceUpdate] = useForceUpdate()

  const add = () => {
    number.current = ++number.current
  }
  // 测试强制更新
  const testForceUpdate = () => {
    forceUpdate()
  }
  return (
    <div className="forUpdate">
      <span>{number.current}</span>
      <Button onClick={add}>add</Button>
      <Button onClick={testForceUpdate}>force update</Button>
    </div>
  )
}

// @ts-ignore
const ErrorC = () => <Button>{a}</Button>

export const ErrorBoundaryTest: React.FC = () => {
  const { captureError, ErrorBoundary } = useErrorBoundary()
  console.log(captureError)
  return (
    <div>
      <ErrorBoundary
        renderError={props => {
          console.log('renderError', props)
          return <div>render Error</div>
        }}
      >
        <ErrorC />
      </ErrorBoundary>
    </div>
  )
}

```
