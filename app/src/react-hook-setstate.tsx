import React from 'react';
import useSetState from '@toolkitss/use-set-state'
import { Button, Input } from 'antd'

interface IState {
  age: number
  name: string
}

const SetStateTest: React.FC = () => {
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
  );
}

export default SetStateTest;
