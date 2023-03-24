import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import { ThemeContext } from "@/theme/theme";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import style from "@/styles/chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faPenNib } from "@fortawesome/free-solid-svg-icons";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/pages/firebase/firebase";
export default function chatcs(props: any) {
  const { users } = props;
  const { theme } = useContext(ThemeContext);
  const linkRef = useRef();
  const routers = useRouter();
  const [currUser, setCurrUser] = useState([]);
  const messageRef = useRef(null);
  useEffect(() => {
    const cookies = Cookies.get("token");
    axios
      .post("http://localhost:9998/validate", { cookies })
      .then((res) => {
        console.log(res.data.user);
        setCurrUser(res.data.user);
        //load
        console.log(currUser.ID);

        const newSocket = new WebSocket(
          "ws://localhost:9998/message",
          String(res.data.user.ID)
        );
        // headers: {
        //     "Sec-Websocket-Protocol": "your-protocol-id"
        //   }
        newSocket.onopen = () => {
          console.log(
            "Connected to WebSocket server and the protocol : ",
            newSocket.protocol
          );
        };

        newSocket.onmessage = (event) => {
          console.log("Received message:", event.data);
          console.log("asda : ", newSocket.protocol);
          console.log(event.data);
          const jsonOb = JSON.parse(event.data);
          setTimestamp(new Date(jsonOb.CreatedAt));

          setMessages((prevstate) => [...prevstate, jsonOb]);
        };

        newSocket.onerror = (event) => {
          console.error("WebSocket error: ", event);
        };
        newSocket.onclose = () => {
          console.log("WebSocket closed");
        };

        setSocket(newSocket);
      })
      .catch((err) => {
        console.log(err);
        routers.push("/login");
      });
    console.log(currUser);
  }, []);
  console.log(currUser);

  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [newMsg, setNewMsg] = useState("");
  const [content, setContent] = useState("");
  const [updatedMsg, setUpdatedMsg] = useState("");
  const [timestamp, setTimestamp] = useState("");
  useEffect(() => {}, []);
  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const handleSend = () => {
    if (socket.readyState === WebSocket.OPEN) {
      const obj = { from: currUser.ID.toString(), to: "4", content: content };
      socket.send(JSON.stringify(obj));
      setContent(""); // Clear the input field
      scrollToBottom();
    }
  };
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);
  const handleImage = (currImage: any, e: any) => {
    if (socket === null) {
      return null;
    }
    if (socket.readyState === WebSocket.OPEN) {
      const obj = {
        from: currUser.ID.toString(),
        to: "4",
        content: currImage,
      };
      socket.send(JSON.stringify(obj));
    }
  };
  const handleDownload = (event: any, downloadUrl: string) => {
    fetch(downloadUrl, {
      mode: "no-cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "myfile.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  function isUrl(input: string) {
    try {
      new URL(input);
      return true;
    } catch (error) {
      return false;
    }
  }
  function isImageUrl(url: string) {
    if (typeof url !== `string`) return false;
    const urlNoProtocol = url.split(`://`)[1];
    if (!urlNoProtocol) return false;
    if (
      url.toLowerCase().includes("png") ||
      url.toLowerCase().includes("jpg")
    ) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div>
      <Navbar />
      <div
        className={style.chatcscontainer}
        style={{ backgroundColor: theme.background }}
      >
        <div className={style.chatcsmsgs}>
          {messages.map((msg, idx) => (
            <div key={idx} className={style.bubblechat}>
              <div className={style.text}>from : {msg.from}</div>
              <div className={style.text}>to : {msg.to}</div>
              <div className={style.text}>
                {isUrl(msg.content) ? "" : msg.content}
                <div
                  style={{
                    display: isUrl(msg.content) ? "" : "none",
                  }}
                >
                  <img
                    src={msg.content}
                    alt=""
                    style={{
                      display: isImageUrl(msg.content) ? "" : "none",
                      maxHeight:'600px',
                      maxWidth:'600px'
                    }}
                  />
                  <a
                    href="#"
                    ref={linkRef}
                    onClick={(event: any) => {
                      handleDownload(event, msg.content);
                    }}
                    style={{ display: isImageUrl(msg.content) ? "none" : "" }}
                  >
                    Download Here
                  </a>
                </div>
              </div>
              <div className={style.time}>
                {timestamp.getHours() + ":" + timestamp.getMinutes()}
              </div>
            </div>
          ))}
          <div
            className={style.chatinput}
            style={{ backgroundColor: theme.background2 }}
          >
            <input
              type="text"
              placeholder="Type your message here..."
              style={{ backgroundColor: theme.background, color: theme.text }}
              onChange={(e: any) => {
                setContent(e.target.value);
              }}
            />
            <div>
              <input
                type="file"
                placeholder="ImageUploade"
                onChange={(e: any) => {
                  // console.log(currentlyOpen);

                  const imageUploading = e.target.files[0];
                  console.log(imageUploading);

                  const imageRef = ref(
                    storage,
                    `chat/${currUser.ID + "4"}/${
                      imageUploading.name + "OldEgg"
                    }`
                  );
                  uploadBytes(imageRef, imageUploading)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                      return;
                    });
                  const imageListReff = ref(
                    storage,
                    `chat/${currUser.ID + "4"}`
                  );
                  listAll(imageListReff)
                    .then((res) => {
                      res.items.forEach((item) => {
                        if (item.name === `${imageUploading.name + "OldEgg"}`) {
                          getDownloadURL(item).then((urls: any) => {
                            console.log(urls);
                            handleImage(urls, e);
                          });
                        }
                      });
                    })
                    .catch((err) => {});
                  //   setImageUpload(e.target.files[0]);
                }}
              />
              <FontAwesomeIcon icon={faPaperclip} />
            </div>
            <button style={{ color: theme.text }} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>

      <HomeFooter />
    </div>
  );
}
