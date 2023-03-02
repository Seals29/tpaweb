import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import { ThemeContext } from "@/theme/theme";
import { faBookBookmark, faBookmark, faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from "@/styles/wishlist.module.css"
export default function wishlist(props: any) {
    const [currUser, setCurrUser] = useState([])
    const routers = useRouter()
    const { theme } = useContext(ThemeContext)
    const { wishlists } = props
    const [yourWishlist, setYourWishList] = useState([])
    useEffect(() => {

        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
            axios.get(`http://localhost:9998/getwishlistbyid/${res.data.user.ID}`).then(resp => {

                setYourWishList(resp.data)
                console.log(resp.data)
            }).catch(err => {
                console.log(err)
            })

        }).catch(err => {
            console.log(err)
            routers.push('/home')
        })

    }, [])
    const [activeTab, setActiveTab] = useState("your");
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    console.log(wishlists)
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <div style={{ backgroundColor: theme.background2 }}>
                <nav>
                    <ul className={style.wishlistnavbar}>
                        {/* onClick={() => handleTabClick("allproduct") */}
                        <li onClick={(e) => { handleTabClick("your") }} className={activeTab === "your" ? style.activetab : ""} style={{ color: theme.text }}><FontAwesomeIcon icon={faBookBookmark} />Your WishList</li>
                        <li onClick={(e) => { handleTabClick("public") }} className={activeTab === "public" ? style.activetab : ""} style={{ color: theme.text }}><FontAwesomeIcon icon={faBookBookmark} />Public WishList</li>
                        <li onClick={(e) => { handleTabClick("following") }} className={activeTab === "following" ? style.activetab : ""} style={{ color: theme.text }}><FontAwesomeIcon icon={faBookBookmark} />Following WishList</li>
                    </ul>
                </nav>
                <div style={{ textAlign: 'center', paddingBottom: '25px' }}>
                    <h1>Your Wishlist</h1>
                </div>
                <div className={style.wishbtn}><button onClick={(e) => { routers.push("/home/user/newwishlist") }} style={{ backgroundColor: theme.background, color: theme.text }}><FontAwesomeIcon icon={faPlus} />{' '}New Wishlist</button></div>
                <div className={activeTab === "your" ? "" : ""} style={{ display: activeTab === "your" ? "block" : "none", paddingBottom: '80px' }}>
                    <div className={yourWishlist.length == 0 ? style.activeyour : style.inactiveyour}
                        style={{ backgroundColor: theme.background, margin: '50px', marginBottom: '0px',color:theme.text }}
                    >{"Currently you don't have any Wishlist"}</div>
                    <div className={style.wishlistmain} style={{display:yourWishlist.length==0?'none':""}}>
                        {wishlists.map((item:any)=>(
                            <div className={style.wishlistcontainer}
                            style={{backgroundColor:theme.background, color:theme.text}}
                            >
                                {item.image}
                                <h2 style={{color:theme.text}}>{item.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div style={{ backgroundColor: theme.background, margin: '0' }} >
                    <div className={style.cardcontainers} style={{backgroundColor:theme.background}}>
                        {allProducts.map((idx: any) => (
                            <div className={style.usercontainer} onClick={(e) => {
                                e.preventDefault()
                                console.log(idx.ID)
                                routers.push(`home/user/product/${idx.ID}`)
                            }} style={{backgroundColor:theme.background, cursor:'pointer'}}>
                                <Card name={idx.name} image={idx.image} description={idx.description} rating={idx.rating} category={idx.category} detail={idx.detail} stock={idx.stock} price={idx.price} />
                            </div>
                        ))}
                    </div>
                </div> */}






                <div className={activeTab === "public" ? "" : ""} style={{ display: activeTab === "public" ? "block" : "none" }}>
                    asdasdasdsa
                </div>
                <div className={activeTab === "following" ? "" : ""} style={{ display: activeTab === "following" ? "block" : "none" }}>
                    asdasdasdsa
                </div>
            </div>
            {/* <footer> */}
            <HomeFooter />
            {/* </footer> */}
        </div>

    )
}
export async function getStaticProps(context: any) {

    const res = await axios.get(`http://localhost:9998/getallwishlist`)

    const wishlists = res.data
    return {
        props: {
            wishlists
        }
    }
}
{/* <nav >
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

            </nav> */}