import Main from './Main';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';
import Result from './Result';
import { Thing } from './Main';
import React, { createContext } from 'react';

const Store = createContext();

function App() {

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
    case "/result":
      component = <Result />
      break
  }

  return (
    <div>
      {component}
    </div>
  );
}

export default App;
