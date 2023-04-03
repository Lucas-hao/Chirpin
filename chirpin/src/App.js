import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet, useLocation, NavLink } from 'react-router-dom';
import { getLoginInfo } from './Login';
import { logout } from './Login';
import Login from './Login';
import Main from './Main';
import TweetDetail from './TweetDetail';
import { Notification, SingleNotification } from './Notification';
import Search from './Search'
import { Admin } from './Admin';
import { Profile } from './Profile';

import 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./css/App.css"
import SearchTweet from './SearchTweet';
import SearchUser from './SearchUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faHome, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';


export const BACK_END = 'http://localhost:8000/'

function PrivateRoute() {
  const auth = getLoginInfo();
  return auth ? <Outlet /> : <Navigate to='/login' />;
}

function LoginRoute({ ifLogout, onChangeLogin }) {
  useEffect(() => {
    if (ifLogout) { console.log("Log out"); logout(); onChangeLogin(); }
  });
  const auth = getLoginInfo();
  return !auth ? <Outlet /> : <Navigate to='/' />;
}



function App() {
  const [islogin, setLogin] = useState(getLoginInfo() ? getLoginInfo()['uid'] : false);
  const [mode, setMode] = useState(getLoginInfo() ? getLoginInfo()['mode'] : false);
  // const routeLocation = useLocation();

  const switchloginstate = () => {
    let loginfo = getLoginInfo();
    console.log("login State: " + (loginfo ? loginfo['uid'] : "not login"));
    if (getLoginInfo()) { setLogin(loginfo['uid']); setMode(loginfo['mode']) }
    else { setLogin(false); setMode(false) }
  };

  return (
    <>
      <main className="container-fluid">
        <BrowserRouter>
          <div className="row" style={{ height: "100vh" }}>
            <div className="col-md-2 p-3 text-bg-dark">
              <div className="d-flex justify-content-center text-center">
                <img className="w-75 d-flex justify-content-center" src={[require('./img/logo.png')]} alt='logo.png'></img>
              </div>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link text-white" activeClassName="active">
                    <span><FontAwesomeIcon icon={faHome} className='me-2' />Home</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/search" className="nav-link text-white" activeClassName="active">
                    <span><FontAwesomeIcon icon={faSearch} className='me-2' />Search</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/notification" className="nav-link text-white" activeClassName="active">
                    <span><FontAwesomeIcon icon={faBell} className='me-2' />Notification</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myprofile" className="nav-link text-white" activeClassName="active">
                    <span><FontAwesomeIcon icon={faUser} className='me-2' />Profile</span>
                  </NavLink>
                </li>
              </ul>
              <hr />
              <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                  <strong>more</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li><a className="dropdown-item" href="/login">Sign out</a></li>
                </ul>
              </div>
            </div>
            <div className="col-md-10 p-3 bg-light">
              <Routes>
                {/* <Route path='/' element={<PrivateRoute />}> */}
                <Route path='/' element={<Main />} />
                {/* </Route> */}
                {/* <Route path='/login' element={<LoginRoute ifLogout={islogin} onChangeLogin={switchloginstate} />}> */}
                <Route path='/login' element={<Login onChangeLogin={switchloginstate} />} />
                {/* </Route> */}
                <Route path='/search' element={<Search />} />
                <Route path="/:username" element={<Profile />} />
                <Route path='/:username/followings' element={<Main />} />
                <Route path='/:username/followers' element={<Main />} />
                <Route path='/searchuser/:username' element={<SearchUser />} />
                <Route path='/searchtag/:username' element={<SearchTweet />} />
                <Route path='/tweet/:tweetid' element={<TweetDetail />} />
                <Route path='/admin' element={<Admin />} />

                {/* <Route path='/:username' element={<PrivateRoute />}>
                <Route path="/:username" element={<Profile username={islogin}/>} /> 
              </Route>
              <Route path='/adm' element={<PrivateRoute />}>
                <Route path='/adm' element={<Adm islogin={islogin}></Adm>} />
              </Route>*/}
                {/* <Route path='/notification' element={<PrivateRoute />}> */}
                <Route path='/notification' element={<Notification islogin={islogin}></Notification>} />
                {/* </Route>  */}
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
