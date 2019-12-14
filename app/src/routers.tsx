import React from 'react';
import { Route, HashRouter as Router, Switch, Redirect, Link } from 'react-router-dom';
import ReactHookSetState from './react-hook-setstate'

const routerCfg = [
  {
    path: '/setstate',
    exact: true,
    name: 'react-hook-setstate',
    component: ReactHookSetState
  }
]

export const Nav: React.FC = () => {
  return (
    <div>
      {
        routerCfg.map(r => {
          return <p key={r.name}><Link to={r.path}>{r.name}</Link></p>
        })
      }
    </div>
  )
}

export const Routers = () => {
	return (
		<Router>
			<Switch>
        {
          routerCfg.map(r => <Route key={r.name} exact={r.exact} path={r.path} component={r.component} />)
        }
        <Route exact path='/nav' component={Nav} />
				<Redirect from='/' to='/nav' />
			</Switch>
		</Router>
	)
}

