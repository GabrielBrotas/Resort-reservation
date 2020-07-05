import React from 'react';
import "./App.css"

import {Route, Switch} from 'react-router-dom'
// componentes
import Navbar from './componentes/Navbar'
// pages
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'

function App() {
  return (
    
    <>
    {/* Navbar vai ficar em todas as screens */}
    <Navbar />

    {/* O Switch serve para caso a url não esteja em nenhuma das Route ela vai renderizar a Error */}
    <Switch>
      <Route path="/rooms/:slug" component={SingleRoom} />
      <Route path="/rooms" component={Rooms} />
      <Route exact path="/" component={Home} />

      <Route component={Error}/>
    </Switch>
      
    </>
  );
}

export default App;
