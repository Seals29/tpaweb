import HomeFooter from "../HomePage/Footer";
import Navbar from "../HomePage/Navbar";
import style from "@/styles/homes.module.css"
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/theme/theme";
import { LangContext } from "@/theme/language";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import axios from "axios";
export default function changephonenumber(){
    const {theme} = useContext(ThemeContext)
    const {Lang} = useContext(LangContext)
    const [number, setNumber]= useState([])
    const routers = useRouter()
    const [currUser, setCurrUser]=useState([])
    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
            const cleanPhoneNumber = res.data.user.phonenumber.replace('+62 ', '').replace(/-/g, '');
            setNumber("0"+cleanPhoneNumber)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        // alert("asdas")
    }, [])
    const handleSubmit = (e:any)=>{
            e.preventDefault()
            const data = {
                userid:currUser.ID.toString(),
                phonenumber : number.toString(),
            }
            console.log(data)
            axios.post("http://localhost:9998/updateuserphone",data).then(res=>{
                console.log(res)
                if(res.data.message){
                    alert(res.data.message)
                }
                if(res.data.error){
                    alert(res.data.error)
                }
            })
    }
    return(

        <div>

            <Navbar/>


            <div className={style.phonecontainer}
            style={{backgroundColor:theme.background2, color:theme.text}}
            >
<h1>Add Phone Number</h1>
{/* <label >Phone Number</label> */}
        <input type="number"value={number}onChange={(e:any)=>{
            setNumber(e.target.value)
            console.log(number)
        }} maxLength={15} />
        <br/>
        <button onClick={handleSubmit}>Submit !</button>
            </div>

            

            <HomeFooter/>
        </div>
    )
}