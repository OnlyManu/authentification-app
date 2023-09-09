import styles from "./formInfos.module.css";
import utils from "../../styles/utils.module.css";
import Link from "next/link";

import React, {ChangeEvent, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {updateUserAction} from "../../lib/store";
import {
  userData,
  modifyUserPhoto,
  modifyUserName,
  modifyUserBioAndPhone,
  modifyUserEmail,
  modifyUserPassword,
  uploadUserPhoto,
} from "../../lib/auth";

interface IProps {
  userInfos: userData;
}

export default function FormInfos({userInfos}: IProps) {
  const isPassword = useSelector((state: any) => state.isPassword as boolean);
  const [user, setUser] = useState<userData>(userInfos);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleProfileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const file = fileInput.files[0] as File;
    if (!file.type.startsWith("image")) {
      alert("Please select a valide image!");
      return;
    }

    if (file.size > 1048576) {
      alert("Your image is too big. Select a image with less than 1 Mo.");
      return;
    }

    setFile(file);
    setUser((user) => ({...user, photo: URL.createObjectURL(file)}));
  };

  const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUser((user) => ({...user, name: value}));
  };

  const handleBioChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setUser((user) => ({...user, bio: value}));
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUser((user) => ({...user, email: value}));
  };

  const handlePhoneChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUser((user) => ({...user, phone: value}));
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setUser((user) => ({...user, password: value}));
  };

  const saveModification = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (verifyModification()) {
        if (user.photo !== userInfos.photo) {
          if (file) {
            const photoUrl = await uploadUserPhoto(file);
            if (photoUrl) {
              setUser((user) => ({...user, photo: photoUrl}));
              await modifyUserPhoto(photoUrl);
            }
          }
        }
        if (user.name.trim() !== userInfos.photo) {
          await modifyUserName(user.name.trim());
        }
        if (
          user.bio.trim() !== userInfos.bio ||
          user.phone.trim() !== userInfos.bio
        ) {
          await modifyUserBioAndPhone(user.bio.trim(), user.phone.trim());
        }
        if (user.email.trim() !== userInfos.email) {
          await modifyUserEmail(user.email.trim());
        }
        if (user.password.trim() !== "") {
          await modifyUserPassword(user.password.trim());
        }

        dispatch(updateUserAction(user));
        router.replace("/profile");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  const verifyModification = () => {
    if (user.email.trim() !== userInfos.email) {
      const emailReg = new RegExp(
        /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
      );
      if (!emailReg.test(user.email.trim())) {
        alert("Enter a valid mail adress.");
        return false;
      }
    }

    if (user.name.trim() == "") {
      alert("Field name may not be empty.");
      return false;
    }

    if (user.phone.trim() !== userInfos.phone) {
      if (user.phone.trim().length < 8) {
        alert("The phone number must conatint at least 8 digits.");
        return false;
      }
    }

    if (user.password.trim() !== "") {
      if (user.password.trim().length < 4) {
        alert("The new password must contain at least 4 characters.");
        return false;
      }
    }

    return true;
  };

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
        <form className={styles.formEdit} method="POST">
          <div className={styles.profileGroup}>
            <div className={styles.profile}>
              {user.photo !== "" ? (
                <img
                  src={user.photo}
                  style={{width: "auto", height: "72px"}}
                  alt=""
                />
              ) : (
                <></>
              )}
              <input
                id="profile"
                type="file"
                onChange={handleProfileChange}
                hidden
              />
              <div className={styles.profileOver}>
                <label htmlFor="profile">
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
                </label>
              </div>
            </div>
            <label htmlFor="profile" className={styles.profileLabel}>
              CHANGE PHOTO
            </label>
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
                value={user.name}
                onChange={handleNameChange}
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
                value={user.bio}
                onChange={handleBioChange}
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
                value={user.phone}
                onChange={handlePhoneChange}
                placeholder="Enter your phone..."
              />
            </div>
            {isPassword && (
              <>
                <div className={styles.iptGroup}>
                  <label className={styles.iptLabel} htmlFor="email">
                    Email
                  </label>
                  <input
                    className={styles.ipt}
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={handleEmailChange}
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
                    value={user.password}
                    onChange={handlePasswordChange}
                    placeholder="Enter your new password..."
                  />
                </div>
              </>
            )}
          </div>

          <button className={styles.btn} onClick={saveModification}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
