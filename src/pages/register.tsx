import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Register from "./LoginRegister/RegisterPage";
export default function regsiter() {

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const routers = useRouter();
  const [currUser, setCurrUser] = useState([])
  useEffect(()=>{
    const cookies = Cookies.get('token')
    axios.post('http://localhost:9998/validate',{cookies}).then(res=>{
    console.log(res.data.user)
    setCurrUser(res.data.user)
    // routers.push("/home")
  }).catch(err=>{
    console.log(err)
  })
    console.log(currUser)
  })
  return (
    <div>
      <Register/>
    </div>
    )
}
