import Link from "next/link";
import styles from "./menu.module.css";

import {useState} from "react";
import {useRouter} from "next/router";
import {logoutUser} from "../../lib/auth";

export default function Menu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>();

  const openCloseMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    const result = await logoutUser();
    if (result) {
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile} onClick={openCloseMenu}></div>
      <nav
        className={
          isOpen ? styles.contextual + " " + styles.open : styles.contextual
        }
      >
        <div className={styles.navlinks}>
          <Link className={styles.navlink} href="/profile">
            <svg
              className={styles.navlinkIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            <span>My Profile</span>
          </Link>
          <div className={styles.navlink}>
            <svg
              className={styles.navlinkIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z" />
            </svg>
            <span>Group Chat</span>
          </div>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.logout} onClick={logout}>
          <svg
            className={styles.logoutIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
          </svg>
          <span>Logout</span>
        </div>
      </nav>
    </div>
  );
}
