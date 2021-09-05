import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/global/Header/Header'
import Grid from '@material-ui/core/Grid';
import PageRender from './PageRender'

import { refreshToken } from './redux/actions/authAction'
import { useDispatch } from 'react-redux';

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  return (
    <Router>
      <Header />
      <Grid container style={{ padding: '0 40px' }}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path="/" component={PageRender} />
            <Route exact path="/:page" component={PageRender} />
            <Route exact path="/:page/:slug" component={PageRender} />
          </Switch>
        </Grid>
      </Grid>
    </Router>
  )
}

export default App
