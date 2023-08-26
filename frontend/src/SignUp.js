import './SignUp.css';
import loginService from './services/login'
import Notification from './components/Notification';

function SignUp () {
    var username = "";
    var password = "";

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
      
        const data =  Object.fromEntries(formData.entries());
        username = data.username;
        password = data.password;

        window.location.replace("/");
    }

    return (
        <>
        <div className = "signup">
            <h2>SignUp Page</h2>
        </div>
        

        <div className = "signup-box">
            <form method="signup" onSubmit={handleSubmit}>
            <label>
                Username: <input name="username" />
            </label>
            <br />
            <label>
                Password: <input name="password" />
            </label>
            <br />
            <button type="submit">Sign up</button>
            </form>
      </div>
        </>
    );
}

export default SignUp;