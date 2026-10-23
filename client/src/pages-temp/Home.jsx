import Hero from "../components/Hero.jsx";

import About from "./About.jsx";
import Career from "./Career.jsx";
import Gallery from "./Gallery.jsx";
import FanCommunity from "./FanCommunity.jsx";
import FanChat from "./FanChat.jsx";
import ManagementChat from "./ManagementChat.jsx";
import Contact from "./Contact.jsx";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Career />
      <Gallery />
      <FanCommunity />
      <FanChat />
      <ManagementChat />
      <Contact />
    </>
  );
}

export default Home;
