import React from "react";
import styles from "./toast.module.css";
import { PiWarningCircleFill } from "react-icons/pi";

interface props {
  heading: string;
  caption: string;
  animationEnd?: () => void;
  type: string;
}

const Toast = ({ heading, caption, animationEnd, type }: props) => {
  if (type === "orange") {
    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          right: "0",
        }}
        onAnimationEnd={animationEnd}
      >
        <div className={styles.mainContainer}>
          <div className={styles.toastContainer}>
            <div className={styles.innerToastContainer}>
              <div className={styles.iconContainerOrange}>
                <PiWarningCircleFill color="#F7AD1E" size={22} />
              </div>
              <div className={styles.textContainer}>
                <div>
                  <h3>{heading}</h3>
                </div>
                <div>
                  <p>{caption}</p>
                </div>
              </div>
            </div>
            <div className={styles.colourAccentOrange}></div>
          </div>
        </div>
      </div>
    );
  } else if (type === "green") {
    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          right: "0",
        }}
        onAnimationEnd={animationEnd}
      >
        <div className={styles.mainContainer}>
          <div className={styles.toastContainer}>
            <div className={styles.innerToastContainer}>
              <div className={styles.iconContainerGreen}>
                <PiWarningCircleFill color="#2dc449" size={22} />
              </div>
              <div className={styles.textContainer}>
                <div>
                  <h3>{heading}</h3>
                </div>
                <div>
                  <p>{caption}</p>
                </div>
              </div>
            </div>
            <div className={styles.colourAccentGreen}></div>
          </div>
        </div>
      </div>
    );
  } else if (type === "red") {
    return (
      <div
        style={{
          position: "fixed",
          top: "0",
          right: "0",
        }}
        onAnimationEnd={animationEnd}
      >
        <div className={styles.mainContainer}>
          <div className={styles.toastContainer}>
            <div className={styles.innerToastContainer}>
              <div className={styles.iconContainerRed}>
                <PiWarningCircleFill color="#ed3232" size={22} />
              </div>
              <div className={styles.textContainer}>
                <div>
                  <h3>{heading}</h3>
                </div>
                <div>
                  <p>{caption}</p>
                </div>
              </div>
            </div>
            <div className={styles.colourAccentRed}></div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Toast;
