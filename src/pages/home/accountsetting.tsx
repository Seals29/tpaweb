import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import HomeFooter from "../HomePage/Footer";
import Navbar from "../HomePage/Navbar";
import style from "@/styles/setting.module.css"
import { ThemeContext } from "@/theme/theme";
import { LangContext } from "@/theme/language";
import { destroyCookie } from "nookies";
export default function accountsetting() {
    const { theme } = useContext(ThemeContext)
    const { Lang } = useContext(LangContext)
    const routers = useRouter()
    const [currUser, setCurrUser] = useState([])
    const [lastName, setLastName] =useState('')
        // const [name]
    const [name,setName] =useState('')
    const [email,setEmail] =useState('')
    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
            setEmail(res.data.user.email)
            setName(res.data.user.firstname)
            setLastName(res.data.user.lastname)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        // alert("asdas")
    }, [])
    console.log(email + name)
    const handleSaveChange=(e:any)=>{
        e.preventDefault()
        console.log(email===currUser.email)
        if(currUser.firstname !==name&&currUser.email ===email){
            console.log("name ga berubah")
            const data = {
                userid: currUser.ID.toString(),
                firstname : name,
            }
            axios.post("http://localhost:9998").then(res=>{
            console.log(res)
            if (res.data.message){
                    alert(res.data.message)
                }
                if(res.data.error){
                    alert(res.data.error)
                }
            })
            
        }
        if(currUser.email !==email && currUser.firstname ===name){
            const data = {
                userid : currUser.ID.toString(),
                email : email,
            }
            console.log("emailga berubah")
            axios.post("http://localhost:9998/updateuseremail",data).then(res=>{
                console.log(res)
                if(res.data.message){
                    alert(res.data.message)
                }
                if (res.data.error){
                    alert(res.data.error)
                }
            }).catch(err=>{
                console.log(err)
            })
            return
        }
        const data = {
            id : currUser.ID.toString(),
            name :name,
            email : email,
        }
        console.log(data)

    }
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
                                <input type="text" defaultValue={currUser.firstname} value={name}
                                style={{ backgroundColor: theme.background, 
                                color: theme.text, borderRadius: '5px' }} 
                                onChange={(e)=>{
                                    e.preventDefault()
                                    setName(e.target.value)
                                }}
                                />
                                <input type="text" defaultValue={currUser.lastname} value={lastName}
                                style={{ backgroundColor: theme.background, 
                                color: theme.text, borderRadius: '5px' }} 
                                onChange={(e)=>{
                                    e.preventDefault()
                                    setLastName(e.target.value)
                                }}
                                />
                                <input type="text" defaultValue={currUser.email} value={email} 
                                style={{ backgroundColor: theme.background, color: theme.text, 
                                borderRadius: '5px' }} onChange={(e)=>{
                                    setEmail(e.target.value)
                                }} />
                                <div style={{ display: 'flex' }}>
                                    <label >{currUser.phonenumber ? currUser.phonenumber : "To enhance your account security, add your mobile number"}</label>
                                    <button style={{ color: "grey", marginLeft: '50px',
                                     backgroundColor: theme.backgroundmenu }}
                                     onClick={(e)=>{
                                        e.preventDefault()
                                        routers.push("/home/changephonenumber")
                                     }}
                                     >
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
                                    <button 
                                    style={{ color: "grey", 
                                    marginLeft: '122px', 
                                    backgroundColor: theme.backgroundmenu }}
                                    onClick={(e:any)=>{
                                        routers.push("/home/changepassword")
                                    }}
                                    >
                                        edit
                                    </button>

                                </div>

                            </div>
                        </div>
                        <div style={{ display: 'flex', color: 'grey', textAlign: 'center', justifyContent: 'center' }}>
                            <button style={{ color: theme.text, backgroundColor: theme.background2 }} onClick={handleSaveChange}>
                                Save Changes!(Username / Email)</button>
                                     
                        </div>
                        <button style={{color:theme.text, backgroundColor:theme.background2
                        ,border:'1px black solid'
                        }} onClick={(e)=>{
                            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                            routers.reload()
                        }}>Log Out</button>
                    </div>


                </div>

            </div>
            <footer style={{ position: 'sticky' }}>
                <HomeFooter />
            </footer>
        </div>
    )
}

