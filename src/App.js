import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Product from "./ProductList";
import DetailPage from "./DetailPage";
function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route component={Product} path="/" exact />
        <Route component={DetailPage} path="/detail/:id" exact />
      </Switch>
    
    </Router>
     
           
    </div>
  );
}

export default App;
