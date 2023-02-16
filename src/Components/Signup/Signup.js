import React from "react";
import { useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";

const Signup = () => {
  const { createUser } = useContext(AuthContext);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    // console.log("Clicked ", email, password, confirm);
    if (password !== confirm) {
      alert("password is not matched");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <form onSubmit={handleSignUp} className="form">
        <h2>Register</h2>
        <div className="form-item">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="form-item">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" id="confirm" />
        </div>
        <div className="form-item">
          <button type="submit" className="login-btn">
            Register
          </button>
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
