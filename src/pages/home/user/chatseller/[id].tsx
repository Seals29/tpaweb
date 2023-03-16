import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import style from "@/styles/chat.module.css"
import { ThemeContext } from "@/theme/theme";
export default function chatseller(props: any) {
    const { id, orderDetail } = props
    console.log(id);
    console.log(orderDetail);

    const [timestamp, setTimestamp] = useState([])
    const { theme } = useContext(ThemeContext)
    const [currUser, setCurrUser] = useState([])
    const [messages, setMessages] = useState<string[]>([]);
    const [content, setContent] = useState([])
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const routers = useRouter()
    const [shopID, setShopID] = useState([])
    useEffect(() => {
        const cookies = Cookies.get('token')
        axios.post('http://localhost:9998/validate', { cookies }).then(res => {
            console.log(res.data.user)
            setCurrUser(res.data.user)
            //load
            console.log(currUser.ID);

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
                console.log(jsonOb);
                console.log(shopID.ID);
                console.log(currUser.ID);

                if (jsonOb.from === String(res.data.user.ID) || jsonOb.to === String(res.data.user.ID)) {
                setMessages((prevstate) => [...prevstate, jsonOb])
                }


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
        axios.get(`http://localhost:9998/getusershopid/${orderDetail.shopid}`).then(res => {
            console.log(res);
            setShopID(res.data);
        })
    }, [])

    const handleSend = () => {
        if (socket.readyState === WebSocket.OPEN) {
            const obj = { from: currUser.ID.toString(), to: shopID.ID.toString(), content: content }
            socket.send(JSON.stringify(obj));
            setContent(''); // Clear the input field
            // scrollToBottom();
        }
    };
    return (
        <div>
            <Navbar />
            <div className={style.chatcscontainer} style={{ backgroundColor: theme.background }}>
                <div className={style.chatcsmsgs}>

                    {/* {messages.map((message, index) => (
                <div
                    key={index}
                    className={
                        message.from === "1"
                            ? style.chatmsgreceive
                            : style.chatmsgsent
                    }
                >
                    <div>From : {message.from === "2" ? "2" : "1"}</div>
                    <div>To : {message.to === "1" ? "1" : "2"}</div>
                    <div className={style.chatMessageContent}>{message.content}</div>
                    <div className={style.chatMessageTimestamp}>Date : {message.createdAt}
                    </div>
                </div>
            ))} */}
                    {messages.map((msg, idx) => (
                        <div key={idx} className={style.bubblechat}>
                            <div className={style.text}>from : {msg.from}</div>
                            <div className={style.text}>to : {msg.to}</div>
                            <div className={style.text}>{msg.content} </div>
                            <div className={style.time}>{timestamp.getHours() + ':' + timestamp.getMinutes()}</div>
                        </div>
                    ))}
                    <div className={style.chatinput} style={{ backgroundColor: theme.background2 }}>
                        <input type="text" placeholder="Type your message here..."
                            style={{ backgroundColor: theme.background, color: theme.text }}
                            onChange={(e: any) => {
                                setContent(e.target.value)
                            }}
                        />
                        <button style={{ color: theme.text }} onClick={handleSend}>Send</button>
                    </div>
                </div>

            </div>

            <HomeFooter />
        </div>
    )
}
export async function getStaticPaths() {
    try {
        const res = await axios.get(`http://localhost:9998/getorders`)
        const allOrders = await res.data;
        console.log(allOrders)
        const paths = allOrders.map((order: any) => ({
            params: {
                id: String(order.ID),
            },
        }));
        return {
            paths,
            fallback: true,
        };
    } catch (error) {
        alert(error)
        return {
            notFound: true,
        };
    }

}

export async function getStaticProps(context: any) {
    const { id } = context.params;
    const res = await axios.get(`http://localhost:9998/getorderbyorderid?orderid=${id}`)
    const orderDetail = await res.data;
    return {
        props: {
            id,
            orderDetail
        }
    }
}

