import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import style from "@/styles/review.module.css";
import { ThemeContext } from "@/theme/theme";
import {
  faClose,
  faEdit,
  faNoteSticky,
  faSync,
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
export default function review() {
  const [currUser, setCurrUser] = useState([]);
  const routers = useRouter();
  console.log(routers);
  const shopId = routers.query.name;
  const [allShop, setAllShop] = useState([]);
  const [currShop, setCurrShop] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [selectedReview, setSelectedReview] = useState([]);
  const [selectedReviewData, setSelectedReviewData] = useState([]);
  const [selectedReviewStar, setSelectedReviewStar] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  useEffect(() => {
    const cookies = Cookies.get("token");
    axios
      .post("http://localhost:9998/validate", { cookies })
      .then((res) => {
        console.log(res.data.user);
        setCurrUser(res.data.user);
        axios
          .get(
            `http://localhost:9998/getreviewbyuserid?userid=${res.data.user.ID}`
          )
          .then((res) => {
            console.log(res);
            setReviews(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        routers.push("/login");
      });
  }, []);
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <div
        style={{
          backgroundColor: theme.background,
          padding: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div
          className={style.reviewcontainer}
          style={{ backgroundColor: theme.background }}
        >
          <h1 style={{ color: theme.text }}>Your Reviews!</h1>
          <hr />
        </div>
        {reviews.map((rev: any) => (
          <div
            className={style.reviewcard}
            style={{ border: `1px solid ${theme.text}` }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                color: theme.text,
                gap: "25px",
              }}
            >
              <FontAwesomeIcon
                icon={faEdit}
                onClick={(event: any) => {
                  event.preventDefault();
                  console.log(rev);
                  setIsModalActive(true);
                  setSelectedReview(rev.reviewcomment);
                  setSelectedReviewStar(rev.starreview);
                  setSelectedReviewData(rev);
                }}
              />
              <FontAwesomeIcon
                icon={faClose}
                onClick={(event: any) => {
                  event.preventDefault();
                  console.log(rev);
                  const cookies = Cookies.get("token");
                  axios
                    .get(
                      `http://localhost:9998/deletereviewbyID?revid=${rev.ID}&token=${cookies}`
                    )
                    .then((res) => {
                      console.log(res);
                      if (res.data.message) {
                        alert(res.data.message);
                        routers.reload();
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <h1 style={{ color: theme.text }}>{rev.firstname}</h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "15px",
                }}
              >
                <div style={{ color: theme.text }}>
                  <FontAwesomeIcon icon={faThumbsUp} />

                  {rev.nothelpfull}
                </div>
                <div> </div>
                <div style={{ color: theme.text }}>
                  <FontAwesomeIcon icon={faThumbsDown} />
                  {rev.helpfull}
                </div>
              </div>
            </div>
            <div>{rev.reviewcomment}</div>
            <div>{rev.starreview}</div>
          </div>
        ))}
      </div>
      <div
        className={style.updatereviewmodal}
        style={{
          display: isModalActive === true ? "" : "none",
        }}
      >
        <FontAwesomeIcon
          icon={faClose}
          onClick={(event: any) => {
            console.log();
            setIsModalActive(false);
          }}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
            paddingRight: "35px",
          }}
        />
        <h1>Update Review</h1>
        <br />
        <hr />
        <br />
        <div className={style.reviewmodalcontainer}>
          <input
            type="text"
            value={selectedReview}
            onChange={(event: any) => {
              setSelectedReview(event.target.value);
              console.log(selectedReview);
            }}
          />
          <input
            type="number"
            value={selectedReviewStar}
            min={1}
            max={5}
            onChange={(event: any) => {
              setSelectedReviewStar(event.target.value);
            }}
          />
          <button
            onClick={(event: any) => {
              const cookies = Cookies.get("token");
              event.preventDefault();
              console.log(selectedReviewData);
              axios
                .get(
                  `http://localhost:9998/updatereviewbyid?token=${cookies}&revid=${selectedReviewData.ID}&newcmt=${selectedReview}&star=${selectedReviewStar}`
                )
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Update!
          </button>
        </div>
      </div>
      <footer>
        <HomeFooter />
      </footer>
    </div>
  );
}
