import { ThemeContext } from "@/theme/theme";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import HomeFooter from "../HomePage/Footer";
import Navbar from "../HomePage/Navbar";
import style from "@/styles/homes.module.css"
import axios from "axios";
import Cookies from "js-cookie";
export default function balance() {
    const router = useRouter()
    const { theme } = useContext(ThemeContext)
    const [voucherCode, setVoucherCode] = useState('')
    const [voucherCurrency, setVoucherCurrency] = useState('')
    const [currUser, setCurrUser]=useState([])
    
    useEffect(()=>{
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            router.push('/login')
        })
        console.log(currUser)
    },[])
    console.log(currUser)
    const handleSubmitVoucher=(e:any)=>{
        const data = {
            UserID : currUser.ID.toString(),
            VoucherCode : voucherCode
        }
        axios.post("http://localhost:9998/checkvoucher",data).then(res=>{
            console.log(res)
            if (res.data.error){
                alert(res.data.error)
                router.reload()
            }
            if(res.data.message){
                alert(res.data.message)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
   
    return (
        <div>
            <Navbar />
            <div></div>
            <div>
            <div className={style.containerform} style={{paddingTop:'5px'}}>
                <label>Your Balance<br/>$ {' '+currUser.balance}</label>
                <label>Voucher Code:</label>
                <input type="text" placeholder="Shop name" onChange={(e) => {
                    setVoucherCode(e.target.value)
                }} />
                <button onClick={handleSubmitVoucher}>Submit Voucher!</button>
                {/* e.preventDefault() */}
                {/* const imageRef = ref(storage, `shopBanner/${currUser.firstname}/${imageUpload.name + "OldEgg"}`); */}
               
            </div>
        </div>
            <HomeFooter />
        </div>
    )
}