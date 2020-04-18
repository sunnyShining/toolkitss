import React from 'react'
import { shallow } from 'enzyme'
import { useForceUpdate } from '../index'

const App: React.FC = () => {
  /** init setState */
  const [id, forceUpdate] = useForceUpdate()
  return (
    <div>
      <button className="change" onClick={() => forceUpdate()}>
        change
      </button>
      <span className="name">{id}</span>
      <button className="change2" onClick={() => forceUpdate('me')}>
        change2
      </button>
      <span className="age">{id}</span>
    </div>
  )
}

describe('use-set-state', () => {
  it('render 1 child', () => {
    shallow(<App />)
  })
})
