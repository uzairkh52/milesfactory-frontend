import HeroSection from "../component/HeroSection";
import Footer from "../component/layout/Footer";
import Header from "../component/layout/Header";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/features/counter/counterSlice";
import { Button } from "@mui/material";
import { useState } from "react";
import styles from "@/src/styles/sass/components/Home.module.scss"

const Home = () => {
   const count = useSelector((state)=> state.counter.value);
   const dispatch = useDispatch();
   const [isSearchActive, setIsSearchActive] = useState(false);
   const handleSearchToggle = (isSearching) => {
      setIsSearchActive(isSearching);
    };
   // const count = useSelector((state)=> state.counter.value);
   // const dispaaptch = useDispatch();
  return (
    <>
      <main className={styles.HomeMain  +" basecolor1-light-bg"}>
        <Header />
        {/* counter value {count} */}
        {/* <Button onClick={()=> dispatch(increment())}>Inc</Button>
        <Button onClick={()=> dispatch(decrement())}>Dec</Button> */}
        <HeroSection onSearchToggle={handleSearchToggle} />
        {!isSearchActive &&  <Footer />}
        
      </main>
    </>
  );
};

export default Home;
