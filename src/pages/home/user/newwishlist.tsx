import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import style from "@/styles/homes.module.css"
import { ThemeContext } from "@/theme/theme";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
export default function newwishlist(){
    const [currUser, setCurrUser] = useState([])
    const routers = useRouter()
    const {theme} = useContext(ThemeContext)
    useEffect(()=>{
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/home')
        })

    },[])
    const [status,setStatus] = useState('Private')
    const [name,setName] = useState('')
    const handleStatus= (e:any)=>{
        setStatus(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit= (e:any) =>{
        console.log(status)
        console.log(currUser.ID)
        type WishList = {
            name : string,
            userid : string,
            status : string,
        }
        const newWishList : WishList={
            name : name,
            userid : currUser.ID.toString(),
            status : status,
        }
        console.log(newWishList)
        axios.post("http://localhost:9998/createnewwishlist",newWishList).then(res=>{
            console.log(res)
            if(res.data.error){
                alert(res.data.error)
            }else{
                alert("New Wishlist has been addded successfully!");
                // routers.push("")
            }
        }).catch(err=>{
            console.log(err)
        })
        // const newUser: User = {
        //     firstname: shopName,
        //     isban: false,
        //     role: "Seller",
        //     email: shopEmail,
        //     password: shopPassword,
        //     banner: url
        // }
    }
    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div >
                <div className={style.containerform} style={{backgroundColor:theme.background2}}>
                    <h1 style={{color:theme.text}}>Create Your New Wishlist</h1>
                    <label style={{color:theme.text}}>WishList Name:</label>
                    <input type="text" placeholder="Wishlist name"
                     onChange={(e) => {
                        setName(e.target.value)
                    }} style={{backgroundColor:theme.background, color:theme.text}} /><br /><br />
                    <label >Wishlist Status</label>
                    <select value={status} onChange={handleStatus}
                    style={{
                        padding:'10px',
                        width:'300px',
                        border:'none',
                        marginBottom:'36px',
                        borderRadius:'5px',
                        boxShadow:'0px 0px 5px black',
                        backgroundColor:theme.background, color:theme.text  
                    }}
                    >
                        <option value="Private">Private</option>
                        <option value="Public">Public</option>
                    </select>
         
                    {/* const imageRef = ref(storage, `shopBanner/${currUser.firstname}/${imageUpload.name + "OldEgg"}`); */}
                    <button onClick={handleSubmit} >Submit</button>
                </div>
            </div>
        </div>
    )
}