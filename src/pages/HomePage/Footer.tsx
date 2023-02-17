
import style from "@/styles/homefooter.module.css"
import { useEffect } from "react";
const HomeFooter=()=>{
    

    return(
        
    <footer className={style.footer} style={{backgroundColor:'#0A185C'}}>
    <div className={style.container}>
        <div className={style.row}>
            <div className={style.col2}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p>Customer Service</p>
                    <br/>
                    <div style={{display:'flex',flexDirection:'column', left:'0',wordWrap:'break-word', maxWidth:'200px',gap:'25px'}}>
                    <a href="">Help  Center</a>
                    <a href="">Track an Order</a>
                    <a href="">Return an item</a>
                    <a href="">Return Policy</a>
                    <a href="">Privacy & Security</a>
                    <a href="">Feedback</a>
                    </div>
                    
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p><a href="#"> My Account</a></p>
                    <br/>
                    <div style={{display:'flex',flexDirection:'column', left:'0',wordWrap:'break-word', maxWidth:'200px',gap:'25px'}}>
                    <a href="">Login/Register</a>
                    <a href="">Order History</a>
                    <a href="">Returns History</a>
                    <a href="">Address Book</a>
                    <a href="">Wish Lists</a>
                    <a href="">My Build Lists</a>
                    <a href="">My Build Showcase</a>
                    <a href="">Email Notifications</a>
                    <a href="">Subscriptions Orders</a>
                    <a href="">Auto Notifications</a>
                    </div>
                    
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p><a href="#">COMPANY INFORMATION</a></p>
                    <br/>
                    <div style={{display:'flex',flexDirection:'column', left:'0',wordWrap:'break-word', maxWidth:'200px',gap:'25px'}}>
                    <a href="">About Newegg</a>
                    <a href="">Investor Relations</a>
                    <a href="">Awards/Rankings</a>
                    <a href="">Hours and Locations</a>
                    <a href="">Press Inquiries</a>
                    <a href="">Newegg Careers</a>
                    <a href="">Newsroom</a>
                    <a href="">Newegg Insider</a>
                    <a href="" >Calif. Transparency in Supply Chains Act </a>
                    <a href="">Cigna MRF</a>
                    </div>
                    
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p><a href="#">TOOLS & RESOURCES</a></p>
                    <br/>
                    <div style={{display:'flex',flexDirection:'column', left:'0',wordWrap:'break-word', maxWidth:'200px',gap:'25px'}}>
                    <a href="">Sell on Newegg</a>
                    <a href="">For Your Business</a>
                    <a href="">Newegg Partner Services</a>
                    <a href="">Become an Affiliate</a>
                    <a href="">Newegg Creators</a>
                    <a href="">Site Map</a>
                    <a href="">Shop by brand</a>
                    <a href="">Rebates</a>
                    <a href="">Mobile Apps</a>
                    </div>
                    
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p><a href="#">SHOP OUR BRANDS</a></p>
                    <br/>
                    <div style={{display:'flex',flexDirection:'column', left:'0',wordWrap:'break-word', maxWidth:'200px',gap:'25px'}}>
                    <a href="">Newegg Business</a>
                    <a href="">Newegg Global</a>
                    <a href=""> ABS</a>
                    <a href="">Rosewill</a>
                    </div>
                    
                    </div>
            </div>
        </div>
    </div>
    </footer>
    )
}
export default HomeFooter;