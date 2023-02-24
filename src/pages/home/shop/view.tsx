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
export default function view() {
    const { theme } = useContext(ThemeContext)
    const [product, setProduct] = useState([])
    useEffect(() => {
        axios.post("http://localhost:9998/getproduct", { email: "tokopedia@gmail.com" }).then(res => {
            console.log(res.data)
            setProduct(res.data)
        })

    }, [])
    console.log(product)
    const [currPage, setCurrPage] = useState(1);
    const totalProduct = product.length;
    const Pages = Math.ceil(totalProduct / 5)
    const startIdx = (currPage - 1) * 5
    const endIdx = startIdx + 5
    const router = useRouter()
    const productOnPage = product.slice(startIdx, endIdx)
    const changePageHandler = (pageNumber: any) => {
        setCurrPage(pageNumber)
    }
    return (
        <div>
            <Navbar />
            <div style={{ minHeight: '100vh', maxHeight: '100vh' }}>
                <h1 style={{ backgroundColor: '#212121', textAlign: 'center' }}>Your Current Product</h1>
                <ul className={style.usercontainer}>
                    {productOnPage.map((idx: any) => (
                        <li key={idx.id} style={{ color: 'black' }} className={style.userdata} onClick={(e) => {
                            router.push(`/home/shop/[product]`, `/home/shop/${idx.ID}`);

                        }}>
                            <h2>{idx.name}</h2>
                            <img src={idx.image} alt="" className={style.productimage} />
                        </li>
                    ))}
                </ul>
                <Pagination currentPage={currPage} totalPages={Pages} onPageChange={changePageHandler}></Pagination>
            </div>
        </div>
    )
}
