import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import axios from "axios";
import style from "@/styles/wishlist.module.css"
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/theme/theme";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import WishList from "@/pages/components/wishlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faMinus, faPlus, faStar } from "@fortawesome/free-solid-svg-icons";
export default function wishlistdetail(props: any) {
    const { wishlistdetail, detail, products, allcomments
    } = props
    const [currNote, setCurrNote] = useState('')
    console.log(detail)
    const [currNewAllComments, setCurrNewAllComments] = useState([])
    console.log(wishlistdetail)
    const [wishName, setWishName] = useState('')
    const { theme } = useContext(ThemeContext)
    const [currWishList, setCurrWishList] = useState([])
    const [notes, setNotes] = useState([])
    // console.log(detail)
    const routers = useRouter()
    console.log(props)
    const [yourNotes, setYourNotes] = useState([])
    const [number, setNumber] = useState('')
    const [currUser, setCurrUser] = useState([])
    console.log(allcomments)
    useEffect(() => {
        setCurrNewAllComments(allcomments)
        const cookies = Cookies.get('token')
        console.log(currWishList);


        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        if (detail == undefined) {
            console.log("Undefineddd")
            console.log(routers.asPath)
            setNumber(routers.asPath[routers.asPath.length - 1])
            const data = {
                Id: routers.asPath[routers.asPath.length - 1]
            }
            axios.post(`http://localhost:9998/getDWbyID`, data).then(res => {
                console.log(res.data)
                setCurrWishList(res.data)
                setCurrNote(res.data.note)
            }).catch(err => {
                console.log(err)
            })
            console.log(products)
        } else {
            // const idString = String(detail)
            const data = {
                Id: detail
            }
            axios.post(`http://localhost:9998/getDWbyID`, data).then(res => {
                console.log(res.data)
                setCurrWishList(res.data)
                setCurrNote(res.data.note)
            }).catch(err => {
                console.log(err)
            })
            console.log(data)

        }


    }, [])
    const [isAnon, setIsAnon] = useState(false)

    console.log(number)
    console.log(wishlistdetail)
    console.log(currWishList)
    const [newComment, setNewComment] = useState('')
    const [currQuantity, setCurrQuantity] = useState([])
    const [newNotes, setNewNotes] = useState([])
    const handleNotes = (e: any) => {
        e.preventDefault()
        console.log(yourNotes);
        setNotes(yourNotes)
        console.log(currWishList.ID);
        setCurrNote(yourNotes)

        axios.get(`http://localhost:9998/updatenotes?note=${yourNotes}&wishid=${currWishList.ID}`).then(res => {
            console.log(res);

        }).catch(err => {
            console.log(err);

        })
    }
    const handleComment = (e: any) => {
        e.preventDefault()
        console.log(isAnon);
        console.log(newComment);
        type body = {
            isAnon: boolean,
            UserID: string,
            WishListID: string,
            CommentMessage: string
        }
        const newMsg: body = {
            isAnon: isAnon,
            UserID: currUser.ID.toString(),
            WishListID: currWishList.ID.toString(),
            CommentMessage: newComment
        }
        type msg = {
            ID: number,
            CreatedAt: string,
            DeletedAt: string,
            UpdatedAt: string,
            commentmessage: string,
            username: string,

            wishlistid: number,
        }

        // const updtMsg : msg = {
        //     CreatedAt : new Date(Date.now()).toISOString(),
        //     DeletedAt:  new Date(Date.now()).toISOString(),
        //     UpdatedAt:  new Date(Date.now()).toISOString(),
        //     ID : -1,
        //     commentmessage : newComment,
        //     username: currUser.firstname,
        //     wishlistid : currUser.ID
        // }
        // setMessages((prevstate) => [...prevstate, jsonOb])
        // const jsonOb = JSON.parse(newMsg);
        // setCurrNewAllComments((prevstate)=>[...prevstate,updtMsg])
        // setMessages((prevstate) => [...prevstate, jsonOb])
        console.log(newMsg)
        axios.post("http://localhost:9998/newcommentwishlist", newMsg).then(res => {
            console.log(res)
            setCurrNewAllComments((prevstate) => [...prevstate, res.data])

        }).catch(err => {
            console.log(err)
        })
    }

    const handleStatus = (e: any) => {
    }
    console.log(allcomments);

    const handleQuantity = (ID: any, e: any) => {
        console.log("==handle quantity==")
        console.log(ID)
        // setCurrQuantity(e.target.value)

        console.log(currQuantity)
        // console.log(qty)

    }
    const handleAddToCart = (ID: any, Quantity: any, event: any) => {
        console.log(ID)
        console.log(Quantity)
        const data = {
            UserID: currUser.ID.toString(),
            WishListID: currWishList.ID.toString(),
            ProductID: ID.toString(),
            Quantity: Quantity.toString()
        }
        console.log(data);
        axios.post("http://localhost:9998/addtocartfromwishlist", data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    const handleDelete = (ID: any, event: any) => {
        console.log(ID.toString())
        console.log("id product to in wishlist to be deleted " + ID)
        event.preventDefault();
        console.log(currWishList);
        const cookies = Cookies.get('token')
        const data = {
            productid: ID.toString(),
            wishlistid: currWishList.ID.toString(),
            userid: currUser.ID.toString(),
            jwttoken: cookies
        }
        axios.post("http://localhost:9998/deleteproductfromwishlistid", data).then(res => {
            console.log(res);

        }).catch(err => {
            console.log(err);

        })
        console.log(data);



    }
    const [updateQuantity, setUpdateQuantity] = useState([])
    const handleUpdateQuantity = (Qty: any, ID: any, event: any) => {
        const cookies = Cookies.get('token')
        const data = {
            JwtToken: cookies,
            WishListID: currWishList.ID.toString(),
            ProductID: ID,
            Quantity: Qty - 1
        }
        console.log(data);

    }
    const handleAddQuantity = (Qty: any, ID: any, event: any) => {
        const cookies = Cookies.get('token')
        const data = {
            JwtToken: cookies,
            WishListID: currWishList.ID.toString(),
            ProductID: ID,
            Quantity: Qty + 1
        }
        console.log(data);

    }
    const AddAlltoCart = (event: any) => {
        const wishlistItems: any[] = [];

        products.map((e) => {
            const items = wishlistdetail.filter((item: any) => item.productid === e.ID);
            const mappedItems = items.map((item: any) => item.productid);
            wishlistItems.push(mappedItems);
        });

        console.log(wishlistItems);
        const cookies = Cookies.get('token')
        wishlistItems.map((e) => {
            if (e.length > 0) {
                const data = {
                    JwtToken: cookies,
                    WishListID: currWishList.ID.toString(),
                    ProductID: e[0].toString(),
                    Quantity: e.quantity
                }

                console.log(data);


            }
        })




    }
    return (
        <div style={{
            backgroundColor: theme.background2
        }}>
            <Navbar />
            <div className={style.heading} style={{ color: theme.text }}>
                {currWishList.name}
            </div>
            <div className={style.wishdetailcontainer}>
                <div className={style.wishdetailleft}>
                    <h1>Features</h1>
                    <button onClick={AddAlltoCart}>Add All Items to Cart!</button>
                    <label style={{
                        display: currWishList.status === "Public" ? "" : "none"
                    }}>Comments</label>
                    {currNewAllComments.map((e: any) => {
                        console.log(e);

                        if (e.wishlistid === currWishList.ID && currWishList.status === "Public") {
                            const date = new Date(e.CreatedAt)
                            return (
                                <div>
                                    {e.commentmessage} from :
                                    <div>{e.username}</div>
                                    <div>{date.getHours()}:{date.getMinutes()}</div>
                                </div>
                            )
                        }
                    })}
                    {/* display al lcomments */}

                    <div onClick={(e) => {
                        setIsAnon(isAnon === true ? false : true);
                    }} style={{
                        display: currWishList.status === "Public" ? "" : "none"
                    }}>
                        <input type="checkbox" checked={isAnon} />
                        <label>As Anonymous?</label>
                    </div>

                    <div className={style.wishdetailleftsub1} style={{
                        display: currWishList.status === "Public" ? "" : "none"
                    }}>

                        <input style={{
                            backgroundColor: theme.backgroundmenu,
                            color: theme.text,

                        }} type="text" value={newComment} onChange={(e: any) => {
                            setNewComment(e.target.value)
                        }} />
                        <button onClick={handleComment}>Comment</button>
                    </div>
                    <label >Note : {currNote ? currNote : currWishList.note}</label>
                    <div className={style.wishdetailleftsub1} style={{
                        display: currWishList.status === "Private" ? "" : "none"
                    }}>

                        <input style={{
                            backgroundColor: theme.backgroundmenu,
                            color: theme.text,

                        }} type="text" value={yourNotes} onChange={(e: any) => {
                            setYourNotes(e.target.value)
                        }} />
                        <button onClick={handleNotes}>Add Notes</button>
                    </div>

                </div>
                <div className={style.flexbottom}>
                    {products.map((e: any) => {
                        const wishlistItems = wishlistdetail.filter((item: any) => item.productid === e.ID).map((item: any) => {
                            return (
                                <div className={style.wishcontent}>
                                    <img src={e.image} alt="" />
                                    <div className={style.wishdetailcontent}>
                                        a
                                        <FontAwesomeIcon
                                            icon={faClose}
                                            style={{
                                                alignItems: 'flex-end',
                                                marginLeft: 'auto',
                                                justifyContent: 'flex-end'
                                            }}
                                            onClick={(event) => {
                                                handleDelete(e.ID.toString(), event)
                                            }}
                                        />
                                        <label><FontAwesomeIcon icon={faStar} /> ()</label>
                                        <h1 style={{ color: theme.text, fontWeight: 'bold' }}>{e.name}</h1>
                                        <label style={{ color: 'green' }}>${e.price}</label>
                                        <label style={{ color: theme.text }}>{e.category}</label>
                                        <label style={{ color: 'grey' }}>Qty :
                                            <input type="number" onChange={(event: any) => {
                                                console.log(e);

                                                handleUpdateQuantity(e.stock, e.ID, event)
                                            }} defaultValue={e.stock} /> <button onClick={(event) => {
                                                handleQuantity(e.ID, event)
                                            }}>Save</button>
                                            <button onClick={(event: any) => {
                                                handleUpdateQuantity(e.stock, e.ID, event)
                                            }}><FontAwesomeIcon icon={faMinus} /></button>
                                            <button onClick={(event: any) => {
                                                handleAddQuantity(e.stock, e.ID, event)
                                            }}><FontAwesomeIcon icon={faPlus} /></button>
                                        </label>
                                        <button onClick={(event) => {
                                            handleAddToCart(e.ID, item.quantity, event)
                                        }}>Add to Cart</button>
                                    </div>
                                </div>
                            );
                        });
                        return wishlistItems;
                    })}

                </div>
            </div>
            <button>
                Update WishList
            </button>
            <button>Delete WishList</button>
            <button>Add Product</button>
            <button>Update Notes</button>
            <button>Deteltem Item In List</button>

            <HomeFooter />
        </div>
    )
}
export async function getStaticPaths() {
    try {
        const res = await axios.get("http://localhost:9998/getallwishlist")
        const allWishlist = await res.data;
        // console.log(allWishlist)
        const paths = allWishlist.map((wishlist: any) => ({
            params: {
                detail: String(wishlist.id),
            },
        }));
        return {
            paths,
            fallback: true,
        };
    } catch (error) {
        // alert(error)
        return {
            notFound: true,
        };
    }

}
export async function getStaticProps(context: any) {
    const { detail } = context.params;

    const res = await axios.get(`http://localhost:9998/getwishlistdetailbywishlistid/${detail}`)
    const res2 = await axios.get(`http://localhost:9998/getallproduct`)
    const res3 = await axios.get(`http://localhost:9998/getallcommentwishlist?id=${detail}`)
    const wishlistdetail = await res.data;
    const products = await res2.data;
    const allcomments = await res3.data;
    return {
        props: {
            wishlistdetail,
            detail,
            products,
            allcomments
        }
    }
}
