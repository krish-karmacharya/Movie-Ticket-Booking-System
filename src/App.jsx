import React from "react";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import StreamingSection from "./pages/StreamingSection";
import UpComming from "./pages/UpComming";
import AboutUs from "./pages/AboutUs";
import NowShowingBooking from "./pages/NowShowingBooking";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies";
import SignInForm from "./pages/SignInForm";
import CreateAccountForm from "./pages/CreateAccountForm";
import OnclickUpcoming from "./components/OnclickUpcomming";
import Seats from "./components/Seats";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/UpComming" element={<UpComming />} />
          <Route path="/StreamingSection" element={<StreamingSection />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/NowShowingBooking" element={<NowShowingBooking />} />
          <Route path="/SignInForm" element={<SignInForm />} />
          <Route path="/CreateAccountForm" element={<CreateAccountForm />} />
          <Route path="/OnclickUpcomming" element={<OnclickUpcoming />} />
          {/* <Route path="/Seats" element={<Seats />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
