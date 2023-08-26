import './App.css';
import React, { useState } from 'react';
import Popup from './components/Popup.js';


function App() {
  var username = "";
  var password = "";
  const [isOpen, setIsOpen] = useState(false);



  function newPage() {

  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    const data =  Object.fromEntries(formData.entries());
    username = data.username;
    password = data.password;
    var userCorrect = checkPassword(username, password);
    
    if (userCorrect) {
      newPage();

    } else {
      setIsOpen(true);
    }
  }

  function checkPassword(u, p) {
    return true;
  }
   

  return (
    <div className = "body">
      <div className="heading">
        <h1>Welcome to NoteShare</h1>
      </div>

      <div className = "login">
        <h2>Login</h2>
      </div>

      <div className = "login-box">
        <form method="login" onSubmit={handleSubmit}>
          <label>
            Username: <input name="username" />
          </label>
          <br />
          <label>
            Password: <input name="password" />
          </label>
          <br />
          <button type="submit">Log in</button>
        </form>
      </div>

      <Popup trigger={isOpen} setTrigger= {setIsOpen}>
        <h3>Login Failed</h3>
      </Popup>

    </div>
  );
}

export default App;
