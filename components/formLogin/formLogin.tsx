import utils from "../../styles/utils.module.css";
import Image from "next/image";
import Link from "next/link";

import React, {useState} from "react";
import {useRouter} from "next/router";
import {
  loginUserWithEmail,
  loginUserWithGoogle,
  loginUserWithFacebook,
  loginUserWithGithub,
} from "../../lib/auth";

export default function FormLogin() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const redirectToProfile = () => {
    router.replace("/profile");
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setEmail(value);
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setPassword(value);
  };

  const isFormValid = () => {
    const userEmail = email.trim();
    const userPassword = password.trim();

    const emailReg = new RegExp(
      /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i
    );

    if (userEmail == "" || userPassword == "") {
      alert("The fields may not be empty.");
      return false;
    }

    if (!emailReg.test(userEmail)) {
      alert("Enter a valid mail adress.");
      return false;
    }
    return true;
  };

  const loginWithEmail = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFormValid()) {
      const result = await loginUserWithEmail(email, password);
      if (result) {
        redirectToProfile();
      } else {
        alert("Something went wrong");
      }
    }
  };

  const loginWithGoogle = async () => {
    const result = await loginUserWithGoogle();
    if (result) {
      redirectToProfile();
    }
  };

  const loginWithFacebook = async () => {
    const result = await loginUserWithFacebook();
    if (result) {
      redirectToProfile();
    }
  };

  const loginWithGithub = async () => {
    const result = await loginUserWithGithub();
    if (result) {
      redirectToProfile();
    }
  };

  return (
    <div className={utils.logFormWrapper}>
      <Image
        src={"/devchallenges.svg"}
        width={131}
        height={19}
        alt=""
        priority={true}
      />
      <h1 className={utils.logHeading}>Login</h1>
      <form className={utils.logForm} method="POST">
        <div className={utils.logFormInputs}>
          <div className={utils.logIptGroup}>
            <svg
              className={utils.logIptIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <input
              className={utils.logIpt}
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
          </div>
          <div className={utils.logIptGroup}>
            <svg
              className={utils.logIptIcon}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
            <input
              className={utils.logIpt}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
            />
          </div>
        </div>
        <button type="submit" className={utils.logBtn} onClick={loginWithEmail}>
          Login
        </button>
      </form>
      <div className={utils.logSocialLog}>
        <span className={utils.logSocialLogText}>
          or continue with these social profile
        </span>
        <div className={utils.logSocialIcons}>
          <div className={utils.logSocialIcon} onClick={loginWithGoogle}>
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="21.8826" cy="21.5981" r="20.5" stroke="#828282" />
              <path
                d="M21.91 15.8883C23.7953 15.8883 25.5006 16.8557 26.478 18.1887L28.7945 15.8556C27.409 14.054 24.7425 12.6255 21.91 12.6255C16.9505 12.6255 12.8828 16.6388 12.8828 21.5983C12.8828 26.5578 16.9505 30.5711 21.91 30.5711C26.0213 30.5711 29.4797 27.8141 30.5402 24.0454C30.7685 23.2622 30.8828 22.4465 30.8828 21.5983V20.7826H22.7257V24.0448H27.049C26.1517 25.97 24.1776 27.3083 21.91 27.3083C18.7614 27.3083 16.1457 24.7469 16.1457 21.5983C16.1457 18.4497 18.7614 15.8883 21.91 15.8883Z"
                fill="#828282"
              />
            </svg>
          </div>
          <div className={utils.logSocialIcon} onClick={loginWithFacebook}>
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="21.8088" cy="21.5981" r="20.5" stroke="#828282" />
              <g clipPath="url(#clip0)">
                <path
                  d="M28.7963 13.4419H16.0697C14.6159 13.4419 13.433 14.596 13.433 16.0143V28.4305C13.433 29.8488 14.6159 31.0029 16.0697 31.0029H21.3783V24.7948H19.2689V21.7079H21.3783V19.6157C21.3783 17.9135 22.7976 16.5288 24.5424 16.5288H27.7416V19.6157H24.5424V21.7079H27.7416L27.2142 24.7948H24.5424V31.0029H28.7963C30.25 31.0029 31.433 29.8488 31.433 28.4305V16.0143C31.433 14.596 30.25 13.4419 28.7963 13.4419Z"
                  fill="#828282"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="18"
                    height="17.561"
                    fill="white"
                    transform="translate(13.433 13.4419)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={utils.logSocialIcon} onClick={loginWithGithub}>
            <svg
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="21.6614" cy="21.5981" r="20.5" stroke="#828282" />
              <g clipPath="url(#clip0)">
                <path
                  d="M22.2855 13.4419C17.3422 13.4419 13.2855 17.4986 13.2855 22.4419C13.2855 26.6602 16.2455 30.4921 20.1761 31.4419V28.4643C19.7867 28.5496 19.4283 28.5521 19.0318 28.4352C18.4999 28.2782 18.0677 27.9239 17.7469 27.3837C17.5424 27.0387 17.18 26.6646 16.802 26.6921L16.7093 25.6415C17.5268 25.5715 18.234 26.1396 18.6539 26.8449C18.8403 27.1586 19.055 27.3425 19.3305 27.4238C19.5968 27.5022 19.8827 27.4646 20.2158 27.3469C20.2995 26.6799 20.605 26.4302 20.8359 26.0786V26.0781C18.4917 25.7285 17.5574 24.4848 17.1866 23.5032C16.6953 22.1998 16.9589 20.5715 17.8278 19.5425C17.8447 19.5224 17.8752 19.47 17.8634 19.4333C17.465 18.2299 17.9505 17.2344 17.9683 17.1288C18.4281 17.2647 18.5028 16.992 19.9655 17.8806L20.2183 18.0325C20.3241 18.0956 20.2908 18.0596 20.3966 18.0516C21.0073 17.8857 21.6511 17.7941 22.2854 17.7859C22.9245 17.7941 23.5642 17.8857 24.2002 18.0583L24.282 18.0666C24.2749 18.0655 24.3043 18.0614 24.3536 18.032C26.1807 16.9252 26.1151 17.287 26.6051 17.1277C26.6228 17.2334 27.1018 18.2451 26.7077 19.4333C26.6545 19.597 28.2917 21.0962 27.3843 23.5028C27.0135 24.4848 26.0794 25.7285 23.7352 26.0781V26.0786C24.0356 26.5366 24.3967 26.7803 24.3948 27.7251V31.4419C28.3255 30.4921 31.2854 26.6602 31.2854 22.4419C31.2855 17.4986 27.2288 13.4419 22.2855 13.4419V13.4419Z"
                  fill="#828282"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(13.2855 13.4419)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
        <span className={utils.logSocialLogText}>
          Don’t have an account yet?{" "}
          <Link className={utils.logSocialLogLink} href="/register">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
}
