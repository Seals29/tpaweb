import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import { ThemeContext } from "@/theme/theme";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import style from "@/styles/chat.module.css";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/pages/firebase/firebase";
import Link from "next/link";
export default function chatcs(props: any) {
  const { users, loadedmsg } = props;
  const { theme } = useContext(ThemeContext);
  const routers = useRouter();
  const [timestamp, setTimestamp] = useState("");
  const [currUser, setCurrUser] = useState([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [newMsg, setNewMsg] = useState("");
  const [imageUpload, setImageUpload] = useState([]);
  const messageRef = useRef(null);
  const [content, setContent] = useState("");
  const linkRef = useRef();
  useEffect(() => {
    setMessages(loadedmsg);
    const cookies = Cookies.get("token");
    axios
      .post("http://localhost:9998/validate", { cookies })
      .then((res) => {
        console.log(res.data.user);
        setCurrUser(res.data.user);
        const newSocket = new WebSocket(
          "ws://localhost:9998/message",
          String(res.data.user.ID)
        );
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
  useEffect(() => {
    //load
  }, []);
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
  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  const handleSend = (e: any) => {
    if (socket === null) {
      return null;
    }
    if (socket.readyState === WebSocket.OPEN) {
      const obj = {
        from: currUser.ID.toString(),
        to: currentlyOpen.toString(),
        content: content,
      };
      socket.send(JSON.stringify(obj));
    }
  };

  function isUrl(input: string) {
    try {
      new URL(input);
      return true;
    } catch (error) {
      return false;
    }
  }
  const handleImage = (currImage: any, e: any) => {
    if (socket === null) {
      return null;
    }
    if (socket.readyState === WebSocket.OPEN) {
      const obj = {
        from: currUser.ID.toString(),
        to: currentlyOpen.toString(),
        content: currImage,
      };
      socket.send(JSON.stringify(obj));
    }
  };
  const [currentlyOpen, setCurrentlyOpen] = useState(users[0].ID);
  console.log(users);
  return (
    <div>
      <Navbar />
      <div className={style.chatcscontainer}>
        <div
          className={style.chatuserlist}
          style={{ color: theme.text, backgroundColor: theme.background }}
        >
          {users.map((e) => (
            <div
              className={style.chatusercomponent}
              style={{ backgroundColor: theme.background, color: theme.text }}
              onClick={(es) => {
                es.preventDefault();
                setCurrentlyOpen(e.ID);
              }}
            >
              {e.firstname} {currentlyOpen === e.ID ? "open" : ""}
            </div>
          ))}
        </div>

        <div
          className={style.chatcsmsgs}
          style={{ backgroundColor: theme.background }}
        >
          {messages.map((msg, idx) => {
            // console.log(msg.to.toString())
            // console.log(currentlyOpen.toString())
            // console.log(new Date(msg.CreatedAt));
            if (
              msg.to.toString() === currentlyOpen.toString() ||
              msg.from.toString() === currentlyOpen.toString()
            ) {
              return (
                <div
                  key={idx}
                  className={style.bubblechat}
                  style={{ color: theme.text }}
                >
                  <div className={style.text} style={{ color: theme.text }}>
                    from : {msg.from}
                  </div>
                  <div className={style.text} style={{ color: theme.text }}>
                    to : {msg.to}
                  </div>
                  <div className={style.text} style={{ color: theme.text }}>
                    {isUrl(msg.content) ? "" : msg.content}
                    <div
                      style={{
                        display: isUrl(msg.content) ? "" : "none",
                      }}
                    >
                      <a
                        href="#"
                        ref={linkRef}
                        onClick={(event: any) => {
                          handleDownload(event, msg.content);
                        }}
                      >
                        Download Here
                      </a>
                    </div>
                    {/* <img
                      src={isUrl(msg.content) ? msg.content : ""}
                      alt=""
                      style={{
                        maxWidth: "225px",
                        maxHeight: "225px",
                        minWidth: "225px",
                        minHeight: "225px",
                      }}
                    /> */}
                  </div>
                  {/* <div className={style.time} style={{color:theme.text}}>{timestamp.getHours()+':'+timestamp.getMinutes()}</div> */}
                </div>
              );
            }
          })}
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
              onClick={scrollToBottom}
            />
            <input
              type="file"
              placeholder="ImageUploade"
              onChange={(e: any) => {
                // console.log(currentlyOpen);

                const imageUploading = e.target.files[0];
                console.log(imageUploading);

                const imageRef = ref(
                  storage,
                  `chat/${currUser.ID + currentlyOpen.toString()}/${
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
                  `chat/${currUser.ID + currentlyOpen.toString()}`
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
                setImageUpload(e.target.files[0]);
              }}
            />
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

export async function getStaticProps() {
  const response = await axios.get("http://localhost:9998/getuser");
  const response2 = await axios.get("http://localhost:9998/getallmessage");
  const users = await response.data;
  const loadedmsg = await response2.data;
  return {
    props: {
      users,
      loadedmsg,
    },
  };
}
