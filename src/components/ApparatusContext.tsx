"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Apparatus } from "@/types";

interface ApparatusContextType {
  apparatus: Apparatus;
  setApparatus: (a: Apparatus) => void;
}

const ApparatusContext = createContext<ApparatusContextType>({
  apparatus: "silks",
  setApparatus: () => {},
});

export function ApparatusProvider({ children }: { children: ReactNode }) {
  const [apparatus, setApparatus] = useState<Apparatus>("silks");
  return (
    <ApparatusContext.Provider value={{ apparatus, setApparatus }}>
      {children}
    </ApparatusContext.Provider>
  );
}

export function useApparatus() {
  return useContext(ApparatusContext);
}
