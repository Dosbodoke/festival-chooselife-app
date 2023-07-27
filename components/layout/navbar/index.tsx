import LocaleSwitcher from "./LocaleSwitcher";
import { ThemeModeToggler } from "./ThemeToggler";

const NavBar = () => {
  return (
    <nav className="flex w-full items-center justify-end gap-4 py-2">
      <LocaleSwitcher />
      <ThemeModeToggler />
    </nav>
  );
};

export default NavBar;
