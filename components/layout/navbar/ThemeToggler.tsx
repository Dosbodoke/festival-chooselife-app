"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "@/assets";

export const ThemeModeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    if (!theme) {
      setTheme("dark");
    }
    setMounted(true);
  }, [theme, setTheme]);

  if (!mounted) {
    return null;
  }

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <button className="mr-3 h-8 w-8" onClick={toggleTheme}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
