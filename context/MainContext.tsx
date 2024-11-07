// context/UserContext.tsx
import { Additional } from "@/types/additional";
import React, { createContext, useContext, useState, ReactNode } from "react";

type MainContextType = {
  additional: Additional | null;
  setAdditional: (user: Additional | null) => void;
  handleChange: (data: Additional) => void;
};

// Create the context
const UserContext = createContext<MainContextType | undefined>(undefined);

// Create a provider component
export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [additional, setAdditional] = useState<Additional | null>(null);
  const handleChange = (data: Additional) => {
    setAdditional(data);
  };

  return (
    <UserContext.Provider value={{ additional, setAdditional, handleChange }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useMainContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
