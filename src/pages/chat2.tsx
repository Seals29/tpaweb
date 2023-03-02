import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "@/theme/theme";

const Chat2 = () => {
    const { theme } = useContext(ThemeContext);
    const [messages, setMessages] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [newMsg, setNewMsg] = useState('')
    useEffect(() => {
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
            const obj = { from: "2", to: "1", content: "chatfrom3" }
            socket.send(JSON.stringify(obj));
        }
    };

    return (
        <div>
            <button onClick={handleSend}>Send Message</button>
            <div style={{ color: "black" }}>
                {newMsg}
            </div>
        </div>
    );
}
export default Chat2;




