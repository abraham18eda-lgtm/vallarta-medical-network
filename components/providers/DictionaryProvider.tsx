"use client";

import { createContext, useContext } from "react";

type DictionaryContextType = {
  dict: any;
  locale: "es" | "en";
  t: (key: string) => string;
};

const DictionaryContext = createContext<DictionaryContextType | null>(null);

export function DictionaryProvider({
  children,
  dict,
  locale,
}: {
  children: React.ReactNode;
  dict: any;
  locale: "es" | "en";
}) {
  const t = (key: string) => {
    return key.split(".").reduce((acc, k) => acc?.[k], dict) || key;
  };

  return (
    <DictionaryContext.Provider value={{ dict, locale, t }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);

  if (!context) {
    throw new Error("useDictionary debe usarse dentro de DictionaryProvider");
  }

  return context;
}