
import { createContext, useEffect, useState } from "react"

export type ThemeType = {
  background2: string
  button: string,
  className: "light" | "dark",
  navbar: string,
  background: string,
  textColor: string,
  cardBG: string,
  border: string,
  sidebar : string,
  text : string,
  bgsidebar: string,
  sidebargradient : string
}

export const THEME:{LIGHT: ThemeType, DARK: ThemeType} = {
  LIGHT: {
    className: "light",
    navbar: "white",
    background: "white",
    background2: "whitesmoke",
    textColor: "#212121",
    cardBG: "#ECF1FE",
    border: "transparent",
    button: "#FFF",
    sidebar : "white",
    text: "black",
    bgsidebar : "white",
    sidebargradient: "linear-gradient(180deg,#ECF1FE 61%,rgba(236,241,254,.7) 88%,rgba(236,241,254,0) 97%)"
  },
  DARK: {
    className: "dark",
    navbar: "#050C2E",
    background: "#212121",
    background2: "#121212",
    textColor: "white",
    cardBG: "#262626",
    border: "whitesmoke",
    button: "#363636",
    sidebar: "#212121",
    text:"white",
    bgsidebar:"#363636",
    sidebargradient: "linear-gradient(180deg,#000 80%,rgba(12,29,106,0) 97%)"
  },
}

export const ThemeContext = createContext({
    theme: THEME.LIGHT,
    toggleTheme: () => {},
  });

export const ThemeProvider = ({ children } : any) => {
    const [theme, setTheme] = useState(THEME.LIGHT);
  
    useEffect(() => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme && storedTheme === "dark") {
        setTheme(THEME.DARK);
      }
    }, []);

    const toggleTheme = () => {
      setTheme((e) => (e === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
      localStorage.setItem("theme", theme === THEME.LIGHT? "dark" : "light");
    };
    return(
      <ThemeContext.Provider value={{theme, toggleTheme}}>
        {children}
      </ThemeContext.Provider>
    )

  };
