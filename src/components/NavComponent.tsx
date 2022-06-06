import React from 'react'
import NavItemComponent from "./NavItemComponent";
import CounterComponent from "./CounterComponent";
import ClearBtnComponent from "./ClearBtnComponent";
import { useSelector } from "react-redux";
import { selectTodos } from "../storage/todosSlice";

const NavComponent = () => {
  const todos = useSelector(selectTodos);
  let mainLinks: INavLink[] = [
    { key: "All", to: "/" },
    { key: "Active", to: "/active" },
    { key: "Completed", to: "/completed" },
  ];
  if (todos.length === 0) {
    return <React.Fragment />
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom" id="footer">
      <div className="container-fluid">
        <div className="navbar-brand">
          <CounterComponent />
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto">
            {mainLinks.map((link: INavLink) => (
              <li className="nav-item" key={link.key}>
                <NavItemComponent link={link} key={link.key} />
              </li>
            ))}
          </ul>
          <span className="navbar-text">
            <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <ClearBtnComponent />
            </li>
          </ul>
          </span>
        </div>
      </div>
    </nav>
  )
}

export default NavComponent
