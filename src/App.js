import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from './components/chat'
import Index from './views/home'
import About from './views/about'


export default () => (
  <Router>
      <div>
        <Route path="/chat" exact component={Chat} />
        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
      </div>
    </Router>
)

