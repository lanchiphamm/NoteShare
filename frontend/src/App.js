import './App.css';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";


function App() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID tocken: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("googleSignInDiv").hidden = true;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "524996974286-ep5b5tvtp4p0jo1avjhut9lul9p0drkl.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large"}
    );

    google.accounts.id.prompt();
  }, [])

  function handleSignOut(event) {
    setUser({});
    document.getElementById("googleSignInDiv").hidden = false;
  }


  var username = "";
  var password = "";

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
  
    const data =  Object.fromEntries(formData.entries());
    console.log(data);
    username = data.username;
    password = data.password;
    console.log(username);
    console.log(password);

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

      <div id="googleSignInDiv"></div>
      { Object.keys(user).length != 0 &&
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }

      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
