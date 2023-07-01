import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate,Link } from 'react-router-dom';

function Login() {
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [message,setMessage] = useState('');
  const {firebase} = useContext(FirebaseContext)
  const navigate=useNavigate()
  const handleLogin=(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(()=>{
      navigate('/')
    }).catch((error)=>{
      setMessage('Enter a valid email/password')
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
      <Link to="/">
          <img width="200px" height="200px" src={Logo} alt="" />
        </Link>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <p style={{color:'red',textTransform:'capitalize',marginLeft:'40px'}}>{message}</p>
          <button>Login</button>
        </form>
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
