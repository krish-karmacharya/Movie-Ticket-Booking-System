import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import StreamingSection from "./pages/StreamingSection";
import Location from "./components/Location";
import UpComming from "./pages/UpComming";
import LoginPage from "./pages/Loginpage";
import AboutUs from "./pages/AboutUs";
import NowShowingBooking from "./pages/NowShowingBooking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";

function App() {

  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/UpComming" element={<UpComming />} />
          <Route path="/StreamingSection" element={<StreamingSection />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Loginpage" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
      {/* <Header /> */}
      {/* <StreamingSection /> */}
      {/* <UpComming /> */}
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
