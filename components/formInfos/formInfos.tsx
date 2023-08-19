import styles from "./formInfos.module.css";
import utils from "../../styles/utils.module.css";
import Link from "next/link";

export default function FormInfos() {
  return (
    <div className={styles.container}>
      <Link className={styles.link} href="/profile">
        <svg
          className={styles.linkIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
        <span>Back</span>
      </Link>
      <div className={styles.formEditWrapper}>
        <div className={utils.header}>
          <h1 className={utils.heading}>Change Info</h1>
          <p className={utils.description}>
            Changes will be reflected to every services
          </p>
        </div>
        <form className={styles.formEdit}>
          <div className={styles.profileGroup}>
            <div className={styles.profile}>
              <input id="profile" type="file" hidden />
              <div className={styles.profileOver}>
                <svg
                  className={styles.profileIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="3.2" />
                  <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                </svg>
              </div>
            </div>
            <label className={styles.profileLabel}>CHANGE PHOTO</label>
          </div>

          <div className={styles.inputs}>
            <div className={styles.iptGroup}>
              <label className={styles.iptLabel} htmlFor="name">
                Name
              </label>
              <input
                className={styles.ipt}
                id="name"
                type="text"
                placeholder="Enter your name..."
              />
            </div>
            <div className={styles.iptGroup}>
              <label className={styles.iptLabel} htmlFor="bio">
                Bio
              </label>
              <textarea
                className={styles.textarea}
                id="bio"
                placeholder="Enter your bio..."
                rows={3}
              ></textarea>
            </div>
            <div className={styles.iptGroup}>
              <label className={styles.iptLabel} htmlFor="phone">
                Phone
              </label>
              <input
                className={styles.ipt}
                id="phone"
                type="tel"
                placeholder="Enter your phone..."
              />
            </div>
            <div className={styles.iptGroup}>
              <label className={styles.iptLabel} htmlFor="email">
                Email
              </label>
              <input
                className={styles.ipt}
                id="email"
                type="email"
                placeholder="Enter your email..."
              />
            </div>
            <div className={styles.iptGroup}>
              <label className={styles.iptLabel} htmlFor="password">
                Password
              </label>
              <input
                className={styles.ipt}
                id="password"
                type="password"
                placeholder="Enter your new password..."
              />
            </div>
          </div>

          <button className={styles.btn}>Save</button>
        </form>
      </div>
    </div>
  );
}
