import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect, useState } from "react";
export default function loginonetimePage(){
    const router = useRouter();
    const [pass,setPass]=useState("");
    console.log(router);
    return(
        <div>
            <img 
            src="https://c1.neweggimages.com/WebResource/Themes/2005/Nest/logo_424x210.png" 
            alt="Newegg" style={{
            alignItems:'center',
            textAlign:'center',
            margin:'auto',
            display:'block'
            
        }} ></img>
            <div>
                <h1 style={{textAlign:'center', margin:'auto', color:'black',fontSize:'45px'}}>Sign in Assistance</h1>
            </div>
            <div>
                <div style={{
                    margin:'auto',
                    width:'500px',
                    wordWrap:'break-word',
                    textAlign:'left',
                    color:'black',
                    fontSize:'25px',
                    opacity:'0.5'
                }}>
                    <br/>
                </div>
                <br/>
                <div style={{backgroundColor:'white', color:'black', alignItems:'center',width:'500px',margin:'auto'}}>
                    <div >{router.query.email}</div>
                    {/* <input type="email" name="" id="" placeholder="Email Address" style={{width:'500px', backgroundColor:'white',color:'black', height:'30px'}}/> */}
                </div>
                <br/>
                <br/>
                <br/>
                <div style={{display:'flex'}}>
                    <button style={{
                        width: '500px',
                        padding: '12px',
                        fontSize: '16px',
                        margin: 'auto',
                        alignItems:'center',
                        textAlign:'center',
                        borderRadius: '4px',
                        backgroundColor: 'orange',
                        color: 'black',
                        cursor: 'pointer',
                        borderWidth:'thin'
                        }} type="submit" onClick={(e)=>{
                            e.preventDefault()
                            const data = {
                                Email : router.query.email
                            }
                            console.log(data.Email)
                            axios.post("http://localhost:9998/forgotpassword",data).then(res=>{
                                console.log(res)
                                const encoded = encodeURIComponent(data.Email.toString());
                                router.push(`/login/verif/[email]`,`/login/verif/${encoded}`);
                            }).catch(err=>{
                                console.log(err)
                            })
                        }}>
                        REQUEST VERIFICATION CODE
                    </button>
                </div>

                <br/>
                <div style={{textAlign:'center',color:'black',gap:'15px', alignItems:'center', justifyItems:'center'}}>
                    New to NewEgg?
                    <a href="/" style={{ textDecorationLine:'underline', fontWeight:'bold'  }}>Contact Customer Service</a>
                </div>


            </div>
        </div>
    )
}