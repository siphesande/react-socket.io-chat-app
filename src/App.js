import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from './components/chat'
import Index from './views/home'



export default () => (
  <Router>
      <div>
        <Route path="/chat" exact component={Chat} />
        <Route path="/" exact component={Index} />
        
      </div>
    </Router>
)

