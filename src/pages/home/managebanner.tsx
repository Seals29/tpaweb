import axios from "axios";
import HomeFooter from "../HomePage/Footer";
import Navbar from "../HomePage/Navbar";
import style from "@/styles/banner.module.css";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/theme/theme";
import { storage } from "../firebase/firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
export default function managebanner(props: any) {
  const { allbanners } = props;
  console.log(allbanners);
  const { theme } = useContext(ThemeContext);
  // console.log(promotion);
  // useEffect(() => {
  //     axios.get("http://localhost:9998/getallpromotionbanner").then(res => {
  //         console.log(res);

  //     }).catch(err => {
  //         console.log(err);

  //     })
  //     // const data =  res.data;
  //     // console.log(res);

  // }, [])
  const [blur, setBlur] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [imageUpload, setImageUpload] = useState([]);
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div className={style.bannerhead}>Management Banner</div>
      <div className={style.bannerbtn}>
        <button
          onClick={(e: any) => {
            setIsActive(true);
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> New Banner Promotion
        </button>
      </div>
      {allbanners.map((banner) => (
        <div className={style.bannercontainer}>
          <div>
            <FontAwesomeIcon
              icon={faClose}
              style={{
                display: "flex",
                flexDirection: "column",
                alignContent: "flex-end",
                float: "right",
              }}
              onClick={(item: any) => {
                item.preventDefault();
                const data = {
                  BannerID: banner.ID.toString(),
                };
                console.log(data);

                axios
                  .post("http://localhost:9998/rmvpromotionbanner", data)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            />
          </div>
          <img src={banner.promotionimage} alt="" />
        </div>
      ))}

      {/* Management Banner */}

      <footer>
        <HomeFooter />
      </footer>
      <div
        className={style.centerContainer}
        style={{
          backgroundColor: theme.background2,
          display: isActive ? "" : "none",
        }}
      >
        <FontAwesomeIcon
          icon={faClose}
          style={{
            top: "0%",
            float: "right",
            right: "0",
            paddingLeft: "80%",
            color: theme.text,
            cursor: "pointer",
          }}
          onClick={(e) => {
            setIsActive(false);
          }}
        />
        <label style={{ color: theme.text }}>Insert to..</label>
        <input
          type="file"
          placeholder="ImageUpload"
          onChange={(e: any) => {
            setImageUpload(e.target.files[0]);
          }}
        />
        <button
          style={{ backgroundColor: theme.button, color: theme.text }}
          onClick={(e: any) => {
            const imageRef = ref(
              storage,
              `promotion/${imageUpload.name + "OldEgg"}`
            );
            //upload to the storage
            uploadBytes(imageRef, imageUpload)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
                return;
              });
            // console.log(data);
            const imageListReff = ref(storage, `promotion/`);
            listAll(imageListReff)
              .then((res) => {
                res.items.forEach((item) => {
                  if (item.name === `${imageUpload.name + "OldEgg"}`) {
                    getDownloadURL(item).then((urls: any) => {
                      console.log(urls);
                      const data = {
                        BannerImage: urls,
                      };
                      axios
                        .post("http://localhost:9998/addpromotionbanner", data)
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    });
                  }
                });
              })
              .catch((err) => {});
          }}
        >
          Save Wishlist!
        </button>
      </div>
    </div>
  );
}
// http://localhost:9998/getbanner
export async function getStaticProps() {
  const response = await axios.get("http://localhost:9998/getbanner");
  const allbanners = await response.data;
  return {
    props: {
      allbanners,
    },
  };
}
