import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import style from "@/styles/navbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import {
  faMapMarker,
  faLocationDot,
  faCartShopping,
  faTools, faHourglass, faArrowRight, faMailReply, faMailBulk, faMailReplyAll, faGamepad, faGift, faTrophy, faBoxOpen, faLightbulb, faPerson, faUserCircle, faUser, faDotCircle, faCircle, faComments, faCircleQuestion, faMagnifyingGlass, faBell, faFlagUsa, faGifts
} from "@fortawesome/free-solid-svg-icons"
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { THEME, ThemeContext, ThemeProvider } from "@/theme/theme";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { LangContext } from "@/theme/language";
import Link from "next/link";

const Navbar = () => {
  // const [theme, setTheme] = useState('light');
  const [search, setSearch] = useState('');
  const { Lang, toggleLang } = useContext(LangContext)
  const [currUser, setCurrUser] = useState([]);
  const [isDark, setIsDark] = useState(false)
  const router = useRouter();
  const [dark, setDark] = useState(false)
  const [langNav, setLangNav] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [currCountry, setCurrCountry] = useState('')
  console.log(theme)
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      // localStorage is available
      setDark(false)
    } else {
      if (localStorage.getItem('theme') === "dark") {
        setDark(true)
      } else {
        setDark(false)
      }
    }
    const cookies = Cookies.get('token')
    axios.post('http://localhost:9998/validate', { cookies }).then(res => {
      console.log(res.data.user)
      setCurrUser(res.data.user)
    }).catch(err => {
      console.log(err)
    })
    console.log(currUser)
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4789dc9ad1d743caae109fc5818ebe2f`);
      const country = response.data.results[0].components.country;
      setCurrCountry(country)
    })
  }, [])
  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      <nav style={{

        backgroundColor: theme.navbar,
        color: theme.text,
        display: 'flex', flexDirection: 'column'
      }}>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          top: '0',
          position: 'sticky',
          zIndex: '1'
        }}>
          <div onClick={() => {
            if (sidebar == false) {
              window.sessionStorage.setItem('theme', 'asdas')
              setSidebar(true);
            } else {
              window.sessionStorage.setItem('theme', 's')

              setSidebar(false);
            }
          }}>
            <div style={{ width: '20px', height: '10px', display: 'inline-block', position: 'relative', cursor: 'pointer' }}>
              <div className={style.garis1} style={{ backgroundColor: theme.text }}></div>
              <div className={style.garis2} style={{ backgroundColor: theme.text }}></div>
              <div className={style.garis3} style={{ backgroundColor: theme.text }}></div>
            </div>

          </div>

          <a href="/home"><div className={style.splash}></div> <img
            src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png"
            alt="Newegg" className={style.logo} ></img>
          </a>
          <a href=""><div style={{ display: 'flex' }}>
            <FontAwesomeIcon icon={faLocationDot} style={{
              marginTop: '12px', marginRight: '10px'
              , color: theme.text
            }} />
            <div style={{ color: 'grey' }}>
              {Lang.isEng ? "Deliver To" : "Kirim ke"}
              <div style={{ color: theme.text }}>{currCountry ? currCountry : "Select Address"}</div>
            </div>
          </div></a>



          <div className={style.bar}>
            <input type="text" className={style.text} />
            <button className={style.search} >
              <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} style={{ color: theme.text }} />
            </button>
          </div>
          <div className={style.notif} style={{ borderColor: theme.text }}>
            <a href=""><FontAwesomeIcon icon={faBell} className={style.icon} style={{ color: theme.text }} /></a>

          </div>
          <div className={style.language} style={{ borderColor: theme.text }} onClick={(e) => {
            e.preventDefault()
            setLangNav(langNav === true ? false : true)
          }} >

            <FontAwesomeIcon icon={faFlagUsa} className={style.icon} style={{ color: theme.text }} />
            {/* bikin dropdown menu */}
            <br />

          </div>
          <div>
            <a href="home/user/wishlist"><FontAwesomeIcon icon={faGifts} /></a>
          </div>
          {/* <button onClick={handleThemeToggle}>Toggle Theme</button> */}
          <label className={style.switch}  >
            <input type="checkbox" onChange={toggleTheme} defaultChecked={dark} />
            <span className={style.slider}  ></span>
          </label>
          <a href="/home/accountsetting"><div style={{ display: 'flex' }}>
            <FontAwesomeIcon icon={faUser} style={{ marginTop: '12px', marginRight: '10px', color: theme.text }} />
            <div >
              {Lang.isEng ? "Welcome" : "Selamat Datang"}
              <div style={{ color: theme.text }}>{currUser ? currUser.firstname : Lang.isEng ? "SignIn/Register" : "Masuk/Daftar"}</div>
            </div>
          </div></a>



          <div style={{ color: 'grey' }}>
            Returns
            <div style={{ color: theme.text }}>& Orders</div>
          </div>
          <div>
            <FontAwesomeIcon icon={faCartShopping} style={{ color: theme.text }} />
          </div>
        </div>
        <div className={style.navbar2} style={{ position: 'relative' }}>
          {/* kiri  watchegg dll*/}
          <div className={style.navbar2scroll} style={{ color: theme.text }}>
            <div>
              <FontAwesomeIcon icon={faCircle} /> {Lang.isEng ? "Watch : Newegg Now!" : "Nonton : Newegg sekarang!"}
            </div>
            <div>
              Today's Best Deal
            </div>
            <div>
              {Lang.isEng ? "Best Sellers" : "Penjualan Terbaik"}
            </div>
            <div>
              RTX4070/4060/4050 Gaming Laptops
            </div>
            <div>
              <a href="">{Lang.isEng ? "Gift Ideas" : "Ide Hadiah"}</a>
            </div>
            <div>
              <a href="">{Lang.isEng ? "PC Builder" : "Bikin PC"}</a>
            </div>
            <div>
              VR
            </div>
            <div>{Lang.isEng ? "Browsing History" : "Riwayat Penjelajahan"}
            </div>
            <div>
              Gaming PC Finder
            </div>
            <div>
              {Lang.isEng ? "NewEgg Creator" : "Konten Kreator NewEgg"}
            </div>
          </div>

          <div style={{ color: theme.text }}>
            {Lang.isEng ? "NewEgg Business" : "Bisnis NewEg"}
          </div>
          <div className={style.verticalline} style={{ color: theme.text }}></div>
          <div className={style.navbar2button}>
            <FontAwesomeIcon icon={faComments} />
            {Lang.isEng ? "Feedback" : "Masukan"}
          </div>
          <div className={style.navbar2button}>
            <FontAwesomeIcon icon={faCircleQuestion} />
            {Lang.isEng ? "Help Center" : "Pusat Bantuan"}
          </div>
          {/* kanan */}


        </div>

      </nav>
      <div className={style.flagdropdown} style={{ backgroundColor: theme.background, display: langNav ? 'block' : 'none' }} >
        <div className={style.flagtitle}
          style={{ color: theme.text }} onClick={(e) => {
            console.log("=====================")
            // console.log(e.target.value)
          }}>
          {Lang.isEng ? "Language" : "Bahasa"}
        </div>
        <div className={style.flagcontent} style={{
          cursor: 'pointer',
          color: theme.text
        }} onClick={() => {
          toggleLang(false)
        }}>
          Indonesia
        </div>
        <div className={style.flagcontent} style={{
          cursor: 'pointer',
          color: theme.text
        }} onClick={() => {
          toggleLang(true)
        }}>
          {Lang.isEng ? "English" : "Inggris"}
        </div>
        <div >

        </div>
      </div>
    </>
  );


};

export default Navbar;