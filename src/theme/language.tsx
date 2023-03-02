
import { createContext, useEffect, useState } from "react"
export type LangType = {
    isEng: boolean
}

export const Language: { Eng: LangType, Id: LangType } = {
    Eng: {
        isEng: true
    },
    Id: {
        isEng: false
    },
}

export const LangContext = createContext({
    Lang: Language.Id,
    toggleLang: (e: boolean) => { },
});

export const LangProvider = ({ children }: any) => {
    const [Lang, setLang] = useState(Language.Id);

    useEffect(() => {
        const storedTheme = localStorage.getItem("lang");
        if (storedTheme && storedTheme === "eng") {
            setLang(Language.Eng);
        }
    }, []);

    const toggleLang = (e: boolean) => {
        console.log("====")
        console.log(e)
        const newLang = e ? Language.Eng : Language.Id;
        setLang(newLang);
        localStorage.setItem("lang", newLang === Language.Id ? "id" : "eng");
    };
    return (
        //     <ThemeContext.Provider value={{ theme, toggleTheme }}>
        //     {children}
        //   </ThemeContext.Provider>
        <LangContext.Provider value={{ Lang, toggleLang }}>
            {children}
        </LangContext.Provider>
    )

};
