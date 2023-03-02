import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginPage from "./LoginRegister/LoginPage";
import Register from "./LoginRegister/RegisterPage";
interface Message {
    from: string;
    to: string;
    message: string;
}
export default function viewallchat() {

    const id1 = "id1"
    const id2 = "id2"
    const [currData, setCurrData] = useState<Message[]>([]);
    useEffect(() => {
        const data = {
            from: "1",
            to: "2",
        }
        console.log(data)
        axios.post("http://localhost:9998/viewallmessage", data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    })
    // console.log(currData)
    return (
        <div>
            asdas
        </div>
    )
}
