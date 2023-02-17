import { faDiscord, faFacebook, faFacebookF, faInstagramSquare, faLinkedinIn, faPinterestP, faPinterestSquare, faTiktok, faTwitch, faTwitter, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HomeFooter from "./HomePage/Footer";
import Navbar from "./HomePage/Navbar";
import style from "@/styles/homes.module.css"

const home = () =>{
    const routers = useRouter();
    const [currUser,setCurrUser] = useState([]);
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
        
    },[])

    
    return (
        <>
        <header style={{color:'black'}}>
            <Navbar/>
            
        </header>
        <div style={{minHeight:'100vh', maxHeight:'100vh'}}>
            <div className={style.containerbox}>
                <div className={style.box}><span ><a href="/home/view/report">View Report</a></span></div>
                <div className={style.box}><span ><a href="/home/managementmenu">Management menu</a></span></div>
            </div>
        </div>
        <footer style={{position:'sticky'}}>
            <HomeFooter/>
            <div style={{color:'black', display:'flex',justifyContent:'space-between'}}>
                <div style={{display:'flex',flexGrow:'1'}}>
                    <div> © 2000-2023 Newegg Inc.  All rights reserved</div>
                    <div> Terms & Conditions</div>
                    <div>Privacy Policy</div>
                    <div> Cookie Preferences</div>
                </div>
                <div style={{display:'flex',order:'1', justifyContent:'space-between', gap:'1000px'}}>
                    <div style={{justifyContent:'space-between'}}>
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
                
            </div>
        </footer>
       
        </>
    )
}
export default home;