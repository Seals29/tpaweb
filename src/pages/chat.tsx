import Navbar from "@/pages/HomePage/Navbar";

import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import React, { useContext, useEffect, useState } from "react";
import style from "@/styles/homes.module.css"
import Link from "next/link";
import Pagination from "@/pages/components/pagination";

import { faArrowCircleLeft, faBackward, faBackwardFast, faBackwardStep, faBattery3, faBatteryCar, faCarTunnel, faCompactDisc, faComputer, faComputerMouse, faFootball, faGamepad, faHeadphones, faKeyboard, faNetworkWired, faPrint, faRoute, faSnowplow, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import HomeFooter from "@/pages/HomePage/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faFacebookF, faInstagramSquare, faLinkedinIn, faPinterestSquare, faTiktok, faTwitch, faTwitter, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { ThemeContext } from "@/theme/theme";
export default function main(props: any) {
    // const { theme } = useContext(ThemeContext)
    const { toUser } = props;

    const { theme } = useContext(ThemeContext);
    const [messages, setMessages] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [newMsg, setNewMsg] = useState('')
    const [content, setContent] = useState('')
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
            setNewMsg(event.data)
            const jsonOb = JSON.parse(event.data)
            console.log(jsonOb)
            const dateTime = new Date(jsonOb.CreatedAt);
            console.log(dateTime.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
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

    const handleSend = () => {
        if (socket.readyState === WebSocket.OPEN) {
            const obj = { from: "2", to: "1", content: content }
            socket.send(JSON.stringify(obj));
        }
    };

    // return (
    //     <div className={style.chatcontainer}>
    //     <div className={style.chatmsg}>
    //         {messages.map((msg,idx):any=>(
    //             <div key={idx} className={msg.from===toUser?style.chatmsgreceive:style.chatmsgsent}>

    //             </div>
    //         ))}
    //     </div>
    // </div>
    // );

    return (
        <div className={style.chatContainer}>
            <div className={style.chatmessages} style={{ color: 'black' }}>
                {messages.map((message, index) => (
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
                ))}
            </div>
            <div className={style.chatInputContainer}>
                <textarea
                    className={style.chatInput}
                    // value={newMsg}
                    onChange={(event) => {
                        setNewMsg(event.target.value)
                        setContent(event.target.value)
                    }

                    }
                //   onKeyPress={handleKeyPress}
                />
                <button className={style.chatButton} onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

// return (
//     <>
//         <header style={{ color: '' }}>
//             <Navbar />
//         </header>

//         <div>

//         </div>
//         <footer style={{ position: 'sticky' }}>
//             <HomeFooter />

//         </footer>

//     </>
// )

