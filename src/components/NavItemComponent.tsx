import React from 'react'
import { NavLink as ReactNavLink } from "react-router-dom"

type Props = {
  link: INavLink,
}

const NavItemComponent: React.FC<Props> = ({ link }) => {
  return (
    <ReactNavLink
      className={({ isActive }) =>
      [
        "nav-link",
        isActive ? "active" : null,
      ]
        .filter(Boolean)
        .join(" ")
      }
      to={link.to}
    >
      {link.key}
    </ReactNavLink>
  )
}

export default NavItemComponent
