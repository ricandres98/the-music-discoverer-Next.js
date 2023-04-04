import Header from "containers/Header";
import Head from "next/head";
import Image from "next/image";
import styles from "styles/Home.module.scss";
import img1 from "assets/images/drake-04g-344x344.jpg";
import img2 from "assets/images/harry-styles-6jk-artistchart-rcm-344x344.jpg";
import img3 from "assets/images/luke-combs-9dm-artist-chart-501-344x344.jpg";
import img4 from "assets/images/miley-cyrus-jca-artistchart-jaw-344x344.jpg";
import img5 from "assets/images/morgan-wallen-nlu-artist-chart-zuy-344x344.jpg";
import img6 from "assets/images/pnk-it7-artist-chart-8sk-344x344.jpg";
import img7 from "assets/images/rihanna-k0p-artistchart-5wb-344x344.jpg";
import img8 from "assets/images/sza-8os-344x344.jpg";
import img9 from "assets/images/taylor-swift-824-artistchart-zpe-344x344.jpg";
import img10 from "assets/images/the-weeknd-xmx-artist-chart-uxt-344x344.jpg";

export default function Home() {
  const images1 = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
  const doubleImages1 = [...images1, ...images1];
  const images2 = images1.sort(() => Math.random() - 0.5);
  const doubleImages2 = [...images2, ...images2];
  return (
    <>
      <Head>
        <title>The music discoverer</title>
      </Head>
      <Header page="home" />
      <section className={styles.main}>
        <div className={styles["main-container"]}>
          <div className={styles["slider-container"]}>
            <div className={styles.slider}>
              {doubleImages1.map((image, index) => (
                <div
                  key={`left-moving-img-${index}`}
                  className={styles["image-container"]}
                >
                  <Image
                    src={image}
                    width={200}
                    height={200}
                    alt="artist-image"
                    placeholder="blur"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles["text-in-between"]}>
            <h1>
              Life is not as good without music. Let&apos;s live a <b>better</b>{" "}
              life!
            </h1>
          </div>
          <div
            className={`${styles["slider-container"]} ${styles["slider-container-right"]}`}
          >
            <div className={styles.slider}>
              {doubleImages2.map((image, index) => (
                <div
                  key={`right-moving-img-${index}`}
                  className={styles["image-container"]}
                >
                  <Image
                    src={image}
                    width={200}
                    height={200}
                    alt="artist-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
