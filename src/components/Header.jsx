import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <h2>Where in the world?</h2>
        </Link>

        <p onClick={toggleTheme}>
          <i
            className={dark ? "fa-regular fa-sun" : "fa-regular fa-moon"}
          ></i>
          &nbsp;<span>{dark ? "Light Mode" : "Dark Mode"}</span>
        </p>
      </div>
    </header>
  );
}