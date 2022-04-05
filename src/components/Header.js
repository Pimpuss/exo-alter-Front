import React from "react";
import "./styles/Header.css";

function Header() {
  return (
    <header>
      <div className="imgContainer">
        <img
          src="https://res.cloudinary.com/wildcodeschool/image/upload/c_fill,h_50/v1/static/irjoy97aq0eol8bf6959"
          alt="Wild Code School logo"
        />
      </div>
      <div className="titleContainer">
        <h1>Les Argonautes</h1>
      </div>
    </header>
  );
}

export default Header;
