import HeroSection from "../component/HeroSection";
import Footer from "../component/layout/Footer";
import Header from "../component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { useState } from "react";
import styles from "@/src/styles/sass/components/Home.module.scss"

const Home = () => {
  const dispatch = useDispatch();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const isChatHandle = (isSearching) => {
    setIsSearchActive(isSearching);
  };
  return (
    <>
      <main className={styles.HomeMain + " basecolor1-light-bg"}>
        <Header isSearchActive={isSearchActive} />
        <HeroSection isChatActive={isChatHandle} />
        {isSearchActive == true ? (
          <Footer isSearchActive={isSearchActive} />
        ) : (
          ""
        )}
      </main>
    </>
  );
};

export default Home;
