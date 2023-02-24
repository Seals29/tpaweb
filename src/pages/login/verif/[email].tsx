import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import style from "@/styles/login.module.css"
export default function loginverifcode() {
    const router = useRouter();
    const [code, setCode] = useState("")
    console.log(router);
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
                        <h1 style={{ textAlign: 'center', margin: 'auto', color: 'black', fontSize: '45px' }}>Verification ONE TIME CODE</h1>
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
                            axios.post("http://localhost:9998/onetimecode", newVerifCode).then(res => {
                                console.log(res.data)
                                if (res.data.message === "Code is Expired") {
                                    alert("error/expired")
                                    return
                                } else {
                                    setCookie(null, 'token', res.data.token, {
                                        maxAge: 30 * 60 * 12,
                                        path: '/'
                                    })
                                    router.push('/home');
                                }
                                //valid
                                console.log("suskesaxios")
                                //setcookie

                            }).catch(err => {
                                alert("error")
                                console.log(err)
                            })
                        }}>Submit Verification</button>
                        <button className={style.button} onClick={(e) => {
                            e.preventDefault()
                            const data = {
                                Email: router.query.email
                            }
                            console.log(data.Email)
                            axios.post("http://localhost:9998/resendonetime", data).then(res => {
                                console.log(res)
                                const encoded = encodeURIComponent(data.Email.toString());
                                // router.push(`/login/verif/[email]`,`/login/verif/${encoded}`);
                                alert("new verification code has been sent")
                            }).catch(err => {
                                console.log(err)
                            })
                        }}>
                            Resend Verification Code!
                        </button>
                    </form>
                </div>
            </div>



        </div>
    )
}