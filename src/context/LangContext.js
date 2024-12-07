import React, { createContext, useContext, useState } from "react";

const LangContext = createContext();

export const useLang = () => useContext(LangContext);

export const LangProvider = ({ children }) => {
  const [language, setLanguage] = useState("fr"); // Langue par défaut

  const changeLanguage = (lang) => {
    setLanguage(lang);
    console.log(`Langue changée en : ${lang}`);
  };

  return (
    <LangContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LangContext.Provider>
  );
};
