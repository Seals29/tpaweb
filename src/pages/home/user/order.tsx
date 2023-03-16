import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import style from "@/styles/order.module.css";
import { ThemeContext } from "@/theme/theme";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
export default function order(props: any) {
    const { theme } = useContext(ThemeContext)
    const [currUser, setCurrUser] = useState([])
    const routers = useRouter()
    const { shops } = props
    console.log(shops);
    const [allShopOrders, setAllShopOrders] = useState([])
    const [allNewShopOrders, setAllNewShopOrders] = useState([])
    const [search, setSearch] = useState([])
    useEffect(() => {
        setAllNewShopOrders(allShopOrders.filter((order: any) =>
            order.invoice.includes(search) ||
            order.shopname.includes(search) ||
            order.address.includes(search) ||
            order.receiver.includes(search)
        ))
    }, [search])
    useEffect(() => {
        const cookies = Cookies.get('token')

        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        const data = {
            JwtToken: cookies,
        }

        axios.post("http://localhost:9998/getallordersbyuserid", data).then(res => {
            console.log(res);

            res.data.forEach((elemet: any) => {
                console.log(elemet);

                const shop = shops.find((s) => s.ID === elemet.shopid);
                // console.log(shop);
                // obj.shopname = shop.name; // add shopname property to obj
                elemet.shopname = shop.name
                console.log(elemet);


            });
            setAllShopOrders(res.data)
            setAllNewShopOrders(res.data)
        }).catch(err => {
            console.log(err);

        })
    }, [])
    console.log(allShopOrders);
    return (
        <div>
            <Navbar />

            <div className={style.ordercontainer}>
                <h2>Orders List</h2>
                <h4 onClick={(event: any) => {
                    const filtered = allShopOrders.filter((ord) => (ord.status === "Open"))
                    setAllNewShopOrders(filtered)
                }}>Filter by Open</h4>
                <h4 onClick={(event: any) => {
                    const filtered = allShopOrders.filter((ord) => (ord.status === "Cancelled"))
                    setAllNewShopOrders(filtered)
                }}>Filter by Cancelled</h4>
                <h4 onClick={(event: any) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    console.log(weekAgo);
                    const curDate = new Date(allShopOrders[1].CreatedAt);
                    console.log(curDate);
                    console.log(curDate > weekAgo);
                    console.log(curDate < weekAgo);
                    

                    

                    const filtered = allShopOrders.filter((ord) => new Date(ord.CreatedAt) > weekAgo)
                    setAllNewShopOrders(filtered)
                }}>Filter by last 7 days</h4>
                <input type="text" style={{ color: theme.text, backgroundColor: theme.back }} onChange={(event: any) => {
                    setSearch(event.target.value)
                }} />

                <hr />
                {allNewShopOrders.map((e: any) => (
                    <div className={style.orderform} style={{ color: theme.text }}>
                        <div>
                            {e.CreatedAt}
                        </div>
                        {e.receiver}
                        <div className={style.head} style={{ color: theme.text }}><div>{e.invoice}</div><div>{e.status}</div></div>
                        <div className={style.head}>
                            <div>
                                Total Items
                            </div>

                        </div>
                        <div className={style.head}>
                            <div>
                                {e.shopname}
                            </div>
                            <div>
                                <button onClick={(event: any) => {
                                    console.log(e.shopid);
                                    routers.push(`/home/user/chatseller/${e.ID}`)
                                }}>
                                    Chat Now!
                                    {/* {e.shopname} */}
                                </button>
                                <button onClick={(event: any) => {
                                    console.log(e);
                                    const cookies = Cookies.get('token')
                                    const data = {
                                        OrderID: e.ID.toString(),
                                        JwtToken: cookies
                                    }
                                    axios.post("http://localhost:9998/getorderdetailbyorderid", data).then(res => {
                                        console.log(res);

                                    })
                                }}>
                                    Buy Again!(add all to cart)
                                </button>
                            </div>

                        </div>

                    </div>
                )
                )}
                {/* {allShopOrders.length === 0 ? "There is no order!" : ""} */}
                {currUser.role === "Seller" ? allNewShopOrders.length === 0 ? "You have no order yet!" : "" : allNewShopOrders.length === 0 ? "You don't have any order yet" : ""}
                {/* {allShopOrders.map((e:any)=>(
                <div className={style.orderform}  style={{color:theme.text}}>
                    {e.receiver}
                    <div className={style.head} style={{color:theme.text}}><div>Order ID</div><div>{e.status}</div></div>
                    <div className={style.head}>
                        <div>
                            Total Items
                        </div>
                        <div>
                            {e.producttotal}
                        </div>
                    </div>
                </div>

            ))} */}
            </div>

            <HomeFooter />
        </div>
    )
}
export async function getStaticProps() {

    const res = await axios.get(`http://localhost:9998/getshop`)
    const shops = await res.data


    return {
        props: {
            shops
        }
    }
}