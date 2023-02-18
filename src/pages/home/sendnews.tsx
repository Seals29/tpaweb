import Navbar from "@/pages/HomePage/Navbar";
import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
export default function sendnews(){

    
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
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    return(
        <div>
            <div>
            <Navbar/>
            </div>
                
                <div style={{minHeight:'100vh', maxHeight:'100vh',backgroundColor:'blue'}}>
                <div className={style.containerform}>
                    <label>Annoucnement</label>
                    <input type="text" placeholder="Announcement" onChange={(e)=>{
                        setSubject(e.target.value)
                    }}value={subject} /><br/><br/>
                    <label >Shop Email:</label>
                    <textarea cols={40} rows={6} style={{resize:'none'}}
                    onChange={(e)=>{
                        setMessage(e.target.value)
                    }} placeholder="Message" value={message}
                    ></textarea>
                    <br/>
                    <button onClick={()=>{
                        // console.log(shopPassword);
                        type Message = {
                            subject : string,
                            message : string
                        }
                        const newMessage : Message={
                            subject: subject,
                            message: message
                        }
                        axios.post("http://localhost:9998/announce",newMessage).then(res=>{
                            console.log(res)
                            setMessage("")
                            setSubject("")
                        }).catch(err=>{
                            console.log(err)
                        })
                      }
                    }>Submit</button>
                </div>
                </div>
            </div>
    )
    
}
