import { useEffect,useState,useContext } from 'react';
import './View.css';
import { postContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/Context';

function View() {
  const [userDetails,setuserDetails] = useState([]);
  const {postDetails} = useContext(postContext);
  const {firebase} = useContext(FirebaseContext);
  useEffect(()=>{
    const {userId} = postDetails
    console.log(postDetails);
    firebase.firestore().collection('users').where('id','==',userId).get()
    .then((res)=>{
      res.forEach(doc => {
        setuserDetails(doc.data())
      });
    })
  },[]) 

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img  style={{borderRadius:'5px'}}
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#36; {postDetails.price} </p>
          <span className='spana'>{postDetails.name} </span>
          <p>{postDetails.category} </p>
          <span>{postDetails.createdAt}</span>
        </div>
         <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?userDetails.username:''}</p>
          <p>{userDetails?userDetails.phone:''}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
