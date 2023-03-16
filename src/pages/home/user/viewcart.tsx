import Home from "@/pages";
import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import style from "@/styles/cart.module.css"
import { ThemeContext } from "@/theme/theme";
import { faBookmark, faClose, faHeart, faMarker, faShoppingCart, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
export default function viewcart(props: any) {

    const [blur, setBlur] = useState(false)
    const { carts, savelaters, allwishlist } = props
    const [chosenWishList, setChosenWishList] = useState([])
    const { theme } = useContext(ThemeContext)
    const [currUser, setCurrUser] = useState([])
    const [totalPrice, setTotalPrice] = useState([])
    const routers = useRouter()
    const [allCarts, setAllCarts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const [allSaveLaters, setAllSaveLaters] = useState([])
    // const [totalprice, setTotalPrice] = useState(0)
    const [allSaveLaterProduct, setAllSaveLaterProducts] = useState([])
    console.log(carts);
    const saveToWishList = (event: any) => {
        event.preventDefault()
        console.log(chosenWishList)
        const data = {
            wishlistid : chosenWishList,
            productid : wishlistedProduct.toString(),
            quantity : wishlistedQty.toString()
        }
        console.log(data)
        axios.post("http://localhost:9998/AddNewProductIntoWishList",data).then(res=>{
            console.log(res)
            if (res.data.error){
                alert(res.data.error)
            }
            if(res.data.message){
                alert(res.data.message)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    // const [totalPrice,setTotalPrice] = useState(0)

    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
            carts.map((e: any) => {
                if (e.userid === res.data.user.ID) {
                    setAllCarts((prevstate) => [...prevstate, e])
                    axios.get(`http://localhost:9998/getproduct/${e.productid}`).then(res => {
                        // console.log(res);
                        setAllProducts((prevstate) => [...prevstate, res.data])

                    }).catch(err => {
                        console.log(err);

                    })
                    const myData = {
                        CartID : e.ID.toString()
                    }
                    axios.post("http://localhost:9998/calculatetotalprice",myData).then(res=>{
                        console.log(res);
                        setTotalPrice(res.data)
                        
                    }).catch(err=>{
                        console.log(err);
                        
                    })
                }
                // route.GET("/getproduct/:id", controller.GetOneProduct)

            })
            savelaters.map((e: any) => {
                if (e.userid === res.data.user.ID) {
                    setAllSaveLaters((prevstate) => [...prevstate, e])
                    axios.get(`http://localhost:9998/getproduct/${e.productid}`).then(res => {
                        // console.log(res);
                        setAllSaveLaterProducts((prevstate) => [...prevstate, res.data])

                    }).catch(err => {
                        console.log(err);

                    })
                }
                // route.GET("/getproduct/:id", controller.GetOneProduct)

            })
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        console.log(currUser)
        // setTotalPrice(uniqueProducts.map((product) => product.price).reduce((sum, price) => sum + price, 0))
    }, [])
    console.log(allSaveLaterProduct);
    console.log(allCarts);
    
    // const uniqueSaveLaters = allSaveLaterProduct.filter()
    const uniqueProducts = allProducts.filter((item, idx, self) => idx === self.findIndex((i) => i.ID === item.ID))
    console.log(uniqueProducts);
    const Total = uniqueProducts.map((product) => product.price).reduce((sum, price) => sum + price, 0);
    console.log(Total);
    console.log(totalPrice);
    const uniqueAllCarts = allCarts.filter((item, idx, self) => idx === self.findIndex((i) => i.ID === item.ID))
    const uniqueSaveLaterProducts = allSaveLaterProduct.filter((item, idx, self) => idx === self.findIndex((i) => i.ID === item.ID))
    console.log(uniqueSaveLaterProducts);
    const handleMoveAllToWishList = (e: any) => {

    }
    const handleRemoveAll = (e: any) => {

    }
    const [wishlistedQty, setWishlistedQty] = useState([])
    const [wishlistedProduct, setWishlistedProduct] = useState([])
    const handleMoveToWishList = (productID: any, event: any) => {
        setBlur(true)
        const data = {
            ProductID: productID,
            UserID: currUser.ID
        }
        uniqueAllCarts.map(item=>{
            if(item.productid ===productID){
                setWishlistedQty(item.quantity)
            }
        })
        setWishlistedProduct(productID)

        console.log(data);

    }
    const handleCheckout = (e: any) => {
        e.preventDefault()
        const data = {
            UserID: currUser.ID.toString(),
            // Address : 
        }

        //     	var body struct {
        // 	UserID        string `json:"userid"`
        // 	Address       string `json:"address"`
        // 	Receiver      string `json:"receiver"`
        // 	PaymentMethod string `json:"paymentmethod"`
        // 	Delivery      string `json:"delivery"`
        // 	ProductTotal  string `json:"producttotal"`
        // }
    }
    const handleMoveAlltoCart = (ID: any, e: any) => {
        e.preventDefault()
        const userID = currUser.ID.toString()
        const productID = ID.toString()
    }
    const handleRemoveSaveLater = (ID: any, e: any) => {
        e.preventDefault()
        const userid = currUser.ID.toString()
        const productID = ID.toString()
        console.log(userid);
        console.log(productID);


    }
    const handleSaveFromWishList = (ID: any, e: any) => {
        e.preventDefault()
        const userID = currUser.ID.toString()
        const productID = ID.toString()
        const data = {
            UserID: userID,
            ProductID: productID
        }
        axios.post("http://localhost:9998/movecarttosavelater", data).then(res => {
            console.log(res);
            if (res.data.message) {
                alert(res.data.message)
                routers.reload()
            }
        }).catch(err => {
            console.log(err);

        })
    }
    const handleRemoveOneProduct = (ID: any, e: any) => {
        // console.log(ID);
        const userid = currUser.ID
        const data = {
            UserID: userid.toString(),
            ProductID: ID.toString(),
        }
        console.log(data);
        axios.post("http://localhost:9998/deleteitemincart", data).then(res => {
            console.log(res);
            if (res.data.error) {
                alert(res.data.error)
            }
            if (res.data.message) {
                alert(res.data.message)
                routers.reload()
            }
        }).catch(err => {
            console.log(err);

        })

    }
    return (

        <div>
            <Navbar />

            <div className={style.maincart}>
                <div className={style.leftside}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 'auto', wordWrap: 'break-word' }}>
                            <h1>Shopping Cart({uniqueProducts.length} items)</h1>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center',
                                marginRight: '16px'
                            }}
                                onClick={handleMoveAllToWishList}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                                <label>MOVE ALL TO WISHLIST</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}
                                onClick={handleRemoveAll}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                <label>REMOVE ALL</label>
                            </div>
                        </div>
                    </div>
                    <div className={style.flexbottom}>
                        {/* https://firebasestorage.googleapis.com/v0/b/oldegg-3c56e.appspot.com/o/shopProduct%2FTokopedia%2F117495.jpgOldEgg?alt=media&token=5a682786-1407-4433-80b3-7df7860a6b6e */}
                        {uniqueProducts.map((e) =>
                            <div className={style.cartcontent}>
                                <img src={e.image}
                                    alt="https://firebasestorage.googleapis.com/v0/b/oldegg-3c56e.appspot.com/o/shopProduct%2FTokopedia%2F117495.jpgOldEgg?alt=media&token=5a682786-1407-4433-80b3-7df7860a6b6e" />
                                <div className={style.cartdetailcontent}>
                                    <FontAwesomeIcon icon={faClose}
                                        style={{
                                            alignItems: 'flex-end',
                                            marginLeft: 'auto',
                                            justifyContent: 'flex-end'
                                        }} onClick={(event: any) => {
                                            handleRemoveOneProduct(e.ID, event)
                                        }}
                                    />
                                    <div>
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                                        <h1>asd</h1>
                                        <label htmlFor="">${e.price}</label>
                                        <label htmlFor="">{e.category}</label>
                                        {/* <label htmlFor="">Qty */}
                                        {uniqueAllCarts.map((item:any)=>{
                                            console.log(item);
                                            
                                            if(item.productid===e.ID){
                                                return (
                                                    <div>{item.quantity} Quantity</div>
                                                )
                                                
                                            }
                                        })}
                                        
                                        {/* </label> */}
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ width: 'auto', wordWrap: 'break-word' }}>
                                            <button style={{
                                                padding: '3px', paddingLeft: '7px', paddingRight: '7px',
                                                backgroundColor: theme.footerbg
                                            }} onClick={(event: any) => {
                                                handleMoveToWishList(e.ID, event)
                                            }}><FontAwesomeIcon icon={faHeart} />Move to WishList</button>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                            <div style={{
                                                display: 'flex', alignItems: 'center',
                                                marginRight: '16px'
                                            }}
                                                onClick={(event: any) => {
                                                    handleRemoveSaveLater(e.ID, event)
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faHeart} />
                                                <label>Move To WishList</label>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}
                                                onClick={(event: any) => [
                                                    handleSaveFromWishList(e.ID, event)
                                                ]}
                                            >
                                                <label>
                                                    <FontAwesomeIcon icon={faBookmark} />
                                                    Save For Later</label>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* {products.map((e) => {
                        const wishlistItems = wishlistdetail.filter((item: any) => item.productid === e.ID).map((item: any) => {

                                        />
                                        <label><FontAwesomeIcon icon={faStar} /> ()</label>
                                        <h1 style={{ color: theme.text, fontWeight: 'bold' }}>{e.name}</h1>
                                        <label style={{ color: 'green' }}>${e.price}</label>
                                        <label style={{ color: theme.text }}>{e.category}</label>
                                        <label style={{ color: 'grey' }}>Qty :
                                            <input type="number" value={item.quantity} onChange={(event) => {
                                                setCurrQuantity(event.target.value)
                                            }} /> <button onClick={(event) => {
                                                handleQuantity(e.ID, event)
                                            }}>Save</button>
                                        </label>
                                        <button onClick={(event) => {
                                            handleAddToCart(e.ID, item.quantity, event)
                                        }}>Add to Cart</button>
                                    </div>
                                </div>
                            );
                        });
                        return wishlistItems;
                    })} */}

                        {/* </div> */}

                    </div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: 'auto', wordWrap: 'break-word' }}>
                            <h1>Save Later({uniqueSaveLaterProducts.length} items)</h1>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                            <div style={{
                                display: 'flex', alignItems: 'center',
                                marginRight: '16px'
                            }}
                                onClick={handleMoveAllToWishList}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                                <label>MOVE ALL TO WISHLIST</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}
                                onClick={handleRemoveAll}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                <label>REMOVE ALL</label>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}
                                onClick={handleRemoveAll}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <label>MOVE ALL TO CART</label>
                            </div>

                        </div>
                    </div>
                    <hr />
                    <div className={style.flexbottom}>
                        {/* https://firebasestorage.googleapis.com/v0/b/oldegg-3c56e.appspot.com/o/shopProduct%2FTokopedia%2F117495.jpgOldEgg?alt=media&token=5a682786-1407-4433-80b3-7df7860a6b6e */}
                        {uniqueSaveLaterProducts.map((e) =>
                            <div className={style.cartcontent}>
                                <img src={e.image}
                                    alt={"https://firebasestorage.googleapis.com/v0/b/oldegg-3c56e.appspot.com/o/shopProduct%2FTokopedia%2F117495.jpgOldEgg?alt=media&token=5a682786-1407-4433-80b3-7df7860a6b6e"} />
                                <div className={style.cartdetailcontent}>
                                    <FontAwesomeIcon icon={faClose}
                                        style={{
                                            alignItems: 'flex-end',
                                            marginLeft: 'auto',
                                            justifyContent: 'flex-end'
                                        }} onClick={(event: any) => {
                                            handleRemoveOneProduct(e.ID, event)
                                        }}
                                    />
                                    <div>
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column' }}>

                                        <h1>asd</h1>
                                        <label htmlFor="">${e.price}</label>
                                        <label htmlFor="">Category : {e.category}</label>
                                        <label htmlFor="">Qty
                                        
                                        </label>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: 'auto', wordWrap: 'break-word' }}>
                                                <button style={{
                                                    padding: '3px', paddingLeft: '7px', paddingRight: '7px',
                                                    backgroundColor: theme.footerbg
                                                }}><FontAwesomeIcon icon={faHeart} />Move to WishList</button>
                                            </div>

                                            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                                <div style={{
                                                    display: 'flex', alignItems: 'center',
                                                    marginRight: '16px'
                                                }}
                                                    onClick={(event: any) => {
                                                        handleRemoveSaveLater(e.ID, event)
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faHeart} />
                                                    <label>Remove</label>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center' }}
                                                    onClick={handleRemoveAll}
                                                >
                                                    <FontAwesomeIcon icon={faShoppingCart} />
                                                    <label>Move To Cart</label>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}




                    </div>
                </div>

                <div className={style.rightside}>
                    <h1>
                        Summary
                    </h1>
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        flexDirection: 'column'
                    }}>
                        <p>Item(s): ${totalPrice}</p>
                        <p>Admin Fee(s) : ${totalPrice * 0.05}</p>
                        <hr />
                        <h3>Est. Total : ${totalPrice + totalPrice * 0.05}</h3>
                        <button onClick={(e: any) => {
                            e.preventDefault()
                            routers.push("/home/user/checkout")
                        }}>Check Out!</button>
                    </div>

                </div>
            </div>

            <footer>
                <HomeFooter />
            </footer>
            <div className={style.centerContainer}
                style={{
                    backgroundColor: theme.background2,
                    display: blur ? "" : "none"
                }}>
                <FontAwesomeIcon icon={faClose} style={{
                    top: '0%', float: 'right', right: '0',

                    paddingLeft: '80%'
                    , color: theme.text
                    , cursor: 'pointer'
                }} onClick={(e) => {
                    setBlur(false)
                }} />
                <label style={{ color: theme.text }} >Insert to..</label>
                <select onClick={(e) => {
                    // setChosenWishList(e.target.value)
                }} value={chosenWishList} style={{ minHeight: '20px' }} onChange={(e) => {
                    setChosenWishList(e.target.value)

                }} defaultValue={chosenWishList}>
                    <option value="Empty">-- Choose an Option! --</option>
                    {allwishlist.map((e: any) => {
                        if (e.userid === currUser.ID) return (<option value={e.ID} key={e.ID}>{e.name} - {e.status}</option>)
                    })}
                </select>
                <button style={{ backgroundColor: theme.button, color: theme.text }}
                    onClick={saveToWishList}
                >Save Wishlist!</button>
            </div>

        </div>
    )
}
export async function getStaticProps() {

    const res = await axios.get(`http://localhost:9998/getallcarts`)
    const carts = await res.data;
    const res2 = await axios.get(`http://localhost:9998/getallsavelaters`)
    const res4 = await axios.get(`http://localhost:9998/getallwishlist`)
    const allwishlist = await res4.data;
    const savelaters = await res2.data;
    return {
        props: {
            carts,
            savelaters,
            allwishlist
        }
    }
}