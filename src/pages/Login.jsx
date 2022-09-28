import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Icon } from '@iconify/react';
function Login() {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;


    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      
    } catch (err) {
      setErr(true);
    }
  };


  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Rezadri Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Password..." />
         
          <button>Sign in</button>
          {err && <span>Something went error</span>}
        </form>
        <p>You don't have an account? <Link className="link" to="/register">Register</Link></p>
        <div className="redesLaunch">
        <a href='https://github.com/adrianpg10'>
          <Icon icon="akar-icons:github-fill" className="redesLaunch"/></a>
        <a href='https://www.linkedin.com/in/adrian-perez-gomez/'>
          <Icon icon="entypo-social:linkedin-with-circle" className="redesLaunch"/></a>
        </div>
      </div>
    </div>
  );
}

export default Login;
