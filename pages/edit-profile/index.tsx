import {useEffect, useState} from "react";
import {NextRouter, useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {userType, updateUserAction, setIsUerAction} from "../../lib/store";
import {userData, isValidateUser, getUserData} from "../../lib/auth";
import Head from "next/head";
import styles from "../../styles/EditProfile.module.css";

import Navbar from "../../components/navbar/navbar";
import Menu from "../../components/menu/menu";
import FormInfos from "../../components/formInfos/formInfos";

export default function EditProfile() {
  const router: NextRouter = useRouter();
  const isUser: boolean = useSelector((state: any) => state.isUser as boolean);
  const user: userType = useSelector((state: any) => state.user as userType);
  const dispatch = useDispatch();

  useEffect(() => {
    async function setUserData() {
      const userData: userType = await getUserData();
      dispatch(updateUserAction(userData));
    }

    if (isValidateUser()) {
      dispatch(setIsUerAction(true));
      setUserData();
    } else {
      router.replace("/login");
    }
  }, [isUser]);

  if (isUser && user) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Edit profile</title>
          <meta
            name="description"
            content="A example of authentification in a web app"
          />
          <link rel="icon" href="/devchallenges.png" />
        </Head>

        <header className={styles.header}>
          <Navbar>
            <Menu userPhotoUrl={user?.photo as string} />
          </Navbar>
        </header>

        <main className={styles.main}>
          <FormInfos userInfos={user as userData} />
        </main>
      </div>
    );
  }

  return null;
}
