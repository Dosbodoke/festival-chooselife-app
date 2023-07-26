"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { MoonIcon, SunIcon } from "@/assets";

export const ThemeModeToggler = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function toggleTheme() {
    console.log({ theme });
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <button className="h-6 w-6" onClick={toggleTheme}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};
