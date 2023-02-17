import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginPage from "./LoginRegister/LoginPage";
import Register from "./LoginRegister/RegisterPage";

export default function regsiter() {
  

  const [users,setUsers] = useState([]);
  // useEffect(()=>{
  //   const fetching = async () =>{
  //     const res = await axios('http://localhost:9998/');
  //     setUsers(res.data)
  //   };
  //   fetching()
    
  // },[]);
  console.log(users)

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <LoginPage/>
    </div>
    )
}
