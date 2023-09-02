import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {useEffect, useState} from "react";
import {NextRouter, useRouter} from "next/router";
import {userData, isValidateUser, getUserData} from "../../lib/auth";
import Head from "next/head";
import styles from "../../styles/Profile.module.css";

import Navbar from "../../components/navbar/navbar";
import Menu from "../../components/menu/menu";
import PersonalInfos from "../../components/personalInfos/personalInfos";

export default function Profile() {
  const router: NextRouter = useRouter();
  const [user, setUser] = useState<null | userData>(null);

  useEffect(() => {
    async function setUserData() {
      const userData: userData = await getUserData();
      setUser(userData);
    }

    if (isValidateUser()) {
      setUserData();
    } else {
      router.replace("/login");
    }
  }, []);

  if (user) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Profile</title>
          <meta
            name="description"
            content="A example of authentification in a web app"
          />
          <link rel="icon" href="/devchallenges.png" />
        </Head>

        <header className={styles.header}>
          <Navbar>
            <Menu userPhotoUrl={user.photo} />
          </Navbar>
        </header>

        <main className={styles.main}>
          <PersonalInfos userInfos={user as userData} />
        </main>
      </div>
    );
  }

  return null;
}
