import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './App';
import Chat from './components/chat'
import Index from './views/home'
import Auth from './Auth';

const Router = (props) => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Index}/>
      <PrivateRoute path="/chat" component={Chat} />
    </Switch>
  </BrowserRouter>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.getAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      )
    }
  />
);
export default Router;
