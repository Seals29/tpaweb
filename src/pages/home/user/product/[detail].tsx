import { ThemeContext } from "@/theme/theme";
import { useContext, useEffect, useState } from "react";
import style from "@/styles/detailproduct.module.css"
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Navbar from "@/pages/HomePage/Navbar";
import HomeFooter from "@/pages/HomePage/Footer";
import { LangContext } from "@/theme/language";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faLock, faLockOpen, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import  style  from "@/styles/productdetail.module.css"

export default function ProductDetail(props: any) {
    console.log(props)
    const { product, shop, categories,allwishlist } = props;
    const [chosenWishList, setChosenWishList] = useState('')

    console.log(allwishlist)
    console.log(shop)
    const { Lang } = useContext(LangContext)
    // const { productmain } = props
    const routers = useRouter()
    const [isWishlist, setIsWishlist] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [currShop, setCurrShop] = useState('')
    const [currCount, setCurrCount] = useState(0)
    const [buttonplus, setButtonplus] = useState(false)
    const [buttonmin, setButtonmin] = useState(false)
    console.log(product)
    const [productCategory, setProductCategory] = useState('')
    const { theme } = useContext(ThemeContext)
    const handleToggleWishlist = () => {
        setIsWishlist(!isWishlist);
    };
    const [blur, setBlur] = useState(false);
    const [currUser, setCurrUser] = useState('')
    // useEffect(() => {
    //     const userWishList = allwishlist.find((e) => e.userid === currUser.ID);
    //     if (userWishList) {
    //       setChosenWishList(userWishList.name);
    //     }
    //   }, [allwishlist]);
    
    useEffect(() => {
        // setChosenWishList(allwishlist[0].name)
        categories.forEach((e: any) => {
            if (product.category === e.ID.toString()) {
                setProductCategory(e.name)
            }
        });
        if (product.stock == 0) {
            setButtonmin(true)
            setButtonplus(true)
        }
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })

    }, [])
    console.log(currUser)
    const addToWishlist = (e :any)=>{
        e.preventDefault()
        setBlur(true)
    }
    const addToCart = (e: any) => {
        e.preventDefault()
        const data = {
            ProductID: String(product.ID),
            Quantity: String(currCount),
            UserID: String(currUser.ID)
        }
        axios.post("http://localhost:9998/insertcart", data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    const saveToWishList = (e:any)=>{
        e.preventDefault()
        console.log(chosenWishList)
        const data = {
            wishlistid : chosenWishList,
            productid : product.ID.toString(),
            quantity : currCount.toString()
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
    return (
        <>
        <div className={blur===true?style.maindiv:""}>
            <header style={{ color: '' }}>
                <Navbar />
            </header>
            <div style={{backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center', display: `${currUser.isban ? "" : "none"}`}}>{Lang.isEng ? "Your Account is banned!" : "Akun " + currUser.firstname + " diban"}</div>
            <div style={{ backgroundColor: theme.backgroundmenu }}>
                <div style={{
                    top: '0', backgroundColor: theme.background2
                    , paddingTop: '45px'
                }}>
                    <div className={style.productdetail}
                        style={{

                            minHeight: '20vh', gap: '50px',
                            justifyContent: 'center', overflow: 'hidden',
                            backgroundColor: theme.backgroundmenu
                        }}>
                        <div className={style.productdetailimage} style={{}}>
                            <img src={product.image} alt={product.name} style={{ minHeight: '38vh', maxHeight: '38vh' }} />
                        </div>
                        <div style={{ color: theme.text }}>
                            <div className={style.productdetailinfo} style={{ color: theme.text }}>
                                {product.name}
                            </div>
                            <div className={style.detailprice}>
                                <br />
                                ${product.price}
                            </div>
                            <br />
                            <div>
                                <div className={style.detailstock}>
                                    {product.stock ? product.stock : "No"} {Lang.isEng ? "Stock Left" : "Stok tersisa"}
                                    <br />
                                    {product.totalsales} {Lang.isEng ? "Sold" : "Terjual"}
                                </div>

                            </div>
                            <div
                                // style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}
                                className={style.detaillogocontainer}
                                onClick={(e) => {
                                    e.preventDefault()
                                    console.log(shop.ID)
                                    routers.push("/home/user/shop/[id]", `/home/user/shop/${shop.ID}`)
                                }}>
                                <img src={shop.banner} alt="" style={{ minHeight: '50px', maxHeight: '50px', minWidth: '50px', maxWidth: '50px' }} />
                                <p style={{ color: theme.text, zIndex: '5' }}>{shop.name}</p>
                            </div>
                            <br />
                            <div className={style.detailcategory}>{Lang.isEng ? "Category" : "Kategori"} : {productCategory}</div>
                            <br />
                            <div className={style.detailcategory}>Detail : {product.detail}</div>

                            <div style={{ gap: '15px', display: 'flex' }} className={style.detailbutton}>
                                <button onClick={addToWishlist}>

                                    {Lang.isEng ? "Add to Wishlist" : "Tambahkan ke dalam Wishlist"}</button>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    if (currCount === 1) {
                                        setButtonmin(true)
                                        setCurrCount(currCount - 1)
                                    } else {
                                        setCurrCount(currCount - 1)
                                        setButtonplus(false)
                                    }
                                }} disabled={buttonmin}>-</button>
                                <div style={{ alignItems: 'center', display: 'flex' }}>{currCount}</div>
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    if (currCount === product.stock - 1) {
                                        setButtonplus(true)
                                        setCurrCount(currCount + 1);
                                    } else {
                                        setButtonplus(false)
                                        setButtonmin(false)
                                        setCurrCount(currCount + 1);
                                    }
                                }} disabled={buttonplus}>+</button>
                                <button onClick={addToCart}>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    {Lang.isEng ? " Add to Cart" : " Tambahkan ke keranjang"}</button>
                            </div>
                        </div>


                    </div>
                    <div style={{ marginLeft: '75px' }}>
                        {Lang.isEng ? "Product Description" : "Deskripsi Produk"}
                        <div>
                            <br />
                            {product.description}
                        </div>
                    </div>
                </div>
            </div>
            
            <footer style={{ position: 'sticky' }}>
                <HomeFooter />

            </footer>
            </div>
            <div className={style.centerContainer} 
            style={{backgroundColor:theme.background2,
            display:blur?"":"none"
            }}>
                <FontAwesomeIcon icon={faClose} style={{
                        top:'0%',float:'right',right:'0',
                        
                        paddingLeft:'80%'
                        ,color:theme.text
                    ,cursor:'pointer'
                }} onClick={(e)=>{
                    setBlur(false)
                }}/>
               <label style={{color:theme.text}} >Insert to..</label>
                <select  onClick={(e)=>{
                    setChosenWishList(e.target.value)
                }} value={chosenWishList} style={{minHeight:'20px'}} onChange={(e)=>{
                    setChosenWishList(e.target.value)
                
                }} defaultValue={chosenWishList}>
                    <option value="Empty">-- Choose an Option! --</option>
                    {allwishlist.map((e:any)=>{
                        if (e.userid === currUser.ID)return(<option value={e.ID} key={e.ID}>{e.name} - {e.status}</option>) 
                    })}
                </select>
                <button style={{backgroundColor:theme.button, color:theme.text}}
                onClick={saveToWishList}
                >Save Wishlist!</button>
                </div>
                
        </>


    );
};
export async function getStaticPaths() {
    try {
        const res = await axios.get("http://localhost:9998/getallproduct")
        const allProducts = await res.data;
        console.log(allProducts)
        const paths = allProducts.map((product: any) => ({
            params: {
                detail: String(product.id),
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
    const { detail } = context.params;
    const res = await axios.get(`http://localhost:9998/getproduct/${detail}`)

    const product = await res.data;
    const res2 = await axios.get(`http://localhost:9998/getoneshop/${product.shopid}`)
    const res3 = await axios.get(`http://localhost:9998/getallcategory`)
    const res4 = await axios.get(`http://localhost:9998/getallwishlist`)
    const categories = await res3.data
    const shop = await res2.data;
    const allwishlist = await res4.data
    return {
        props: {
            product,
            shop,
            categories,
            allwishlist
        }
    }
}
