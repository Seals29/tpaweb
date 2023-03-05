import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import { ThemeContext } from "@/theme/theme";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import style from "@/styles/chat.module.css"
export default function chatcs(props:any) {
    const {users,loadedmsg} = props;
    const { theme } = useContext(ThemeContext)
    const routers = useRouter();
    const [timestamp,setTimestamp] =useState('')
    const [currUser, setCurrUser] = useState([]);
    const [messages, setMessages] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [newMsg, setNewMsg] = useState('')
    const messageRef = useRef(null);
    const [content, setContent] = useState('')
    useEffect(() => {
        setMessages(loadedmsg)
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
        }).catch(err => {
            console.log(err)
            routers.push('/login')
        })
        console.log(currUser)

    }, [])
    useEffect(() => {
        //load

        const newSocket = new WebSocket("ws://localhost:9998/message", "2");
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
    }, []);
    const scrollToBottom = () => {
        if (messageRef.current) {
          messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
      };
    
    const handleSend=(e:any)=>{
        if (socket.readyState === WebSocket.OPEN) {
            const obj = { from: currUser.ID.toString(), to: currentlyOpen.toString(), content: content }
            socket.send(JSON.stringify(obj));
        }
    }
    const [currentlyOpen, setCurrentlyOpen] = useState(users[0].ID)
    console.log(users)
    return (
        <div>
            <Navbar />
            <div className={style.chatcscontainer}>
                <div className={style.chatuserlist} 
                style={{color:theme.text,backgroundColor:theme.background}}>
                    {users.map(e=>(
                        <div className={style.chatusercomponent} 
                        style={{ backgroundColor: theme.background, color:theme.text }}
                        onClick={(es)=>{
                            es.preventDefault()
                            setCurrentlyOpen(e.ID)
                        }}
                        >
                        {e.firstname} {currentlyOpen===e.ID?"open":""}
                    </div>
                    ))}
                    

                </div>

                <div className={style.chatcsmsgs} style={{backgroundColor:theme.background}}>
                {messages.map((msg,idx)=>{
                    // console.log(msg.to.toString())
                    // console.log(currentlyOpen.toString())
                    console.log(new Date(msg.CreatedAt))
                    if(msg.to.toString()===currentlyOpen.toString()||msg.from.toString()===currentlyOpen.toString()){
                        return(
                            <div key={idx} className={style.bubblechat} style={{color:theme.text}}>
                                <div className={style.text} style={{color:theme.text}}>from : {msg.from}</div>
                                <div className={style.text} style={{color:theme.text}}>to : {msg.to}</div>
                                <div className={style.text} style={{color:theme.text}}>{msg.content} </div>
                                {/* <div className={style.time} style={{color:theme.text}}>{timestamp.getHours()+':'+timestamp.getMinutes()}</div> */}
                            </div>
                           )
                    }
               })}
                <div className={style.chatinput} style={{backgroundColor:theme.background2}}>
                    
               
                    
                    
                    <input type="text" placeholder="Type your message here..." 
                    style={{backgroundColor:theme.background,color:theme.text}}
                    onChange={(e:any)=>{
                        setContent(e.target.value)
                    }} onClick={scrollToBottom}
                    />
                        <button style={{color:theme.text}} onClick={handleSend}>Send</button>
                </div>
                </div>
            </div>

            <HomeFooter />
        </div>
    )
}

export async function getStaticProps() {
    const response = await axios.get("http://localhost:9998/getuser")
    const response2 = await axios.get("http://localhost:9998/getallmessage")
    const users = await response.data;
    const loadedmsg = await response2.data;
    return {
        props: {
            users,
            loadedmsg
        },
    };
}