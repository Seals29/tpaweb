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
const home = () => {
    const [currCountry, setCurrCountry] = useState('')
    const routers = useRouter();
    const [currUser, setCurrUser] = useState([]);
    const [isDark, setIsDark] = useState(false)
    const { theme } = useContext(ThemeContext)
    const [currIdx, setCurrIdx] = useState(0)

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
        const interval = setInterval(next, 15000)


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
                    <div style={{ color: 'black', display: 'flex', justifyContent: 'space-between', height: '7vh' }}>
                        <div style={{ display: 'flex', flexGrow: '1' }}>
                            <div> © 2000-2023 Newegg Inc.  All rights reserved</div>
                            <div> Terms & Conditions</div>
                            <div>Privacy Policy</div>
                            <div> Cookie Preferences</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            gap: '50px'
                        }} className={style.circlelink}>
                            <a href=""><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href=""><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href=""><FontAwesomeIcon icon={faInstagramSquare} /></a>
                            <a href=""><FontAwesomeIcon icon={faLinkedinIn} /></a>
                            <a href=""><FontAwesomeIcon icon={faPinterestSquare} /></a>
                            <a href=""><FontAwesomeIcon icon={faYoutubeSquare} /></a>
                            <a href=""><FontAwesomeIcon icon={faTwitch} /></a>
                            <a href=""><FontAwesomeIcon icon={faDiscord} /></a>
                            <a href=""><FontAwesomeIcon icon={faTiktok} /></a>
                        </div>

                    </div>
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
                    <div style={{ color: 'black', display: 'flex', justifyContent: 'space-between', height: '7vh' }}>
                        <div style={{ display: 'flex', flexGrow: '1' }}>
                            <div> © 2000-2023 Newegg Inc.  All rights reserved</div>
                            <div> Terms & Conditions</div>
                            <div>Privacy Policy</div>
                            <div> Cookie Preferences</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            gap: '50px'
                        }} className={style.circlelink}>
                            <a href=""><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href=""><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href=""><FontAwesomeIcon icon={faInstagramSquare} /></a>
                            <a href=""><FontAwesomeIcon icon={faLinkedinIn} /></a>
                            <a href=""><FontAwesomeIcon icon={faPinterestSquare} /></a>
                            <a href=""><FontAwesomeIcon icon={faYoutubeSquare} /></a>
                            <a href=""><FontAwesomeIcon icon={faTwitch} /></a>
                            <a href=""><FontAwesomeIcon icon={faDiscord} /></a>
                            <a href=""><FontAwesomeIcon icon={faTiktok} /></a>
                        </div>

                    </div>
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
                <footer style={{ position: 'sticky' }}>
                    <HomeFooter />
                    <div style={{ color: 'black', display: 'flex', justifyContent: 'space-between', height: '7vh' }}>
                        <div style={{ display: 'flex', flexGrow: '1' }}>
                            <div> © 2000-2023 Newegg Inc.  All rights reserved</div>
                            <div> Terms & Conditions</div>
                            <div>Privacy Policy</div>
                            <div> Cookie Preferences</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            gap: '50px'
                        }} className={style.circlelink}>
                            <a href=""><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href=""><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href=""><FontAwesomeIcon icon={faInstagramSquare} /></a>
                            <a href=""><FontAwesomeIcon icon={faLinkedinIn} /></a>
                            <a href=""><FontAwesomeIcon icon={faPinterestSquare} /></a>
                            <a href=""><FontAwesomeIcon icon={faYoutubeSquare} /></a>
                            <a href=""><FontAwesomeIcon icon={faTwitch} /></a>
                            <a href=""><FontAwesomeIcon icon={faDiscord} /></a>
                            <a href=""><FontAwesomeIcon icon={faTiktok} /></a>
                        </div>

                    </div>
                </footer>

            </>
        )
    }

}
export default home;