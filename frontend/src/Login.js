import './Login.css';
import React, { useState, useEffect } from 'react';
import Popup from './components/Popup.js';
import loginService from './services/login'
import Notification from './components/Notification';


function Login() {
  const [isOpen, setIsOpen] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername(username)
      setPassword('')
      window.location.replace("/main");

    } catch (error) {
      setIsOpen(true)
      if (error.response.request.status === 400) {
        setErrorMessage('Username does not exits. Try signing up?')
      } else if (error.response.request.status === 401) {
        setErrorMessage('Wrong credentials. Please try again')
      }
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    window.localStorage.setItem('USERNAME', username)
  }, [username])
   
  function signUp() {
    window.location.replace("/signup");
  }

  useEffect(() => {
    window.localStorage.setItem('USERNAME', username)
  }, [username])

  return (
    <div className = "body">
      <div className="heading">
        <h1>Welcome to NoteShare</h1>
      </div>

      <div className = "login">
        <h2>Login</h2>
      </div>

      <div className = "login-box">
      <Notification message={errorMessage} />
        <form method="login" onSubmit={handleLogin}>
        <div>
        <label>Username</label>
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        </div>
        <div>
          <label>Password</label>
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <div>
          <button class="submit-button" type="submit">Login</button>
        </div>
        </form>
      </div>

      <div className ="sign-up-btn">
        <text>Don't have an account yet?</text>
        <br />
        <button onClick={signUp}>Sign Up</button>
      </div>

      <Popup trigger={isOpen} setTrigger= {setIsOpen}>
        <h3>Login Failed</h3>
      </Popup>

    </div>
  );
}

export default Login;
