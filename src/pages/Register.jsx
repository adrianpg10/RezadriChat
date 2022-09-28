import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { BiImageAdd } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
function Register() {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      
      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
             
            });

            await setDoc(doc(db, "users", res.user.uid),{
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db,"userChats",res.user.uid),{});
            navigate("/");

          });
        }
      );
      
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Rezadri Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name..." />
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Password..." />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <BiImageAdd className="icon" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something went error</span>}
        </form>
        <p>You do have an account? <Link className="link" to="/login">Login</Link></p>
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

export default Register;
