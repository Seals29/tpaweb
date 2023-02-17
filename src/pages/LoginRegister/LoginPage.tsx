import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })
import React, { useEffect, useState } from 'react';
import LoginFooter from './LoginFooter';
import LoginHeader from './Loginheader';
import style from "@/styles/login.module.css"
import {faGoogle,faApple} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';


const LoginPage = () => {
  const routers = useRouter();
  const [users, setUsers] = useState([]);
  const [currUser,setCurrUser] = useState([]);
  useEffect(()=>{
    // if(Cookies.get('token')!=null){
      // routers.push('/home');
      
    // }
    axios.get('http://localhost:9998/getuser').then(res=>{
      console.log(res);
      setUsers(res.data);
    }).catch(err=>{
      console.log(err);
    })
    
    
    const cookies = Cookies.get('token')
      axios.post('http://localhost:9998/validate',{cookies}).then(res=>{
        console.log(res.data.user)
        setCurrUser(res.data.user)
        routers.push("/home")
      }).catch(err=>{
        console.log(err)
      })
        console.log(currUser)
  },[])


  console.log(users);
  // const jwt = require('jsonwebtoken');
  // const temptoken = Cookies.get('token');
  // console.log(temptoken)
  // try {
  //   console.log(jwt.verify(temptoken,'lionel'));
  // } catch (error) {
  //   console.log(error)
  // }
  
  // const decoded = jwt.verify(temptoken,'lionel');
  
  // const id = decoded.id;
  // console.log(id);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useRouter();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter a username and password.');
      return;
    }
    console.log('Username:', username);
    console.log('Password:', password);
    setError('');
  };

  return (
    <div className={style.container}>
      
      <form className={style.form}>
        <LoginHeader/>
        <h2  className={style.heading}>Sign In</h2>
        
        
        <input className = {style.input} type="email" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
          placeholder="Email Address"
        />
        <div className={style.button} onClick={()=>{
          users.map((user)=>{
            // console.log(user.email);
            if(user.email===(username)){
              const encoded = encodeURIComponent(username);
              routers.push(`/login/users/[email]`,`/login/users/${encoded}`);
              console.log(username)
            }
          })
        }}>
          Sign In
        </div>
        <button type="submit" className={style.button2}>
        
          GET ONE-TIME SIGN IN CODE
        </button>
        <a href="" style={{
          color:'black',
          textDecorationLine:'underline' 
        }}>What's the One-Time Code</a>
        <br/>
        <div style={{color:'black', display:'flex'}}>
          New to NewEgg?
          <div style={{ textDecorationLine:'underline', fontWeight:'bold'  }} onClick={()=>{
            navigate.push('/register')
          }}>Sign Up</div>
        </div>
        <br/>
        <div style={{color : 'black'}}>OR</div>
        <button type="submit" className={style.button3} >
          
          <FontAwesomeIcon icon={faGoogle} style={{left:'0',float:'left'}}/>
          <div style={{textAlign:'center', justifyContent:'center',alignItems:'center'}}> Sign In with Google</div>
         
        </button>
        <button type="submit" className={style.button3}>
        <FontAwesomeIcon icon={faApple} style={{left:'0',float:'left'}}/>
          <div style={{textAlign:'center', justifyContent:'center',alignItems:'center'}}> Sign In with Apple</div>
        </button>
      </form>
    </div>
  );
};

export default LoginPage;