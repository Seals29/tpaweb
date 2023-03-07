import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import style from "@/styles/order.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function order (){   
    const [currUser, setCurrUser] = useState([])
    const routers = useRouter()
    useEffect(() => {
        const cookies = Cookies.get('token')

        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
    }, [])
    return (
        <div>
            <Navbar/>

            <div style={{display:currUser.role==="customer"?"":"none"}}>
                <h1>Order!</h1>
            </div>
            <div style={{display:currUser.role==="Seller"?"":"none"}}>

            </div>

            <HomeFooter/>
        </div>
    )
}