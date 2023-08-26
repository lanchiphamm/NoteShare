import './App.css';
import React, { useState } from 'react';
import ReactModal from 'react-modal';

function App() {
  var username = "";
  var password = "";
  const [isOpen, setIsOpen] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    const data =  Object.fromEntries(formData.entries());
    username = data.username;
    password = data.password;
    var userCorrect = checkPassword(username, password);
    if (userCorrect) {

    } else {

    }
  }

  function checkPassword(u, p) {
    return false;
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

    </div>
  );
}

export default App;
