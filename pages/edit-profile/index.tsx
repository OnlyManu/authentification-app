import Head from "next/head";
import styles from "../../styles/EditProfile.module.css";

import Navbar from "../../components/navbar/navbar";
import Menu from "../../components/menu/menu";
import FormInfos from "../../components/formInfos/formInfos";

export default function EditProfile() {
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
          <Menu />
        </Navbar>
      </header>

      <main className={styles.main}>
        <FormInfos />
      </main>
    </div>
  );
}
