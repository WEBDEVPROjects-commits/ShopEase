import { Outlet } from "react-router-dom";
import Body from "../Body/Body";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
function homePage() {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
}

export default homePage;
