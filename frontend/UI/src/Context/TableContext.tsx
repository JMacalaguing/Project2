import React, { createContext, useRef, useContext } from "react";

interface TableContextProps {
  tableRef: React.RefObject<HTMLDivElement | null>;
}

// Create the context
const TableContext = createContext<TableContextProps | undefined>(undefined);

// Provider component
export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const tableRef = useRef<HTMLDivElement | null>(null); // Allow null initially

  return <TableContext.Provider value={{ tableRef }}>{children}</TableContext.Provider>;
};

// Custom hook for easier access
export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
};
