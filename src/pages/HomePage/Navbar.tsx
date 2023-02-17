import { useEffect, useState } from "react";
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

const button = styled.button`
  background-color : blue;&:hover {
    background-color : lighblue;
  }
`;
const Navbar = () => {
    const [theme, setTheme] = useState('light');
    const [search, setSearch] = useState('');
    const [currUser,setCurrUser] = useState([]);
    useEffect(()=>{
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
  
    const handleThemeToggle = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
      // theme = localStorage.getItem('theme');
        setTheme(localStorage.getItem('theme')==='light'?'dark':'light');
        console.log(localStorage.getItem('theme'))
    };
    const [sidebar, setSidebar] = useState(false);
    return (
        
      <nav style={{ 
        backgroundColor: theme === 'light' ? 'white' : 'black', 
        color: theme === 'light' ? 'black' : 'white' ,
         display:'flex',flexDirection:'column'}}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', position:'sticky' }}>
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
                <div className={style.garis1}></div>
                <div className={style.garis2}></div>
                <div className={style.garis3}></div>
          </div>
          <div className={style.sidebar} style={{visibility: sidebar==true? "visible":"hidden",display:'flex', overflow:'auto', backgroundColor:theme=="dark"?'#007aff':'white'}}>
              <ul style={{border:'10px'}}>
                  <li className={style.lisidebar}><a href="#"><FontAwesomeIcon icon={faHourglass}/> Today's Big Deals</a></li>
                  <li className={style.lisidebar}><a href="#"><FontAwesomeIcon icon={faMailBulk}/>Email Deals!</a></li>
                  <li className={style.lisidebar}><a href="#"><FontAwesomeIcon icon={faTools}/>Contact</a></li>
                  <li className={style.lisidebar}><a href="#"><FontAwesomeIcon icon={faGamepad}/>Gaming PC Finder</a></li>
                  <li className={style.lisidebar}><a href="#"><FontAwesomeIcon icon={faGift}/> Gift Ideas</a></li>
                  <li className={style.lisidebar}><a href="#"><FontAwesomeIcon icon={faTrophy}/> Best Seller </a></li>
                  <li className={style.lisidebar}><a href="#"><FontAwesomeIcon icon={faBoxOpen}/>Unbox This!</a></li>
                  <li className={style.lisidebar}><a href="#"><FontAwesomeIcon icon={faLightbulb}/>NewEgg's Creator</a></li>
                  <li className={style.lisidebar}><hr style={{opacity:'0.2'}}/></li>
                  <li className={style.lisidebar}><h3 style={{color:'black',fontStyle:'italic'}}>Trending Events</h3></li>
                  <li className={style.lisidebar}><a href="">Overclock Your Heart</a></li>
                  <li className={style.lisidebar}><hr style={{opacity:'0.2'}}/></li>
                  <li className={style.lisidebar}><h3 style={{color:'black',fontStyle:'italic',fontSize:'15px'}}>MORE AT NEWEGG</h3></li>
                  <li className={style.lisidebar}><a href="">Newegg Store Credit Card</a></li>
                  <li className={style.lisidebar}><a href="">Newegg Gift Card</a></li>
                  <li className={style.lisidebar}><a href="">Newegg Select</a></li>
                  <li className={style.lisidebar}><a href="">Newegg insider</a></li>
              
              </ul>
              <ul style={{border:'10px'}}>
                  <li className={style.lisidebar}><h3 style={{color:'black',fontStyle:'italic'}}>ALL PRODUCTS</h3></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Computer & Storage <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Computer Systems <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Computer Peripherals <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Appliances <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>TV & Home Theater <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Electronics <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Electronics <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Computer Systems <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Gaming & VR <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Networking <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Smart Home & Security <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Office Solutions <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Software & Services <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Automotive & Tools<div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Home & Outdoors <div style={{right:'0'}}>{'>'}</div></a></li>
                  <li className={style.lisidebar}><a href="#" style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>Toys, Drones & Maker <div style={{right:'0'}}>{'>'}</div></a></li>

              </ul>
          </div>
          </div>

            <a href=""><div className={style.splash}></div> <img 
            src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png" 
            alt="Newegg" className={style.logo} ></img>
            </a>
           <a href=""><div style={{display:'flex'}}>
          <FontAwesomeIcon icon={faLocationDot} style={{marginTop:'12px', marginRight:'10px'}}/>
          <div style={{color:'grey'}}>
            Hello
            <div style={{color: theme=="light"?'black':'white'}}>Select Address</div>
          </div>
          </div></a>
          


          <div className={style.bar}>
            <input type="text" className={style.text} />
            <button className={style.search}>
              <FontAwesomeIcon icon={faMagnifyingGlass} className={style.icon}/>

            </button>
          </div>
          <div className={style.notif}>
            <a href=""><FontAwesomeIcon icon={faBell} className={style.icon}/></a>
            
          </div>
          <div className={style.language}>
            
            <a href=""><FontAwesomeIcon icon={faFlagUsa} className={style.icon}/></a>

          </div>
          
          {/* <button onClick={handleThemeToggle}>Toggle Theme</button> */}
          <div className={style.switch}>
            <input type="checkbox" />
            <span className={style.slider}></span>
          </div>



          <a href=""><div style={{display:'flex'}}>
          <FontAwesomeIcon icon={faUser} style={{marginTop:'12px', marginRight:'10px'}}/>
          <div style={{color:'grey'}}>
            Welcome
            <div style={{color: theme=="light"?'black':'white'}}>{currUser.firstname}</div>
          </div>
          </div></a>
          
          
        
          <div style={{color:'grey'}}>
            Returns
            <div style={{color: theme=="light"?'black':'white'}}>& Orders</div>
          </div>
          <div>
              <FontAwesomeIcon icon={faCartShopping}/>
            </div>
        </div>
        <div className={style.navbar2} style={{position:'relative'}}>
          {/* kiri  watchegg dll*/}
          <div className={style.navbar2scroll}>
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
          
          <div>
            NewEgg Business
          </div>
          <div className={style.verticalline}></div>
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