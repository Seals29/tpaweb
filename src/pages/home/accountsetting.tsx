import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import HomeFooter from "../HomePage/Footer";
import Navbar from "../HomePage/Navbar";
import style from "@/styles/setting.module.css"
import { ThemeContext } from "@/theme/theme";
import { LangContext } from "@/theme/language";
export default function accountsetting() {
    const { theme } = useContext(ThemeContext)
    const { Lang } = useContext(LangContext)
    const routers = useRouter()
    const [currUser, setCurrUser] = useState([])
    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        // alert("asdas")
    }, [])
    return (
        <div>
            <header style={{ color: '' }}>
                <Navbar />
            </header>
            <div style={{ backgroundColor: theme.background2 }}>
                <div className={style.container} style={{ backgroundColor: theme.background }}>
                    <h1 style={{ textAlign: 'left' }}>ACCOUNT SETTING</h1>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', color: 'grey', textAlign: 'left', gap: '250px' }}>
                            Account Information
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                                <input type="text" defaultValue={currUser.firstname} style={{ backgroundColor: theme.background, color: theme.text, borderRadius: '5px' }} />
                                <input type="text" defaultValue={currUser.email} style={{ backgroundColor: theme.background, color: theme.text, borderRadius: '5px' }} />
                                <div style={{ display: 'flex' }}>
                                    <label >{currUser.phonenumber ? currUser.phonenumber : "To enhance your account security, add your mobile number"}</label>
                                    <button style={{ color: "grey", marginLeft: '50px', backgroundColor: theme.backgroundmenu }}>
                                        edit
                                    </button>

                                </div>

                            </div>

                        </div>
                        <div style={{ display: 'flex', color: 'grey', textAlign: 'left', gap: '250px' }}>

                            <div></div>
                        </div>
                        <div style={{ display: 'flex', color: 'grey', textAlign: 'left', gap: '250px' }}>
                            Password
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '250px', right: '0', minWidth: '600px' }}>
                                <div style={{ display: 'flex', marginLeft: '65px' }}>

                                    <label >{currUser.password ? "********" : "To enhance your account security, add your mobile number"}</label>
                                    <button style={{ color: "grey", marginLeft: '122px', backgroundColor: theme.backgroundmenu }}>
                                        edit
                                    </button>

                                </div>

                            </div>
                        </div>
                        <div style={{ display: 'flex', color: 'grey', textAlign: 'center', justifyContent: 'center' }}>
                            <button style={{ color: theme.text, backgroundColor: theme.background2 }}>
                                Save Changes!(Username / Email)</button>

                        </div>
                    </div>


                </div>

            </div>
            <footer style={{ position: 'sticky' }}>
                <HomeFooter />
            </footer>
        </div>
    )
}

