import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from "@/styles/checkout.module.css"
import { ThemeContext } from "@/theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
export default function CheckOut(props: any) {
    const { carts, addresses } = props;
    const [allCarts, setAllCarts] = useState([])
    const [currUser, setCurrUser] = useState([])
    const [isAddressSaved, setIsAddressSaved] = useState(false)
    const [isPaymentSaved, setIsPaymentSaved] = useState(false)
    const { theme } = useContext(ThemeContext)
    const [allProducts, setAllProducts] = useState([])
    const routers = useRouter()
    const [currAddress, setCurrAddress] = useState([])
    const [totalPrice, setTotalPrice] = useState([])

    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
            addresses.map((addr: any) => {
                if (addr.userid === res.data.user.ID) {
                    setCurrAddress((prevstate) => [...prevstate, addr])
                }
            })

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
                        CartID: e.ID.toString()
                    }
                    axios.post("http://localhost:9998/calculatetotalprice", myData).then(res => {
                        console.log(res);
                        setTotalPrice(res.data)

                    }).catch(err => {
                        console.log(err);

                    })
                }
                // route.GET("/getproduct/:id", controller.GetOneProduct)

            })
            // setTotalPrice(uniqueProducts.map((product) => product.price).reduce((sum, price) => sum + price, 0))
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        setCurrDelivery("JNT")
        setCurrPaymentMethod("Dollars")
    }, [])
    console.log(addresses);
    const [currDelivery, setCurrDelivery] = useState([])
    const [currPaymentMethod, setCurrPaymentMethod] = useState([])
    console.log(currAddress);
    const [newAddress, setNewAddress] = useState('')
    const [newReciever, setNewReceiver] = useState('')
    const [activeAddress, setActiveAddress] = useState(false)
    const handleNewAddres = (event: any) => {
        const userid = currUser.ID.toString()
        const data = {
            UserID: userid,
            AddressField: newAddress,
            ReceiverName: newReciever
        }
        console.log(data);
        axios.post("http://localhost:9998/newaddress", data).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })


    }
    console.log(allProducts);
    const uniqueAddress = currAddress.filter((item, idx, self) => idx === self.findIndex((i) => i.ID === item.ID))
    const uniqueProducts = allProducts.filter((item, idx, self) => idx === self.findIndex((i) => i.ID === item.ID))
    console.log(uniqueAddress);
    const Total = uniqueProducts.map((product) => product.price).reduce((sum, price) => sum + price, 0);
    console.log(Total);
    console.log(currDelivery);
    console.log(currPaymentMethod);
    const [mainAddr, setMainAddr] = useState([])

    return (
        <div>
            <div>
                <Navbar />

                <div>
                    <h1>Checkout! ({uniqueProducts.length} items)</h1>
                </div>
                <div className={style.checkoutcontainer} style={{ backgroundColor: theme.background2 }}>
                    <div className={style.leftcontainer} style={{ display: isAddressSaved === true ? "none" : "" }}>
                        <h3>SHIPPING</h3>
                        {uniqueAddress.map((addr) => (
                            <div className={style.address}>
                                <label >{addr.receivername}</label>
                                <label style={{
                                    fontSize: '15px'
                                }} >{addr.addressfield}</label>
                                <label >{addr.isactive === true ? "Active" : "InActive"}</label>
                            </div>
                        ))}

                        <button onClick={(event: any) => {

                            setActiveAddress(true)

                        }}>
                            Add new Address!
                        </button>
                        <button onClick={(event: any) => {
                            setIsAddressSaved(true)
                            uniqueAddress.map((addr) => {
                                console.log(currUser.ID);
                                console.log(addr);


                                if (currUser.ID === addr.userid && addr.isactive === true) {
                                    setMainAddr(addr)
                                }
                            })
                        }} style={{ minWidth: '100%', marginTop: '50px' }}>Save !</button>

                    </div>
                    <div className={style.leftcontainer} style={{ display: isAddressSaved === true ? "" : "none" }}>
                        <h3>Delivery</h3>
                        <label htmlFor=""></label>
                        <select name="" id="" onChange={(event: any) => {
                            setCurrDelivery(event.target.value)
                        }}>
                            <option value="JNT">
                                JNT
                            </option>
                            <option value="JNE">
                                JNE
                            </option>
                        </select>
                        <h3>Payment Method</h3>
                        <select name="" id="" onChange={(event: any) => {
                            setCurrPaymentMethod(event.target.value)
                        }}>
                            <option value="Dollars">Dollars</option>
                            <option value="Genesis">Genesis</option>
                        </select>

                        <button onClick={(event: any) => {
                            setActiveAddress(true)
                        }} style={{
                            display: isAddressSaved === true ? "none" : ""
                        }}>
                            Add new Address!
                        </button>
                        <button onClick={(event: any) => {
                            if (currUser.balance >= (Total + Total * 0.05)) {
                                // var body struct {
                                //     UserID        string `json:"userid"`
                                //     Address       string `json:"address"`
                                //     Receiver      string `json:"receiver"`
                                //     PaymentMethod string `json:"paymentmethod"`
                                //     Delivery      string `json:"delivery"`
                                //     ProductTotal  string `json:"producttotal"`
                                // }
                                const data = {
                                    UserID: currUser.ID.toString(),
                                    Address: mainAddr.addressfield,
                                    Receiver: mainAddr.receivername,
                                    PaymentMethod: currPaymentMethod,
                                    Delivery: currDelivery,
                                    ProductTotal: Total.toString()
                                }
                                axios.post("http://localhost:9998/createneworder", data).then(res => {
                                    console.log(res);
                                    alert("You have checkedout successfully!")
                                    routers.reload()
                                }).catch(err => {
                                    console.log(err);

                                })
                                console.log(data);

                            } else {
                                alert("Your Balance is insuficient!")
                            }

                            var check = true;
                            let int = 0;


                            console.log(mainAddr);
                            // console.log(data);


                        }}>Checkout!</button>
                    </div>
                    <div className={style.rightcontainer}>
                        <h1>Order Summary</h1>
                        <label >Item(s): {totalPrice}</label>
                        <label >Admin Fee : {totalPrice * 0.05}</label>
                        <label >Est. Total : {totalPrice + totalPrice * 0.05}</label>
                        {/* <button>Secure Checkout</button> */}
                    </div>

                </div>

                <HomeFooter />
            </div>
            <div className={style.modaladdress} style={{ display: activeAddress === true ? "" : "none" }}>
                <FontAwesomeIcon icon={faClose} style={{
                    float: 'right',
                    // display: 'flex',
                    // flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    cursor: 'pointer'

                }} onClick={(event: any) => {
                    setActiveAddress(false)
                }} />
                <div className={style.addresscontainer}>
                    <h1>Add New Address</h1>
                    <label >Your New Address Field</label>
                    <textarea type="text" onChange={(event: any) => {
                        setNewAddress(event.target.value)
                    }} />
                    <label >Receiver Name</label>
                    <input type="text" onChange={(event: any) => {
                        setNewReceiver(event.target.value)
                    }} />
                    <button onClick={handleNewAddres}>Add new Address!</button>
                </div>


            </div>
        </div>

    )
}

export async function getStaticProps() {

    const res = await axios.get(`http://localhost:9998/getallcarts`)
    const carts = await res.data;
    const res2 = await axios.get(`http://localhost:9998/getalladdress`)
    const addresses = await res2.data;
    return {
        props: {
            carts,
            addresses
        }
    }
}