import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import StreamingSection from "./pages/StreamingSection";
import Location from "./components/Location";
import UpComming from "./pages/UpComming";
import LoginPage from "./pages/Loginpage";
import AboutUs from "./pages/AboutUs";
import NowShowingBooking from "./pages/NowShowingBooking";
function App() {

  const [count, setCount] = useState(0);

  return (
    <>



      <Header />
      <StreamingSection />
      {/* <NowShowingBooking /> */}
      {/* <AboutUs /> */}
      {/* <LoginPage /> */}

      {/* <Location />
       <StreamingSection />
      <UpComming /> 
      <Footer /> */}
    </>
  );
}

export default App;
