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
export default function profile() {
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
    const { theme } = useContext(ThemeContext)
    const [name, setName] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [imageUpload, setImageUpload] = useState(null)
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
                            <input type="file" placeholder="ImageUpload" onChange={(e: any) => {
                                setImageUpload(e.target.files[0])
                            }} />
                        </div>
                        <div className={style.formgroup}>
                            <label >Shop Name :</label>
                            <input type="text" required onChange={(e: any) => {
                                setName(e.target.value)
                            }} />
                        </div>
                        <button className={style.shopprofilebutton} onClick={(e: any) => {
                            e.preventDefault()
                            const imageRef = ref(storage, `shopBanner/${currUser.firstname}/${imageUpload.name + "OldEgg"}`);
                            //upload to the storage
                            uploadBytes(imageRef, imageUpload).then(res => {
                            }).catch(err => {
                                console.log(err)
                                return
                            })
                            const imageListReff = ref(storage, `shopBanner/${currUser.firstname}/`)
                            listAll(imageListReff).then(res => {
                                res.items.forEach((item) => {
                                    if (item.name === `${imageUpload.name + "OldEgg"}`) {
                                        getDownloadURL(item).then(url => {
                                            console.log(url)
                                            console.log(currUser.ID)
                                            console.log()
                                            type ShopProfile = {
                                                Email: string,
                                                Name: string,
                                                Image: string
                                            }

                                            const NewShopProfile: ShopProfile = {
                                                Email: currUser.email,
                                                Name: name,
                                                Image: url
                                            }
                                            axios.post("http://localhost:9998/updateshopprofile", NewShopProfile).then(res => {
                                                console.log(res)
                                            }).catch(err => {
                                                console.log(err)
                                            })
                                        })
                                    }
                                })
                            }).catch(err => {

                            })


                        }}>Save Changes</button>

                    </form>
                </div>
            </div>


        </>
    )
}
