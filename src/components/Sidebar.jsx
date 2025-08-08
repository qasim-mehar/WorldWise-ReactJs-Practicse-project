import React, { StrictMode } from 'react'
import styles from "./sidebar.module.css"
import Logo from './Logo'
import AppNav from './AppNav'
export default function Sidebar() {
  return (
    <div className={styles.Sidebar}>
        <Logo/>
        <AppNav/>
        <p> Country</p>
        <footer className={styles.footer}>
            <p className={styles.copyright}>
              &copy; copyright {new Date().getFullYear()} by worldwise inc.

            </p>
        </footer>
    </div>
  )
}
