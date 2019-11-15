import React from 'react';
import { Route, NavLink } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Jokes from './components/Jokes';

function App() {
  
  return (
    <div className="App">
      <NavLink to='/' >Register</NavLink>
      <NavLink to='/login' >Login</NavLink>
      <NavLink to='/jokes' >GetJokes</NavLink>

      <Route exact path='/' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/jokes' component={Jokes} />
    </div>
  );
}





export default App;
