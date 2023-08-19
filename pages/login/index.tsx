import Head from "next/head"
import styles from "../../styles/Login.module.css"

import FormLogin from "../../components/formLogin/formLogin"

export default function Login() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Login</title>
                <meta name="description" content="A example of authentification in a web app" />
                <link rel="icon" href="/devchallenges.png" />
            </Head>

            <main className={styles.main}>
                <FormLogin />                
            </main>
        </div>
    )
}