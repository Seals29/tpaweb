import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from "@/styles/review.module.css"
import { ThemeContext } from "@/theme/theme";
export default function viewreviews() {
    const [shops, setShops] = useState([])
    const [currUser, setCurrUser] = useState([])
    const routers = useRouter()
    const [shopReviews, setShopReviews] = useState([])
    const [search, setSearch] = useState([])
    const { theme } = useContext(ThemeContext)
    useEffect(() => {

        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
            axios.get(`http://localhost:9998/getshopidbyuserid?userid=${res.data.user.ID}`).then(res2 => {
                console.log(res2);
                axios.get(`http://localhost:9998/getreviewbyshopid?shopid=${res2.data.ID}`).then(res3 => {
                    console.log(res3);
                    setShopReviews(res3.data)
                    setFilteredReview(res3.data)
                    console.log(new Date(res3.data[0].CreatedAt));

                }).catch(err => {
                    console.log(err);

                })
            }).catch(err => {
                console.log(err);

            })
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })

    }, [])
    const [filteredReview, setFilteredReview] = useState([])
    useEffect(() => {
        console.log(shopReviews.filter((rev: any) =>
            rev.reviewcomment.includes("")
        ));

        setFilteredReview(shopReviews.filter((rev: any) =>
            rev.reviewcomment.includes(search) ||
            String(rev.starreview) === (search) ||
            rev.reviewcomment.includes(search) ||
            rev.reviewcomment.includes(search) ||
            rev.reviewcomment.includes(search)
        ))
        console.log(shopReviews[0]);
        console.log(search);
        // console.log(reviewcomment);

    }, [search])
    console.log((shopReviews));
    console.log(filteredReview);

    //  setAllNewShopOrders(allShopOrders.filter((order: any) =>
    //     order.invoice.includes(search) ||
    //     order.shopname.includes(search) ||
    //     order.address.includes(search) ||
    //     order.receiver.includes(search)
    // ))

    return (
        <div>
            <header>
                <Navbar />
            </header>

            <div style={{
                padding: '15px'
            }}>
                <h1 style={{ color: theme.text }}>All REviews</h1>
            </div>
            <div style={{
                padding: '15px'
            }}>
                <input type="text" value={search} onChange={(event: any) => {
                    setSearch(event.target.value)
                }} style={{
                    padding: '20px',
                    color: theme.text,
                    backgroundColor: theme.background,
                    borderRadius: '7px', minWidth: '350px'
                }} />
            </div>
            <div style={{
                padding: '15px'
            }} onClick={(event: any) => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                setFilteredReview(shopReviews.filter((rev: any) =>
                    new Date(rev.CreatedAt) < weekAgo
                ));
            }}>
                Filter By Newest First
            </div>

            {filteredReview.map((e: any) => {
                const dateh = new Date(e.CreatedAt).getHours()
                const date = new Date(e)
                const datemin = new Date(e.CreatedAt).getMinutes()
                return (
                    <div className={style.reviewcontainer} >
                        <div className={style.reviewcard} style={{ color: theme.text, border: `1px solid ${theme.text}` }}>
                            <div style={{ color: theme.text }}>
                                Review {e.reviewcomment}
                            </div>
                            <div>Star {e.starreview}</div>
                            <div>By : {e.userid}</div>
                            <div>Date {dateh + ':' + datemin}</div>
                            {/* <div>is Helpful? :{e.ishelpfull.toString()}</div> */}
                        </div>

                    </div>
                )
            })}








            <footer>
                <HomeFooter />
            </footer>
        </div>
    )
}