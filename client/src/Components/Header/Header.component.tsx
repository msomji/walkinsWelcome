import React from 'react'
import './Header.styles.scss'
import logo from '../../assets/images/logo.svg'
import googleIcon from '../../assets/images/googleIcon.png'
import divider from '../../assets/images/divider.svg'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useDispatch } from 'react-redux'
import { userLoginSuccess, userLogoutSuccess } from '../../store/user/UserActions'
import { UserState, UserObject } from '../../store/user/userReducer'




export const Header: React.FC<UserState> = ({ isLoggedIn, user}) => {
  const dispatch = useDispatch()

  const onLogoutSucess = () => {
    dispatch(userLogoutSuccess())
    
  }
  const onLoginSucess = ({profileObj}: any) => {
    const user: UserObject = {
      name: profileObj.name,
      imageUrl: profileObj.imageUrl,
      email: profileObj.email,
      googleId: profileObj.googleId
    }
    console.log(profileObj);
    dispatch(userLoginSuccess(user))
  }

  const onLoginFail = ({error}: any) => {
    console.log("Login Failed", error);
  }
  
  
  return (
  <section id="headerComponent" className="hero">
    <nav>

      <div id="logoContainer">
        <img src={logo} alt="logo" />
      </div>
      <div id="navLinks">
        <ul>
          <li className="has-text-weight-semibold"><a href="#about">About</a></li>
          <li className="has-text-weight-semibold"><a href="#lobby">Lobby</a></li>
          {console.log(user)}
    {isLoggedIn ? 
    <GoogleLogout
    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
    onLogoutSuccess={onLogoutSucess}
    render={renderProps => (
      <li className="has-text-weight-semibold" onClick={renderProps.onClick}><img id="user-image" src={user?.imageUrl} alt="user image" /> Hello, {user?.name}</li>
    )}
  >
  </GoogleLogout>
   :
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
            render={renderProps => (
              <li className="has-text-weight-semibold" onClick={renderProps.onClick}><img id="google-logo" src={googleIcon} alt="google Login icong" />Login</li>
            )}
            onSuccess={onLoginSucess}
            onFailure={onLoginFail}
            isSignedIn={true}
            cookiePolicy={'single_host_origin'}
          />
            }
        </ul>
      </div>
    </nav>
    <div className="divider">
      <img src={divider} alt="" />
    </div>
  </section>
)}
