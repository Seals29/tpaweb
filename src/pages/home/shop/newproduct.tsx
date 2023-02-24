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
    const [shopid, setShopid] = useState("")
    const [shopData, setShopData] = useState([])
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

    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div style={{ minHeight: '100vh', maxHeight: '100vh', backgroundColor: 'blue' }}>
                <div className={style.containerform}>
                    <label>Product:</label>
                    <input type="text" placeholder="Product Name" onChange={(e) => {
                        setName(e.target.value)
                    }} /><br /><br />
                    <label >Product Category</label>
                    <select id="selectOption" value={category} onChange={(e) => {
                        console.log(e.target.value)
                        setCategory(e.target.value)
                    }}>
                        <option value="">--Please choose an option--</option>
                        <option value="Components & Storage">Components & Storage</option>
                        <option value="Computer Systems">Computer Systems</option>
                        <option value="Computer Peripherals">Computer Peripherals</option>
                        <option value="Computer Systems">Computer Systems</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Software & Services">Software & Services</option>
                        <option value="Networking">Networking</option>
                        <option value="Office Solutions">Office Solutions</option>
                        <option value="Automotive & Industrial">Automotive & Industrial</option>
                        <option value="Home & Tools">Home & Tools</option>
                        <option value="Health & Sports">Health & Sports</option>
                        <option value="Apparel & Accessories">Apparel & Accessories</option>
                        <option value="Toys, Drones & Maker">Toys, Drones & Maker</option>
                    </select>
                    <label >Product Image</label>
                    <input type="file" placeholder="Product Image" onChange={(e: any) => {
                        setImageUpload(e.target.files[0])
                    }} accept="image/png, image/jpeg" /><br />
                    <br />
                    <label >Product Description:</label>
                    <input type="text" placeholder="Description" onChange={(e: any) => {
                        setDesc(e.target.value)

                    }} /><br />
                    <br />
                    <label >Product Price:</label>
                    <input type="number" placeholder="Price" onChange={(e: any) => {
                        setPrice(e.target.value)

                    }} /><br />
                    <br />
                    <label >Product Stock:</label>
                    <input type="number" placeholder="Stock" onChange={(e: any) => {
                        setStock(e.target.value)
                    }} /><br />
                    <br />
                    <label >Product Detail:</label>
                    <input type="text" placeholder="Detail" onChange={(e: any) => {
                        setDetail(e.target.value)
                    }} /><br />
                    <br />
                    <button onClick={() => {
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
