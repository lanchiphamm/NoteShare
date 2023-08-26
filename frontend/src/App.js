import Main from './Main';
import Login from './Login';
import Profile from './Profile';
import SignUp from './SignUp';
import Test from './Test';

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
    case "/test":
      component = <Test />
      break
  }

  return (
    <div>
      {component}
    </div>
  );
}

export default App;
