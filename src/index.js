import React from 'react'
import { render } from 'react-dom'

import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store, { history } from './store/store'

import './index.css'
import App from './App'
import Search from './components/Search'
import CitiesList from './components/CitiesList'

const target = document.getElementById("root")

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/search/:id" component={Search} />
        <Route path="/list" component={CitiesList} />
        <Route path="*" render={() => (<h1>PAGE NOT FOUND</h1>)} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  target
)
