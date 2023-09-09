import {useEffect} from "react";
import {NextRouter, useRouter} from "next/router";
import {useSelector} from "react-redux";
import {isValidateUser} from "../../lib/auth";
import Head from "next/head";
import styles from "../../styles/Login.module.css";

import FormLogin from "../../components/formLogin/formLogin";

export default function Login() {
  const router: NextRouter = useRouter();
  const isUser: boolean = useSelector((state: any) => state.isUser as boolean);

  useEffect(() => {
    if (isUser) {
      router.replace("/profile");
    } else if (isValidateUser()) {
      router.replace("/profile");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta
          name="description"
          content="A example of authentification in a web app"
        />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <main className={styles.main}>
        <FormLogin />
      </main>
    </div>
  );
}
