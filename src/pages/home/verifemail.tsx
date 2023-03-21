import HomeFooter from "../HomePage/Footer";
import Navbar from "../HomePage/Navbar";
import style from "@/styles/verif.module.css"
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/theme/theme";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
export default function verifemail(){
    const {theme} = useContext(ThemeContext)
    const [inputCode, setInputCode] = useState([])
    const routers = useRouter()
    const cookies = Cookies.get('token')
    const handleVerif=(event:any)=>{
        console.log(inputCode);
        console.log(cookies);
        axios.get(`http://localhost:9998/verifuseremail?code=${inputCode}&token=${cookies}`).then(res=>{
            console.log(res);
            if(res.data.message){
                alert(res.data.message)
                routers.push("/home/accountsetting")
            }
        }).catch(err=>{
            console.log(err);
            
        })
    
    }
    return (
        <div>
            <Navbar/>

                <div className={style.verifcontainer} style={{backgroundColor:theme.background2,color:theme.text}}>
                <h1>Verification Email</h1>
                <hr />
                <input type="text"  style={{
                    border:'1px solid '+theme.text,
                    borderRadius:'15px'
                }} placeholder={"Verification Code!"} onChange={(event:any)=>{
                    event.preventDefault()
                    setInputCode(event.target.value)

                }} min={6} max={6} />
                <button onClick={handleVerif}>
                    Verif!
                </button>
                </div>


            <footer>
                <HomeFooter/>
            </footer>
        </div>
    )
}