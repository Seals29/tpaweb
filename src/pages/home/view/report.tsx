import Navbar from "@/pages/HomePage/Navbar";
import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
export default function report(){

    
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

    console.log(routers);
    if(currUser.role=="admin"){
        return(
            <div>
                <Navbar/>
                <div style={{minHeight:'100vh', maxHeight:'100vh'}}>
                <div className={style.containerbox} style={{fontSize:'10px'}}>
                    <div className={style.box}><span ><a href="/home/view/report">Add New Voucher Code</a></span></div>
                    <div className={style.box}><span ><a href="/home/managementmenu">User List</a></span></div>{/*paginated */}
                    <div className={style.box}><span ><a href="/home/view/report">Send Newsletter</a></span></div>
                    <div className={style.box}><span ><a href="/home/view/report">Insert New Shop</a></span></div>
                    <div className={style.box}><span ><a href="/home/view/report">Show All Shops</a></span></div>
                    <div className={style.box}><span ><a href="/home/view/report">View All Reviews from Customer for Customer Service</a></span></div>

                </div>
        </div>
            </div>
        )
    }else{
        return(
            <div>
                you're not authrozied in this page
            </div>
        )
    }
    
}
