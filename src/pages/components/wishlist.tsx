import React, { useContext, useEffect, useState } from 'react';
// import styles from './card.module.css';
import style from "@/styles/wishlist.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faLock, faLockOpen, faStar } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '@/theme/theme';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const WishList = ({ id,name, image, statuslist,follow }: any) => {
    const { theme } = useContext(ThemeContext)
    const [currUser, setCurrUser] = useState([])
    useEffect(()=>{
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
        //   console.log(res.data.user)
          setCurrUser(res.data.user)
        }).catch(err => {
          console.log(err)
        })
    },[])
    const routers = useRouter()
    // console.log(statuslist)
    const handleFollow=(e:any)=>{
        const data ={
            userid : currUser.ID.toString(),
            wishlistid : id.toString(),
        }
        axios.post("http://localhost:9998/NewFollowWishList",data).then(res=>{
            console.log(res)
            routers.reload();
        }).catch(err=>{
            console.log(err)
        })
    }
    const handleDuplicate=(e:any)=>{
        console.log(id.toString())
        console.log("my ID :"+currUser.ID);
        console.log("wishlistID : "+id);
        const data = {
            UserID : currUser.ID.toString(),
            WishListID: id.toString(),
        }
        axios.post("http://localhost:9998/duplicatepublicwishlisttomywishlist",data).then(res=>{
            if(res.data.error){
                alert(res.data.error);
            }if(res.data.message){
                alert(res.data.message);
            }
        }).catch(err=>{})
        
    }   //copy wishlist iuni ke my wishlist

    return (
        <div className={style.wishlistcontainer}  onClick={(e)=>{
           
            // outers.push(`/login/users/[email]`, `/login/users/${encoded}`);
        }}
        style={{ backgroundColor: theme.background, color: theme.text }}>
            <div style={{marginTop:'5px',marginLeft:'310px'}}>
                <FontAwesomeIcon icon={faClose} onClick={()=>{
                    //delete the clicked wishlist

                }} style={{color:theme.text,cursor:'pointer'}}/>
            </div>
            <br/>
            <br/>
            <img src={"https://firebasestorage.googleapis.com/v0/b/oldegg-3c56e.appspot.com/o/shopProduct%2FTokopedia%2F117495.jpgOldEgg?alt=media&token=5a682786-1407-4433-80b3-7df7860a6b6e"} 
            
            alt={name} className={style.wishimage} />
            <h2 style={{ color: theme.text }}>{name} 
            <FontAwesomeIcon icon={statuslist === "Public" ? faLockOpen : faLock} /></h2>
            <div className={style.btn}>
                <button onClick={handleFollow} style={{display:follow===""?"none":""}}>{follow}</button>
                <button onClick={handleDuplicate}>Duplicate</button>
                <button onClick={(e)=>{
                     routers.push(`/home/user/wishlist/[detail]`,`/home/user/wishlist/${id}`)
                }}>View Detail</button>
                <button>asdasdasdas</button>
            </div>
        </div>
    );
};

export default WishList;
// export async function getStaticProps(context: any) {

//     const res = await axios.get(`http://localhost:9998/getallwishlist`)
//     const wishlists = res.data
//     return {
//         props: {
//             wishlists,
//         }
//     }
// }