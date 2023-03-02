
import style from "@/styles/homefooter.module.css"
import { ThemeContext } from "@/theme/theme";
import { faDiscord, faFacebookF, faInstagramSquare, faLinkedinIn, faPinterestSquare, faTiktok, faTwitch, faTwitter, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
const HomeFooter = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <footer className={style.footer} style={{ backgroundColor: theme.footerbg, color: 'white' }}>
            <div className={style.col2} style={{ display: 'flex', justifyContent: 'space-evenly', padding: '50px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontWeight: 'bold' }}>Customer Service</p>
                    <br />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'column', left: '0', wordWrap: 'break-word', maxWidth: '200px', gap: '25px' }}>
                        <a href="" >Help  Center</a>
                        <a href="" >Track an Order</a>
                        <a href="" >Return an item</a>
                        <a href="" >Return Policy</a>
                        <a href="" >Privacy & Security</a>
                        <a href="" >Feedback</a>
                    </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p  style={{ fontWeight: 'bold' }}><a href="#" > My Account</a></p>
                    <br />
                    <br/>
                    <div style={{ display: 'flex', flexDirection: 'column', left: '0', wordWrap: 'break-word', maxWidth: '200px', gap: '25px', color: theme.text }}>
                        <a href="" >Login/Register</a>
                        <a href="" >Order History</a>
                        <a href="" >Returns History</a>
                        <a href="" >Address Book</a>
                        <a href="" >Wish Lists</a>
                        <a href="" >My Build Lists</a>
                        <a href="" >My Build Showcase</a>
                        <a href="" >Email Notifications</a>
                        <a href="" >Subscriptions Orders</a>
                        <a href="" >Auto Notifications</a>
                    </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p  style={{ fontWeight: 'bold' }}><a href="#" >COMPANY INFORMATION</a></p>
                    <br />
                    <br/>
                    <div style={{ display: 'flex', flexDirection: 'column', left: '0', wordWrap: 'break-word', maxWidth: '200px', gap: '25px' }}>
                        <a href="" >About Newegg</a>
                        <a href="" >Investor Relations</a>
                        <a href="" >Awards/Rankings</a>
                        <a href="" >Hours and Locations</a>
                        <a href="" >Press Inquiries</a>
                        <a href="" >Newegg Careers</a>
                        <a href="" >Newsroom</a>
                        <a href="" >Newegg Insider</a>
                        <a href=""  >Calif. Transparency in Supply Chains Act </a>
                        <a href="" >Cigna MRF</a>
                    </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p  style={{ fontWeight: 'bold' }}><a href="#" >TOOLS & RESOURCES</a></p>
                    <br /><br/>
                    <div style={{ display: 'flex', flexDirection: 'column', left: '0', wordWrap: 'break-word', maxWidth: '200px', gap: '25px' }}>
                        <a href="" >Sell on Newegg</a>
                        <a href="" >For Your Business</a>
                        <a href="" >Newegg Partner Services</a>
                        <a href="" >Become an Affiliate</a>
                        <a href="" >Newegg Creators</a>
                        <a href="" >Site Map</a>
                        <a href="" >Shop by brand</a>
                        <a href="" >Rebates</a>
                        <a href="" >Mobile Apps</a>
                    </div>

                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <p  style={{ fontWeight: 'bold' }}><a href="#" >SHOP OUR BRANDS</a></p>
                    <br /><br/>
                    <div style={{ display: 'flex', flexDirection: 'column', left: '0', wordWrap: 'break-word', maxWidth: '200px', gap: '25px' }}>
                        <a href="" >Newegg Business</a>
                        <a href="" >Newegg Global</a>
                        <a href="" > ABS</a>
                        <a href="" >Rosewill</a>
                    </div>

                </div>
            </div>

            <div style={{
                color: 'black', display: 'flex', justifyContent: 'space-between', height: '11vh'
                , backgroundColor: theme.background, width: '100%',
            }}>
                <div style={{ display: 'flex', width: '100%', gap: '10px', margin: '21px', marginLeft: '56px', color: theme.text }}>
                    <div> © 2000-2023 Newegg Inc.  All rights reserved</div>
                    <div> Terms & Conditions</div>
                    <div>Privacy Policy</div>
                    <div> Cookie Preferences</div>
                </div>
                <div style={{
                    display: 'flex',
                    gap: '50px', margin: '21px', color: theme.text, backgroundColor: theme.background
                }} className={style.circlelink} >
                    <a href="https://www.facebook.com/Newegg"
                        style={{ color: theme.text }}
                    ><FontAwesomeIcon icon={faFacebookF} /></a>
                    <a href="https://twitter.com/Newegg">

                        <FontAwesomeIcon icon={faTwitter} style={{ color: theme.text }} /></a>
                    <a href="https://www.instagram.com/newegg/"><FontAwesomeIcon icon={faInstagramSquare} style={{ color: theme.text }} /></a>
                    <a href="https://www.linkedin.com/company/newegg-com/"><FontAwesomeIcon icon={faLinkedinIn} style={{ color: theme.text }} /></a>
                    <a href="https://id.pinterest.com/newegg/"><FontAwesomeIcon icon={faPinterestSquare} style={{ color: theme.text }} /></a>
                    <a href="https://www.youtube.com/user/newegg"><FontAwesomeIcon icon={faYoutubeSquare} style={{ color: theme.text }} /></a>
                    <a href="https://www.twitch.tv/newegg"><FontAwesomeIcon icon={faTwitch} style={{ color: theme.text }} /></a>
                    <a href="https://discord.com/invite/newegg"><FontAwesomeIcon icon={faDiscord} style={{ color: theme.text }} /></a>
                    <a href="https://www.tiktok.com/@newegg"><FontAwesomeIcon icon={faTiktok} style={{ color: theme.text }} /></a>
                </div>

            </div>
        </footer>
    )
}
export default HomeFooter;