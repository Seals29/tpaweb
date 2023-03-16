import Navbar from "@/pages/HomePage/Navbar";
import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useContext, useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
import Link from "next/link";
import Pagination from "@/pages/components/pagination";
import { ThemeContext } from "@/theme/theme";
import Card from "@/pages/components/card";
import shop from "@/pages/shop";
import HomeFooter from "@/pages/HomePage/Footer";
export default function shoplist() {


    const routers = useRouter();
    const [currUser, setCurrUser] = useState([]);
    const [users, setUsers] = useState([])
    const [filtered, setFiltered] = useState([])
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
            setFiltered(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, [])
    // const filtered = allShopOrders.filter((ord) => (ord.status === "Open"))

    const [currPage, setCurrPage] = useState(1);
    const totalShops = shops.length;
    const Pages = Math.ceil(filtered.length / 5)
    const { theme } = useContext(ThemeContext)
    const startIdx = (currPage - 1) * 5
    const endIdx = startIdx + 5
    const userOnPage = filtered.slice(startIdx, endIdx)
    console.log(userOnPage)
    const changePageHandler = (pageNumber: any) => {
        setCurrPage(pageNumber)
    }
    console.log(userOnPage)
    if (currUser.role == "admin") {
        return (
            <div>
                <Navbar />
                <div style={{ minHeight: '100vh', maxHeight: '100vh' }} className={style.shopcontainers}>
                    <h1>Shop List</h1>
                    <h2 onClick={(event: any) => {
                        const filteredShopList = shops.filter((shop) => (shop.isban === true))
                        setFiltered(filteredShopList)
                        console.log("asdasdas");

                    }}>Filter By Banned Shop</h2>
                    <h2 onClick={(event: any) => {
                        const filteredShopList = shops.filter((shop) => (shop.isban === false))
                        setFiltered(filteredShopList)
                        console.log("asdasdas");

                    }}>Filter By Unbanned Shop</h2>
                    <ul className={style.usercontainer}>

                        {userOnPage.map((idx: any) => (

                            <li key={idx.ID} style={{ color: theme.text }} className={style.userdata} onClick={() => {
                                console.log(idx)
                                // routers.push("/home/user/shop/[name]", `/home/user/shop/${idx.ID}`)
                            }}>
                                <h2>{idx.name ? idx.name : "Unnamed"} {idx.lastname === idx.firstname ? "" : idx.lastname}</h2>
                                <h2></h2>
                                <h2>{idx.email ? idx.email : "No Email"}</h2>
                                <img src={idx.banner} alt="" />
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
                <HomeFooter />
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
// export async function getStaticProps() {
//     const response = await axios.get("http://localhost:9998/getallproduct")
//     const allProducts = await response.data;
//     return {
//         props: {
//             allProducts,
//         },
//     };
// }
