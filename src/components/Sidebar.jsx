import React, { StrictMode } from 'react'
import { Outlet } from 'react-router-dom'
import styles from "./sidebar.module.css"
import Logo from './Logo'
import AppNav from './AppNav'
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
        <Logo/>
        <AppNav/>
        <Outlet/>
        <footer className={styles.footer}>
            <p className={styles.copyright}>
              &copy; copyright {new Date().getFullYear()} by worldwise inc.

            </p>
        </footer>
    </div>
  )
}
