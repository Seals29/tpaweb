import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import style from "@/styles/notif.module.css";
import { ThemeContext } from "@/theme/theme";
import { useContext } from "react";
export default function notification(){
    const {theme} = useContext(ThemeContext)
    return (
        <div>
            <Navbar/>

            <div className={style.notifcontainer} style={{
                backgroundColor:theme.background
            }}>
                <h1 style={{
                    color:theme.text
                }}>Message Notification
                </h1>
                <hr />
                <div className={style.notifcard}>

                </div>
            </div>

            <footer>
                <HomeFooter/>
            </footer>
        </div>
    )
}