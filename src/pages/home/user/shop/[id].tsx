import Navbar from "@/pages/HomePage/Navbar";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useContext, useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
import Link from "next/link";
import Pagination from "@/pages/components/pagination";

import { faArrowCircleLeft, faBackward, faBackwardFast, faBackwardStep, faBattery3, faBatteryCar, faCarTunnel, faCompactDisc, faComputer, faComputerMouse, faFootball, faGamepad, faHeadphones, faKeyboard, faNetworkWired, faPrint, faRoute, faSnowplow, faStar, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import HomeFooter from "@/pages/HomePage/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebookF, faInstagramSquare, faLinkedinIn, faPinterestSquare, faTiktok, faTwitch, faTwitter, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { ThemeContext } from "@/theme/theme";
import Card from "@/pages/components/card";
export default function main(props: any) {
    // const {}
    const { products, shop, category, reviewShop, CurrShopCategory } = props;
    const [currProducts, setCurrProducts] = useState([])
    console.log(reviewShop);

    console.log(products)
    console.log(shop)
    console.log(category)
    const { theme } = useContext(ThemeContext)
    const [currUser, setCurrUser] = useState([])
    const routers = useRouter()
    console.log(routers)
    const shopId = routers.query.name
    const [allShop, setAllShop] = useState([])
    const [currShop, setCurrShop] = useState([])
    const [allCategory, setAllCategory] = useState([])
    const [allShopCategory, setAllShopCategory] = useState([])
    const [uniqueCategory, setUniqueCategory] = useState([])
    const [recommendedData, setRecommendedData] = useState([])

    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        axios.get("http://localhost:9998/getallcategory").then(res => {
            console.log(res.data)
            // setAllCategory(res.data)
            // setAllShopCategory(res.data.name)
            const categoryNames = res.data.map((category: any) => category.name)
            setAllShopCategory((prevState: any) => [...prevState, ...categoryNames])

        }).catch(err => {
            console.log(err)
        })
        setCurrProducts(products)
        setRecommendedData([...products].sort((a, b) => a.rating - b.rating))
    }, [])
    const [search, setSearch] = useState([])
    const uniqueCategories = [...new Set(allShopCategory)];
    console.log(uniqueCategories)
    const [categories, setCategories] = useState([])
    const [activeTab, setActiveTab] = useState("home")
    // console.log(sortedascproduct);
    const sortedData = [...products].sort((a, b) => a.price - b.price)
    const descSortedData = [...products].sort((a, b) => b.price - a.price)
    const recomData = [...products].sort((a, b) => a.rating - b.rating)
    console.log(sortedData);
    const [rating, setRating] = useState([])
    const [reviews, setReviews] = useState([])
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleReview = (e: any) => {
        const userid = currUser.ID.toString()
        const shopid = shop.ID.toString()
        const review = reviews
        const data = {
            UserID: userid,
            ShopID: shopid,
            Review: review,
            Rating: rating.toString(),
        }
        axios.post("http://localhost:9998/newreviewshop", data).then(res => {
            console.log(res);

        }).catch(err => {
            console.log(err);

        })
        console.log(data);

    }
    useEffect(() => {

        // setFilteredReview(shopReviews.filter((rev: any) =>
        //     rev.reviewcomment.includes(search) ||
        //     String(rev.starreview) === (search) ||
        //     rev.reviewcomment.includes(search) ||
        //     rev.reviewcomment.includes(search) ||
        //     rev.reviewcomment.includes(search)
        // ))
        setCurrProducts(products.filter((pr: any) =>
            pr.name.includes(search)
        ))
    }, [search])
    return (
        <>
            <header style={{ color: '' }}>
                <Navbar />
            </header>
            <div style={{
                backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center', display: `${currUser.isban ? "" : "none"}`
            }}>Your account is banned!</div>
            <div style={{
                color: theme.text, backgroundColor: theme.background,

                display: currUser.isban === true ? "none" : "flex", alignItems: 'center'
            }}>
                <div className={style.circleimg} style={{ color: theme.text }}>
                    <img src={shop.banner} alt={shop.name} />
                </div>
                <div style={{ marginLeft: '20px', color: theme.text, alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold' }}>{shop.name} STORE</div>
                    <div style={{ display: 'flex', gap: '25px' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {shop.sales}
                            <div> Sales</div>
                        </div>
                        |
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {shop.followers}
                            <div>Followers</div>
                        </div>
                        |
                        <div style={{ display: 'flex', gap: '5px' }}>
                            {/* {shop.rating} {"(" + (shop.sales/shop.) + ")"} */}
                            {shop.rating}
                            <div><FontAwesomeIcon icon={faStar} /></div>
                        </div>
                    </div>
                    <div style={{ gap: '5px' }} className={style.buttonflwchat}>
                        <button>Follow!</button>
                        <button onClick={(e) => {
                            e.preventDefault()
                            routers.push(`/chat/shop/${shop.ID}`)
                        }}>Chat!</button>
                    </div>
                </div>
            </div>
            <nav >
                <ul style={{ height: '55px', display: 'flex', backgroundColor: theme.background, justifyContent: 'space-evenly' }}>
                    <li
                        className={activeTab === "home" ? style.activetab : ""}
                        onClick={() => handleTabClick("home")}
                        style={{ listStyle: 'none', color: theme.text, background: theme.background }}
                    > Store home</li>
                    <li style={{ listStyle: 'none', color: theme.text, background: theme.background }}>|</li>
                    <li style={{ listStyle: 'none', color: theme.text, background: theme.background }}
                        className={activeTab === "allproduct" ? style.activetab : ""}
                        onClick={() => handleTabClick("allproduct")}
                    >AllProducts</li>
                    <li style={{ listStyle: 'none', color: theme.text, background: theme.background }}>|</li>
                    <li style={{ listStyle: 'none', color: theme.text, background: theme.background }}
                        className={activeTab === "reviews" ? style.activetab : ""}
                        onClick={() => handleTabClick("reviews")}
                    >Reviews</li>
                    <li style={{ listStyle: 'none', color: theme.text, background: theme.background }}>|</li>
                    <li style={{ listStyle: 'none', color: theme.text, background: theme.background }}
                        className={activeTab === "return" ? style.activetab : ""}
                        onClick={() => handleTabClick("return")}
                    >Return Policy</li>
                    <li style={{ listStyle: 'none', color: theme.text, background: theme.background }}>|</li>
                    <li style={{ listStyle: 'none', color: theme.text, background: theme.background }}
                        className={activeTab === "aboutus" ? style.activetab : ""}
                        onClick={() => handleTabClick("aboutus")}
                    >About Us</li>
                </ul>

            </nav>
            <div style={{ display: activeTab === "home" ? "block" : "none" }}>
                <img src={shop.banner} alt="" style={{
                    display: 'flex', justifyContent: 'center',
                    width: '100%', marginRight: '50px', maxHeight: '175px', position: 'relative'
                }} />
                <div>
                    <h1 style={{ color: theme.text, backgroundColor: theme.background2 }}>

                        <div style={{ color: theme.text, marginLeft: '50px', fontSize: '50px', fontWeight: 'bolder' }}>Shop by Category
                            <br />
                            <br />
                        </div>
                    </h1>
                    <div style={{
                        display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
                        textAlign: 'center', alignItems: 'center',
                        justifyContent: 'center', backgroundColor: theme.background2
                    }}>
                        {CurrShopCategory.map((e: any) => (
                            <div className={style.categorycard} style={{ backgroundColor: theme.background }}>
                                <div className={style.categorycardinfo} >
                                    <h1 style={{ color: theme.text, fontWeight: 'bold', fontSize: '35px' }}>{e}</h1>




                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
            <h1 style={{
                color: theme.text,
                backgroundColor: theme.background,
                display: activeTab === "home" ? '' : 'none'
            }}>Recommended Products</h1><br />

            <div className={style.cardcontainers} style={{
                color: theme.text,
                backgroundColor: theme.background,
                display: activeTab === "home" ? '' : 'none'
            }}>
                {recommendedData.map((idx: any) => (
                    <div className={style.usercontainer} onClick={(e) => {
                        e.preventDefault()
                        console.log(idx.ID)
                        routers.push(`/home/user/product/${idx.ID}`)
                    }} style={{ backgroundColor: theme.background, cursor: 'pointer' }}>
                        <Card name={idx.name} image={idx.image} description={idx.description} rating={idx.rating} category={idx.category} detail={idx.detail} stock={idx.stock} price={idx.price} />
                    </div>
                ))}
                {/* {isLoading && <div>Loading...</div>} */}
                {/* <div ref={ref => ref && window.addEventListener('scroll', handleScroll)}> </div> */}
            </div>
            <div style={{ display: activeTab === "allproduct" ? "block" : "none", backgroundColor: theme.background2 }}>
                <br />
                <br />
                <br />
                <div className={style.allproductcontainer} style={{ backgroundColor: theme.background }}>
                    <div>
                        <h2 onClick={(e) => {
                            setCurrProducts(sortedData)
                        }}>Sort By Asc</h2>
                        <h2 onClick={(e) => {
                            setCurrProducts(descSortedData)
                        }}>Sort By Desc</h2>
                        <h2>Search <input type="text" value={search} onChange={(event: any) => {
                            event.preventDefault()
                            setSearch(event.target.value)
                        }} /></h2>
                    </div>
                    <div className={style.cardcontainers} style={{ backgroundColor: theme.background }}>
                        {currProducts.map((idx: any) => (
                            <div className={style.usercontainer} onClick={(e) => {
                                e.preventDefault()
                                console.log(idx.ID)
                                routers.push(`/home/user/product/${idx.ID}`)
                            }} style={{ backgroundColor: theme.background, cursor: 'pointer' }}>
                                <Card name={idx.name} image={idx.image} description={idx.description} rating={idx.rating} category={idx.category} detail={idx.detail} stock={idx.stock} price={idx.price} />
                            </div>
                        ))}
                        {/* {isLoading && <div>Loading...</div>} */}
                        {/* <div ref={ref => ref && window.addEventListener('scroll', handleScroll)}> </div> */}
                    </div>
                </div>
            </div>
            {/* <div style={{ display: 'flex', justifyContent: 'space-evenly', color: theme.text, backgroundColor: theme.background }}>
                <div style={{ color: theme.text, backgroundColor: theme.background }} className={activeTab === "home" ? style.activetab : ""}>
                   
                </div>
                <div style={{ color: theme.text }}>
                    {'|'}
                </div>

                <div style={{ color: theme.text, backgroundColor: theme.background }} className={activeTab === "home" ? style.activetab : ""}>
                    All Products
                </div>
                |
                <div style={{ color: theme.text, backgroundColor: theme.background }} className={activeTab === "home" ? style.activetab : ""}>
                    Reviews </div>
                |
                <div style={{ color: theme.text, backgroundColor: theme.background }} className={activeTab === "home" ? style.activetab : ""}>
                    Return Policy
                </div>
                |
                <div style={{ color: theme.text, backgroundColor: theme.background }} className={activeTab === "home" ? style.activetab : ""}>
                    About Us</div>
            </div>
            <img src={shop.banner} alt="" style={{ width: '100%', height: '140px' }} />
            <div style={{ background: theme.background2 }}>
                <div style={{ fontWeight: 'bold', fontSize: '25px', color: theme.text, background: theme.background2, marginLeft: '50px' }}>
                    Shop By Category
                </div>
            </div> */}
            <div style={{ display: activeTab === "reviews" ? "block" : "none", backgroundColor: theme.background2 }}>

                <div> <h1 style={{
                    padding: '15px'
                }}>Reviews1</h1></div>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.background2,
                padding: '15px', gap: '35px'
            }}>
                <input type="text" style={{
                    maxWidth: '35%',
                    padding: '15px',
                    fontSize: '13px'
                }} placeholder={"Input Your Review"} onChange={(e) => {
                    setReviews(e.target.value)
                }} />
                <input type="number" min={1} max={5} step={1} style={{
                    maxWidth: '15%',
                    padding: '10px',
                    fontSize: '20px'
                }} placeholder={"Rate your Rating!"} onChange={(e: any) => {
                    setRating(e.target.value)
                }} />
                <button style={{
                    padding: '15px',
                    maxWidth: '20%',
                    backgroundColor: theme.background,
                    color: theme.text
                }} onClick={handleReview}>Save</button>

                <div>
                    <h1>All Reviews!</h1>
                </div>
                {reviewShop.map((event: any) => (
                    <div>
                        {event.reviewcomment}

                    </div>
                ))}
            </div>
            <footer style={{ position: 'sticky' }}>
                <HomeFooter />
            </footer>

        </>
    )




}
export async function getStaticPaths() {
    try {
        const res = await axios.get(`http://localhost:9998/getshop`)
        const allShops = await res.data;
        console.log(allShops)
        const paths = allShops.map((shop: any) => ({
            params: {
                id: String(shop.ID),
            },
        }));
        return {
            paths,
            fallback: true,
        };
    } catch (error) {
        alert(error)
        return {
            notFound: true,
        };
    }

}

export async function getStaticProps(context: any) {
    const { id } = context.params;
    const res = await axios.get(`http://localhost:9998/getallproductbyshop/${id}`)
    //dapatin shop saat ini
    // const routers = useRouter()
    // const shopid = routers.query.id
    const res2 = await axios.get(`http://localhost:9998/getsingleshop/${id}`)
    //get all category
    const products = await res.data;
    const res3 = await axios.get(`http://localhost:9998/getreviewbyshopid?shopid=${id}`)
    const reviewShop = await res3.data;
    const res4 = await axios.get(`http://localhost:9998/getproductcategory/${id}`)

    const CurrShopCategory = await res4.data;

    const shop = await res2.data
    // const category = await res3.data
    return {
        props: {
            products,
            shop,
            reviewShop,
            CurrShopCategory
            // category
        }
    }
}

