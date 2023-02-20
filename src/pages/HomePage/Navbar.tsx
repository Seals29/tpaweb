import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import style from "@/styles/navbar.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {faMapMarker, 
  faLocationDot,
  faCartShopping,
  faTools,faHourglass,faArrowRight,faMailReply,faMailBulk, faMailReplyAll, faGamepad, faGift, faTrophy, faBoxOpen, faLightbulb, faPerson, faUserCircle, faUser, faDotCircle, faCircle, faComments, faCircleQuestion, faMagnifyingGlass, faBell, faFlagUsa} from "@fortawesome/free-solid-svg-icons"
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { THEME, ThemeContext, ThemeProvider } from "@/theme/theme";

const Navbar = () => {
    // const [theme, setTheme] = useState('light');
    const [search, setSearch] = useState('');
    const [currUser,setCurrUser] = useState([]);
    const [isDark,setIsDark] = useState(false)
    const{theme, toggleTheme} = useContext(ThemeContext)
    console.log(theme)
    useEffect(()=>{
        let darks = localStorage.getItem('isDark')
        
        if (!darks){
          setIsDark(false)
        }else{
          setIsDark(Boolean(darks)) 
        }

        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate',{cookies}).then(res=>{
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err=>{
            console.log(err)
        })
        console.log(currUser)
        
    },[])
    const handleSearch = (event:any) => {
      setSearch(event.target.value);
    };
  
    const [sidebar, setSidebar] = useState(false);
    return (
      
      <nav style={{ 
        
        backgroundColor:theme.navbar, 
        color: isDark  ? 'white' : 'black' ,
         display:'flex',flexDirection:'column'}}>
        
        <div style={{ display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem',
        top:'0',
         position:'sticky',
         zIndex:'1' }}>
          <div onClick={()=>{
            if(sidebar==false){
              window.sessionStorage.setItem('theme','asdas')
              setSidebar(true);
            }else{
              window.sessionStorage.setItem('theme','s')
              
              setSidebar(false);
            }
          }}>
                <div style={{width:'20px',height:'10px',display:'inline-block',position:'relative',cursor:'pointer'}}>
                <div className={style.garis1} style={{backgroundColor:theme.text}}></div>
                <div className={style.garis2} style={{backgroundColor:theme.text}}></div>
                <div className={style.garis3} style={{backgroundColor:theme.text}}></div>
          </div>
          <div className={style.sidebar} style={
            {visibility: sidebar==true? "visible":"hidden",display:'flex', overflow:'auto'}}>
              <ul style={{border:'10px',backgroundColor:theme.bgsidebar,color:theme.text}}>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="#" style={{color:theme.text}}><FontAwesomeIcon icon={faHourglass}/> Today's Big Deals</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="#" style={{color:theme.text}}><FontAwesomeIcon icon={faMailBulk}/>Email Deals!</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="#" style={{color:theme.text}}><FontAwesomeIcon icon={faTools}/>Contact</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="#" style={{color:theme.text}}><FontAwesomeIcon icon={faGamepad}/>Gaming PC Finder</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="#" style={{color:theme.text}}><FontAwesomeIcon icon={faGift}/> Gift Ideas</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="#" style={{color:theme.text}}><FontAwesomeIcon icon={faTrophy}/> Best Seller </a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="#" style={{color:theme.text}}><FontAwesomeIcon icon={faBoxOpen}/>Unbox This!</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="#" style={{color:theme.text}}><FontAwesomeIcon icon={faLightbulb}/>NewEgg's Creator</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><hr style={{opacity:'0.2'}}/></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><h3 style={{color: theme.text,fontStyle:'italic'}}>Trending Events</h3></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="" style={{color:theme.text}}>Overclock Your Heart</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><hr style={{opacity:'0.2'}}/></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><h3 style={{color:theme.text,fontStyle:'italic',fontSize:'15px'}}>MORE AT NEWEGG</h3></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="" style={{color:theme.text}}>Newegg Store Credit Card</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="" style={{color:theme.text}}>Newegg Gift Card</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="" style={{color:theme.text}}>Newegg Select</a></li>
                  <li className={style.lisidebar} style={{color:theme.text}}><a href="" style={{color:theme.text}}>Newegg insider</a></li>
              
              </ul>
              <ul style={{border:'10px', backgroundColor:theme.sidebar}}>
                 
                  <li className={style.lisidebar}><h3 style={{color:theme.text,fontStyle:'italic'}}>ALL PRODUCTS</h3></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Computer & Storage <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Computer Peripherals <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Computer Systems <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Appliances <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>TV & Home Theater <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Electronics <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Electronics <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Computer Systems <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Gaming & VR <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Networking <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Smart Home & Security <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Office Solutions <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Software & Services <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Automotive & Tools<div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}}>Home & Outdoors <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between',color:theme.text}} className={style.links}>Toys, Drones & Maker <div style={{right:'0'}}>{'>'}</div></a></li>
              </ul>
          </div>
          </div>

            <a href="/home"><div className={style.splash}></div> <img 
            src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png" 
            alt="Newegg" className={style.logo} ></img>
            </a>
           <a href=""><div style={{display:'flex'}}>
          <FontAwesomeIcon icon={faLocationDot} style={{marginTop:'12px', marginRight:'10px'
        , color:theme.text}}/>
          <div style={{color:'grey'}}>
            Hello
            <div style={{color:theme.text}}>Select Address</div>
          </div>
          </div></a>
          


          <div className={style.bar}>
            <input type="text" className={style.text} />
            <button className={style.search} >
              <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon} style={{color:theme.text}}/>
            </button>
          </div>
          <div className={style.notif} style={{borderColor:theme.text}}> 
            <a href=""><FontAwesomeIcon icon={faBell} className={style.icon} style={{color:theme.text}}/></a>
            
          </div>
          <div className={style.language} style={{borderColor:theme.text}} >
            
            <a href=""><FontAwesomeIcon icon={faFlagUsa} className={style.icon}  style={{color:theme.text}} /></a>

          </div>
          
          {/* <button onClick={handleThemeToggle}>Toggle Theme</button> */}
          <label className={style.switch} onClick={toggleTheme} >
            <input type="checkbox" onChange={toggleTheme} />
            <span className={style.slider}  ></span>
          </label>



          <a href=""><div style={{display:'flex'}}>
          <FontAwesomeIcon icon={faUser} style={{marginTop:'12px', marginRight:'10px',color:theme.text}}/>
          <div style={{color:'grey'}}>
            Welcome
            <div style={{color:theme.text}}>{currUser.firstname}</div>
          </div>
          </div></a>
          
          
        
          <div style={{color:'grey'}}>
            Returns
            <div style={{color:theme.text}}>& Orders</div>
          </div>
          <div>
              <FontAwesomeIcon icon={faCartShopping}style={{color:theme.text}}/>
            </div>
        </div>
        <div className={style.navbar2} style={{position:'relative'}}>
          {/* kiri  watchegg dll*/}
          <div className={style.navbar2scroll} style={{color:theme.text}}>
            <div>
              <FontAwesomeIcon icon={faCircle}/> Watch : Newegg now
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
          
          <div  style={{color:theme.text}}>
            NewEgg Business
          </div>
          <div className={style.verticalline}  style={{color:theme.text}}></div>
          <div className={style.navbar2button}>
            <FontAwesomeIcon icon={faComments}/>
            Feedback
          </div>
          <div className={style.navbar2button}>
            <FontAwesomeIcon icon={faCircleQuestion}/>
            Feedback
          </div>
          {/* kanan */}


        </div>
      </nav>
    );


  };
  
  export default Navbar;