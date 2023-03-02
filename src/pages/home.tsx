import { faDiscord, faFacebook, faFacebookF, faInstagramSquare, faLinkedinIn, faPinterestP, faPinterestSquare, faSpeakerDeck, faSwift, faTiktok, faTwitch, faTwitter, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HomeFooter from "./HomePage/Footer";
import Navbar from "./HomePage/Navbar";
import style from "@/styles/homes.module.css"
import { faArrowCircleLeft, faBackward, faBackwardFast, faBackwardStep, faBattery3, faBatteryCar, faCarTunnel, faCompactDisc, faComputer, faComputerMouse, faFootball, faGamepad, faHeadphones, faKeyboard, faNetworkWired, faPrint, faRoute, faSnowplow, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from "@/theme/theme";
import { clearInterval, setInterval } from "timers";
import Image from "next/image";
import Card from "./components/card";
const home = (props: any) => {
    const [currCountry, setCurrCountry] = useState('')
    const routers = useRouter();
    const { allProducts } = props;
    const [currUser, setCurrUser] = useState([]);
    const [isDark, setIsDark] = useState(false)
    const { theme } = useContext(ThemeContext)
    const [currIdx, setCurrIdx] = useState(0)
    console.log(allProducts)
    const banner = [

        {
            id: 1,
            url: "https://promotions.newegg.com/international/22-2012/1920x660@2x.png"
        },
        {
            id: 2,
            url: "https://promotions.newegg.com/nepro/23-0211/1920x660.jpg"
        }
    ]
    const [currBanner, setCurrBanner] = useState(banner[0].url)
    const next = () => {
        setCurrIdx((currIdx + 1) % banner.length)
    }
    const prev = () => {
        setCurrIdx((currIdx + 1) % banner.length)
    }
    const [products, setProducts] = useState([])
    const [chunk, setChunk] = useState(products.slice(0, 10))


    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })

        console.log(currUser)
        setCurrBanner(banner[currIdx].url)
        const interval = setInterval(next, 20000)


        // 4789dc9ad1d743caae109fc5818ebe2f
        return () => clearInterval(interval)
    }, [currIdx])
    console.log(currCountry)

    if (currUser.role === "admin") {
        return (
            <>
                <header style={{ color: '' }}>
                    <Navbar />
                </header>
                <div style={{
                    backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center', display: `${currUser.isban ? "" : "none"}`
                }}>Your account is banned!</div>
                <div style={{ minHeight: '50vh', maxHeight: '50vh', backgroundColor: theme.background }} className={style.containerbox1}>
                    <div className={style.containerbox} style={{ justifyContent: 'center' }}>
                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, justifyContent: 'center', display: 'flex' }}>
                            <a href="/home/view/report"
                                style={{
                                    color: theme.text,
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '20px'
                                }} >Add New Voucher Code</a></div>
                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, justifyContent: 'center', display: 'flex', fontSize: '20px' }}><a href="/home/managementmenu" style={{
                            color: theme.text,
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                        }}>Management Menu</a></div>
                    </div>
                </div>
                <footer style={{ position: 'sticky' }}>
                    <HomeFooter />
                </footer>

            </>
        )
    } else if (currUser.role === "Seller") {
        return (
            <>
                <header style={{ color: '' }}>
                    <Navbar />
                </header>
                <div style={{
                    backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center', display: `${currUser.isban ? "" : "none"}`
                }}>Your account is banned!</div>
                <div style={{ minHeight: '50vh', maxHeight: '50vh', backgroundColor: theme.background }} className={style.containerbox1}>
                    <div className={style.containerbox} style={{ justifyContent: 'center' }}>
                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, justifyContent: 'center', display: 'flex' }}>
                            <a href="/home/shop/newproduct"
                                style={{
                                    color: theme.text,
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: '20px'
                                }} >Insert New Product!</a></div>

                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, justifyContent: 'center', display: 'flex', fontSize: '20px' }}>
                            <a href="/home/shop/view" style={{
                                color: theme.text,
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                            }}>View Your Product!</a></div>
                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, justifyContent: 'center', display: 'flex', fontSize: '20px' }}>
                            <a href="/home/shop/profile" style={{
                                color: theme.text,
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                            }}>View Your ShopProfile!</a></div>
                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, justifyContent: 'center', display: 'flex', fontSize: '20px' }}>
                            <a href="/home/shop/updatename" style={{
                                color: theme.text,
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                            }}>Update Shop Name</a></div>
                        <div className={style.box} style={{ backgroundColor: theme.backgroundmenu, justifyContent: 'center', display: 'flex', fontSize: '20px' }}>
                            <a href="/home/shop/updatepass" style={{
                                color: theme.text,
                                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
                            }}>Change your Password</a></div>
                    </div>
                </div>
                <footer style={{ position: 'sticky' }}>
                    <HomeFooter />
                </footer>

            </>
        )
    }

    else {
        return (
            <>
                <header style={{ color: '' }}>
                    <Navbar />

                </header>
                <div style={{
                    backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center', display: `${currUser.isban ? "" : "none"}`
                }}>Your account is banned!</div>
                <div style={{ backgroundColor: 'transparent' }}>

                    <div className={style.slidercontainer}>
                        {banner.map((img, idx) => (
                            <Image key={idx} src={img.url} alt="description"
                                className={currIdx === idx ? style.actives : style.inactives}
                                layout="fill"
                            ></Image>
                        ))}
                        <button onClick={prev} className={style.prev}>
                            &lt;
                        </button>
                        <button onClick={next} className={style.next}>
                            &gt;
                        </button>

                    </div>
                </div>
                {/* <div style={{
                    display: "flex", gap: '15px', background: theme.background,
                    flexDirection: 'row', overflow: 'auto', flexWrap: 'wrap', justifyContent: 'center'
                }}> */}
                <div style={{ backgroundColor: theme.background, margin: '0' }} >
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
                </div>

                {/* tinggal kasi infinite scrolling */}

                {/* </div> */}
                <footer style={{ position: 'sticky' }}>
                    <HomeFooter />

                </footer>

            </>
        )
    }

}
export async function getStaticProps() {
    const response = await axios.get("http://localhost:9998/getallproduct")
    const allProducts = await response.data;
    return {
        props: {
            allProducts,
        },
    };
}
export default home;