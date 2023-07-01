import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
const Create = () => {
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState(null)

  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);


  const navigate = useNavigate();

  const handleSubmit=()=>{
    const date= new Date()
      firebase.storage().ref(`/image/${image.name}`).put(image)
      .then(({ref})=>{
        ref.getDownloadURL().then(url=>{
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId : user.uid,
            createdAt: date.toDateString()
          })
        })
        navigate('/')
      })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">

            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e)=>{
                setName(e.target.value)
              }}
              name="Name"
              required
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>{
                setCategory(e.target.value)
              }}
              required
              name="category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" value={price} onChange={(e)=>setPrice(e.target.value)} id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="100px" height="100px" src={image ? URL.createObjectURL(image):''}></img>
          
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
