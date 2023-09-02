import Link from "next/link";
import Image from "next/image";
import styles from "./personalInfos.module.css";
import utils from "../../styles/utils.module.css";

import {userData} from "../../lib/auth";

interface IProps {
  userInfos: userData;
}

export default function PersonalInfos({userInfos}: IProps) {
  console.log(userInfos.photo);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Personal info</h1>
        <p className={styles.description}>
          Basic info, like your name and photo
        </p>
      </div>
      <div className={styles.personalInfos}>
        <div className={styles.personalInfosHeader}>
          <div className={utils.header}>
            <h2 className={utils.heading}>Profile</h2>
            <p className={utils.description}>
              Some info may be visible to other people
            </p>
          </div>
          <Link className={styles.btnEdit} href="/edit-profile">
            Edit
          </Link>
        </div>
        <div className={styles.infos}>
          <div className={styles.info}>
            <span className={styles.label}>PHOTO</span>
            <div className={styles.profile}>
              {userInfos.photo !== "" ? (
                <img
                  src={userInfos.photo}
                  style={{width: "72px", height: "auto"}}
                  alt=""
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>NAME</span>
            <span className={styles.value}>{userInfos.name}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>BIO</span>
            <span className={styles.value}>{userInfos.bio}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>PHONE</span>
            <span className={styles.value}>{userInfos.phone}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>EMAIL</span>
            <span className={styles.value}>{userInfos.email}</span>
          </div>
          <div className={styles.info}>
            <span className={styles.label}>PASSWORD</span>
            <span className={styles.value}>************</span>
          </div>
        </div>
      </div>
    </div>
  );
}
