import Head from "next/head"
import styles from "../../styles/Register.module.css"

import FormRegister from "../../components/formRegister/formRegister"

export default function Register() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Register</title>
                <meta name="description" content="A example of authentification in a web app" />
                <link rel="icon" href="/devchallenges.png" />
            </Head>

            <main className={styles.main}>
                <FormRegister />                
            </main>
        </div>
    )
}