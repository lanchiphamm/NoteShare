import './Login.css';
import React, { useState, useEffect } from 'react';
import Popup from './components/Popup.js';
import loginService from './services/login'
import Notification from './components/Notification';


function Login() {
  // var username = "";
  // var password = "";
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

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   const form = e.target;
  //   const formData = new FormData(form);
  
  //   const data =  Object.fromEntries(formData.entries());
  //   username = data.username;
  //   password = data.password;
  //   console.log(username);
  //   var userCorrect = checkPassword(username, password);
    
  //   if (userCorrect) {
  //     window.location.replace("/main");
  //   } else {
  //     setIsOpen(true);
  //   }
  // }

  // function checkPassword(u, p) {
  //   return true;
  // }
   
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

      <Notification message={errorMessage} />

      <div className = "login-box">
        <form method="login" onSubmit={handleSubmit}>
        <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">Login</button>
        </form>
      </div>

      <div className ="sign-up-btn">
        <button onClick={signUp}>or Sign Up</button>
      </div>

      {/* <Popup trigger={isOpen} setTrigger= {setIsOpen}>
        <h3>Login Failed</h3>
      </Popup> */}

    </div>
  );
}

export default Login;
