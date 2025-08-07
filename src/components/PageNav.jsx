import React from 'react'
import { NavLink } from 'react-router-dom'
import Styles from "./PageNav.module.css"
export default function PageNav() {
  return (
    <nav className={Styles.nav}>
        <ul>
            <li>
                <NavLink to="./">Home</NavLink>
            </li>
            <li>
                <NavLink to="./pricing">Pricing</NavLink>
            </li>
            <li>
                <NavLink to="./product">Product</NavLink>
            </li>
        </ul>
    </nav>
  )
}
