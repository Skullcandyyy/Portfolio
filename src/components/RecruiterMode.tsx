"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface RecruiterModeContextType {
  recruiterMode: boolean;
  toggleRecruiterMode: () => void;
}

const RecruiterModeContext = createContext<RecruiterModeContextType>({
  recruiterMode: false,
  toggleRecruiterMode: () => {},
});

export function useRecruiterMode() {
  return useContext(RecruiterModeContext);
}

export function RecruiterModeProvider({ children }: { children: ReactNode }) {
  const [recruiterMode, setRecruiterMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("recruiter-mode");
    if (saved === "true") {
      setRecruiterMode(true);
      document.body.classList.add("recruiter-mode");
    }
  }, []);

  const toggleRecruiterMode = () => {
    setRecruiterMode((prev) => {
      const next = !prev;
      localStorage.setItem("recruiter-mode", String(next));
      if (next) {
        document.body.classList.add("recruiter-mode");
      } else {
        document.body.classList.remove("recruiter-mode");
      }
      return next;
    });
  };

  return (
    <RecruiterModeContext.Provider value={{ recruiterMode, toggleRecruiterMode }}>
      {children}
    </RecruiterModeContext.Provider>
  );
}
