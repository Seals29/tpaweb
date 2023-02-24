import Navbar from "@/pages/HomePage/Navbar";
import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useContext, useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
import Link from "next/link";
import { storage } from "../../firebase/firebase"
import Pagination from "@/pages/components/pagination";
import { ThemeContext } from "@/theme/theme";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
export default function updatepass() {
    const [currUser, setCurrUser] = useState([])
    const routers = useRouter()
    function validatePassword(password: any) {
        if (!password.match(/[A-Z]/)) return false;
        if (!password.match(/[a-z]/)) return false;
        if (!password.match(/[@#$]/)) return false;
        if (password.length < 8 || password.length > 30) return false;

        return true;
    }
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
    const { theme } = useContext(ThemeContext)
    const [oldPass, setOldPass] = useState('')
    const [newPass1, setNewPass1] = useState('')
    const [newPass2, setNewPass2] = useState('')
    return (
        <>
            <header style={{ color: '' }}>
                <Navbar />
            </header>
            <div style={{
                backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center', display: `${currUser.isban ? "" : "none"}`
            }}>Your account is banned!</div>
            <div style={{ backgroundColor: theme.background }} className={style.containerbox1}>
                <div className={style.shopprofile} >
                    <h2>Shop Profile</h2>
                    <form >
                        <div className={style.formgroup}>
                            <label >Profile Picture</label>
                            <input type="password" placeholder="Old Password" onChange={(e: any) => {
                                setOldPass(e.target.value)
                            }} />
                        </div>
                        <div className={style.formgroup}>
                            <label >Shop Name :</label>
                            <input type="password" required onChange={(e: any) => {
                                setNewPass1(e.target.value)
                            }} />
                        </div>
                        <div className={style.formgroup}>
                            <label >Shop Name :</label>
                            <input type="password" required onChange={(e: any) => {
                                setNewPass2(e.target.value)
                            }} />
                        </div>
                        <button className={style.shopprofilebutton} onClick={(e: any) => {
                            e.preventDefault()
                            if (validatePassword(oldPass) && validatePassword(newPass1) && validatePassword(newPass2)) {
                                if (newPass1 == newPass2) {

                                    type body = {
                                        Email: string,
                                        OldPass: string,
                                        NewPass: string
                                    }
                                    const newPass: body = {
                                        Email: currUser.email,
                                        OldPass: oldPass,
                                        NewPass: newPass1
                                    }
                                    axios.post("http://localhost:9998/updateshoppass", newPass).then(res => {
                                        console.log(res)
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                } else {
                                    alert("new password must be the same")
                                }

                            } else {
                                alert("Invalid Password Validation")
                            }


                        }}>Save Changes</button>

                    </form>
                </div>
            </div>


        </>
    )
}
