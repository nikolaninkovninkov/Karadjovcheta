import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './auth/Register';
function App() {
  return (
    <div className="app">
      <Router>
        <Route path="/register" component={Register} exact></Route>
      </Router>
    </div>
  );
}

export default App;
