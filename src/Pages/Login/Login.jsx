import React, { useState } from "react";
import "./Login.css";
import logoo from "../../assets/logo.png";
import { login, signup } from "../../Firebase";
import netfilx_spinner from "../../assets/netflix_spinner.gif";

function Login() {
  const [signState, setSignState] = useState("Log in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Log in") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netfilx_spinner} alt="" />
    </div>
  ) : (
    <div className="login">
      <img src={logoo} className="login-logo" alt="" />

      <div className="login-form">
        <h1>{signState}</h1>

        <form>
          {signState === "Sign up" ? (
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Your name"
            />
          ) : (
            <></>
          )}

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />

          <button onClick={user_auth} type="submit">
            {signState}
          </button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className="form-switch">
          {signState === "Log in" ? (
            <p>
              New to Netfilx ?{" "}
              <span
                onClick={() => {
                  setSignState("Sign up");
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have account ?{" "}
              <span
                onClick={() => {
                  setSignState("Log in");
                }}
              >
                Log in{" "}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
