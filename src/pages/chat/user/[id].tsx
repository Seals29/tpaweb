import Navbar from "@/pages/HomePage/Navbar";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useContext, useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
import Link from "next/link";
import Pagination from "@/pages/components/pagination";

import { faArrowCircleLeft, faBackward, faBackwardFast, faBackwardStep, faBattery3, faBatteryCar, faCarTunnel, faCompactDisc, faComputer, faComputerMouse, faFootball, faGamepad, faHeadphones, faKeyboard, faNetworkWired, faPrint, faRoute, faSnowplow, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import HomeFooter from "@/pages/HomePage/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebookF, faInstagramSquare, faLinkedinIn, faPinterestSquare, faTiktok, faTwitch, faTwitter, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { ThemeContext } from "@/theme/theme";
export default function main() {
    const { theme } = useContext(ThemeContext)
    return (
        <>
            <header style={{ color: '' }}>
                <Navbar />
            </header>
            <div style={{
                backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center', display: `${currUser.isban ? "" : "none"}`
            }}>Your account is banned!</div>
            {/* isi  shopnamenya */}
            <div>

            </div>
            <footer style={{ position: 'sticky' }}>
                <HomeFooter />

            </footer>

        </>
    )
}
