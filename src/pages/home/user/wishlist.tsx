import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import { ThemeContext } from "@/theme/theme";
import { faBookBookmark, faBookmark, faClose, faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from "@/styles/wishlist.module.css"
import WishList from "@/pages/components/wishlist";
import { Redacted_Script } from "@next/font/google";
import Pagination from "@/pages/components/pagination";
export default function wishlist(props: any) {
    const [currUser, setCurrUser] = useState([])
    const routers = useRouter()
    const { theme } = useContext(ThemeContext)
    const { wishlists, publicWishlists } = props
    const [yourWishlist, setYourWishList] = useState([])
    const [followedList, setFollowedList] = useState([])
    const [followedWishList, setFollowedWishList] = useState([])
    // console.log(publicWishlists)
    const [wishlistInputs, setWishlistInputs] = useState([]);
    const [wishlistSelects, setWishlistSelects] = useState([]);
    const [mainCheck, setMainCheck] = useState(false)
    const [isActiveUpdateTab, setIsActiveUpdateTab] = useState(false);
    const handleInputChange = (ID: any, event: any) => {
        const values = [...wishlistInputs];
        console.log(wishlistInputs)
        wishlistInputs.map((item: any) => {
            console.log(item)
            console.log(ID);

            if (item.id === ID) {
                console.log(item)
                item.name = event.target.value;
                console.log(item)
            }
        })
    }
    const handleMainCheck = (event: any) => {
        if (mainCheck === true) {
            wishlistInputs.map((e) => {
                e.ischeck = true
            })
        }
    }

    const handleCheck = (ID: any, event: any) => {
        wishlistInputs.map((item: any) => {
            console.log(ID)
            if (item.id === ID) {
                console.log(item)
                item.ischeck = event.target.checked
                console.log(item)
            }
        })
    }
    const handleManageSave = (e: any) => {
        e.preventDefault()

        const data = [...wishlistInputs]
        // console.log(data);
        console.log("====")
        wishlistInputs.map(e => {
            if (e.ischeck === true) {
                console.log(e)
                const data = {
                    wishlistid: e.id.toString(),
                    wishlistname: e.name,
                    wishliststatus: e.status,
                }
                console.log(data)
                axios.post("http://localhost:9998/updatewishlistuser", data).then(res => {
                    console.log(res)
                    if (res.data.message) {
                        console.log(res.data.message);

                    }
                    if (res.data.error) {
                        console.log(res.data.error);

                    }
                }).catch(err => {
                    console.log(err)
                })
            }

        })
        // console.log("--")
        alert("Update success!")
        routers.reload()
    }
    const handleSelectChange = (ID: any, event: any) => {
        const values = [...wishlistSelects]
        // console.log(wishlistSelects);
        wishlistInputs.map((item: any) => {
            console.log(ID)
            if (item.id === ID) {
                console.log(item)
                item.status = event.target.value;
                console.log(item)
            }
        })
        // values[index][event.target.value]=event.target.value;
    }
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
            axios.get(`http://localhost:9998/GetFollowWishListByUserId/${res.data.user.ID}`).then(resps => {
                console.log(resps);
                setFollowedList(resps.data)
                resps.data.map((e: any) => {
                    // console.log()
                    axios.get(`http://localhost:9998/GetFollowedWishListByWishListID/${e.wishlistid}`).then(res => {
                        console.log(res)
                        setFollowedWishList((prevState) => [...prevState, res.data])
                        // const jsonOb = JSON.parse(event.data)
                        // console.log(jsonOb)
                        // const dateTime = new Date(jsonOb.CreatedAt);
                        // console.log(dateTime.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
                        // setMessages((prevstate) => [...prevstate, jsonOb])
                    }).catch(err => {
                        console.log(err)
                    })


                })
            }).catch(err => {
                console.log(err)
            })
            // axios.post("h")
            console.log(wishlists)
            setWishlistInputs(wishlists.map((e: any) => ({ id: e.ID, name: e.name, status: e.status, ischeck: false })))
        }).catch(err => {
            // console.log(err)
            routers.push('/home')
        })

    }, [])
    console.log(followedWishList)
    const uniqueFollolwedWishList = followedWishList.filter((item, index, self) => index === self.findIndex((i) => i.ID === item.ID))
    console.log(uniqueFollolwedWishList)
    // const uniqueItems = items.filter(
    // (item, index, self) => index === self.findIndex((i) => i.id === item.id)
    //   );
    const [activeTab, setActiveTab] = useState("Your WishList");
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };
    const handleManage = (e: any) => {
        e.preventDefault()
        setIsActiveUpdateTab(true)
    }
    const [currPage, setCurrPage] = useState(1);
    const [paginateNumber, setPaginateNumber] = useState(15)
    const [pages,setPages] = useState(0)
    
    const totalPublic = publicWishlists.length;
    // const Pages = Math.ceil(publicWishlists / paginateNumber)
    const changePageHandler = (pageNumber: any) => {
        setCurrPage(pageNumber)
    }
    const Pages = Math.ceil(totalPublic / 4)
    // const [startIdx, setStartIdx] = useState((currPage-1)*5)
    const startIdx = (currPage-1)*4
    // startIdx(currPage - 1) * 5
    const endIdx = startIdx + 4
    const wishlistOnPage = publicWishlists.slice(startIdx, endIdx)
    // useEffect(()=>{
    //     // setStartIdx((currPage-1)*5)

    // },[paginateNumber])
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
                <div style={{ textAlign: 'center', paddingBottom: '25px', color: theme.text }}>
                    <h1>{activeTab}</h1>
                </div>
                <div className={style.buttonflex}>
                    <div className={style.wishbtn}><button onClick={(e) => { routers.push("/home/user/newwishlist") }} style={{ backgroundColor: theme.background, color: theme.text }}><FontAwesomeIcon icon={faPlus} />{' '}New Wishlist</button></div>
                    <div className={style.wishbtn}><button onClick={handleManage}>{' '}Manage WishList</button>
                        <select name="" id="" style={{marginLeft:'150px',display:activeTab === "Public WishList" ? "" : "none"}}
                        onChange={(e)=>{
                            // setPaginateNumber(e.target.value)
                        }}
                        >
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="90">90</option>
                        </select>
                    </div>
                </div>
                {/* <select name="" id=""></select> */}
                <div className={activeTab === "Your WishList" ? "" : ""} style={{ display: activeTab === "Your WishList" ? "block" : "none", paddingBottom: '80px' }}>
                    <div className={yourWishlist.length == 0 ? style.activeyour : style.inactiveyour}
                        style={{ backgroundColor: theme.background, margin: '50px', marginBottom: '0px', color: theme.text }}
                    >{"Currently you don't have any Wishlist"}</div>
                    <div className={style.wishlistmain} style={{ display: yourWishlist.length == 0 ? 'none' : "" }}>
                        {wishlists.map((item: any) => {
                            if (item.userid === currUser.ID) {
                                return (
                                    <div>
                                        <WishList id={item.ID} name={item.name} image={""} statuslist={item.status} follow={""} /></div>

                                )
                            }
                        })}
                    </div>
                </div>
                <div className={activeTab === "Public WishList" ? "" : ""} style={{ display: activeTab === "Public WishList" ? "block" : "none" }}>
                    <div className={publicWishlists.length == 0 ? style.activeyour : style.inactiveyour}
                        style={{ backgroundColor: theme.background, margin: '50px', marginBottom: '0px', color: theme.text }}
                    >{"Currently you don't have any Wishlist"}</div>
                    <div className={style.wishlistmain} style={{ display: publicWishlists.length == 0 ? 'none' : "" }}>
                        <>
                            {wishlistOnPage.map((item: any) => {
                                const followed = uniqueFollolwedWishList.find((f: any) => f.ID === item.ID);
                                const follow = followed ? "Followed" : "Follow"
                                return <WishList id={item.ID} name={item.name}
                                    image={""} statuslist={item.status}
                                    follow={follow} />;
                            })}
                        </>

                    </div>
                    <Pagination currentPage={currPage} totalPages={pages} onPageChange={changePageHandler}></Pagination>

                </div>
                <div className={activeTab === "Following WishList" ? "" : ""} style={{ display: activeTab === "Following WishList" ? "block" : "none" }}>
                    <div className={publicWishlists.length == 0 ? style.activeyour : style.inactiveyour}
                        style={{ backgroundColor: theme.background, margin: '50px', marginBottom: '0px', color: theme.text }}
                    >{"Currently you don't have any Wishlist"}</div>
                    <div className={style.wishlistmain} style={{ display: publicWishlists.length == 0 ? 'none' : "" }}>
                        {uniqueFollolwedWishList.map((item: any) => (
                            <WishList

                                id={item.ID} name={item.name} image={""} statuslist={item.status} follow={"Followed"} />
                        ))}
                    </div>
                </div>
            </div>
            <HomeFooter />
            <div className={style.activemodal} style={{ backgroundColor: theme.backgroundmenu, color: theme.text, display: isActiveUpdateTab === true ? "" : "none" }}>
                <div style={{
                    display: 'flex',
                    paddingBottom: '15px',
                    justifyContent: 'flex-end'
                }}><FontAwesomeIcon icon={faClose} onClick={(e) => {
                    e.preventDefault()
                    setIsActiveUpdateTab(false)
                }} /></div>
                <h1>Manage Your WishList</h1>

                <div className={style.modalh2} style={{ backgroundColor: theme.background2 }}>
                    <input type="checkbox" onClick={(event: any) => {

                    }} />
                    <h2>My Wish List</h2>
                    <h2>Privacy</h2>
                </div>
                <div className={style.wishlistdata} >
                    {wishlists.map((e: any) => {
                        // console.log(e)
                        if (e.userid === currUser.ID) {
                            return (
                                <div className={style.modalinput} style={{ backgroundColor: theme.backgroundmenu }}>
                                    <input type="checkbox" onClick={(event) => {
                                        handleCheck(e.ID, event);
                                    }} defaultChecked={false} />
                                    <input type="text" style={{
                                        border: '1px solid ' + theme.text,
                                        backgroundColor: theme.backgroundmenu
                                    }} defaultValue={e.name}
                                        onChange={(event) => {
                                            handleInputChange(e.ID, event);
                                        }}
                                    />
                                    <select defaultValue={e.status} onChange={(event: any) => {
                                        handleSelectChange(e.ID, event)
                                    }}>
                                        <option value="Private">Private</option>
                                        <option value="Public">Public</option>

                                    </select>


                                </div>
                            )

                        }
                    })}
                </div>
                <button onClick={handleManageSave}>Submit!</button>
            </div>
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