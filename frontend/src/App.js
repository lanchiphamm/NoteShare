import './App.css';
import Main from './pages/Main';
import Login from './Login';


function App() {

  let component
  switch (window.location.pathname) {
    case "/":
      component = <Login />
      break
    case "/main":
      component = <Main />
      break
  }

  return (
    <div>
      {component}
    </div>
  );
}

export default App;
