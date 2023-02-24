import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import style from "@/styles/navbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import {
  faMapMarker,
  faLocationDot,
  faCartShopping,
  faTools, faHourglass, faArrowRight, faMailReply, faMailBulk, faMailReplyAll, faGamepad, faGift, faTrophy, faBoxOpen, faLightbulb, faPerson, faUserCircle, faUser, faDotCircle, faCircle, faComments, faCircleQuestion, faMagnifyingGlass, faBell, faFlagUsa
} from "@fortawesome/free-solid-svg-icons"
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { THEME, ThemeContext, ThemeProvider } from "@/theme/theme";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

const Navbar = () => {
  // const [theme, setTheme] = useState('light');
  const [search, setSearch] = useState('');
  const [currUser, setCurrUser] = useState([]);
  const [isDark, setIsDark] = useState(false)
  const router = useRouter();
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [currCountry, setCurrCountry] = useState('')
  console.log(theme)
  useEffect(() => {
    let darks = localStorage.getItem('isDark')

    if (!darks) {
      setIsDark(false)
    } else {
      setIsDark(Boolean(darks))
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

    <nav style={{

      backgroundColor: theme.navbar,
      color: isDark ? 'white' : 'black',
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
            Hello
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
        <div className={style.language} style={{ borderColor: theme.text }} >

          <a href=""><FontAwesomeIcon icon={faFlagUsa} className={style.icon} style={{ color: theme.text }} /></a>

        </div>

        {/* <button onClick={handleThemeToggle}>Toggle Theme</button> */}
        <label className={style.switch} onClick={toggleTheme} >
          <input type="checkbox" onChange={toggleTheme} />
          <span className={style.slider}  ></span>
        </label>



        <a href=""><div style={{ display: 'flex' }}>
          <FontAwesomeIcon icon={faUser} style={{ marginTop: '12px', marginRight: '10px', color: theme.text }} />
          <div style={{ color: 'grey' }} onClick={(e) => {
            destroyCookie(null, 'token', { path: '/' })
            router.push("/login")

          }}>
            Welcome
            <div style={{ color: theme.text }}>{currUser ? currUser.firstname : "Sign/Register"}</div>
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
            <FontAwesomeIcon icon={faCircle} /> Watch : Newegg now
          </div>
          <div>
            Today's Best Deal
          </div>
          <div>
            Best Sellers
          </div>
          <div>
            RTX4070/4060/4050 Gaming Laptops
          </div>
          <div>
            <a href="">Gift Ideas</a>
          </div>
          <div>
            <a href="">PC Builder</a>
          </div>
          <div>
            VR
          </div>
          <div>Browsing History//navbarlagi</div>
          <div>
            Gaming PC Finder
          </div>
          <div>
            Newegg Creator
          </div>
        </div>

        <div style={{ color: theme.text }}>
          NewEgg Business
        </div>
        <div className={style.verticalline} style={{ color: theme.text }}></div>
        <div className={style.navbar2button}>
          <FontAwesomeIcon icon={faComments} />
          Feedback
        </div>
        <div className={style.navbar2button}>
          <FontAwesomeIcon icon={faCircleQuestion} />
          Feedback
        </div>
        {/* kanan */}


      </div>
    </nav>
  );


};

export default Navbar;