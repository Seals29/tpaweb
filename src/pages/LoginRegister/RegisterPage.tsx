import React, { useEffect, useState } from "react";
import LoginHeader from "./Loginheader";
import axios from "axios";
import { Cookie } from "@next/font/google";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import style from "@/styles/login.module.css"
import Cookies from "js-cookie";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Register = () => {
  const routers = useRouter();

  function validatePassword(password: any) {
    if (!password.match(/[A-Z]/)) return false;
    if (!password.match(/[a-z]/)) return false;
    if (!password.match(/[@#$]/)) return false;
    if (password.length < 8 || password.length > 30) return false;

    return true;
  }
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);


  return (
    <div className={style.container}>

      <form className={style.form}>
        <LoginHeader />
        <h2 className={style.heading}>Create Account</h2>
        <input className={style.input} type="text" style={{ color: 'black' }} id="firstname" value={firstName} onChange={(e) => {
          setFirstName(e.target.value)
          console.log(firstName)
        }}
          placeholder="First Name"
        />
        <input className={style.input} type="text" id="lastname" value={lastName} onChange={(e) => {
          setLastName(e.target.value)
          console.log(lastName)
        }}
          placeholder="Last Name"
        />
        <input className={style.input} type="email" id="email" value={email} onChange={(e) => {
          setEmail(e.target.value)
          console.log(email)
        }}
          placeholder="Email Address"
        />
        <input className={style.input} type="number" id="phone" value={phone} onChange={(e) => {
          setPhone(e.target.value)
          console.log(phone)
        }}
          placeholder="Mobile Phone number"
        />
        <input className={style.input} type="password" id="password" value={password} onChange={(e) => {
          setPassword(e.target.value)
          console.log(password)
        }}
          placeholder="Password"
        />
        <div style={{ color: 'black' }}>
          asdasd
        </div>
        <div style={{ display: 'flex', color: 'black' }}>
          <input type="checkbox" className={style.input}
            style={{ backgroundColor: 'white' }} onChange={(e) => {
              setCheckbox(e.target.checked)

            }} />
          <label className={style.link}>asdasd</label>
        </div>
        <div style={{ display: 'flex', wordWrap: 'break-word', color: 'black', gap: '5px', opacity: '0.5' }}>
          By creating an account, you agree to Newegg's
          <a href="" className={style.link}>Privacy Notice</a>
          <br />
          <div>and</div>
          <a href="" className={style.link}>Terms of Use</a>
          <br />
        </div>
        <div className={style.button} style={{ textAlign: 'center', fontWeight: 'bold' }} onClick={() => {
          if (firstName == "" || lastName == "" || email == "" || password == "") {
            console.log("asdas")
            alert("Please complete the validation")

          } else {
            if (checkbox && validatePassword(password) == true) {
              console.log("checked true")
              alert("Account has been subscribed")
              type UserSubscribe = {
                useremail: string
              }
              const newUserSubscribe: UserSubscribe = {
                useremail: email
              }
              axios.post("http://localhost:9998/usersubscribe", newUserSubscribe).then(response => {
              }).catch(err => {
              })
            }
            if (validatePassword(password) == true) {
              type User = {
                firstname: string,
                lastname: string,
                isban: boolean,
                role: string,
                email: string,
                password: string,
                phonenumber: string
              }
              const newUser: User = {
                firstname: firstName,
                lastname: lastName,
                // phone:parseInt(phone),
                isban: false,
                role: "customer",
                email: email,
                password: password,
                phonenumber: phone
              }
              // var token = "";
              axios.post("http://localhost:9998/signup", newUser).then(response => {
                console.log("Response")
                console.log(response)
                {
                  response.data.error ?
                    alert(response.data.error) : "Not Error"
                }
                setCookie(null, 'token', response.data.token, {
                  maxAge: 30 * 60 * 60,
                  path: '/'
                })

              }).catch(err => {
                console.log("Response")
                console.log(err.response);
              })
            } else {
              alert("Invalid Validation in password")
            }
          }
        }}>
          SignUp
        </div>
        <div style={{ color: 'black', display: 'flex' }}>
          Have an account?
          <a href="/login" className={style.link}>Sign in</a>
        </div>

      </form>
    </div>
  )


}

export default Register;