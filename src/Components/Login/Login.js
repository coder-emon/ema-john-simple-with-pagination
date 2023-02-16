import React from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";
import "./Login.css";
const Login = () => {
  const { SignIn, setUser, googleSignIn, setLoader } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    SignIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
        navigate(from, { replace: true });
        form.reset();
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
        form.reset();
      });
  };
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(from, { replace: true });
        setLoader(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSignIn} className="form">
        <h2>Login</h2>
        <div className="form-item">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="form-item">
          <button type="submit" className="login-btn">
            Login
          </button>
        </div>
        <div className="form-item">
          <button onClick={handleGoogleSignIn} className="login-btn">
            Sign In With Google
          </button>
        </div>
        <p>
          New to Ema-john? <Link to="/signup">Register Now</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
