import Header from 'containers/Header';
import Head from 'next/head';
import Image from 'next/image';
import backgroundNotes from 'assets/background-notes.svg';
import styles from 'styles/Home.module.scss';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>The music discoverer</title>
      </Head>
      <Header page="home"/>
      <section className={styles.main}>
        <div className={styles["main__text"]}>
          <p>
            Life is not as good without music. Let's live a <b>better</b> life!
          </p>
        </div>
        <Image src={backgroundNotes} alt="music notes" />
      </section>
      <Link href="/search/query">Hello prueba</Link>
    </>
  );
}
