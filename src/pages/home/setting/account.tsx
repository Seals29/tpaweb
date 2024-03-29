import Navbar from "@/pages/HomePage/Navbar";
import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
export default function account(){

    
    const routers = useRouter();
    const [currUser,setCurrUser] = useState([]);
    useEffect(()=>{
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate',{cookies}).then(res=>{
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err=>{
            console.log(err)
            routers.push('/login')
        })
        console.log(currUser)
        
    },[])
    const [shopName, setShopName]= useState("")
    const [shopEmail, setShopEmail] = useState("")
    const [shopPassword, setShopPassword]= useState("")
    console.log(routers);
    return(
        <div>
            <div>
            <Navbar/>
            </div>
                
                <div style={{minHeight:'100vh', maxHeight:'100vh',backgroundColor:'blue'}}>
                <div className={style.containerform}>
                    <label>Shop Name:</label>
                    <input type="text" placeholder="Shop name" onChange={(e)=>{
                        setShopName(e.target.value)
                    }}/><br/><br/>
                    <label >Shop Email:</label>
                    <input type="email" placeholder="Shop Email" onChange={(e)=>{
                        setShopEmail(e.target.value)
                    }}/><br/><br/>
                    <label >Shop Password:</label>
                    <input type="password" placeholder="Shop Password" onChange={(e)=>{
                        setShopPassword(e.target.value)
                    }}/><br/>
                    <br/>
                    <button onClick={()=>{
                        console.log(shopPassword);
                        type User = {
                            firstname: string,
                            email : string,
                            role : string,
                            password : string,
                            isban: boolean
                        }
                        
                        const newUser : User = {
                        firstname:shopName,
                          isban:false,
                          role:"Seller",
                          email:shopEmail,
                          password:shopPassword
                        }
                        // var token = "";
                        axios.post("http://localhost:9998/createshop", newUser).then(response=>{
                          console.log("Response")  
                          console.log(response.data)  
                          
                          // routers.push('/home')
                        }).catch(err => {
                          console.log("Response")  
                          console.log(err.response);
                          
                        })
                        alert("Successfully Registered new Shop account!");
                      }
                
                      
                    

                    }>Submit</button>
                </div>
                </div>
            </div>
    )
    
}
