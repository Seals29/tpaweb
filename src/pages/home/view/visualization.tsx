import HomeFooter from "@/pages/HomePage/Footer";
import Navbar from "@/pages/HomePage/Navbar";
import { ThemeContext } from "@/theme/theme";
import { useContext, useEffect, useState } from "react";
import style from "@/styles/homes.module.css";
import { BarChart, LineChart, PieChart, Pie, Tooltip, Legend } from "recharts";
import axios from "axios";

export default function Visualization() {
  const { theme } = useContext(ThemeContext);
  // const chartData = data1.map((item: any) => ({
  //   name: item.Name,
  //   value: item.Count,
  // }));
  // console.log(data1);
  const [currData, setCurrData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`http://localhost:9998/getcatcount`);
      const chartData = res.data.map((item: any) => ({
        name: item.Name,
        value: item.Count,
      }));
      setCurrData(chartData);
    }
    fetchData();
  }, []);
  const url =
    "https://firebasestorage.googleapis.com/v0/b/oldegg-3c56e.appspot.com/o/shopProduct%2FTokopedia%2F117495.jpgOldEgg?alt=media&token=5a682786-1407-4433-80b3-7df7860a6b6e";

  function isUrl(input: string) {
    try {
      new URL(input);
      return true;
    } catch (error) {
      return false;
    }
  }
  const check = isUrl("url");
  console.log(check);

  // console.log(isUrl(url));

  // const isUrl = (url: string) => {

  // console.log(isUrl(url));

  return (
    <div>
      <Navbar />

      <div
        className={style.visualcontainer}
        style={{
          color: theme.text,
          backgroundColor: theme.background,
        }}
      >
        <h1>Visualization</h1>
        <hr />
        <div>
          <h1>Graph1</h1>
          <PieChart width={550} height={350}>
            <Pie
              data={currData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div>
          <h1>Graph 2</h1>
        </div>
      </div>

      <footer>
        <HomeFooter />
      </footer>
    </div>
  );
}
