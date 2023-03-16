import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import { ThemeContext } from "@/theme/theme";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

export default function ChatSeller(props : any) {
    const {users} = props;
    console.log(users);
    const { theme } = useContext(ThemeContext)
    const routers = useRouter();
    const [timestamp, setTimestamp] = useState('')
    const [currUser, setCurrUser] = useState([]);
    const [messages, setMessages] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [newMsg, setNewMsg] = useState('')
    const messageRef = useRef(null);
    const [content, setContent] = useState('')
    useEffect(() => {
        // setMessages(loadedmsg)
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
            const newSocket = new WebSocket("ws://localhost:9998/message", String(res.data.user.ID));
            // headers: {
            //     "Sec-Websocket-Protocol": "your-protocol-id"
            //   }
            newSocket.onopen = () => {
                console.log("Connected to WebSocket server and the protocol : ", newSocket.protocol);
            };

            newSocket.onmessage = (event) => {
                console.log("Received message:", event.data);
                console.log('asda : ', newSocket.protocol)
                console.log(event.data)
                const jsonOb = JSON.parse(event.data)
                setTimestamp(new Date(jsonOb.CreatedAt))

                setMessages((prevstate) => [...prevstate, jsonOb])
            };

            newSocket.onerror = (event) => {
                console.error("WebSocket error: ", event);
            }
            newSocket.onclose = () => {
                console.log("WebSocket closed");
            };

            setSocket(newSocket);
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        console.log(currUser)

    }, [])

    
    return (
        <div>
            <Navbar />





            <HomeFooter />
        </div>
    )
}
export async function getStaticProps() {
    const response = await axios.get("http://localhost:9998/getuser")
    const users = await response.data;

    return {
        props: {
            users
        },
    };
}