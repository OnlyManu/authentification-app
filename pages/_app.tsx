import "../styles/globals.css";
import type {AppProps} from "next/app";
import {Provider} from "react-redux";
import {userStore} from "../lib/store";

export default function App({Component, pageProps}: AppProps) {
  return (
    <Provider store={userStore}>
      <Component {...pageProps} />
    </Provider>
  );
}
