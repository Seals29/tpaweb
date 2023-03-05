import HomeFooter from "../HomePage/Footer";
import Navbar from "../HomePage/Navbar";

import style from "@/styles/homes.module.css"
import { useState } from "react";
import axios from "axios";
export default function newvoucher() {
    const[code,setCode] =useState('')
    const [currency,setCurrency] = useState([])
    const handleAdd=(e:any)=>{
        e.preventDefault()
        const data = {
            VoucherCode : code,
            VoucherCurrency : currency.toString()
        }
        console.log(data)
        axios.post("http://localhost:9998/newvoucher",data).then(res=>{
            console.log(res)
            if(res.data.error){
                alert(res.data.error)
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
        <div>
            <Navbar />
        </div>

        <div>
            <div className={style.containerform} style={{paddingTop:'5px'}}>
                <label>Voucher Code:</label>
                <input type="text" placeholder="Shop name" onChange={(e) => {
                    setCode(e.target.value)
                }} /><br /><br />
                <label>Currency</label>
                <input type="number" step={5} placeholder="Currency" onChange={(e) => {
                    setCurrency(e.target.value)
                }} /><br /><br />


                <button onClick={handleAdd}>Add New Voucher!</button>
                {/* e.preventDefault() */}
                {/* const imageRef = ref(storage, `shopBanner/${currUser.firstname}/${imageUpload.name + "OldEgg"}`); */}
               
            </div>
        </div>
        <HomeFooter/>
    </div>
    )
}