import LoginHeader from "@/pages/LoginRegister/Loginheader";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useEffect, useState } from "react";
export default function login2Page(){
    const router = useRouter();
    const [pass,setPass]=useState("");
    console.log(router);
    return(
        <div style={styles.container}>
          
          <div style={styles.form}>
            <LoginHeader/>
            <h2 style={styles.heading}>Sign In</h2>
            
            <div style={{color:'black'}}>
                {router.query.email};
            </div>
            <input type="password" placeholder="Password"  value={pass} onChange={(e)=>{
                setPass(e.target.value);
            }}/>
            <div style={styles.button} onClick={()=>{
                const data = {
                    Email: router.query.email,
                    Password: pass
                }
                axios.post('http://localhost:9998/login',data).then(res=>{
                    console.log(res);
                    setCookie(null,'token',res.data.token,{
                        maxAge: 30*60,
                        path:'/'
                    })
                    router.push('/home');

                }).catch(err=>{
                    console.log(err);
                })
                
            }}>
              Sign In
            </div>
            <button style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              margin: '16px 0',
              borderRadius: '4px',
              backgroundColor: 'white',
              color: 'black',
              cursor: 'pointer',
              borderWidth:'thin',
    
            }} type="submit">
              
              GET ONE-TIME SIGN IN CODE
            </button>
            <a href="" style={{
              color:'black',
              textDecorationLine:'underline' 
            }}>What's the One-Time Code</a>
            <br/>
          </div>
        </div>
    )
}
const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.1)',
    },
    heading: {
      color: 'black',
      margin: '0 0 16px 0',
    },
    label: {
      color : 'black',
      fontWeight: 'bold',
      margin: '16px 0 8px 0',
    },
    input: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      margin: '8px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: 'white'
    },
    error: {
      color: 'red',
      margin: '16px 0 0 0',
    },
    button: {
      width: '100%',
      padding: '12px',
      fontSize: '16px',
      margin: '16px 0',
      borderRadius: '4px',
      backgroundColor: 'orange',
      color: 'black',
      borderWidth:'thin',
      cursor: 'pointer',
    },
  };