import React, {useState, useEffect} from 'react'
import { Auth } from './pls/auth/Auth'
import {BrowserRouter as Router , Routes, Route, Link} from 'react-router-dom';

import {Provider as StoreProvider} from "react-redux";
import store from "./store.js"; 
import Login from './pls/Login'
import Display from './pls/display/Display'
import DisplayN from './pls/display/DisplayNj'
import Contained from './pls/Contained';
import ContainedNew from './pls/ContainedNew';
import Dashboard from './pls/Dashboard';
import Users from './pls/pages/users/Users'
import Groups from './pls/pages/groups/Groups'
import Screens from './pls/pages/screens/Screen'

function App() {
  const [showProcessing, setShowProcessing] = useState(false)
  return (
    <div>
         <Router>
            <StoreProvider store = {store} >
              <Routes>
                <Route path="/displayd" element={<DisplayN/>} />
                  <Route path="/display" element={<Display/>} />
                  <Route path="/" element={<Auth><Contained><Dashboard showProcessing={showProcessing} setShowProcessing={setShowProcessing} /></Contained></Auth>} />
                  <Route path="/login" element={<Login showProcessing={showProcessing} setShowProcessing={setShowProcessing} />} />

                  <Route path="/box/users" element={<Auth><Contained><Users showProcessing={showProcessing} setShowProcessing={setShowProcessing} /></Contained></Auth>} />
                  <Route path="/box/groups" element={<Auth><Contained><Groups showProcessing={showProcessing} setShowProcessing={setShowProcessing} /></Contained></Auth>} />
                  <Route path="/box/screens" element={<Auth><Contained><Screens showProcessing={showProcessing} setShowProcessing={setShowProcessing} /></Contained></Auth>} />
                  <Route path="/box/preview" element={<Auth><Contained><Dashboard showProcessing={showProcessing} setShowProcessing={setShowProcessing} /></Contained></Auth>} />
              </Routes>
            </StoreProvider>
          </Router>  
      
    </div>
  );
}

export default App;
