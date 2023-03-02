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
import { randomUUID } from "crypto";

export default function newproduct() {
    const { theme } = useContext(ThemeContext)
    const [imageUrl, setImageUrl] = useState('')
    const [imageUpload, setImageUpload] = useState(null)
    const cookies = Cookies.get('token')
    const [currUser, setCurrUser] = useState()
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [rating, setRating] = useState(0)
    const [detail, setDetail] = useState("")
    const [subCategory, setSubCategory] = useState([])
    const [shopid, setShopid] = useState("")
    const [shopData, setShopData] = useState([])
    const [allCategory, setAllCategory] = useState([])
    const [allSubCategory, setAllSubCategory] = useState([])
    useEffect(() => {
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
        })
        axios.get("http://localhost:9998/getshop").then(res => {
            console.log(res.data)
            setShopData(res.data)
        })
        axios.get("http://localhost:9998/getallsubcategory").then(res => {
            console.log(res)
            setAllSubCategory(res.data)
        }).catch(err => {
            console.log(err)
        })
        axios.get("http://localhost:9998/getallcategory").then(res => {
            console.log(res)
            setAllCategory(res.data)
        })

    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div style={{ minHeight: '100vh', maxHeight: '100vh', backgroundColor: '' }}>
                <div className={style.containerform} style={{ backgroundColor: theme.background }}>
                    <label style={{ color: theme.text }}>Product:</label>
                    <input type="text" placeholder="Product Name" onChange={(e) => {
                        setName(e.target.value)
                    }} style={{ boxShadow: '0px 0px 5px black', backgroundColor: theme.bgsidebar, color: theme.text }} /><br /><br />
                    {/* box-shadow: 0px 0px 5px #ddd; */}
                    <label style={{ color: theme.text }}>Product Category</label>
                    <select id="selectOption" value={category} onChange={(e) => {
                        console.log(e.target.value)
                        setCategory(e.target.value)
                    }} style={{ boxShadow: '0px 0px 5px black', backgroundColor: theme.bgsidebar, color: theme.text }}>
                        <option value="" style={{ color: theme.text }}>--Please choose an option--</option>
                        {allCategory.map((e: any) => (
                            <option key={e.ID} value={e.ID}>{e.name}</option>
                        ))}
                    </select>
                    <select name="" id="" onChange={(e) => {
                        setSubCategory(e.target.value)
                    }}>
                        <option value="" style={{ color: theme.text }}>--Please choose an option--</option>
                        {allSubCategory.map((i: any) => {
                            if (String(i.productcategoryid) === String(category)) {
                                return (
                                    <option key={i.ID} value={i.namr}>{i.name}</option>
                                )
                            }
                            // } console.log(i)
                        })}
                    </select>
                    <label style={{ color: theme.text }}>Product Image</label>
                    <input type="file" placeholder="Product Image" onChange={(e: any) => {
                        setImageUpload(e.target.files[0])
                    }} accept="image/png, image/jpeg" style={{ boxShadow: '0px 0px 5px black', backgroundColor: theme.bgsidebar, color: theme.text }} /><br />
                    <br />
                    <label style={{ color: theme.text }}>Product Description:</label>
                    <input type="text" placeholder="Description" onChange={(e: any) => {
                        setDesc(e.target.value)

                    }} style={{ boxShadow: '0px 0px 5px black', backgroundColor: theme.bgsidebar, color: theme.text }} /><br />
                    <br />
                    <label style={{ color: theme.text }}>Product Price:</label>
                    <input type="number" placeholder="Price" onChange={(e: any) => {
                        setPrice(e.target.value)

                    }} style={{ boxShadow: '0px 0px 5px black', backgroundColor: theme.bgsidebar, color: theme.text }} /><br />
                    <br />
                    <label style={{ color: theme.text }}>Product Stock:</label>
                    <input type="number" placeholder="Stock" onChange={(e: any) => {
                        setStock(e.target.value)
                    }} style={{ boxShadow: '0px 0px 5px black', backgroundColor: theme.bgsidebar, color: theme.text }} /><br />
                    <br />
                    <label style={{ color: theme.text }}>Product Detail:</label>
                    <input style={{ boxShadow: '0px 0px 5px black', backgroundColor: theme.bgsidebar, color: theme.text }} type="text" placeholder="Detail" onChange={(e: any) => {
                        setDetail(e.target.value)
                    }} /><br />
                    <br />
                    <button style={{ color: theme.text }} onClick={() => {
                        if (imageUpload == null) {
                            alert("Product must have image to be shown")
                            return
                        }
                        const imageRef = ref(storage, `shopProduct/${currUser.firstname}/${imageUpload.name + "OldEgg"}`);
                        //upload to the storage
                        uploadBytes(imageRef, imageUpload).then(res => {
                        }).catch(err => {
                            console.log(err)
                            return
                        })

                        const imageListReff = ref(storage, `shopProduct/${currUser.firstname}/`)
                        listAll(imageListReff).then(res => {
                            console.log("===")
                            res.items.forEach((item) => {
                                if (item.name === `${imageUpload.name + "OldEgg"}`) {
                                    getDownloadURL(item).then((url) => {
                                        type Product = {
                                            name: string,
                                            category: string,
                                            subcategory: string,
                                            price: string,
                                            email: string,
                                            description: string,
                                            image: string,
                                            stock: string,
                                            rating: string,
                                            detail: string,
                                            shopid: string,
                                        }
                                        shopData.forEach(element => {
                                            console.log(element)
                                            if (element.email === currUser.email) {
                                                const newProduct: Product = {
                                                    name: name,
                                                    category: category,
                                                    subcategory: subCategory.toString(),
                                                    price: price.toString(),
                                                    email: currUser.email,
                                                    description: desc,
                                                    image: url,
                                                    stock: stock.toString(),
                                                    rating: "0",
                                                    detail: detail,
                                                    shopid: element.ID.toString()

                                                }
                                                console.log(newProduct)
                                                axios.post('http://localhost:9998/createproduct', newProduct).then(res => {
                                                    console.log(res)
                                                    if (res.data.error) {
                                                        alert(res.data.error)
                                                    } else {
                                                        alert(res.data.message)
                                                    }
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                            }
                                        });
                                    });
                                }

                            })


                        }).catch(err => {
                            console.log(err)
                        })
                        console.log("asdasd")

                    }


                    }>Submit</button>
                </div>
            </div>
        </div>
    )
}
