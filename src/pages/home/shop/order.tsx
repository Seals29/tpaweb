import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import style from "@/styles/order.module.css"
import { ThemeContext } from "@/theme/theme";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
export default function order(props: any) {
    const { theme } = useContext(ThemeContext)
    const [currUser, setCurrUser] = useState([])
    const [allShopOrders, setAllShopOrders] = useState([])
    const [allNewShopOrders, setAllNewShopOrders] = useState([])
    const { orders } = props
    console.log(orders);

    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            //   console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
        })
        const data = {
            JwtToken: cookies
        }
        axios.post("http://localhost:9998/getallordersbyshopid", data).then(res => {
            console.log(res);
            setAllShopOrders(res.data)
            setAllNewShopOrders(res.data)
        }).catch(err => {
            console.log(err);

        })
    }, [])

    const routers = useRouter()
    console.log(allShopOrders);

    console.log(currUser);

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
                <hr />
                {allNewShopOrders.map((e: any) => (
                    <div className={style.orderform} style={{ color: theme.text }}>
                        {e.receiver}
                        <div className={style.head} style={{ color: theme.text }}><div>Order ID</div><div>{e.status}</div></div>
                        <div className={style.head}>
                            <div>
                                Total Items
                            </div>
                            <div>
                                {e.producttotal}
                            </div>
                        </div>
                    </div>

                ))}
                {allNewShopOrders.length === 0 ? "You have no order yet!" : ""}
            </div>
            {/* Shoporders */}

            <HomeFooter />
        </div>
    );
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