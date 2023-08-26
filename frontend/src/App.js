import Main from './Main';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';
import Test from './Test';
import Result from './Result';
import { Thing } from './Main';
import React, { createContext } from 'react';

/* google sign in imports */
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
/* end of google sign in imports */

const Store = createContext();

function App() {
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("googleSignInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("googleSignInDiv").hidden = false;
  }

  /* google sign in code */
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
  }, []);

  let component
  switch (window.location.pathname) {
    case "/":
      component = <Login />
      break
    case "/main":
      component = <Main />
      break
    case "/profile":
      component = <Profile />
      break
    case "/signup":
      component = <SignUp />
      break
    case "/test":
      component = <Test />
    case "/result":
      component = <Result />
      break
  }

  return (
    <div>
      {component}
      <div id="googleSignInDiv"></div>
      { Object.keys(user).length != 0 &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
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
