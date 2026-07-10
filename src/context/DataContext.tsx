"use client";

import React, { createContext, useContext, useState } from "react";
import { MergathonData } from "../types";

interface DataContextType {
  data: MergathonData | null;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType>({
  data: null,
  loading: true,
  error: null,
});

export function DataProvider({ children, initialData }: { children: React.ReactNode; initialData: MergathonData | null; }) {
  const [data] = useState<MergathonData | null>(initialData);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
