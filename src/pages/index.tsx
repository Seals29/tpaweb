import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })
import React, { useState } from 'react';
import LoginPage from './LoginRegister/LoginPage';
import LoginHeader from './LoginRegister/Loginheader';
import LoginFooter from './LoginRegister/LoginFooter';
import Register from './LoginRegister/RegisterPage';


const Home = () => {
  return <>
  <div style={styles}>
  {/* <LoginHeader/>
  <LoginPage/>
  <LoginFooter/> */}
  <Register/>
  </div>
  </>

}
const styles= {
body : {
  backgroundColor: '#white'
}

}

export default Home;