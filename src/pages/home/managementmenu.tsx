import Navbar from "@/pages/HomePage/Navbar";
import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useContext, useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faShop } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/theme/theme";
import HomeFooter from "../HomePage/Footer";
export default function managementmenu() {

    const { theme } = useContext(ThemeContext)
    const routers = useRouter();
    const [currUser, setCurrUser] = useState([]);
    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        console.log(currUser)

    }, [])

    console.log(routers);
    if (currUser.role == "admin") {
        return (
            <div>
                <Navbar />
                <div style={{ minHeight: '100vh', maxHeight: '100vh', backgroundColor: theme.background }} className={style.containerbox1}>
                    <div className={style.containerbox} style={{ backgroundColor: theme.background }}>
                        <div className={style.box}
                            style={{
                                backgroundColor: theme.backgroundmenu,
                                textAlign: 'center', display: 'flex',
                                flexDirection: 'column', justifyContent: 'center'
                            }} onClick={(e)=>{
                                e.preventDefault()
                                routers.push("/home/newvoucher");
                            }}>
                                Add New Voucher Code 
                        </div>
                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><a href="/home/view/userlist" style={{ color: theme.text, fontSize: '20px' }}>User List</a></div>{/*paginated */}
                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><a href="/home/sendnews" style={{ color: theme.text, fontSize: '20px' }}>Send Newsletter</a></div>
                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><a href="/home/newshop" style={{ color: theme.text, fontSize: '20px' }}>Insert New Shop</a></div>
                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <a href="/home/view/shoplist" style={{
                                display: 'flex',
                                flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '20px'
                            }}>
                                <div style={{
                                    display: 'flex', flexDirection: 'column',
                                    justifyContent: 'center', alignItems: 'center',
                                    color: theme.text, fontSize: '20px'
                                }}>
                                    Show All Shops
                                    <FontAwesomeIcon icon={faShop} />
                                </div>
                            </a>


                        </div>
                        <div className={style.box}
                            style={{ backgroundColor: theme.backgroundmenu, border: `2px solid ${theme.background}`, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <a href="/home/newshop" style={{ color: theme.text, fontSize: '20px' }}>View All Reviews</a>
                        </div>

                    </div>
                    <div className={style.containerbox} style={{ backgroundColor: theme.background }}>
                        <div style={{ marginTop: '250px' }}><span ><a href="/home" style={{ marginTop: '50px' }}>
                            <FontAwesomeIcon icon={faArrowCircleLeft} size={"3x"} />
                        </a></span></div>

                    </div>
                </div>
                <HomeFooter />
            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <div style={{ minHeight: '100vh', maxHeight: '100vh' }}>
                    You're not Authorized
                </div>
                <HomeFooter />
            </div>
        )
    }

}
