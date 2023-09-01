import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import {isValidateUser} from "../../lib/auth";
import Head from "next/head";
import styles from "../../styles/Register.module.css";

import FormRegister from "../../components/formRegister/formRegister";

export default function Register() {
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (isValidateUser()) {
      router.replace("/profile");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Register</title>
        <meta
          name="description"
          content="A example of authentification in a web app"
        />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <main className={styles.main}>
        <FormRegister />
      </main>
    </div>
  );
}
