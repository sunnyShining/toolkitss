import React from 'react'
import { shallow } from 'enzyme'
import { useSetState } from '../index'

interface IState {
  age: number
  name: string
}
const App: React.FC = () => {
  /** init setState */
  const [state, setState] = useSetState<IState>(
    {
      name: 'hello',
      age: 18
    },
    () => {
      console.log('init')
    }
  )
  return (
    <div>
      <button
        className="change"
        onClick={() =>
          setState({
            name: state.name === 'hello' ? 'world' : 'hello'
          })
        }
      >
        change
      </button>
      <span className="name">{state.name}</span>
      <button
        className="change2"
        onClick={() =>
          setState({
            name: state.name === 'hello' ? 'world' : 'hello',
            age: state.age + 1
          })
        }
      >
        change2
      </button>
      <span className="age">{state.age}</span>
    </div>
  )
}

describe('use-set-state', () => {
  it('render 1 child', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.name').text()).toBe('hello')
    wrapper.find('.change').simulate('click')
    expect(wrapper.find('.name').text()).toBe('world')
    wrapper.find('.change').simulate('click')
    expect(wrapper.find('.name').text()).toBe('hello')
    expect(wrapper.find('.age').text()).toBe('18')
    wrapper.find('.change2').simulate('click')
    expect(wrapper.find('.name').text()).toBe('world')
    expect(wrapper.find('.age').text()).toBe('19')
    wrapper.find('.change2').simulate('click')
    expect(wrapper.find('.name').text()).toBe('hello')
    expect(wrapper.find('.age').text()).toBe('20')
  })
})
