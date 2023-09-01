import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {useEffect, useState} from "react";
import {NextRouter, useRouter} from "next/router";
import {isValidateUser, getUserUID} from "../../lib/auth";
import Head from "next/head";
import styles from "../../styles/Profile.module.css";

import Navbar from "../../components/navbar/navbar";
import Menu from "../../components/menu/menu";
import PersonalInfos from "../../components/personalInfos/personalInfos";

export default function Profile() {
  const router: NextRouter = useRouter();
  const [user, setUser] = useState<null | string>(null);

  useEffect(() => {
    if (isValidateUser()) {
      setUser(getUserUID);
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
            <Menu />
          </Navbar>
        </header>

        <main className={styles.main}>
          <PersonalInfos />
        </main>
      </div>
    );
  }

  return null;
}
