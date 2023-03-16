import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import style from "@/styles/review.module.css"
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function review(){
    const [currUser, setCurrUser] = useState([])
    const routers = useRouter()
    console.log(routers)
    const shopId = routers.query.name
    const [allShop, setAllShop] = useState([])
    const [currShop, setCurrShop] = useState([])
    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })

    },[])
    return (
        <div>
            <header>
                <Navbar/>
            </header>

                <div className={style.reviewcontainer}>
                    <h1>Your Reviews!</h1>
                   <hr /> 
                </div>

            <footer>
                <HomeFooter/>
            </footer>
        </div>
    )
}