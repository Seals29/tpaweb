import Navbar from "@/pages/HomePage/Navbar";
import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
import Link from "next/link";
import Pagination from "@/pages/components/pagination";
export default function shoplist() {


    const routers = useRouter();
    const [currUser, setCurrUser] = useState([]);
    const [users, setUsers] = useState([])
    const [shops, setShops] = useState([])
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
        axios.get('http://localhost:9998/getshop').then(res => {
            console.log(res);
            setShops(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const [currPage, setCurrPage] = useState(1);
    const totalShops = shops.length;
    const Pages = Math.ceil(totalShops / 5)
    const startIdx = (currPage - 1) * 5
    const endIdx = startIdx + 5
    const userOnPage = shops.slice(startIdx, endIdx)
    const changePageHandler = (pageNumber: any) => {
        setCurrPage(pageNumber)
    }
    console.log(userOnPage)
    if (currUser.role == "admin") {
        return (
            <div>
                <Navbar />
                <div style={{ minHeight: '100vh', maxHeight: '100vh' }}>
                    <h1>Shop List</h1>
                    <ul className={style.usercontainer}>
                        {userOnPage.map((idx: any) => (
                            <li key={idx.id} style={{ color: 'black' }} className={style.userdata}>
                                <h2>{idx.firstname ? idx.firstname : "Unnamed"} {idx.lastname === idx.firstname ? "" : idx.lastname}</h2>
                                <h2>{idx.email ? idx.email : "No Email"}</h2>
                                {idx.isban ? (

                                    <button onClick={() => {
                                        const data = {
                                            IsBan: idx.isban,
                                            Email: idx.email
                                        }
                                        axios.post("http://localhost:9998/setban", data).then(res => {
                                            alert(res.data.message)
                                        }).catch(err => {
                                            console.log(err)
                                        })

                                    }}>UnBan!</button>
                                ) : (
                                    <button onClick={() => {
                                        const data = {
                                            IsBan: idx.isban,
                                            Email: idx.email
                                        }
                                        axios.post("http://localhost:9998/setban", data).then(res => {
                                            alert(res.data.message)
                                        }).catch(err => {
                                            console.log(err)
                                        })
                                    }}>Ban!</button>
                                )}

                            </li>
                        ))}
                    </ul>
                    <Pagination currentPage={currPage} totalPages={Pages} onPageChange={changePageHandler}></Pagination>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                you're not authrozied in this page
            </div>
        )
    }

}
