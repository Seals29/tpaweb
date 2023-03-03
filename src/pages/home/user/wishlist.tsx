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
import WishList from "@/pages/components/wishlist";
export default function wishlist(props: any) {
    const [currUser, setCurrUser] = useState([])
    const routers = useRouter()
    const { theme } = useContext(ThemeContext)
    const { wishlists,publicWishlists } = props
    const [yourWishlist, setYourWishList] = useState([])
    const [followedList, setFollowedList] = useState([])
    const [followedWishList, setFollowedWishList] = useState([])
    // console.log(publicWishlists)
    useEffect(() => {

        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            // console.log(res.data.user)
            setCurrUser(res.data.user)
            axios.get(`http://localhost:9998/getwishlistbyid/${res.data.user.ID}`).then(resp => {

                setYourWishList(resp.data)
                console.log(resp.data)
            }).catch(err => {
                console.log(err)
            })
            axios.get(`http://localhost:9998/GetFollowWishListByUserId/${res.data.user.ID}`).then(resps=>{
                console.log(resps);
                setFollowedList(resps.data)
                resps.data.map((e:any)=>{
                    // console.log()
                    axios.get(`http://localhost:9998/GetFollowedWishListByWishListID/${e.wishlistid}`).then(res=>{
                        console.log(res) 
                        setFollowedWishList((prevState)=>[...prevState,res.data])
                        // const jsonOb = JSON.parse(event.data)
                        // console.log(jsonOb)
                        // const dateTime = new Date(jsonOb.CreatedAt);
                        // console.log(dateTime.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
                        // setMessages((prevstate) => [...prevstate, jsonOb])
                    }).catch(err=>{
                        console.log(err)
                    })

                    
                })
            }).catch(err=>{
                console.log(err)
            })
            // axios.post("h")
        }).catch(err => {
            // console.log(err)
            routers.push('/home')
        })

    }, [])
    console.log(followedWishList)
    const uniqueFollolwedWishList = followedWishList.filter((item,index,self)=> index === self.findIndex((i)=>i.ID===item.ID))
    console.log(uniqueFollolwedWishList)
    // const uniqueItems = items.filter(
        // (item, index, self) => index === self.findIndex((i) => i.id === item.id)
    //   );
    const [activeTab, setActiveTab] = useState("Your WishList");
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    // console.log(wishlists)
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <div style={{ backgroundColor: theme.background2 }}>
                <nav>
                    <ul className={style.wishlistnavbar}>
                        {/* onClick={() => handleTabClick("allproduct") */}
                        <li onClick={(e) => { handleTabClick("Your WishList") }} className={activeTab === "Your WishList" ? style.activetab : ""} style={{ color: theme.text }}><FontAwesomeIcon icon={faBookBookmark} />Your WishList</li>
                        <li onClick={(e) => { handleTabClick("Public WishList") }} className={activeTab === "Public WishList" ? style.activetab : ""} style={{ color: theme.text }}><FontAwesomeIcon icon={faBookBookmark} />Public WishList</li>
                        <li onClick={(e) => { handleTabClick("Following WishList") }} className={activeTab === "Following WishList" ? style.activetab : ""} style={{ color: theme.text }}><FontAwesomeIcon icon={faBookBookmark} />Following WishList</li>
                    </ul>
                </nav>
                <div style={{ textAlign: 'center', paddingBottom: '25px',color:theme.text }}>
                    <h1>{activeTab}</h1>
                </div>
                <div className={style.wishbtn}><button onClick={(e) => { routers.push("/home/user/newwishlist") }} style={{ backgroundColor: theme.background, color: theme.text }}><FontAwesomeIcon icon={faPlus} />{' '}New Wishlist</button></div>
                <div className={activeTab === "Your WishList" ? "" : ""} style={{ display: activeTab === "Your WishList" ? "block" : "none", paddingBottom: '80px' }}>
                    <div className={yourWishlist.length == 0 ? style.activeyour : style.inactiveyour}
                        style={{ backgroundColor: theme.background, margin: '50px', marginBottom: '0px',color:theme.text }}
                    >{"Currently you don't have any Wishlist"}</div>
                    <div className={style.wishlistmain} style={{display:yourWishlist.length==0?'none':""}}>
                        {wishlists.map((item:any)=>{
                            if (item.userid ===currUser.ID){
                                return(
                                    <div>
                                        <WishList id={item.ID}name={item.name} image={""} statuslist={item.status} follow={""} /></div>
                                   
                                )
                            }
                        })}
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






                <div className={activeTab === "Public WishList" ? "" : ""} style={{ display: activeTab === "Public WishList" ? "block" : "none" }}>
                <div className={publicWishlists.length == 0 ? style.activeyour : style.inactiveyour}
                        style={{ backgroundColor: theme.background, margin: '50px', marginBottom: '0px',color:theme.text }}
                    >{"Currently you don't have any Wishlist"}</div>
                    <div className={style.wishlistmain} style={{display:publicWishlists.length==0?'none':""}}>
                        <>
                            {publicWishlists.map((item:any)=>{
                                const followed = uniqueFollolwedWishList.find((f: any) => f.ID === item.ID);
                                const follow = followed?"Followed":"Follow"
                                  return <WishList id={item.ID} name={item.name}
                                   image={""} statuslist={item.status}
                                   follow={follow} />;
                            })}
                        </>
                                    
   
                    </div>
                </div>
                <div className={activeTab === "Following WishList" ? "" : ""} style={{ display: activeTab === "Following WishList" ? "block" : "none" }}>
                <div className={publicWishlists.length == 0 ? style.activeyour : style.inactiveyour}
                        style={{ backgroundColor: theme.background, margin: '50px', marginBottom: '0px',color:theme.text }}
                    >{"Currently you don't have any Wishlist"}</div>
                    <div className={style.wishlistmain} style={{display:publicWishlists.length==0?'none':""}}>
                        {uniqueFollolwedWishList.map((item:any)=>(
                            <WishList 
                               
                            id={item.ID}name={item.name} image={""} statuslist={item.status}follow={"Followed"} />
                        ))}
                    </div>
                </div>
            </div>
            <HomeFooter />
        </div>

    )
}
export async function getStaticProps(context: any) {

    const res = await axios.get(`http://localhost:9998/getallwishlist`)
    const res2 = await axios.get(`http://localhost:9998/getpublicwishlist`)
    const wishlists = res.data
    const publicWishlists = res2.data
    return {
        props: {
            wishlists,
            publicWishlists
        }
    }
}