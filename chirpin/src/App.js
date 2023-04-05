import * as React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet, NavLink } from 'react-router-dom';
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
  const [isLogin, setLogin] = useState(getLoginInfo() ? getLoginInfo()['username'] : false);
  const [mode, setMode] = useState(getLoginInfo() ? getLoginInfo()['mode'] : false);

  const switchLoginState = () => {
    let logInfo = getLoginInfo();
    console.log("login State: " + (logInfo ? logInfo['username'] : "not login"));
    if (getLoginInfo()) { setLogin(logInfo['username']); setMode(logInfo['mode']) }
    else { setLogin(false); setMode(false) }
  };

  const changePwd = () =>{
    let ousername = document.getElementById("originalusername");
    let newpwd = document.getElementById("changedpwd");
    const uesrinfo = {
      uername:ousername,
      newpwd:newpwd
    };
  }

  return (
    <>
      <main className="container-fluid">
        <BrowserRouter>
          <div className="row"  style={{height: "100vh"}}>
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
                  {mode=='user'&& <NavLink to={"/"+getLoginInfo()['username']} className="nav-link text-white" activeClassName="active">
                    <span><FontAwesomeIcon icon={faUser} className='me-2' />Profile</span>
                  </NavLink>}
                </li>
              </ul>
              <hr />
              <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                  <strong>setting</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                  <li><a className="dropdown-item" href="/login">Sign out</a></li> 
                  <li><a type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#changepasswordForm" data-bs-whatever="@mdo" >Change Password</a></li>                  
                </ul>  
              </div>
            </div>
            <div className="col-md-10 p-3 bg-light overflow-auto">
              <Routes>
                {/* <Route path='/' element={<PrivateRoute />}> */}
                <Route path='/' element={<Main />} />
                {/* </Route> */}
                {/* <Route path='/login' element={<LoginRoute ifLogout={islogin} onChangeLogin={switchloginstate} />}> */}
                <Route path='/login' element={<Login onChangeLogin={switchLoginState} />} />
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
                <Route path='/notification' element={<Notification islogin={isLogin}></Notification>} />
                {/* </Route>  */}
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </main>

      {/* change password form*/}
      <div className="modal fade" id="changepasswordForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <div class="mb-3">
                          <label for="name" class="col-form-label"> Input your username: </label>
                          <input type="text" class="form-control" id="originalusername" />
                          <label for="name" class="col-form-label"> Input New Password: </label>
                          <input type="text" class="form-control" id="changedpwd" />
                          </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> Cancel </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"> Submit </button>
                        </div>
                    </div>
                </div>
            </div>
    </>
  );
}

export default App;
