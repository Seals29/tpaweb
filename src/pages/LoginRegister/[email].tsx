
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
    const [cooldown, setCooldown] = useState(0)
    const [code, setCode] = useState('')
    const email = routers.query.email
    const lastIntervalTime = useRef(Date.now())
    useEffect(() => {
        if (cooldown > 0) {
            const timeoutID = setTimeout(() => {
                setCooldown(cooldown - 1)
            }, 1000)
            return () =>
                clearInterval(timeoutID)

        }
    }, [cooldown])
    return (
        <div>
            <img
                src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png"
                alt="Newegg" style={{
                    alignItems: 'center',
                    textAlign: 'center',
                    margin: 'auto',
                    display: 'block'

                }} ></img>
            <div >
                <div className={style.container}>
                    <form className={style.form}>
                        <h1 style={{ textAlign: 'center', margin: 'auto', color: 'black', fontSize: '45px' }}>Forgot Password Verification</h1>
                        <input type="text" placeholder="6digit code" value={code} onChange={(e: any) => {
                            setCode(e.target.value)
                            console.log(e.target.value)
                        }} className={style.input} required minLength={6} maxLength={6} />
                        <button className={style.button} onClick={(e) => {
                            //get data
                            e.preventDefault()
                            alert("masuk button")
                            console.log(code)
                            type body = {
                                ResetCode: string
                            }
                            const newVerifCode: body = {
                                ResetCode: code
                            }
                            axios.post("http://localhost:9998/verifassistance", newVerifCode).then(res => {
                                console.log(res)
                                if (res.data.error) {
                                    alert(res.data.error)
                                } else {
                                    setCookie(null, 'token', res.data.token, {
                                        maxAge: 30 * 60 * 16,
                                        path: '/'
                                    })
                                    routers.push("/LoginRegister/update/[email].tsx", `/LoginRegister/update/${email}`)
                                }

                            }).catch(err => {
                                console.log(err)
                            })
                        }}>Submit Verification</button>
                        <button className={style.button} disabled={cooldown <= 0 ? false : true} onClick={(e) => {

                            setCooldown(120)
                            e.preventDefault()
                            const data = {
                                Email: routers.query.email
                            }
                            console.log(data.Email)
                            axios.post("http://localhost:9998/resendassistance", data).then(res => {
                                console.log(res)
                                console.log(res)
                                if (res.data.error) {
                                    //error
                                    alert(res.data.error)
                                } else {
                                    alert(res.data.message)
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                        }}>
                            Resend Verification Code!
                        </button >
                        {cooldown > 0 && (
                            <p style={{ color: "black" }}>Resend Verification code available in {cooldown} seconds</p>
                        )}
                    </form>
                </div>
            </div>



        </div>
    )
}
