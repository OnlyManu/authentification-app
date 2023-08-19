import Image from "next/image"
import styles from "./navbar.module.css"

interface IProps {
    children: React.ReactElement | null
}

export default function Navbar({children}:IProps) {
    return (
        <div className={styles.container}>
            <Image
                className={styles.logo}
                src={"/devchallenges.svg"}
                width={131}
                height={19}
                alt=""
                priority={true}
            />
            {children}
        </div>
    )
}