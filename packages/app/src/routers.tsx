import React from 'react'
import { Route, HashRouter as Router, Switch, Link } from 'react-router-dom'
import { SetState, ForceUpdate, ErrorBoundaryTest } from './custom-hook'

const routerConfig = [
  {
    path: '/setstate',
    exact: true,
    name: 'setState',
    component: SetState
  },
  {
    path: '/forceUpdate',
    exact: true,
    name: 'forceUpdate',
    component: ForceUpdate
  },
  {
    path: '/errorBoundary',
    exact: true,
    name: 'errorBoundary',
    component: ErrorBoundaryTest
  }
]

export const Nav: React.FC = () => {
  return (
    <div>
      {
        routerConfig.map(r => {
          return <p key={r.name}><Link to={r.path}>{r.name}</Link></p>
        })
      }
    </div>
  )
}

export const Routers = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        {
          routerConfig.map(r => <Route key={r.name} exact={r.exact} path={r.path} component={r.component} />)
        }
        <Route exact path='/nav' component={Nav} />
      </Switch>
    </Router>
  )
}

