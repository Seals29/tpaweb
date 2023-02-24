import axios from "axios"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const LoginAst = () => {
    const routers = useRouter();
    const [users, setUsers] = useState([])
    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.get('http://localhost:9998/getuser').then(res => {
            console.log(res);
            setUsers(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])
    console.log(users)
    const [email, setEmail] = useState('')
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
            <div>
                <h1 style={{ textAlign: 'center', margin: 'auto', color: 'black', fontSize: '45px' }}>Sign in Assistance</h1>
            </div>
            <div>
                <div style={{
                    margin: 'auto',
                    width: '500px',
                    wordWrap: 'break-word',
                    textAlign: 'left',
                    color: 'black',
                    fontSize: '25px',
                    opacity: '0.5'
                }}>
                    <br />
                </div>
                <br />
                <div style={{ backgroundColor: 'white', color: 'black', alignItems: 'center', width: '500px', margin: 'auto' }}>
                    <input type="email" name="" onChange={(e: any) => {
                        e.preventDefault()
                        setEmail(e.target.value)
                    }} id="" placeholder="Email Address" style={{ width: '500px', backgroundColor: 'white', color: 'black', height: '30px' }} />
                </div>
                <br />
                <br />
                <br />
                <div style={{ display: 'flex' }}>
                    <button style={{
                        width: '500px',
                        padding: '12px',
                        fontSize: '16px',
                        margin: 'auto',
                        alignItems: 'center',
                        textAlign: 'center',
                        borderRadius: '4px',
                        backgroundColor: 'orange',
                        color: 'black',
                        cursor: 'pointer',
                        borderWidth: 'thin'
                    }} type="submit" onClick={(e: any) => {
                        e.preventDefault()
                        console.log(email)
                        const data = {
                            Email: email
                        }
                        axios.post("http://localhost:9998/loginassistance", data).then(res => {
                            console.log(res)
                            if (res.data.message === "New Verification code has been sent!") {
                                const encoded = encodeURIComponent(email)
                                routers.push("/LoginRegister/[email].tsx", `/LoginRegister/${encoded}`)
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    }}>
                        REQUEST VERIFICATION CODE
                    </button>
                </div>

                <br />
                <div style={{ textAlign: 'center', color: 'black', gap: '15px', alignItems: 'center', justifyItems: 'center' }}>
                    New to NewEgg?
                    <a href="/" style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>Contact Customer Service</a>
                </div>


            </div>
        </div>
    )
}
export default LoginAst