"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaRegSun } from "react-icons/fa6";
import { FaRegMoon } from "react-icons/fa6";



export const ThemeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "light" ? <FaRegMoon/> : <FaRegSun/>}
    </button>
  );
};        

export default ThemeToggler