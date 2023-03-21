import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import { ThemeContext } from "@/theme/theme";
import axios from "axios";
import Cookies from "js-cookie";
import { Router, useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from "@/styles/notif.module.css";
export default function notification (){
    const [currUser,setCurrUser]= useState([])
    const router = useRouter()
    const [allNotif,setAllNotif]=useState([])
    const [annNotif, setAnnNotif] = useState([])
    useEffect(()=>{
        const cookies = Cookies.get(`token`)
        axios.post(`http://localhost:9998/validate`,{cookies}).then(res=>{
            console.log(res.data.user);
            setCurrUser(res.data.user)
            
        }).catch(err=>{
            console.log(err);
            router.push("/login")
            
        })
        axios.get(`http://localhost:9998/getnotif?token=${cookies}`).then(res=>{
            console.log(res);
            setAllNotif(res.data)
        }).catch(err=>{
            console.log(err);
            
        })
        axios.get(`http://localhost:9998/getannouncenotif`).then(res=>{
            console.log(res);
            setAnnNotif(res.data)
        }).catch(err=>[
            console.log(err)
            
        ])
    },[])
    const {theme} = useContext(ThemeContext)
    return <div>
        <header>
            <Navbar/>
        </header>
        <div className={style.notifcontainer} style={{
                backgroundColor:theme.background
            }}>
                <h1 style={{
                    color:theme.text
                }}>Message Notification
                </h1>
                <hr />
                {allNotif.map((e:any)=>(
                <div className={style.notifcard}>
                    {e.message}
                </div>
                ))}
                {allNotif.length===0?"You have no message notification yet!":""}
                <h1 style={{
                    color:theme.text
                }}>Announcement Notification</h1>
                <hr />
                {annNotif.length===0?"No announcement yet!":""}
                {annNotif.map((e:any)=>(
                    <div className={style.notifcard}>
                        {e.message}
                    </div>
                ))}
            </div>


        <footer>
            <HomeFooter/>
        </footer>
    </div>
}