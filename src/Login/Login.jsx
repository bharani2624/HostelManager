import React, { useState } from 'react';
import { ref, get, child, set } from 'firebase/database';
import { db } from '../Login/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './Login_Signup.css';
import { motion } from 'framer-motion';


const Login_Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignedin, setIsSignedin] = useState(false);

  const handleSignIn = async () => {
    try {
      const dbRef = ref(db);
      const formattedEmail = email.replace('.', '_'); 
      const snapshot = await get(child(dbRef, `users/${formattedEmail}`));

      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.password === password && userData.password==="manager@bitsathy" && userData.email==="manager@gmail.com") {
            navigate('/Dashboard');
        } else {
          alert('Incorrect password');
        }
      } else {
        alert('User does not exist');
      }
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const formattedEmail = email.replace('.', '_');
      await set(ref(db, `users/${formattedEmail}`), {
        name: name,
        email: email,
        password: password,
        roomNo: "null", 
      });
      alert('Sign-Up successful! Please sign in.');
      setIsSignedin(true);
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  const toggleSignInSignUp = () => {
    setIsSignedin(!isSignedin);
  };

  return (
    <motion.div className="container-signup"
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
    >
      <div className="header">
        <div className="Signup">{isSignedin ? 'SignIn' : 'SignUp'}</div>
        <div className="underline-login"></div>
      </div>
      <div className="inputs flex">
        {!isSignedin && (
          <div className="input flex">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="input flex">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input flex">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="footer">
          {isSignedin ? (
            <div className="Submit" onClick={handleSignIn}>
              <span>SignIn</span>
            </div>
          ) : (
            <div className="Submit" onClick={handleSignUp}>
              <span>SignUp</span>
            </div>
          )}
        </div>
        <div className="fp-footer">
          {isSignedin ? (
            <p>
              Don't Have An Account?{' '}
              <span onClick={toggleSignInSignUp}><u>Click Here</u></span>
            </p>
          ) : (
            <p>
              Already Have An Account?{' '}
              <span onClick={toggleSignInSignUp}><u>Click Here</u></span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Login_Signup;
