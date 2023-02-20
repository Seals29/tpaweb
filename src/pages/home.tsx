import { faDiscord, faFacebook, faFacebookF, faInstagramSquare, faLinkedinIn, faPinterestP, faPinterestSquare, faSpeakerDeck, faSwift, faTiktok, faTwitch, faTwitter, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HomeFooter from "./HomePage/Footer";
import Navbar from "./HomePage/Navbar";
import style from "@/styles/homes.module.css"
import { faBattery3, faBatteryCar, faCarTunnel, faCompactDisc, faComputer, faComputerMouse, faFootball, faGamepad, faHeadphones, faKeyboard, faNetworkWired, faPrint, faRoute, faSnowplow, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from "@/theme/theme";
import { clearInterval, setInterval } from "timers";
const home = () =>{
    const routers = useRouter();
    const [currUser,setCurrUser] = useState([]);
    const [isDark,setIsDark] = useState(false)
    const {theme} = useContext(ThemeContext)
    const [currIdx, setCurrIdx]=useState(0)
   
    const banner=[
        
        {
            id:1,
            url :"//promotions.newegg.com/international/22-2012/1920x660@2x.png"
        },
        {
            id:2,
            url:"//promotions.newegg.com/nepro/23-0211/1920x660.jpg"
        }
    ]
    const [currBanner,setCurrBanner] = useState(banner[0].url)  
    const next=()=>{
        setCurrIdx((currIdx+1)%banner.length)
    }
    const prev = () =>{
        setCurrIdx((currIdx+1)%banner.length)
    }
    useEffect(()=>{
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate',{cookies}).then(res=>{
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err=>{
            console.log(err)
            routers.push('/login')
        })
            console.log(currUser)
        setCurrBanner(banner[currIdx].url)
        const interval =setInterval(next,5000)
        return () =>clearInterval(interval)
    },[currIdx])
    if(currUser.role==="admin"){
        return(
        <>
        <header style={{color:''}}>
            <Navbar/>
            
        </header>
        <div style={{backgroundColor:'transparent'}}>
            <div className={style.containerbox}>
                <div className={style.box}><span ><a href="/home/view/report">View Report</a></span></div>
                <div className={style.box}><span ><a href="/home/managementmenu">Management menu</a></span></div>
            </div>
            
        </div>
        <footer style={{position:'sticky'}}>
            <HomeFooter/>
            <div style={{color:'black', display:'flex',justifyContent:'space-between',height:'7vh'}}>
                <div style={{display:'flex',flexGrow:'1'}}>
                    <div> © 2000-2023 Newegg Inc.  All rights reserved</div>
                    <div> Terms & Conditions</div>
                    <div>Privacy Policy</div>
                    <input type="image" />
                    <div> Cookie Preferences</div>
                </div>
                <div style={{
                    display:'flex', 
                    gap:'50px'}} className={style.circlelink}>
                        <a href=""><FontAwesomeIcon icon={faFacebookF}/></a>
                        <a href=""><FontAwesomeIcon icon={faTwitter}/></a>
                        <a href=""><FontAwesomeIcon icon={faInstagramSquare}/></a>
                        <a href=""><FontAwesomeIcon icon={faLinkedinIn}/></a>
                        <a href=""><FontAwesomeIcon icon={faPinterestSquare}/></a>
                        <a href=""><FontAwesomeIcon icon={faYoutubeSquare}/></a>
                        <a href=""><FontAwesomeIcon icon={faTwitch}/></a>
                        <a href=""><FontAwesomeIcon icon={faDiscord}/></a>
                        <a href=""><FontAwesomeIcon icon={faTiktok}/></a>
                </div>
                
            </div>
        </footer>
       
        </>
        )
    }else{
        return (
            <>
            <header style={{color:''}}>
                <Navbar/>
                
            </header>
            <div style={{backgroundColor:'transparent'}}>
                <div className={style.homesidebar} style={{backgroundImage:theme.sidebargradient}}  >
    
                    <ul className={style.homeul}>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faComputer} style={{color:theme.text}}/>Components & Storage <label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faNetworkWired}/>Computer Systems<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faKeyboard}/>Computer Peripherals<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faHeadphones}/>Electronic<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faGamepad}/>Gaming<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faCompactDisc}/>Software & Services<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faComputerMouse}/>Networking<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faPrint}/>Office Solution<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faCarTunnel}/>Automotive & Industrial<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faSnowplow}/>Home & Tools<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faFootball}/>Health & Sports<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faTshirt}/>Apparel & Accessories<label > {'>'} </label></li>
                        <li style={{color:theme.text}}><FontAwesomeIcon icon={faBatteryCar}/>Drone<label > {'>'} </label></li>
                    </ul>
                </div>
                {/* <div className={style.containerbox}>
                    <div className={style.box}><span ><a href="/home/view/report">View Report</a></span></div>
                    <div className={style.box}><span ><a href="/home/managementmenu">Management menu</a></span></div>
                </div> */}
                <div className={style.slidercontainer}>
                    <img src={currBanner} alt={`/${currBanner}`} style={{width:'100%'}} />
                    <button onClick={prev} className={style.prev}>
                        &lt;
                    </button>
                    <button onClick={next} className={style.next}>
                        &gt;
                    </button>
                {/* <img src="//promotions.newegg.com/international/22-2012/1920x660@2x.png" alt="Most Popular VGA" id="$bannerId1"></img> */}
                </div>
            </div>
            <footer style={{position:'sticky'}}>
                <HomeFooter/>
                <div style={{color:'black', display:'flex',justifyContent:'space-between',height:'7vh'}}>
                    <div style={{display:'flex',flexGrow:'1'}}>
                        <div> © 2000-2023 Newegg Inc.  All rights reserved</div>
                        <div> Terms & Conditions</div>
                        <div>Privacy Policy</div>
                        <input type="image" />
                        <div> Cookie Preferences</div>
                    </div>
                    <div style={{
                        display:'flex', 
                        gap:'50px'}} className={style.circlelink}>
                            <a href=""><FontAwesomeIcon icon={faFacebookF}/></a>
                            <a href=""><FontAwesomeIcon icon={faTwitter}/></a>
                            <a href=""><FontAwesomeIcon icon={faInstagramSquare}/></a>
                            <a href=""><FontAwesomeIcon icon={faLinkedinIn}/></a>
                            <a href=""><FontAwesomeIcon icon={faPinterestSquare}/></a>
                            <a href=""><FontAwesomeIcon icon={faYoutubeSquare}/></a>
                            <a href=""><FontAwesomeIcon icon={faTwitch}/></a>
                            <a href=""><FontAwesomeIcon icon={faDiscord}/></a>
                            <a href=""><FontAwesomeIcon icon={faTiktok}/></a>
                    </div>
                    
                </div>
            </footer>
           
            </>
        )
    }
    
}
export default home;