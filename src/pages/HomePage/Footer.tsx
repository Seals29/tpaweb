
import style from "@/styles/homefooter.module.css"
import { ThemeContext } from "@/theme/theme";
import { useContext, useEffect } from "react";
const HomeFooter=()=>{
    const {theme} = useContext(ThemeContext)

    return(
        
    <footer className={style.footer} style={{backgroundColor:'#0A185C'}}>
    <div className={style.container}>
        <div className={style.row}>
            <div className={style.col2}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p style={{color:theme.text}}>Customer Service</p>
                    <br/>
                    <div style={{display:'flex',flexDirection:'column', left:'0',wordWrap:'break-word', maxWidth:'200px',gap:'25px'}}>
                    <a href="" style={{color:theme.text}}>Help  Center</a>
                    <a href="" style={{color:theme.text}}>Track an Order</a>
                    <a href="" style={{color:theme.text}}>Return an item</a>
                    <a href="" style={{color:theme.text}}>Return Policy</a>
                    <a href="" style={{color:theme.text}}>Privacy & Security</a>
                    <a href="" style={{color:theme.text}}>Feedback</a>
                    </div>
                    
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p><a href="#" style={{color:theme.text}}> My Account</a></p>
                    <br/>
                    <div style={{display:'flex',flexDirection:'column', left:'0',wordWrap:'break-word', maxWidth:'200px',gap:'25px', color:theme.text}}>
                    <a href=""style={{color:theme.text}}>Login/Register</a>
                    <a href=""style={{color:theme.text}}>Order History</a>
                    <a href=""style={{color:theme.text}}>Returns History</a>
                    <a href=""style={{color:theme.text}}>Address Book</a>
                    <a href=""style={{color:theme.text}}>Wish Lists</a>
                    <a href=""style={{color:theme.text}}>My Build Lists</a>
                    <a href=""style={{color:theme.text}}>My Build Showcase</a>
                    <a href=""style={{color:theme.text}}>Email Notifications</a>
                    <a href=""style={{color:theme.text}}>Subscriptions Orders</a>
                    <a href=""style={{color:theme.text}}>Auto Notifications</a>
                    </div>
                    
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p><a href="#" style={{color:theme.text}}>COMPANY INFORMATION</a></p>
                    <br/>
                    <div style={{display:'flex',flexDirection:'column', left:'0',wordWrap:'break-word', maxWidth:'200px',gap:'25px'}}>
                    <a href="" style={{color:theme.text}}>About Newegg</a>
                    <a href="" style={{color:theme.text}}>Investor Relations</a>
                    <a href="" style={{color:theme.text}}>Awards/Rankings</a>
                    <a href="" style={{color:theme.text}}>Hours and Locations</a>
                    <a href="" style={{color:theme.text}}>Press Inquiries</a>
                    <a href="" style={{color:theme.text}}>Newegg Careers</a>
                    <a href="" style={{color:theme.text}}>Newsroom</a>
                    <a href="" style={{color:theme.text}}>Newegg Insider</a>
                    <a href="" style={{color:theme.text}} >Calif. Transparency in Supply Chains Act </a>
                    <a href="" style={{color:theme.text}}>Cigna MRF</a>
                    </div>
                    
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p><a href="#" style={{color:theme.text}}>TOOLS & RESOURCES</a></p>
                    <br/>
                    <div style={{display:'flex',flexDirection:'column', left:'0',wordWrap:'break-word', maxWidth:'200px',gap:'25px'}}>
                    <a href="" style={{color:theme.text}}>Sell on Newegg</a>
                    <a href="" style={{color:theme.text}}>For Your Business</a>
                    <a href="" style={{color:theme.text}}>Newegg Partner Services</a>
                    <a href="" style={{color:theme.text}}>Become an Affiliate</a>
                    <a href="" style={{color:theme.text}}>Newegg Creators</a>
                    <a href="" style={{color:theme.text}}>Site Map</a>
                    <a href="" style={{color:theme.text}}>Shop by brand</a>
                    <a href="" style={{color:theme.text}}>Rebates</a>
                    <a href="" style={{color:theme.text}}>Mobile Apps</a>
                    </div>
                    
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <p><a href="#" style={{color:theme.text}}>SHOP OUR BRANDS</a></p>
                    <br/>
                    <div style={{display:'flex',flexDirection:'column', left:'0',wordWrap:'break-word', maxWidth:'200px',gap:'25px'}}>
                    <a href="" style={{color:theme.text}}>Newegg Business</a>
                    <a href="" style={{color:theme.text}}>Newegg Global</a>
                    <a href="" style={{color:theme.text}}> ABS</a>
                    <a href="" style={{color:theme.text}}>Rosewill</a>
                    </div>
                    
                    </div>
            </div>
        </div>
    </div>
    </footer>
    )
}
export default HomeFooter;