
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect, useRef, useState } from "react";
import style from "@/styles/login.module.css"
import Link from "next/link";
import { setInterval, setTimeout } from "timers";

export default function ResetPassword() {
    const routers = useRouter()
    const [newPass1, setNewPass1] = useState('')
    const [currUser, setCurrUser] = useState('')
    const [newPass2, setNewPass2] = useState('')
    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
            // routers.push("/home")
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div>

            <div >
                <div className={style.container} style={{ display: 'flex', flexDirection: 'column' }}>
                    <img
                        src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png"
                        alt="Newegg" style={{
                            alignItems: 'center',
                            textAlign: 'center',
                            margin: 'auto',
                            display: 'block',
                            height: '165px'

                        }} ></img>
                    <form className={style.form}>
                        <h1 style={{ textAlign: 'center', margin: 'auto', color: 'black', fontSize: '45px' }}>Reset Password!</h1>
                        <input type="password" placeholder="New Password" onChange={(e: any) => {
                            setNewPass1(e.target.value)
                        }} className={style.input} />
                        <input type="password" placeholder="Confirm New Passowrd" onChange={(e: any) => {
                            setNewPass2(e.target.value)
                        }} className={style.input} />
                        <button className={style.button} onClick={(e) => {
                            e.preventDefault()
                            console.log(newPass1)
                            console.log(newPass2)
                            const data = {
                                Id: currUser.ID.toString(),
                                Password: newPass1
                            }
                            if (newPass1 == newPass2) {
                                axios.post("http://localhost:9998/updateuserpass", data).then(res => {
                                    console.log(res)
                                    if (res.data.message === "Password has been changed!") {
                                        routers.push("/home")
                                    }

                                }).catch(err => {
                                    console.log(err)
                                })
                            } else {
                                alert("Password and Confirm Password must be the same!");
                            }

                        }}>
                            Change Password!
                        </button >



                    </form>
                </div>
            </div>



        </div>
    )
}
