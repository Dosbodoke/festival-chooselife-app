import { ThemeModeToggler } from "./ThemeToggler";

const NavBar = () => {
  return (
    <nav className="flex w-full justify-end">
      <ThemeModeToggler />
    </nav>
  );
};

export default NavBar;
