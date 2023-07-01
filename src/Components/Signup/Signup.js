import React,{ useState,useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Signup() {
  const navigate = useNavigate();
  const [username,setUsername]=useState('');
  const [email,setEmail]=useState('');
  const [phone,setPhone]=useState('');
  const [message,setMessage]=useState('');
  const [password,setPassword]=useState('');
  
  const {firebase}=useContext(FirebaseContext);

  const handleSubmit=(e)=>{
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((result)=>{
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone,
          email:email
        }).then(()=>{
          navigate('/login')
        })
      })
    }).catch((err)=>{
      console.log(err.message);
      setMessage(err.message)
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            name="name"
            required

          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
            
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            name="phone"
            placeholder='999-999-9999'
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            required

          />
          <br />
          <br />
          <p style={{color:'red',marginLeft:'20px'}}>{message.slice(9,45)}</p>
          <button >Signup</button>
        </form>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
