import React from 'react';
import { useEffect,useContext,useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { postContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/Context';
function Posts() {

  const {firebase} = useContext(FirebaseContext);
  const [products,setProducts] = useState([]);
  const [recommend,setRecommend] = useState([]);
  const navigate = useNavigate()
  const {setPostDetails} = useContext(postContext)

  useEffect(()=>{
    firebase.firestore().collection('products').get()
    .then(snapshot=>{
      const allPost = snapshot.docs.map((product)=>{
        return {
          ...product.data(),
          id:product.id
        }
      })
      setProducts(allPost);
    })
    firebase
  .firestore()
  .collection('products')
  .get()
  .then(snapshot => {
    const rePost = snapshot.docs
      .filter(product => parseInt(product.data().price) < 50000)
      .map(product => ({
        ...product.data(),
        id: product.id
      }));
      
    setRecommend(rePost);
  });

    console.log(recommend+"hu");
  },[])
  
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          { 

          products.map((product,index)=>{
            return (
              <div key={index} onClick={()=>{
                setPostDetails(product);
                navigate('/details');
              }} className="card" >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <LazyLoadImage src={product.url} />
              </div>
              <div className="content">
                <p className="rate">&#36; {product.price}</p>
                <span className="kilometer">{product.name}</span>
                <p className="name"> {product.category}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
            )
          })
           
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          { 
            recommend.map((product,index)=>{
              return (
                <div key={index} onClick={()=>{
                  setPostDetails(product);
                  navigate('/details');
                }} className="card" >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <LazyLoadImage src={product.url} />
                </div>
                <div className="content">
                  <p className="rate">&#36; {product.price}</p>
                  <span className="kilometer">{product.name}</span>
                  <p className="name"> {product.category}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>
              )
            })
            }
        </div>
      </div>
      <div className="gplay">
  <a href="https://play.google.com/store/apps/details?id=com.olx.olx" target="_blank" rel="noopener noreferrer">
    <img
      style={{ cursor: "pointer" }}
      src="../../../images/banner copy1.png"
      alt="ohyeah"
    />
  </a>
</div>
    </div>
  );
}

export default Posts;
