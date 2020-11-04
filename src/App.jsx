import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { Calendar, Staff } from './routes';
import { Button } from 'react-bootstrap'

const App = () => {
  const [path, setPath] = useState()

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  })

  useEffect(()=>{
    setPath((window.location.pathname.substring(1,window.location.pathname.length)))
  },[])

  return (
    <div className="App">
      <Router>
        <div className="side-bar">
          <Link to="/calendar"  onClick={()=>setPath('calendar')} className="title noselect">Project Name</Link>
          <div className="toolbar">
            <Link to="/calendar" onClick={()=>setPath('calendar')} style={{textDecoration:'none'}}>
              <Button variant={path==='calendar'?"primary":"light"} size="sm" block className="nofocus" style={path==='calendar'?{}:{backgroundColor:'white', border:'none'}}>
                <svg width="1rem" height="1rem" viewBox="0 0 16 16" className="bi bi-calendar2-date" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                  <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4zm3.945 8.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                </svg>
                Calendar
              </Button>
            </Link>
            <div style={{height:'10px'}}></div>
            <Link to="/staff" onClick={()=>setPath('staff')} style={{textDecoration:'none'}}>
              <Button variant={path==='staff'?"primary":"light"} size="sm" block className="nofocus" style={path==='staff'?{}:{backgroundColor:'white', border:'none'}}>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-people-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{marginLeft:'7px'}}>
                  <path fillRule="evenodd" d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                </svg>
                Staff
              </Button>
            </Link>
          </div>
        </div>
        <div className="top-bar"></div>
        <div className="content-container">
          <Switch>
            <Route exact path="/calendar"><Calendar /></Route>
            <Route exact path="/"><Redirect to="/calendar" /></Route>
            <Route exact path="/staff"><Staff /></Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;
