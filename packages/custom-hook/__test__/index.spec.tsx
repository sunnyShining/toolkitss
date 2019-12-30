import React from 'react'
import { shallow } from 'enzyme'
import { useUpdateKey } from '../index'

interface IState {
  age: number
  name: string
}
const App: React.FC = () => {
  /** init setState */
  const [key, updateKey] = useUpdateKey()
  return (
    <div>
      <button
        className="change"
        onClick={() => updateKey()}
      >
        change
      </button>
      <span className="name">{key}</span>
      <button
        className="change2"
        onClick={() =>updateKey('me')}
      >
        change2
      </button>
      <span className="age">{key}</span>
    </div>
  )
}

describe('use-set-state', () => {
  it('render 1 child', () => {
    shallow(<App />)
  })
})
