import Navbar from "@/pages/HomePage/Navbar";
import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import { } from 'firebase/app';
import 'firebase/storage';

import style from "@/styles/homes.module.css"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";
export default function newshop() {


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
    const [resp, setResp] = useState(null)
    const [shopName, setShopName] = useState("")
    const [shopEmail, setShopEmail] = useState("")
    const [shopPassword, setShopPassword] = useState("")
    const [fileURL, setfileURL] = useState("")
    const [file, setFile] = useState(null)
    const [imageUpload, setImageUpload] = useState(null)
    console.log(routers);
    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div style={{ minHeight: '100vh', maxHeight: '100vh', backgroundColor: 'blue' }}>
                <div className={style.containerform}>
                    <label>Shop Name:</label>
                    <input type="text" placeholder="Shop name" onChange={(e) => {
                        setShopName(e.target.value)
                    }} /><br /><br />
                    <label >Shop Email:</label>
                    <input type="email" placeholder="Shop Email" onChange={(e) => {
                        setShopEmail(e.target.value)
                    }} /><br /><br />
                    <label >Shop Password:</label>
                    <input type="password" placeholder="Shop Password" onChange={(e) => {
                        setShopPassword(e.target.value)
                    }} /><br />
                    <br />
                    <label >Shop Banner (optional):</label>
                    <input type="file" placeholder="ImageUploade" onChange={(e: any) => {
                        setImageUpload(e.target.files[0]);
                        // const storageRef = firebase.storage().ref();
                    }} /><br />
                    <br />
                    {/* e.preventDefault() */}
                    {/* const imageRef = ref(storage, `shopBanner/${currUser.firstname}/${imageUpload.name + "OldEgg"}`); */}
                    <button onClick={() => {
                        type User = {
                            firstname: string,
                            email: string,
                            role: string,
                            password: string,
                            isban: boolean,
                            banner: string
                        }

                        const imageRef = ref(storage, `shopBanner/${shopName}/${imageUpload.name + "OldEgg"}`);
                        uploadBytes(imageRef, imageUpload).then(res => {
                            console.log(res)
                        }).catch(err => {
                            console.log(err)
                            return
                        })
                        const imageListReff = ref(storage, `shopBanner/${shopName}/`)
                        listAll(imageListReff).then(res => {
                            console.log(res)
                            res.items.forEach((item) => {
                                console.log(item.name)
                                console.log(`${imageUpload.name + "OldEgg"}`)

                                console.log(`${imageUpload.name + "OldEgg"}` === item.name)
                                if (item.name === `${imageUpload.name + "OldEgg"}`) {
                                    getDownloadURL(item).then(url => {
                                        console.log(url)
                                        const newUser: User = {
                                            firstname: shopName,
                                            isban: false,
                                            role: "Seller",
                                            email: shopEmail,
                                            password: shopPassword,
                                            banner: url
                                        }
                                        axios.post("http://localhost:9998/createshop", newUser).then(response => {
                                            console.log("Response")
                                            if (response.data.error) {
                                                setResp(response.data.error)
                                                alert(response.data.error)

                                                return
                                            } else {
                                                alert("Account shop successfully registered")
                                                type ShopUser = {
                                                    email: string
                                                }
                                                const NewShopUser: ShopUser = {
                                                    email: shopEmail
                                                }
                                                axios.post("http://localhost:9998/notifyshop", NewShopUser).then(res => {
                                                    alert("Announcement has been sent!")
                                                }).catch(err => {
                                                    console.log(err)
                                                })

                                            }
                                        }).catch(err => {
                                            console.log("Response")
                                            console.log(err);

                                        })

                                    })

                                }
                            })
                        })
                    }
                    }>Submit</button>
                </div>
            </div>
        </div>
    )

}
