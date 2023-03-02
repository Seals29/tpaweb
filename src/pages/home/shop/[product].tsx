import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useContext, useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
import { ThemeContext } from "@/theme/theme";
import Navbar from "@/pages/HomePage/Navbar";
import Cookies from "js-cookie";
import { storage } from "@/pages/firebase/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
export default function loginonetimePage() {
    const [currUser, setCurrUser] = useState([])
    const router = useRouter();
    const [name, setName] = useState('')
    const [data, setData] = useState([])
    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
        })
        console.log(router.query.product)
        const data = {
            ProductID:
                router.query.product
        }
        axios.post('http://localhost:9998/getdetailproduct', data).then(res => {
            console.log(res)
            setData(res.data)
            setData(res.data)
            setDetail(res.data.detail)
            setDescription(res.data.description)
            setName(res.data.name)
            setCategory(res.data.category)
            setStock(res.data.stock)
            setPrice(res.data.price)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const { theme } = useContext(ThemeContext)
    const [pass, setPass] = useState("");
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [stock, setStock] = useState('')
    const [detail, setDetail] = useState('')
    const [imageUpload, setImageUpload] = useState(null)
    console.log(router);
    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div style={{ minHeight: '100vh', maxHeight: '100vh' }}>
                <div className={style.containerform}>


                    <img src={data.image} alt="" style={{ marginTop: '75px', width: '300px', height: '200px' }} />
                    <label >Image</label>
                    <input type="file" placeholder="" accept="image/png, image/jpeg" onChange={(e: any) => {
                        setImageUpload(e.target.files[0])
                    }} /><br />
                    <br />
                    <label>Name:</label>
                    <input type="text" placeholder={data.name} value={name} defaultValue={data.name} onChange={(e) => {
                        setName(e.target.value)
                    }} /><br /><br />
                    <label >Category:</label>

                    <input type="text" placeholder={data.category} value={category} defaultValue={data.category} onChange={(e) => {
                        setCategory(e.target.value)
                    }} /><br /><br />
                    <label >Description</label>
                    <input type="text" value={description} defaultValue={data.description} onChange={(e) => {
                        setDescription(e.target.value)
                    }} /><br />
                    <br />
                    <label >Detail</label>
                    <input type="text" placeholder="Shop Password" value={detail} defaultValue={data.detail} onChange={(e) => {
                        setDetail(e.target.value)
                    }} /><br />
                    <br />
                    <label >Price</label>
                    <input type="number" placeholder="Shop Password" value={price} defaultValue={data.price} onChange={(e) => {
                        setPrice(e.target.value)
                    }} /><br />
                    <br />
                    <label >Stock</label>
                    <input type="number" placeholder="Shop Password" value={stock} defaultValue={data.stock} onChange={(e) => {
                        setStock(e.target.value)
                    }} /><br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'row', minWidth: '50px', margin: '15px', marginBottom: '75px', gap: '25px' }}>
                        <button onClick={(e: any) => {

                            type Product = {
                                productid: string
                                name: string,
                                category: string,
                                price: string,
                                email: string,
                                description: string,
                                image: string,
                                stock: string,
                                detail: string
                            }
                            e.preventDefault()
                            if (imageUpload == null) {
                                console.log("kosong")
                                const newProductChanges: Product = {
                                    productid: router.query.product?.toString(),
                                    name: name,
                                    category: category,
                                    price: price.toString(),
                                    email: currUser.email,
                                    description: description,
                                    image: "",
                                    stock: stock.toString(),
                                    detail: detail,
                                }
                                axios.post("http://localhost:9998/updateproduct", newProductChanges).then(res => {
                                    console.log(res)
                                    if (res.data.error) {
                                        alert(res.data.error)
                                    } else {
                                        alert(res.data.message)
                                    }
                                }).catch(err => {
                                    console.log(err)
                                })
                            } else {
                                const imageRef = ref(storage, `shopProduct/${currUser.firstname}/${imageUpload.name + "OldEgg"}`);

                                uploadBytes(imageRef, imageUpload).then(res => {
                                    console.log(res)
                                }).catch(err => {
                                    console.log(err)
                                    return
                                })
                                const imageListReff = ref(storage, `shopProduct/${currUser.firstname}/`)
                                listAll(imageListReff).then(res => {
                                    console.log("===")
                                    console.log(res)
                                    console.log(router.query.product)
                                    res.items.forEach((item) => {
                                        if (item.name === `${imageUpload.name + "OldEgg"}`) {
                                            getDownloadURL(item).then((url) => {
                                                const newProductChanges: Product = {
                                                    productid: router.query.product?.toString(),
                                                    name: name,
                                                    category: category,
                                                    price: price.toString(),
                                                    email: currUser.email,
                                                    description: description,
                                                    image: url,
                                                    stock: stock.toString(),
                                                    detail: detail
                                                }
                                                axios.post("http://localhost:9998/updateproduct", newProductChanges).then(res => {
                                                    console.log(res)
                                                    if (res.data.error) {
                                                        alert(res.data.error)
                                                    } else {
                                                        alert(res.data.message)
                                                    }
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                            }).catch(err => {
                                                return
                                            })
                                        }
                                    })
                                })
                            }
                        }}
                        >Submit</button>
                        <button onClick={(e: any) => {
                            e.preventDefault()
                            const data = {
                                ProductID:
                                    router.query.product
                            }
                            axios.post('http://localhost:9998/getdetailproduct', data).then(res => {
                                console.log(res)
                                setData(res.data)
                                setDetail(res.data.detail)
                                setDescription(res.data.description)
                                setName(res.data.name)
                                setCategory(res.data.category)
                                setStock(res.data.stock)
                                setPrice(res.data.price)

                            }).catch(err => {
                                console.log(err)
                            })
                        }}>Reset Changes</button>
                    </div>
                </div>
            </div>
        </div >
    )
}