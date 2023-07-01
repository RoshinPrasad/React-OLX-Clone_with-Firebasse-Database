import React,{useEffect,useContext} from 'react';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import Post from './store/postContext';
import { AuthContext , FirebaseContext } from './store/Context';
function App() {
  const {user,setUser}=useContext(AuthContext);
  const {firebase}=useContext(FirebaseContext);
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
    console.log(user);
    
  })
  return (
    <React.Fragment>
      <Post>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/signup' Component={Signup}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/create' Component={Create}></Route>
          <Route path='/details' Component={ViewPost}></Route>
        </Routes>
      </Post>
    </React.Fragment>
  );
}

export default App;
